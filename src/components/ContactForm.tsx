import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const services = [
  'General inquiry',
  'Managed IT',
  'Cybersecurity',
  'Cloudflare Zero Trust',
  'Network design / UniFi',
  'VoIP',
  'Microsoft 365 / Cloud',
];

interface Props {
  /** Optional preselect from `?service=` query param */
  defaultService?: string;
  /** Turnstile site key from PUBLIC_TURNSTILE_SITE_KEY env */
  turnstileSiteKey?: string;
}

export default function ContactForm({ defaultService, turnstileSiteKey }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Submission failed');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card text-center py-12">
        <div className="inline-flex w-12 h-12 rounded-full bg-accent-100 text-accent-600 items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2">Thanks — we got it.</h3>
        <p className="text-ink-600">
          An engineer will reach out within one business day. For anything urgent,
          call us at <a href="tel:+14355573232" className="text-accent-500 font-mono">(435) 557-3232</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — bots fill it, humans don't see it */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-ink-700 mb-1.5">
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService ?? services[0]}
          className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-ink-800
                     focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200"
        >
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-1.5">
          Tell us more
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's broken, what you're building, or what you're trying to figure out…"
          className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-ink-800
                     focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200 resize-y"
        />
      </div>

      {turnstileSiteKey && (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
      )}

      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
          {errorMsg || 'Something went wrong. Please try again or call us directly.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        {status !== 'submitting' && <span aria-hidden="true">→</span>}
      </button>

      <p className="text-xs text-ink-500">
        We respond within one business day. For emergencies, call{' '}
        <a href="tel:+14355573232" className="font-mono text-accent-500">(435) 557-3232</a>.
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

function Field({ label, name, type = 'text', required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-ink-800
                   focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200"
      />
    </div>
  );
}
