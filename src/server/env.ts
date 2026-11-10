import 'server-only';
import { z } from 'zod';

/** Blank values count as unset, so `KEY=` in `.env.local` disables a feature. */
const optional = z.preprocess((v) => (typeof v === 'string' && v.trim() ? v.trim() : undefined), z.string().optional());

/**
 * Every server-side environment variable the app reads. All are optional:
 * a missing provider disables its feature instead of failing the build.
 * Documented in docs/portfolio/OPERATIONS.md.
 */
const envSchema = z.object({
  NODE_ENV: optional,
  VERCEL_ENV: optional,
  // Contact form (Resend)
  RESEND_API_KEY: optional,
  RESEND_API_URL: optional,
  CONTACT_TO_EMAIL: optional,
  CONTACT_FROM_EMAIL: optional,
  // Portfolio assistant (OpenAI); without a key it answers from local content
  OPENAI_API_KEY: optional,
  OPENAI_MODEL: optional,
  // Unique-browser counter (Upstash Redis)
  UPSTASH_REDIS_REST_URL: optional,
  UPSTASH_REDIS_REST_TOKEN: optional,
  PORTFOLIO_COUNT_VISITORS: optional,
});

export type ServerEnv = z.infer<typeof envSchema>;

/** Read on every call (not cached) so tests and preview overrides take effect. */
export function serverEnv(source: NodeJS.ProcessEnv = process.env): ServerEnv {
  return envSchema.parse(source);
}
