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
    parts.push(
      `${label}${(current as Error).stack ?? `${(current as Error).name}: ${(current as Error).message}`}${status}`,
    );
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
//
// Safety rules:
//  - install at most once per runtime, even if this module is evaluated twice
//    (SSR + client graphs, HMR, duplicate bundles);
//  - never throw during module initialization;
//  - always keep a working console.error, even if expansion or reassignment fails.
const ORIGINAL_KEY = "__itechwau_originalConsoleError";
const WRAPPED_KEY = "__itechwau_consoleErrorWrapped";

type ConsoleErrorFn = (...args: unknown[]) => void;
type ErrorCaptureGlobal = Record<string, unknown>;

function installConsoleErrorHook(): void {
  const store = globalThis as unknown as ErrorCaptureGlobal;

  // Already installed by a previous evaluation of this module — do nothing.
  if (store[WRAPPED_KEY] === true) return;

  let original: ConsoleErrorFn;
  try {
    original = (store[ORIGINAL_KEY] as ConsoleErrorFn | undefined) ?? console.error.bind(console);
    store[ORIGINAL_KEY] = original;
  } catch {
    // Reading/binding console methods can throw in locked-down runtimes.
    return;
  }

  const wrapped: ConsoleErrorFn = (...args: unknown[]) => {
    let expanded = args;
    try {
      expanded = args.map((arg) => {
        if (!isErrorLike(arg)) return arg;
        record(arg);
        return describeError(arg);
      });
    } catch {
      // Expansion must never suppress the log itself; fall back to raw args.
      expanded = args;
    }
    try {
      original(...expanded);
    } catch {
      // Swallow: logging must never crash the caller.
    }
  };

  try {
    console.error = wrapped as typeof console.error;
    store[WRAPPED_KEY] = true;
  } catch {
    // console.error is read-only here — leave the runtime untouched.
  }
}

try {
  installConsoleErrorHook();
} catch {
  // Final safety net — module init must never throw.
}

const LISTENERS_KEY = "__itechwau_errorListenersInstalled";

try {
  const store = globalThis as unknown as Record<string, unknown>;
  if (store[LISTENERS_KEY] !== true && typeof globalThis.addEventListener === "function") {
    globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
    globalThis.addEventListener("unhandledrejection", (event) =>
      record((event as PromiseRejectionEvent).reason),
    );
    store[LISTENERS_KEY] = true;
  }
} catch {
  // Listener registration is best-effort.
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
