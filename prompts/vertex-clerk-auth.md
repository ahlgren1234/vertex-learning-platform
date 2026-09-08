# Implementation prompt — Clerk authentication

## Goal

Add Clerk authentication to the Vertex web app using the Clerk CLI. Keep all
browsing public and only wire the plumbing (provider, proxy/middleware, env,
visible auth controls). No routes are protected in this pass — that comes with
the features that mark themselves private (AGENTS.md §7).

## Skills / docs read

- `AGENTS.md` — §1, §2 (work loop), §3 (match the design exactly, reuse existing
  components), §5 (server/client boundaries, Clerk via Next.js middleware, secret
  key server-only), §7 (Clerk decision: browsing public, gate only protected
  features, per-user state keys off the Clerk user id), §12 (env hygiene,
  `.env.example` is canonical), §13 (checks).
- `.claude` Clerk setup command ("Add Clerk Authentication") — CLI flow:
  install/update CLI → `clerk auth login` → `clerk init --app <id>` → verify
  Next.js proxy matcher → `clerk doctor` → visible sign-in/up/user controls.
- `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` and
  `.../03-api-reference/03-file-conventions/proxy.md` — **Next.js 16 renames
  Middleware to Proxy**: file is `proxy.ts` at project root, export a function
  named `proxy` (or default). `middleware.ts` still works but is deprecated.
  Proxy defaults to the Node.js runtime. Matcher must exclude static assets.

## Code inspected

- `package.json` — single Next.js app at repo root, `next@16.3.4`, `react@19.2.8`.
  Scripts: `dev`, `build`, `start`, `lint` (`eslint`). No `typecheck` script; use
  `npx tsc --noEmit` (`tsconfig.json` present, `strict`).
- Repo layout is a single web workspace at root (`app/`, `components/`, `lib/`).
  The separate Sanity Studio workspace from AGENTS.md §5 does not exist yet, so
  Clerk goes in this root app.
- `app/layout.tsx` — `RootLayout` renders `<html>` then `<body className="min-h-full">{children}</body>`.
  `ClerkProvider` must wrap `{children}` **inside** `<body>`.
- `components/ui/site-header.tsx` — server component. Has a placeholder account
  avatar (`<span aria-label="Your account">` with a `size-9` circle,
  `ring-1 ring-neutral-300`) and a comment: "The avatar is a placeholder until
  Clerk is wired." Notifications bell stays presentational (AGENTS.md §7). This
  is the single place auth controls belong. Used once in `app/page.tsx`.
- `components/ui/button.tsx` — `Button` primitive: variants `primary` /
  `secondary` / `tertiary` / `text`, sizes `lg` / `md` (both `h-11`), radius 12px.
- `app/globals.css` — Tailwind v4 `@theme` tokens: `--color-primary-500 #f97316`,
  neutrals, `--color-surface #ffffff`, `--color-canvas #faf7f4`, radii. Used to
  theme Clerk's `appearance` so it matches the chrome.
- `.gitignore` — ignores `.env*` with the comment "can opt-in for committing if
  needed". Need a `!.env.example` negation to commit the canonical list.
- No `components.json` — shadcn step in the Clerk command does not apply.

## Decisions and assumptions

1. **CLI-driven install.** `clerk` is not on PATH → install globally with npm
   (`npm install -g clerk`), the project's package manager (`package-lock.json`).
   Then `clerk auth login` (opens a browser; the user completes it), then
   `clerk init --app app_3J2OtrbSfoOu4EKfsRpapyLs8gA` from the repo root so it
   links to the correct Clerk app and auto-detects Next.js + npm.
2. **Let `clerk init` scaffold**, then review every file it writes/changes before
   committing. Expected: adds `@clerk/nextjs`, wraps `ClerkProvider`, creates a
   middleware/proxy file, writes keys to `.env.local` (or `.env`), maybe adds
   sign-in/up routes.
3. **Proxy, not middleware (Next 16).** Final state is `proxy.ts` at repo root
   exporting `clerkMiddleware()` from `@clerk/nextjs/server` as `proxy`
   (`export default clerkMiddleware(...)` or `export const proxy = clerkMiddleware(...)`,
   whichever the installed Clerk version documents). If `clerk init` emits
   `middleware.ts` instead, rename it to `proxy.ts` and rename the export to
   `proxy` (functionally identical per the Next docs; keeps the tree on the
   non-deprecated convention this project's AGENTS.md insists on). If Clerk's
   installed version cannot run under the `proxy.ts` name, keep `middleware.ts`
   and note it under "Needs your attention".
4. **Matcher.** Keep Clerk's default matcher and ensure it contains, in order,
   the API/TRPC entry and Clerk's auto-proxy path:
   `'/(api|trpc)(.*)'` then `'/__clerk/:path*'`, plus the standard
   "everything except `_next` and static files" catch-all. Add `'/__clerk/:path*'`
   if missing.
5. **No route protection yet.** `clerkMiddleware()` with no `auth.protect()` —
   every page stays public (AGENTS.md §7: browsing is public). Protected
   matchers are added later by the features that need them.
6. **Visible auth controls in `SiteHeader`.** Replace the placeholder `<span>`
   account avatar with Clerk components, keeping the bell untouched:
   - Signed out: a compact "Log in" control (reuse `Button` `variant="text"`)
     and a "Sign up" control (reuse `Button` `variant="primary"` but at header
     scale — `h-9 px-3 text-[14px]` override, since the header is `h-16` and the
     existing controls are `size-9`). Use Clerk `SignInButton` / `SignUpButton`
     with `mode="modal"` wrapping the `Button`s (asChild-style: render the
     `Button` as the child).
   - Signed in: `<UserButton />` with `appearance={{ elements: { avatarBox: "size-9 ring-1 ring-neutral-300" } }}`
     so it fills the same 36px circle the placeholder used.
   - Use `<SignedIn>` / `<SignedOut>` from `@clerk/nextjs` (or `<Show when=...>`
     if that is what the installed version exposes — check the package). These
     render fine from the server component; no `"use client"` needed on
     `SiteHeader` unless the installed API requires it, in which case add it.
   - There is **no signed-out reference design**, so keep it minimal and visually
     consistent with the existing chrome; do not restyle the header (AGENTS.md §3).
7. **`ClerkProvider`** wraps `{children}` inside `<body>` in `app/layout.tsx`
   (never around `<html>`). If `clerk init` already did this, leave it.
8. **`appearance` theming.** Pass `ClerkProvider` an `appearance` with
   `variables: { colorPrimary: "#f97316", borderRadius: "12px" }` to line the
   modal/user-button up with the design tokens. Keep it light — no full theme.
9. **Env.** `clerk init` writes `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and
   `CLERK_SECRET_KEY` to `.env.local`. Do not read or print that file. Create a
   committed `.env.example` listing every key by name with empty/placeholder
   values (canonical list per AGENTS.md §12) and add `!.env.example` to
   `.gitignore`. Never prefix the secret key with `NEXT_PUBLIC_`.
10. **Attribution / commit.** Do not commit unless the user asks. If asked, keep
    the Next.js-managed agent-rules block in `AGENTS.md` in the same commit if it
    reappears (per the AGENTS.md note), and use the required trailer.

## Files expected to touch

- `package.json` / `package-lock.json` — `@clerk/nextjs` dependency (via `clerk init`).
- `app/layout.tsx` — wrap children in `<ClerkProvider>` (inside `<body>`) with
  light `appearance`.
- `proxy.ts` (new, repo root) — `clerkMiddleware()` + matcher. (Or `middleware.ts`
  if `clerk init` creates it and it cannot be renamed — see decision 3.)
- `components/ui/site-header.tsx` — swap placeholder avatar for
  `SignedIn`/`SignedOut` + `UserButton` + `SignInButton`/`SignUpButton`.
- `.env.local` (new, git-ignored, written by `clerk init`) — real keys.
- `.env.example` (new, committed) — canonical key list.
- `.gitignore` — add `!.env.example`.
- Possibly `app/sign-in/[[...sign-in]]/page.tsx` and
  `app/sign-up/[[...sign-up]]/page.tsx` if `clerk init` scaffolds them; keep only
  if it does and they build.

## Requirements

- App builds and type-checks with Clerk installed.
- Home page still renders for a signed-out visitor (public browsing).
- Header shows Log in / Sign up when signed out and a `UserButton` when signed
  in, styled consistently with the existing header.
- Secret key never reaches the client bundle; only the publishable key is
  `NEXT_PUBLIC_`.
- `proxy.ts` matcher runs on app routes + `/(api|trpc)(.*)` + `/__clerk/:path*`
  and skips `_next` and static assets.
- `.env.example` committed and complete; `.env.local` not committed.

## Security considerations

- `CLERK_SECRET_KEY` is server-only (AGENTS.md §5, §12). Verify it is not
  imported into any client component and not `NEXT_PUBLIC_`.
- Do not read back or echo `.env.local` / `.env` contents (Clerk command rule).
- Proxy matcher must not accidentally gate static assets or `_next`.
- Route protection is deliberately omitted now; note that private features must
  add their own `auth.protect()` matchers later (AGENTS.md §7).
- No secrets in the prompt file, commits, or terminal output.

## Acceptance criteria

1. `npx tsc --noEmit` passes.
2. `npm run lint` passes.
3. `npm run build` succeeds (routes/config/server changed — `proxy.ts` added).
4. `npm run dev`: home page loads signed-out; header shows Log in / Sign up.
5. Completing sign-up in the modal returns to the app with a `UserButton` (avatar)
   in the header; refreshing keeps the session.
6. `clerk doctor` reports no blocking issues (or the remaining items are listed
   for the user).
7. `git grep -n "CLERK_SECRET_KEY"` shows it only in server/config contexts and
   `.env.example`, never in a `"use client"` file.

## Checks to run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev` + manual test below
- `clerk doctor`

## Manual test steps

1. `npm run dev`, open `http://localhost:3000`.
2. Confirm the home page renders fully while signed out (no redirect, no error).
3. In the header, confirm "Log in" and "Sign up" controls appear where the
   placeholder avatar was; the bell is unchanged.
4. Click "Sign up", complete the Clerk modal with a test account.
5. Back on the site, confirm the header now shows the `UserButton` avatar in the
   same 36px circle; open it and confirm "Sign out" works.
6. Sign in again via "Log in"; confirm the modal flow and that a page refresh
   keeps you signed in.
7. Confirm `.env.local` exists with both keys and is git-ignored; `.env.example`
   is committed with the key names and no real values.
