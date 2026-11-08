import { z } from 'zod';

/** Shared by the form (instant feedback) and the API route (authoritative). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(80)
    // No control characters: the name ends up in an email subject line.
    .refine((v) => !/[\u0000-\u001f\u007f]/.test(v)),
  email: z.string().trim().max(254).pipe(z.email()),
  message: z.string().trim().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Anti-spam fields sent alongside the message; never shown to people. */
export const contactEnvelopeSchema = contactSchema.extend({
  /** Honeypot: hidden from people, often filled in by bots. Must be empty. */
  website: z.string().max(0).optional().default(''),
  /** Milliseconds the form was open before submit. */
  elapsedMs: z.number().int().nonnegative(),
});

export const MIN_FILL_MS = 2500;

export type ContactErrorCode =
  | 'invalid'
  | 'rejected'
  | 'rate_limited'
  | 'unavailable'
  | 'delivery_failed'
  | 'bad_request';

export type ContactResponse = { ok: true } | { ok: false; error: ContactErrorCode; fields?: ContactField[] };
