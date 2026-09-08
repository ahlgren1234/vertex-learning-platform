# Implementation prompt — Vertex home page

## Goal

Turn `design/vertex-home.png` into the site's home page at `/` in the `web` workspace.
The page is presentational: it renders the app header, a centered search hero, a
three-card "All Courses" preview, and a decorative closing band. No content model,
auth, analytics, or search backend is built here — those are separate tasks. Where the
page needs course data it reads a typed placeholder module that a later task will swap
for a server-side Sanity fetch.

## Skills read

- `AGENTS.md` (full) — the prompt-first loop (§2), UI reproduction rules (§3), workspace
  boundaries (§5), "pages are read-only and display stored data" (§7), and the checks (§13).
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` —
  App Router `page`/`layout`, `<Link>`, when a page stays a Server Component, GET forms
  via `searchParams`.
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` — `next/image`
  local vs remote; remote hosts need `next.config` `remotePatterns`.

No Sanity / Clerk / PostHog skills apply — this is UI composition only.

## Code inspected

- `app/page.tsx` — current placeholder ("A unified design language…" link to `/design-system`). Gets replaced.
- `app/layout.tsx` — root layout; Inter + Playfair via `next/font` exposed as
  `--font-inter`/`--font-sans` and `--font-playfair`/`--font-display`; `metadata` currently
  titled "Vertex Design System".
- `app/globals.css` — Tailwind v4 `@theme` tokens: `primary-50..600`, `neutral-50..900`,
  `success-500`, `info-500`, `canvas #faf7f4`, `surface #fff`, radius `xs..xl`,
  `shadow-sm..xl`, `font-sans`/`font-display`. Type-scale component classes
  `.text-display-1` (48/56 Playfair) … `.text-small`, plus `.eyebrow` (12px bold uppercase,
  0.14em tracking, neutral-700).
- `components/ui/*` + `components/ui/index.ts` barrel — `Logo`, `Navbar` (bordered card,
  used by `/design-system` §13), `Button` (primary/secondary/tertiary/text, `lg`/`md`,
  `iconLeft`/`iconRight`), `Icon` (24-grid, outline + partial filled sets; names include
  `bell`, `search`, `user`, `chevron-right`, `clock`, `bar-chart`, `folder`, `file`),
  `Badge`, `Input`/`SearchInput`/`Kbd` (44px field, `⌘ K` hint), `Select`, `CourseCard`
  (icon inline-left, Inter `text-heading-3` title, meta row: bar-chart/clock/folder),
  `LessonCard`, `ResourceCard`, `ProgressBar`, `StatusIndicator`, `Breadcrumbs`,
  `Pagination`.
- `app/design-system/page.tsx` — living documentation of `design/vertex-designsystem.png`;
  renders `Navbar` and `CourseCard` (inline-icon layout). Any shared-component edit must
  keep this page matching its reference.
- `lib/cn.ts` — dependency-free class joiner (no class-merge; avoid conflicting utilities).
- `package.json` — Next 16.3.4, React 19.2, Tailwind v4, TS 5. No UI/icon libs.

## Reference read (`design/vertex-home.png`)

Top to bottom, on the `canvas` ground:

1. **Header** — not a card. `Logo` (mark + "Vertex") at left, then nav links "Courses" and
   "My Learning" (neutral-900, ~14px medium) grouped next to the logo. Far right: outline
   bell button, then a ~36px circular avatar. Full-width hairline (`neutral-200`) along the
   bottom; inner content constrained to the page container.
2. **Hero** — centered, ~640px max width:
   - Eyebrow pill: `INTELLIGENT LEARNING`, 12px bold uppercase wide tracking, `primary-500`
     text, inside a `rounded-full` `neutral-200` border, white fill, small padding.
   - `h1` in Playfair (`font-display`), bold, ~`-0.02em`, `neutral-900`, ~1.1 line-height,
     "Search your learning in plain English." — ~40px mobile → ~56px desktop (a deliberate
     step above the token `display-1` 48px because the reference is larger; documented here).
   - Sub-copy: ~16–18px `neutral-500`, two lines, ~520px max: "Vertex understands what you
     want to learn and finds the exact lessons across all your courses."
   - `Button` `variant="primary" size="lg"` "Explore Courses" with a right-arrow icon,
     linking to `/courses`.
   - Large search field (~64px tall, `rounded-[16px]`, `neutral-200` border, `surface` fill,
     `shadow-sm`): leading `search` icon (`neutral-400`), placeholder "Ask anything about
     your learning…", trailing `⌘ K` in a bordered key cap.
3. Full-width hairline divider.
4. **All Courses** — inside the container:
   - Row: `h2` "All Courses" in Playfair (~`display-2`, 32–36px) at left; "View all courses"
     link + right-arrow (`primary-500`, 14px semibold) at right.
   - Three course cards, `gap` 24px: **stacked** layout — a ~56px `rounded-[12px]` brand tile
     on its own line, then a Playfair title, then 2–3 lines of `neutral-500` description, a
     flexible spacer, a top hairline, then a meta row (bar-chart + level · clock + duration ·
     file + "N modules", ~12px `neutral-500`). Cards: `Next.js for Production` (black tile,
     white "N"), `Docker Essentials` (pale-blue tile, Docker whale), `TypeScript Deep Dive`
     (`#3178c6` tile, white "TS").
5. **Closing band** — centered line: small outline `star` (primary) + "New courses and
   lessons added every week." (`neutral-500`, ~14px). Below it, a full-bleed decorative
   "equalizer" of orange vertical bars of varying heights, gradient-fading to transparent
   at the bottom. Purely decorative. No footer.

## Decisions and assumptions

- **`app/page.tsx` becomes a Server Component.** Only the search field needs interactivity,
  so it is isolated in a small Client Component.
- **New `components/ui/site-header.tsx`** — the real app chrome (logo + nav links + bell +
  avatar + bottom border) used by the home page and, later, the other top-level pages.
  `Navbar` is left untouched so `/design-system` §13 still matches its reference. Nav links:
  Courses → `/courses`, My Learning → `/my-learning` (routes not built yet; links are the
  correct targets). Bell is a presentational `<button>` (per §7). Avatar is a placeholder —
  a `neutral-200` circle with a `user` glyph — until Clerk is wired (flagged below).
- **New `components/ui/home-search.tsx`** (`"use client"`) — renders a `<form method="get"
  action="/search">` wrapping a single `name="q"` text input styled with the existing tokens
  (composes `Icon` + `Kbd`, not `Input`, because the field is taller than the 44px design
  system field and `cn()` does not resolve conflicting `h-*` utilities). Pressing ⌘K / Ctrl+K
  focuses the input; submit navigates to `/search?q=…` via native GET (degrades without JS;
  `/search` 404s until that task lands). No client fetch, no token.
- **`components/ui/card.tsx` — extend `CourseCard`, backward-compatible:**
  - `layout?: "inline" | "stacked"` (default `"inline"` — current markup byte-for-byte).
  - `iconClassName?: string` — overrides the default `bg-neutral-900 text-white` tile.
  - `"stacked"`: tile on its own row, title in `font-display` (serif) ~20px, and the meta row
    gets a `border-t border-neutral-100 pt-4` separator. `"inline"` keeps no separator so
    `/design-system` is visually unchanged.
- **`components/ui/icon.tsx` — additive only:** add `"arrow-right"` (`M5 12h14` + `m13 6 6 6-6 6`)
  and `"star"` to `IconName` and the `OUTLINE` map. No existing icon changes; `/design-system`
  icon rows iterate a fixed list and are unaffected.
- **New `lib/placeholder-content.ts`** — exports `featuredCourses` (typed array: `title`,
  `description`, `level`, `duration`, `modules`, `brand` key) and the hero strings. This is
  the seam a later task replaces with a server-side Sanity query. Clearly commented as
  placeholder.
- **Brand tiles** are small inline SVG/monogram marks inside the page (not design-system
  primitives): "N" monogram, a simplified Docker whale path, "TS" monogram. Approximate the
  reference; exact vendor artwork is not required for placeholder data.
- **Decorative equalizer** — a fixed array of bar heights rendered as gradient `<div>`s in a
  full-width `overflow-hidden` wrapper with a bottom fade (mask/gradient), `aria-hidden`.
- **`app/layout.tsx`** — update `metadata.title` to `"Vertex — Search your learning in plain
  English"` and `description` to the hero sub-copy. Fonts/structure untouched.
- **Container** — `mx-auto max-w-6xl px-6` for header and All Courses; hero content
  `max-w-2xl` centered inside a full-width section; closing equalizer is full-bleed.
- Responsive (no mobile reference, per §3): header keeps both short links visible, padding
  tightens; hero type scales down, button + search go full-width within the column; cards
  `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; the "All Courses" header row stacks under
  `sm`; equalizer clips. Desktop matches the reference.

## Files touched

- `prompts/vertex-home.md` — this file.
- `app/page.tsx` — rewritten: `SiteHeader`, hero section, All Courses section, closing band.
- `app/layout.tsx` — `metadata` title/description only.
- `components/ui/site-header.tsx` — new.
- `components/ui/home-search.tsx` — new (`"use client"`).
- `components/ui/card.tsx` — `CourseCard` gains `layout` + `iconClassName`; `stacked` branch.
- `components/ui/icon.tsx` — add `arrow-right`, `star`.
- `components/ui/index.ts` — export `SiteHeader`, `HomeSearch` (+ their prop types).
- `lib/placeholder-content.ts` — new typed placeholder data + hero copy.

## Requirements

- Layout, spacing, type, color, and states match `design/vertex-home.png` at desktop width;
  the page is responsive to ~375px with no horizontal page scroll.
- Only design-system tokens/classes and existing components are used for styling; no new
  dependencies; no conflicting Tailwind utilities passed through `cn()`.
- `CourseCard` default (`inline`) rendering is unchanged; `/design-system` still matches
  `design/vertex-designsystem.png`.
- Heading order: one `h1` (hero), `h2` ("All Courses"), `h3` (card titles).
- Bell, avatar, and the equalizer are non-interactive/decorative and labelled or
  `aria-hidden` as appropriate; the search field has an accessible name.
- No secrets, tokens, network calls, or `searchParams`-driven data fetching are introduced.

## Security considerations

- Presentational page: no Clerk, no Sanity client, no tokens, no PostHog, no route handlers.
- `home-search` performs a native GET navigation to `/search` only — no fetch, no
  credentials, no user data persisted. Query text is carried as a standard URL param.
- No `dangerouslySetInnerHTML`; no remote images added, so `next.config` stays unchanged.

## Acceptance criteria

- `/` renders header, hero (eyebrow, h1, sub-copy, Explore Courses button, search field),
  All Courses (h2 + "View all courses" + three stacked course cards with brand tiles and
  meta rows), and the closing star line + equalizer — matching the reference.
- ⌘K / Ctrl+K focuses the search field; submitting navigates to `/search?q=<text>`.
- `npx tsc --noEmit` clean for project source.
- `npx eslint app components lib` clean.
- `npx next build` succeeds; `/` is prerendered static (`○`).
- `/design-system` unchanged against its reference.

## Checks to run

- `npx tsc --noEmit`
- `npx eslint app components lib`
- `npx next build`
- `npm run dev` — visual diff of `/` against `design/vertex-home.png`, and a regression
  glance at `/design-system`.

## Manual test steps

1. `npm run dev`; open `http://localhost:3000/`.
2. Header: logo + "Courses" + "My Learning" at left, bell + avatar at right, hairline under
   it. "Courses" → `/courses`, "My Learning" → `/my-learning`.
3. Hero: "INTELLIGENT LEARNING" pill, serif h1 on ~two lines, grey sub-copy, orange
   "Explore Courses" button with arrow → `/courses`.
4. Search: click the field, type "server components", press Enter → URL becomes
   `/search?q=server+components` (page 404s until search is built — expected). Reload, press
   ⌘K (macOS) / Ctrl+K — field focuses.
5. All Courses: "All Courses" serif heading left, "View all courses →" right → `/courses`.
   Three cards: brand tile on its own line, serif title, description, divider, meta row
   (level · duration · modules). Content matches `lib/placeholder-content.ts`.
6. Closing: star + "New courses and lessons added every week."; orange equalizer fading out
   below; no footer.
7. Resize to ~375px: cards stack to one column, hero type shrinks, header stays on one row,
   no horizontal scroll.
8. Open `/design-system` — section 12 Course Card and section 13 Navbar look exactly as
   before.
