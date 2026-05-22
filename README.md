# AllTech website

Marketing site for AllTech — Astro + Tailwind v4 + React island, deployed to Cloudflare Pages.

## Stack

- **Astro 5** — static-first, file-based routing, zero JS by default
- **Tailwind v4** — via the Vite plugin (no `tailwind.config.js`)
- **React 18** — single hydrated island for the contact form
- **MDX** — for blog posts and case studies
- **Cloudflare Pages** — hosting + edge SSR for `/api/contact`

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
```

For local development of the contact form endpoint with the Cloudflare runtime:

```bash
npm run build
npm run preview      # runs `wrangler pages dev ./dist`
```

## Project structure

```
src/
├── components/        Shared Astro + React components
├── content/           Content collections (blog, caseStudies)
│   ├── blog/          Markdown / MDX blog posts
│   ├── caseStudies/   Markdown / MDX case studies
│   └── config.ts      Typed frontmatter schemas
├── layouts/           BaseLayout.astro wraps all pages
├── lib/site.ts        Single source of truth: NAP, services, locations
├── pages/             File-based routes
│   ├── api/contact.ts SSR endpoint (only non-static route)
│   ├── locations/     Auto-generates a page per service-area city
│   └── services/      One page per service
├── styles/global.css  Tailwind theme + component classes
public/                Static assets (favicon, robots.txt, OG image)
```

## Adding content

### A new service

1. Add it to the `services` array in `src/lib/site.ts`.
2. It will automatically appear in nav, footer, the home services grid, and get a placeholder page at `/services/<slug>` via the `[service].astro` catch-all.
3. To customize that service's page, create `src/pages/services/<slug>.astro` and add the slug to the exclusion list in `[service].astro`. Use `cloudflare-zero-trust.astro` as the template.

### A new location

Add it to `serviceArea` in `src/lib/site.ts`. The page generates automatically from `src/pages/locations/[city].astro`.

### A blog post

Drop a markdown file in `src/content/blog/`. Frontmatter requirements are in `src/content/config.ts`. Set `draft: true` to hide it from the listing.

### A case study

Drop a markdown file in `src/content/caseStudies/`.

## Deployment

Cloudflare Pages, connected to the GitHub repo. Build settings in the Pages dashboard:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output | `dist` |
| Root directory | (leave blank) |
| Node version env | `NODE_VERSION=20` |

Push to `main` → Pages builds and deploys automatically. No GitHub Actions.

### Environment variables

Set these in the Pages dashboard (Settings → Environment variables):

| Variable | Purpose |
|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key (exposed to browser) |
| `TURNSTILE_SECRET` | Turnstile secret (server-side verification) |
| `RESEND_API_KEY` | If using Resend for transactional email |
| `CONTACT_FROM` | From address (must be on a verified domain) |
| `CONTACT_FORWARD_TO` | Where contact form submissions are delivered |

## Contact form

The form posts JSON to `/api/contact.ts`, which runs as a Cloudflare Pages Function. The handler currently:

1. Honeypot check (`company_website` field)
2. Required-field validation
3. Optional Turnstile verification (active if `TURNSTILE_SECRET` is set)
4. **Logs the submission** — you must wire this up to an actual sender. See the `=== REPLACE WITH YOUR SENDER ===` block in `src/pages/api/contact.ts`. Recommended: Resend, since it integrates cleanly with Cloudflare.

## Before launch

- [ ] Replace `https://askalltech.com` in `src/lib/site.ts` and `astro.config.mjs` if domain changes
- [ ] Add the Cloudflare Web Analytics token in `BaseLayout.astro` (uncomment script tag)
- [ ] Generate `/public/og-default.png` (1200×630 brand image)
- [ ] Wire up email sender in `src/pages/api/contact.ts`
- [ ] Set environment variables in Pages dashboard
- [ ] Verify Google Business Profile NAP exactly matches `site.ts`
- [ ] Submit `sitemap-index.xml` to Google Search Console
