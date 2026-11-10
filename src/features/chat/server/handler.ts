import 'server-only';
import { chatRequestSchema, type ChatLanguage, type ChatResponse, type ChatStatus } from '@/features/chat/schema';
import { localAnswer, profileContext } from '@/features/chat/server/knowledge';
import { completeChat, type OpenAiConfig } from '@/features/chat/server/openai';
import { serverEnv } from '@/server/env';
import { clientKey, jsonNoStore } from '@/server/http';
import { createRateLimiter } from '@/server/rate-limit';

const MAX_BODY_BYTES = 50_000;
const DEFAULT_MODEL = 'gpt-4o-mini';
const defaultLimiter = createRateLimiter({ limit: 12, windowMs: 60_000 });

type Deps = {
  /** `null` forces local mode; omitted reads the environment. */
  openai?: OpenAiConfig | null;
  limiter?: ReturnType<typeof createRateLimiter>;
  fetchImpl?: typeof fetch;
};

function openAiConfig(): OpenAiConfig | null {
  const env = serverEnv();
  return env.OPENAI_API_KEY ? { apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL ?? DEFAULT_MODEL } : null;
}

const json = (body: ChatResponse | ChatStatus, status = 200, headers?: Record<string, string>) => jsonNoStore(body, status, headers);

/** GET /api/chat — tells the widget whether a model is configured. */
export function handleChatStatus(): Response {
  return json({ mode: openAiConfig() ? 'ai' : 'local' });
}

/**
 * POST /api/chat. Visitors may only send `user`/`assistant` turns; the system
 * prompt is built server-side from `src/content`. Any model failure falls back
 * to a local keyword answer, so the widget always gets a factual reply.
 */
export async function handleChat(request: Request, deps: Deps = {}): Promise<Response> {
  const openai = deps.openai === undefined ? openAiConfig() : deps.openai;
  const limiter = deps.limiter ?? defaultLimiter;

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return json({ error: 'Request too large.' }, 413);
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const parsed = chatRequestSchema.safeParse(payload);
  if (!parsed.success) return json({ error: 'Invalid conversation.' }, 400);

  const { messages } = parsed.data;
  const question = messages[messages.length - 1].content;
  const language: ChatLanguage = parsed.data.language === 'km' || /[ក-៿]/.test(question) ? 'km' : 'en';
  const fallback = () => json({ answer: localAnswer(question, language), source: 'local' });

  if (!openai) return fallback();
  const rate = limiter(clientKey(request));
  if (!rate.allowed) return json({ error: 'Please try again later.' }, 429, { 'Retry-After': String(rate.retryAfterSec) });

  const answer = await completeChat(profileContext(language), messages, openai, deps.fetchImpl);
  return answer ? json({ answer, source: 'ai' }) : fallback();
}
