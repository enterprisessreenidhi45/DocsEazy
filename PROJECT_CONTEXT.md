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

- Phone `+91 93437 94351`, email `info@docseazy.com`, address Mahakavi Vemana Rd, Koramangala 3 Block, BDA Complex, Bengaluru 560034. Open 7 days, 9am–8pm.
- WhatsApp number currently assumed same as phone — **unconfirmed with owner**.
- Stats (20,000+ clients, 25+ team, 20+ services), "why choose us" reasons, process steps and testimonials are carried over from the current site (unsupported claims like "lowest price" dropped) — all flagged `TODO(owner)` for reconfirmation.
- 14 services live in `src/data/services.ts`.

## Site structure

- `src/app/(site)/` route group = public pages (home, `about-us`, `contact`), chrome (`Header`/`Footer`/`MobileActionBar`) lives in `(site)/layout.tsx`. Root `src/app/layout.tsx` is bare (html/body/fonts only).
- `src/app/admin/` sits **outside** `(site)` — no public chrome, admin-only area.
- `not-found.tsx` stays at root and renders its own chrome.
- One shared divider component, `SectionDivider.tsx` (layered-wave SVG, `from`/`to`/`rotate` props) — every section seam on every page uses it, uniformly rotated. (Several earlier divider styles — wave, diagonal, torn-paper — were tried and deleted; don't reintroduce without reason.)
- Design palette: **navy / amber / paper** on the public site. Teal is reserved for the admin area only.

## Build order / status

1. ✅ Home — done.
2. ✅ About (`/about-us/`) — done, except the founder's real name is still a placeholder (`"[Founder's name]"` in `src/data/about.ts`) — **blocking launch of that section**.
3. ✅ Contact (`/contact/`) — hero contact card, map embed, enquiry form (`EnquiryForm.tsx`).
4. ⬜ Services index + 14 service pages (from `src/data/services.ts`) — **not yet built**.
5. ⬜ Privacy page — not yet built.
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

## Open questions for the client

- WhatsApp number same as the phone number? (assumed yes, unconfirmed)
- Keep both brand names ("DocsEazy" + "Sreenidhi Enterprise/s")?
- Who creates the Appwrite account / owns that relationship?
- Meta Business account + a spare alerts number for WhatsApp template messages, or launch notifications on email/Telegram only first (template approval can take days — start early if wanted)?
- One alert recipient or several?
- Who controls the domain/DNS (possibly the old agency, Web Rankey)?
- Confirm: founder's real name, `about.ts` mission/vision wording, the stats/reasons/testimonials carried over from the old site, map pin accuracy on Contact.

## Known constraints / gotchas worth remembering

- Static export ⇒ no API routes, no server actions, no `next.config` redirects. Old-URL redirects (`/faq/` → `/#faq`, `/appointments/` → `/contact/`) go in `public/_redirects` (Cloudflare defaults to 302 — force 301).
- Year/years-in-business must be computed client-side via `LiveYear` — a static build freezes build-time dates.
- `globals.css` has an **unlayered** `:focus-visible` outline rule that beats Tailwind's layered `focus:outline-none` — relevant if touching focus styles anywhere.
- Python is not installed in this environment; use Node for any scripting/verification.

## Where to look for more detail

Session-level build history (why decisions were made, what was tried and reverted) is kept in this assistant's memory, not in the repo:
- `docseazy-revamp-status` — deadline, hosting/URL decisions, build order, open client questions.
- `docseazy-admin` — admin login/dashboard build log, the demo-auth exception and its removal conditions.
