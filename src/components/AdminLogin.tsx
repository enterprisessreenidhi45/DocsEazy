"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, House, LoaderCircle, Lock, LogIn, Mail, Scale, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { account } from "@/lib/appwrite";
import { Logo } from "./Logo";
import { Typewriter } from "./Typewriter";

const offerWords = services.map((service) => service.name);

// The owner's (second) wave SVG: two layered domes — a taller, half-opacity one behind a
// shorter, solid one in front, the same layered-depth technique as the site's horizontal
// dividers. Traced and verified (its control points, which bound a cubic Bézier's true
// extent): x stays within [0,1000] and y within [0,100] for both layers — no overshoot this
// time, unlike the first SVG, so no padding/clipping concerns.
//
// Rotated 90° via the same exact affine transform as before (the <g transform>: original
// (x,y) -> (100-y, x)). Both layers share the same long flat top edge ("H0" in the path),
// which becomes a dead-straight vertical line at viewBox x=100 after rotation — same role as
// in the first SVG: it's meant to sit flush at a section's own boundary, not float loose.
//
// With viewBox="0 0 100 1000" (no overshoot, so no left/right padding needed) and the flip
// (`-scale-x-100`, so the wave bulges OUT into the paper side, matching the look chosen for
// the first SVG) the anchor point (x=100) lands at local offset 0 after flipping — so the svg
// can sit flush at `left-0` with no extra offset to compute, unlike the first SVG.
const SPLITTER_PATH_BACK =
  "M0 0v100c250 0 375-24 500-48 125 24 250 48 500 48V0H0Z";
const SPLITTER_PATH_FRONT =
  "M0 0v4c250 0 375 24 500 48C625 28 750 4 1000 4V0H0Z";

// A vertical "page splitter" between the two login panels, built from the same technique as
// the site's horizontal section dividers, rotated 90°.
function VerticalSplitter() {
  return (
    <div aria-hidden="true" className="relative hidden w-14 shrink-0 lg:block">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 h-full w-28 -scale-x-100"
      >
        <defs>
          {/* userSpaceOnUse with coordinates in the PATH's own (pre-rotation) space: its x-axis
              becomes the final vertical axis after the g's rotate(90), so varying the gradient
              along x here (0 to 1000) is what ends up reading top-to-bottom on screen. This is
              the exact same function as the teal panel's own `bg-linear-to-b` gradient (not
              just visually close), so the two match at every height with no seam. */}
          <linearGradient id="admin-splitter-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--color-teal-light)" }} />
            <stop offset="50%" style={{ stopColor: "var(--color-teal)" }} />
            <stop offset="100%" style={{ stopColor: "var(--color-teal-deep)" }} />
          </linearGradient>
        </defs>
        <g transform="translate(100,0) rotate(90)">
          <path d={SPLITTER_PATH_BACK} fill="url(#admin-splitter-gradient)" opacity={0.5} />
          <path d={SPLITTER_PATH_FRONT} fill="url(#admin-splitter-gradient)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Real sign-in via Appwrite Auth, which runs entirely in the browser and so works on this
 * static export. Throws with a message suitable for display on a wrong email/password.
 */
async function signIn(email: string, password: string): Promise<void> {
  try {
    await account.createEmailPasswordSession({ email, password });
  } catch {
    throw new Error("Incorrect email or password.");
  }
}

// A light, flat illustration in place of the mockup's 3D render: a document card with a
// teal check badge and a few floating service icons. Pure decoration.
function WelcomeIllustration() {
  return (
    <div className="relative mx-auto mt-10 h-48 w-full max-w-xs" aria-hidden="true">
      <div className="absolute top-4 left-1/2 w-36 -translate-x-1/2 rotate-[-6deg] rounded-xl bg-white/90 p-4 shadow-lg ring-1 ring-white/60">
        <span className="block h-2 w-16 rounded-full bg-teal/60" />
        <span className="mt-3 block h-1.5 w-full rounded-full bg-navy/15" />
        <span className="mt-2 block h-1.5 w-11/12 rounded-full bg-navy/15" />
        <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-navy/15" />
        <span className="mt-2 block h-1.5 w-5/6 rounded-full bg-navy/15" />
      </div>
      <span className="absolute top-32 left-[58%] grid size-9 place-items-center rounded-full bg-teal text-white shadow-lg">
        <ShieldCheck className="size-5" />
      </span>
      <span className="absolute top-2 left-[8%] grid size-11 place-items-center rounded-2xl bg-white/70 text-teal-deep shadow-md backdrop-blur">
        <House className="size-5" />
      </span>
      <span className="absolute top-20 right-[4%] grid size-11 place-items-center rounded-2xl bg-white/70 text-teal-deep shadow-md backdrop-blur">
        <Scale className="size-5" />
      </span>
    </div>
  );
}

type Errors = { email?: string; password?: string; form?: string };

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "signing-in">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "Enter a valid email address.";
    if (!password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(found.email ? "admin-email" : "admin-password")?.focus();
      return;
    }

    setStatus("signing-in");

    try {
      await signIn(email, password);
      window.location.assign("/admin/dashboard/");
      return;
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Could not sign in." });
      setStatus("idle");
    }
  }

  const fieldClass =
    "w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-ink placeholder:text-muted/70 focus:border-teal focus:outline-none";

  return (
    <section className="min-h-screen bg-paper lg:grid lg:grid-cols-[0.85fr_3.5rem_1.15fr]">
      {/* Left: a full-bleed half of the page in teal — not a card floating on it. Reaches the
          viewport edges and full height, so it reads as the page's own left column. Hidden on
          small screens, where only the form shows. */}
      {/* bg-linear-to-b (vertical), not a diagonal "to-br": a diagonal gradient's colour at a
          given point depends on the box's aspect ratio (it isn't a simple y/height ramp), so
          it could never exactly match the divider's own vertical gradient next to it — close
          colours, different functions, hence a faint line at the seam no matter how well the
          stop colours were tuned. A vertical gradient here is the exact same function as the
          divider's, so the two are identical at every height, not just visually close. */}
      <div className="relative hidden flex-col overflow-hidden bg-linear-to-b from-teal-light via-teal to-teal-deep p-12 text-white lg:flex">
        {/* Soft tonal shapes for texture within the teal. */}
        <span
          aria-hidden="true"
          className="absolute -top-16 -left-16 size-56 rotate-45 rounded-[3rem] bg-white/5"
        />
        <span
          aria-hidden="true"
          className="absolute right-6 bottom-8 size-32 rotate-45 rounded-[2rem] bg-white/5"
        />
        <Logo onNavy />
        <div className="flex flex-1 flex-col justify-center py-10">
          <h2 className="font-display text-4xl font-semibold">Welcome back!</h2>
          <p className="mt-3 max-w-xs text-lg text-white/90">
            Sign in to manage your document services effortlessly.
          </p>
          <p className="mt-4 font-display text-xl font-semibold text-amber-light">
            What we offer: <Typewriter words={offerWords} />
          </p>
          <WelcomeIllustration />
        </div>
      </div>

      <VerticalSplitter />

      {/* Right: the form, centred in the paper half, sharing the page colour (no panel). */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 lg:min-h-0">
        <span
          aria-hidden="true"
          className="absolute top-16 right-[10%] hidden size-16 rotate-45 rounded-xl bg-teal/15 lg:block"
        />
        <span
          aria-hidden="true"
          className="absolute right-[16%] bottom-16 hidden size-24 rotate-45 rounded-2xl bg-teal/10 lg:block"
        />
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy lg:mt-0">
              Admin sign in
            </h1>
            <p className="mt-1.5 text-muted">Sign in to manage DocsEazy enquiries.</p>

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="admin-email" className="text-sm font-semibold text-navy">
                  Email address
                </label>
                <div className="relative mt-1.5">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((c) => ({ ...c, email: undefined, form: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "admin-email-error" : undefined}
                    className={`${fieldClass} ${errors.email ? "border-red-600" : "border-line"}`}
                  />
                </div>
                {errors.email && (
                  <p id="admin-email-error" className="mt-1 text-sm text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="admin-password" className="text-sm font-semibold text-navy">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <Lock
                    className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((c) => ({ ...c, password: undefined, form: undefined }));
                    }}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "admin-password-error" : undefined}
                    className={`${fieldClass} pr-11 ${errors.password ? "border-red-600" : "border-line"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-muted hover:text-navy"
                  >
                    {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="admin-password-error" className="mt-1 text-sm text-red-700">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-muted select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="size-4 rounded border-line text-teal focus:ring-teal/40"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setErrors({
                      form: "Self-serve password reset isn't set up yet — ask the developer to reset it directly.",
                    })
                  }
                  className="text-sm font-semibold text-teal-deep hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {errors.form && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "signing-in"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-navy to-teal px-5 py-3.5 font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {status === "signing-in" ? (
                  <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                ) : (
                  <LogIn className="size-5" aria-hidden="true" />
                )}
                {status === "signing-in" ? "Signing in…" : "Sign in"}
              </button>
            </form>

          <div className="mt-6 border-t border-line pt-5 text-center">
            <Link href="/" className="text-sm font-semibold text-amber-deep hover:text-navy">
              Back to the website
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
