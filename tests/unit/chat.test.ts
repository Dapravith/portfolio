import { describe, expect, it, vi } from 'vitest';
import { handleChat } from '@/features/chat/server/handler';
import { createRateLimiter } from '@/server/rate-limit';
import { serverEnv } from '@/server/env';

const openai = { apiKey: 'test-key', model: 'test-model' };
const ask = (messages: unknown, extra: Record<string, unknown> = {}) =>
  new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
    body: JSON.stringify({ messages, ...extra }),
  });
const question = [{ role: 'user', content: 'What projects has he built?' }];

describe('POST /api/chat', () => {
  it('sends a server-built system prompt and returns the model answer', async () => {
    const fetchImpl = vi.fn(async () => Response.json({ choices: [{ message: { content: ' An answer. ' } }] }));
    const res = await handleChat(ask(question), { openai, limiter: createRateLimiter({ limit: 5, windowMs: 60_000 }), fetchImpl });
    expect(await res.json()).toEqual({ answer: 'An answer.', source: 'ai' });
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    const sent = JSON.parse(String(init.body));
    expect(sent.model).toBe('test-model');
    expect(sent.messages[0].role).toBe('system');
    expect(sent.messages[0].content).toContain('never invent details');
    expect(sent.messages.slice(1)).toEqual(question);
  });

  it('falls back to a local answer when the model fails', async () => {
    const fetchImpl = vi.fn(async () => new Response('down', { status: 500 }));
    const res = await handleChat(ask(question), { openai, limiter: createRateLimiter({ limit: 5, windowMs: 60_000 }), fetchImpl });
    expect((await res.json()).source).toBe('local');
  });

  it('rate-limits model calls per client', async () => {
    const fetchImpl = vi.fn(async () => Response.json({ choices: [{ message: { content: 'ok' } }] }));
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    await handleChat(ask(question), { openai, limiter, fetchImpl });
    const res = await handleChat(ask(question), { openai, limiter, fetchImpl });
    expect(res.status).toBe(429);
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it('rejects conversations that do not end with a visitor question', async () => {
    const res = await handleChat(ask([...question, { role: 'assistant', content: 'Hi' }]), { openai: null });
    expect(res.status).toBe(400);
  });

  it('answers in Khmer when the question is in Khmer', async () => {
    const res = await handleChat(ask([{ role: 'user', content: 'ទាក់ទង' }]), { openai: null });
    expect((await res.json()).answer).toContain('ទាក់ទង Dapravith');
  });
});

describe('serverEnv', () => {
  it('treats blank values as unset and trims the rest', () => {
    expect(serverEnv({ OPENAI_API_KEY: '  ', RESEND_API_KEY: ' key ' } as unknown as NodeJS.ProcessEnv)).toMatchObject({
      OPENAI_API_KEY: undefined,
      RESEND_API_KEY: 'key',
    });
  });
});
