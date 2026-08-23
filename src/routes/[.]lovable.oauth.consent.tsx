import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type OAuthResult = {
  redirect_url?: string;
  redirect_to?: string;
  client?: { name?: string; client_id?: string } | null;
  scope?: string;
  redirect_uri?: string;
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthResult | null; error: Error | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: Error | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: Error | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? (s["authorization_id"] as string) : "",
  }),
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization_id");
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return { needsAuth: true as const, details: null };
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return { needsAuth: false as const, details: null };
    }
    return { needsAuth: false as const, details: data };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center p-6 text-center">
      <p className="text-muted-foreground">
        Could not load this authorization request: {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const { needsAuth, details } = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setBusy(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.href,
    });
    if (result.error) {
      setBusy(false);
      setError(result.error.message ?? "Sign-in failed");
      return;
    }
    if (result.redirected) return;
    window.location.reload();
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: err } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="glass w-full max-w-md rounded-2xl border border-border p-8 space-y-5">
        <h1 className="text-2xl font-display font-bold">
          {needsAuth ? "Sign in to continue" : `Connect ${clientName}`}
        </h1>
        {needsAuth ? (
          <>
            <p className="text-muted-foreground text-sm">
              Sign in to approve this connection request.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={signIn}
              className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground disabled:opacity-50"
            >
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-sm">
              This lets {clientName} use this app as you. It does not bypass this app&apos;s
              permissions or backend policies.
            </p>
            {details?.redirect_uri && (
              <p className="text-xs text-muted-foreground break-all">
                Redirects to: {details.redirect_uri}
              </p>
            )}
            {details?.scope && (
              <p className="text-xs text-muted-foreground">Requested access: {details.scope}</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(true)}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground disabled:opacity-50"
              >
                Approve
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 font-medium disabled:opacity-50"
              >
                Cancel connection
              </button>
            </div>
          </>
        )}
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
