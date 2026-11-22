# DocsEazy — Project Context

## What this is

Rebuild of docseazy.com for **Sreenidhi Enterprises** (trading as "DocsEazy"), a document/paperwork agency in Koramangala, Bengaluru, founded 1997. Next.js **static export** (`output: "export"`), leads-only site: no payments, booking, blog, CMS or content admin — nobody will update content after launch, so copy accuracy matters (legal/government paperwork).

- Deadline: **14 Nov 2026** (assumed from "14", unconfirmed with client). Work started 31 Oct 2026.
- Hosting: **Cloudflare Pages**, not Vercel (Vercel Hobby is non-commercial-only; a paid build counts as commercial). Cloudflare's free-tier commercial terms weren't separately checked.
- Legal name "Sreenidhi Enterprises" kept alongside the DocsEazy brand (old site also shows "Sreenidhi Enterprise").

## Stack

- Next.js ^16.4.3 (App Router), React 19, TypeScript 5.9, Tailwind 4 (`@tailwindcss/postcss`), lucide-react icons.
- **This Next.js version has breaking changes vs. training-data Next.js** — see `AGENTS.md` at repo root; consult `node_modules/next/dist/docs/` before writing framework code.
- `npm run dev` → port 4000. `npm run build` → static export to `out/`. `npm run preview` → serves `out/` via `serve`.

## Business facts (single source of truth: `src/data/site.ts`)

- Phone `+91 93437 94351`, email `info@docseazy.com`, address Shop Number 58, Mahakavi Vemana Rd, Koramangala 3 Block, BDA Complex, Bengaluru 560034. Open 7 days, 9am–8pm.
- WhatsApp number currently assumed same as phone — **unconfirmed with owner**.
- Stats (20,000+ clients, 25+ team, 20+ services), "why choose us" reasons, process steps and testimonials are carried over from the current site (unsupported claims like "lowest price" dropped) — all flagged `TODO(owner)` for reconfirmation.
- 14 services live in `src/data/services.ts` (Driving Licence dropped; E-Stamp Paper added; the "Change of Name" card is now named "Gazette Notification", slug kept as `change-of-name`).

## Site structure

- `src/app/(site)/` route group = public pages (home, `about-us`, `contact`), chrome (`Header`/`Footer`/`MobileActionBar`) lives in `(site)/layout.tsx`. Root `src/app/layout.tsx` is bare (html/body/fonts only).
- `src/app/admin/` sits **outside** `(site)` — no public chrome, admin-only area.
- `not-found.tsx` stays at root and renders its own chrome.
- One shared divider component, `SectionDivider.tsx` (layered-wave SVG, `from`/`to`/`rotate` props) — every section seam on every page uses it, uniformly rotated. (Several earlier divider styles — wave, diagonal, torn-paper — were tried and deleted; don't reintroduce without reason.)
- Design palette: **navy / amber / paper** on the public site. Teal is reserved for the admin area only.

## Build order / status

1. ✅ Home — done.
2. ✅ About (`/about-us/`) — done; founder name confirmed as B D Krishna in `src/data/about.ts`.
3. ✅ Contact (`/contact/`) — hero contact card, map embed, enquiry form (`EnquiryForm.tsx`).
4. 🔶 Services index (`/services/`) — done: every service as a card with an anchor (`id` = slug) and a "Contact us for this document" link to `/contact/#enquiry`. Individual service pages are **not built**: `serviceHref()` points at `/services/#<slug>`, and `public/_redirects` sends the old site's six service URLs to those anchors. If service pages are built later, change `serviceHref()` back and drop those six redirects.
5. ✅ Privacy notice (`/privacy/`) — DPDP Act 2023 notice, copy in `src/data/privacy.ts`, linked from the footer and from the enquiry form's note. Every statement matches how the site works today (no cookies/analytics, self-hosted fonts, Appwrite in Singapore, WhatsApp hand-off, Google Maps embed) — if any of that changes, update `privacy.ts` in the same change. `TODO(owner)`: legal review, retention wording, named contact person.
6. ⬜ Appwrite backend + notifications — not yet wired.
7. 🔶 Admin area — login + dashboard UI built with a **temporary demo auth** (see below); real backend not wired.

## Admin area (`src/app/admin/`)

- Login (`AdminLogin.tsx`) is a real client-side form, but **real auth isn't wired yet**. The static export has no server, so auth must run client-side — the planned backend is **Appwrite Auth** (`account.createEmailPasswordSession`).
- The only thing to change when the backend lands: the `signIn()` function in `AdminLogin.tsx` (marked `TODO(backend)`) plus the post-success redirect.
- **Hard rule: never fake auth by comparing a password in client code** — the bundle ships to every visitor, so that's zero security on a real business's admin area.
- **Current exception, explicit and temporary**: owner asked for a demo login to preview the dashboard before Appwrite exists. `src/components/adminDemoSession.ts` holds hardcoded demo creds (`admin@docseazy.com` / `demo1234`) + a `localStorage` session flag, clearly labelled as not real auth. `AdminLogin.tsx` checks these first, falls through to the honest `signIn()` stub otherwise. A visible amber "Demo preview" banner states the creds in plain text.
  - **Must be removed before real launch**: either wire real `signIn()` and delete `adminDemoSession.ts` + the demo branch, or keep `/admin/` unreachable on the public deploy until that's done.
- Dashboard (`AdminDashboard.tsx`) was simplified from a generic SaaS look (stat cards/charts/sidebar) down to a single `EnquiriesTable`: Sr No / Name / Contact / Service / Details / Status, with working search, status-filter pills, pagination, and a per-row status `<select>` (New / In Progress / Completed) — all local `useState`, nothing persists yet. Sidebar was removed entirely; `Topbar` now just holds the logo + bell/avatar menu.
- Still blocked on: the Appwrite project existing (who creates it is an open client question), deciding where enquiries get stored (the enquiry form currently only opens WhatsApp — it doesn't persist anything), then replacing the table's sample rows with live reads.

## Appwrite Free-plan pausing (important operational risk)

- Appwrite Free projects are **paused after 7 days with no development activity in the Console**; Appwrite staff say API calls, SDK use and visitor traffic do **not** count (and the logic isn't published). Paused Free projects are **deleted after 90 days**. Only the Pro plan (~$25/month) is guaranteed never to pause. The owner chose to stay on Free.
- While paused the public site (Netlify) stays up, but enquiries aren't saved and admin login fails. `EnquiryForm.tsx` handles this: `submitEnquiry()` returns `{ saved, message }`, and when `saved` is false the thank-you view shows an amber notice plus a `WhatsAppButton` carrying the enquiry text, so a lead is never lost silently (a popup opened after an `await` can be blocked, a real link can't).
- **Owner routine:** make a real change in the Appwrite Console at least weekly, and restore the project from the Console if it's paused. Never let it sit paused for 90 days.
- **Experiment:** `.github/workflows/heartbeat.yml` adds a row to the `heartbeat` table (create-only for anyone, no read access, no secrets) every 3 days. Unproven (it's an API write), so it does not replace the weekly routine. GitHub disables scheduled workflows after 60 days of no repo activity. The third-party `appwrite-keepalive` tool was rejected: its own issue tracker says it no longer works, and it needs a project-wide API key that could read the enquiries table.

## Open questions for the client

- WhatsApp number same as the phone number? (assumed yes, unconfirmed)
- Keep both brand names ("DocsEazy" + "Sreenidhi Enterprise/s")?
- Who creates the Appwrite account / owns that relationship?
- Meta Business account + a spare alerts number for WhatsApp template messages, or launch notifications on email/Telegram only first (template approval can take days — start early if wanted)?
- One alert recipient or several?
- Who controls the domain/DNS (possibly the old agency, Web Rankey)?
- Confirm: `about.ts` mission/vision wording, the stats/reasons/testimonials carried over from the old site, map pin accuracy on Contact.

## Known constraints / gotchas worth remembering

- Static export ⇒ no API routes, no server actions, no `next.config` redirects. Old-URL redirects (`/faq/` → `/#faq`, `/appointments/` → `/contact/`) go in `public/_redirects` (Cloudflare defaults to 302 — force 301).
- Year/years-in-business must be computed client-side via `LiveYear` — a static build freezes build-time dates.
- `globals.css` has an **unlayered** `:focus-visible` outline rule that beats Tailwind's layered `focus:outline-none` — relevant if touching focus styles anywhere.
- Python is not installed in this environment; use Node for any scripting/verification.
- `npm run build` runs `postbuild` → `scripts/fix-export-prefetch.mjs`, working around a Next.js 16.4 static-export bug (segment prefetch files written as `__next.X/__PAGE__.txt` but requested as `__next.X.__PAGE__.txt`). It skips existing files, so it's harmless once Next fixes it.
- Mobile action-bar clearance lives on the footer (`pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0`), not on `<main>` — on `<main>` it opened a strip of page background between the last divider and the footer. `SectionDivider` hides its two translucent layers below `sm` (they collapse into a grey stripe at 40px tall).

## Where to look for more detail

Session-level build history (why decisions were made, what was tried and reverted) is kept in this assistant's memory, not in the repo:
- `docseazy-revamp-status` — deadline, hosting/URL decisions, build order, open client questions.
- `docseazy-admin` — admin login/dashboard build log, the demo-auth exception and its removal conditions.
