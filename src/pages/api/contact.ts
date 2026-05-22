import type { APIRoute } from 'astro';

/**
 * Opt out of prerendering — this needs to run server-side on Cloudflare.
 */
export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  company_website?: string; // honeypot
  'cf-turnstile-response'?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, message: 'Invalid JSON' }, 400);
  }

  // 1. Honeypot — silent reject so bots don't retry
  if (data.company_website) {
    return json({ ok: true });
  }

  // 2. Required fields
  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    return json({ ok: false, message: 'Name, email, and message are required.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  // 3. Turnstile verification (only if secret is configured)
  // @ts-expect-error - env is provided by the Cloudflare runtime via Astro adapter
  const env = locals.runtime?.env ?? {};
  if (env.TURNSTILE_SECRET) {
    const token = data['cf-turnstile-response'];
    if (!token) return json({ ok: false, message: 'Captcha missing.' }, 400);
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token }),
    });
    const verify = (await verifyRes.json()) as { success: boolean };
    if (!verify.success) {
      return json({ ok: false, message: 'Captcha failed. Please try again.' }, 400);
    }
  }

  // 4. Forward — easiest path is Cloudflare Email Routing's send_email binding,
  //    or any transactional service (Resend, Postmark, SendGrid).
  //    For now we log and return success. Replace this block with your sender of choice.
  const subject = `[Web Inquiry] ${data.service || 'General'} — ${data.name}`;
  const body = [
    `Service:  ${data.service || '—'}`,
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Phone:    ${data.phone || '—'}`,
    `Company:  ${data.company || '—'}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

  console.log(`[contact] ${subject}\n${body}`);

  // === REPLACE WITH YOUR SENDER ===
  // Example with Resend:
  //
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${env.RESEND_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     from: env.CONTACT_FROM,
  //     to: env.CONTACT_FORWARD_TO,
  //     reply_to: data.email,
  //     subject,
  //     text: body,
  //   }),
  // });

  return json({ ok: true });
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
