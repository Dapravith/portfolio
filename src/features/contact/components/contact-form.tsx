'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Dictionary } from '@/i18n/dictionaries';
import { contactSchema, type ContactField, type ContactResponse } from '@/features/contact/schema';

type Copy = Dictionary['contact'];
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

const fields: ContactField[] = ['name', 'email', 'message'];

export function ContactForm({ copy, email }: { copy: Copy; email: string }) {
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const openedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  function fieldErrors(list: ContactField[]) {
    return Object.fromEntries(list.map((f) => [f, copy.errors[f]])) as Partial<Record<ContactField, string>>;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const check = contactSchema.safeParse(values);
    if (!check.success) {
      const bad = fields.filter((f) => check.error.issues.some((i) => i.path[0] === f));
      setErrors(fieldErrors(bad));
      setStatus({ kind: 'idle' });
      form.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: 'sending' });
    let result: ContactResponse;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...check.data,
          website: String(data.get('website') ?? ''),
          elapsedMs: Math.max(0, Date.now() - openedAt.current),
        }),
      });
      result = (await res.json().catch(() => ({ ok: false, error: 'delivery_failed' }))) as ContactResponse;
    } catch {
      result = { ok: false, error: 'delivery_failed' };
    }

    if (result.ok) {
      form.reset();
      setStatus({ kind: 'sent' });
    } else if (result.error === 'invalid' && result.fields?.length) {
      setErrors(fieldErrors(result.fields));
      setStatus({ kind: 'idle' });
    } else {
      const message =
        result.error === 'rate_limited'
          ? copy.errors.rateLimited
          : result.error === 'unavailable'
            ? copy.errors.unavailable
            : copy.errors.generic;
      setStatus({ kind: 'error', message });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const describedBy = (f: ContactField, extra?: string) =>
    [extra, errors[f] ? `${f}-error` : undefined].filter(Boolean).join(' ') || undefined;

  const inputClass =
    'mt-1.5 block w-full rounded border border-rule-strong bg-surface px-3 py-2.5 text-body text-ink placeholder:text-muted focus-visible:border-ink aria-[invalid=true]:border-danger';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="font-medium">
          {copy.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy('name')}
          className={inputClass}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-small text-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-medium">
          {copy.emailField}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy('email')}
          className={inputClass}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-small text-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="font-medium">
          {copy.message}
        </label>
        <p id="message-hint" className="text-small text-muted">
          {copy.messageHint}
        </p>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy('message', 'message-hint')}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-small text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={statusRef} tabIndex={-1} role={status.kind === 'error' ? 'alert' : 'status'} className="outline-none">
        {status.kind === 'sent' && <p className="border-l-2 border-ok pl-4 text-ok">{copy.sent}</p>}
        {status.kind === 'error' && (
          <p className="border-l-2 border-danger pl-4 text-danger">
            {status.message}{' '}
            <a className="link" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? copy.sending : copy.send}
        </button>
        <p className="text-small text-muted">{copy.privacy}</p>
      </div>
    </form>
  );
}
