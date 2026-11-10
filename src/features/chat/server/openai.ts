import 'server-only';
import type { ChatMessage } from '@/features/chat/schema';

export type OpenAiConfig = { apiKey: string; model: string };

/** One chat completion. Returns null on any failure so callers can fall back. */
export async function completeChat(
  system: string,
  messages: ChatMessage[],
  config: OpenAiConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<string | null> {
  try {
    const response = await fetchImpl('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'system', content: system }, ...messages],
        max_completion_tokens: 500,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;
    return typeof answer === 'string' && answer.trim() ? answer.trim() : null;
  } catch {
    return null;
  }
}
