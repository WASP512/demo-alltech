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
  defaultService?: string;
  turnstileSiteKey?: string;
}

const inputStyles =
  'w-full rounded-md px-3.5 py-2.5 transition-colors ' +
  'placeholder:text-[color:var(--color-text-tertiary)] ' +
  'focus:outline-none focus:ring-2';

const inputInlineStyle: React.CSSProperties = {
  background: 'var(--color-surface-0)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-line-soft)',
};

const labelInlineStyle: React.CSSProperties = {
  color: 'var(--color-text-secondary)',
};

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
      <div className="text-center py-8">
        <div
          className="inline-flex w-12 h-12 rounded-full items-center justify-center mb-4"
          style={{ background: 'var(--color-amber-glow)', color: 'var(--color-amber-300)' }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Thanks — we got it.
        </h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          An engineer will reach out within one business day. For anything urgent,
          call us at{' '}
          <a href="tel:+14355573232" className="font-mono" style={{ color: 'var(--color-amber-300)' }}>
            (435) 557-3232
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
        <label htmlFor="service" className="block text-sm font-medium mb-1.5" style={labelInlineStyle}>
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService ?? services[0]}
          className={inputStyles}
          style={inputInlineStyle}
        >
          {services.map((s) => (
            <option key={s} value={s} style={{ background: 'var(--color-surface-0)' }}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={labelInlineStyle}>
          Tell us more
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's broken, what you're building, or what you're trying to figure out…"
          className={inputStyles + ' resize-y'}
          style={inputInlineStyle}
        />
      </div>

      {turnstileSiteKey && (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
      )}

      {status === 'error' && (
        <div
          className="rounded-md px-4 py-3 text-sm"
          style={{
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            color: 'var(--color-signal-error)',
          }}
        >
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

      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
        We respond within one business day. For emergencies, call{' '}
        <a href="tel:+14355573232" className="font-mono" style={{ color: 'var(--color-amber-300)' }}>
          (435) 557-3232
        </a>.
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
      <label htmlFor={name} className="block text-sm font-medium mb-1.5" style={labelInlineStyle}>
        {label}
        {required && <span style={{ color: 'var(--color-signal-error)', marginLeft: '2px' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={inputStyles}
        style={inputInlineStyle}
      />
    </div>
  );
}
