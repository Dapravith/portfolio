import { z } from 'zod';

/** Shared by the chat widget (client) and the API handler (authoritative). */
export const MAX_MESSAGES = 12;
export const MAX_QUESTION_LENGTH = 1000;
const MAX_ANSWER_LENGTH = 4000;

export type ChatLanguage = 'en' | 'km';

const userMessage = z.object({ role: z.literal('user'), content: z.string().max(MAX_QUESTION_LENGTH).trim().min(1) });
const assistantMessage = z.object({ role: z.literal('assistant'), content: z.string().max(MAX_ANSWER_LENGTH).trim().min(1) });

export const chatMessageSchema = z.discriminatedUnion('role', [userMessage, assistantMessage]);
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  messages: z
    .array(chatMessageSchema)
    .min(1)
    .max(MAX_MESSAGES)
    .refine((m) => m[m.length - 1]?.role === 'user', 'A visitor question is required.'),
  language: z.unknown().optional(),
});

export type ChatResponse = { answer: string; source: 'ai' | 'local' } | { error: string };
export type ChatStatus = { mode: 'ai' | 'local' };
