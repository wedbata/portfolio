// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${(current as Error).stack ?? `${(current as Error).name}: ${(current as Error).message}`}${status}`);
    current = (current as any).cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
//
// Make the override defensive and idempotent: preserve the original console.error
// in a global guard and only wrap once. If the runtime prohibits reassignment,
// fail silently and continue to function without the wrapper.
const GLOBAL_ORIGINAL_KEY = "__itechwau_originalConsoleError";
const GLOBAL_WRAPPED_FLAG = "__itechwau_consoleErrorWrapped";

if (!(globalThis as any)[GLOBAL_ORIGINAL_KEY]) {
  try {
    // capture original console.error (bound to console)
    (globalThis as any)[GLOBAL_ORIGINAL_KEY] = console.error.bind(console);
  } catch {
    // accessing/binding console methods may throw in some strict runtimes; continue
    // without the guard — we'll attempt to read console.error directly later.
  }
}

const originalConsoleError: (...args: unknown[]) => void =
  (globalThis as any)[GLOBAL_ORIGINAL_KEY] ?? console.error.bind(console);

try {
  if (!(console as any)[GLOBAL_WRAPPED_FLAG]) {
    const wrapped = (...args: unknown[]) => {
      const expanded = args.map((arg) => {
        if (!isErrorLike(arg)) return arg;
        record(arg);
        return describeError(arg);
      });
      try {
        originalConsoleError(...expanded);
      } catch {
        // If calling originalConsoleError fails for some reason, fallback to the current console.error
        try {
          (console as any).__original?.apply(console, expanded);
        } catch {
          // swallow to avoid crashing logging itself
        }
      }
    };

    // Reassign in a try/catch because some environments make console methods read-only.
    try {
      (console as any).error = wrapped;
      (console as any)[GLOBAL_WRAPPED_FLAG] = true;
    } catch {
      // Unable to replace console.error — leave runtime as-is.
    }
  }
} catch {
  // Final safety net — never throw during module initialization.
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
