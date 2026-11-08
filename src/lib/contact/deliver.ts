import type { ContactInput } from './schema';

/**
 * Delivery through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).
 * Plain fetch keeps the SDK out of the bundle. Required server-side env:
 *   RESEND_API_KEY      — API key (never exposed to the browser)
 *   CONTACT_TO_EMAIL    — inbox that receives messages
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "Portfolio <contact@your-domain>"
 */
export type ContactConfig = { apiKey: string; to: string; from: string; endpoint: string };

export function getContactConfig(env: NodeJS.ProcessEnv = process.env): ContactConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from, endpoint: env.RESEND_API_URL?.trim() || 'https://api.resend.com/emails' };
}

export function isContactConfigured(): boolean {
  return getContactConfig() !== null;
}

export type DeliveryResult = { ok: true; id?: string } | { ok: false; status: number };

export async function deliverContactMessage(
  input: ContactInput,
  config: ContactConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  const subject = `Portfolio message from ${input.name}`.slice(0, 140);
  const body = [`Name: ${input.name}`, `Email: ${input.email}`, '', input.message].join('\n');

  try {
    const res = await fetchImpl(config.endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: config.from, to: [config.to], reply_to: input.email, subject, text: body }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch {
    return { ok: false, status: 0 };
  }
}
