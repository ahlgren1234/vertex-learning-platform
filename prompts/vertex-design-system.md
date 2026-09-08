# Implementation prompt — Vertex Design System

> Status: written **after** implementation. The copy of `AGENTS.md` injected into the
> session context was only the `nextjs-agent-rules` sub-block, so the prompt-first
> approval loop in §2 was not followed. This document is the retroactive record; it
> should be reviewed and the approach adjusted if anything here is wrong.

## Goal

Turn `design/vertex-designsystem.png` into a working design-system foundation for the
`web` workspace: design tokens, the two brand fonts, a set of reusable presentational
React components, and a single page that renders the reference sheet as living
documentation.

## Skills read

- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — `next/font`
  usage, variable fonts, `variable` CSS-var pattern.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` — Tailwind v4
  setup, global CSS, ordering.

No Sanity / Clerk / PostHog skills were relevant — this task is UI tokens and
components only, no content model, no server integration.

## Code inspected

- `app/layout.tsx`, `app/globals.css`, `app/page.tsx` — stock create-next-app with
  Tailwind v4 (`@import "tailwindcss"`, `@theme inline`) and Geist fonts.
- `package.json` — Next 16.3.4, React 19.2, Tailwind v4, TypeScript 5. No component
  library, no `clsx`/`cva`/`tailwind-merge`.
- `tsconfig.json` — `@/*` -> `./*`; `include` is `**/*.ts(x)` which pulls the vendored
  `agent/skills/**` reference code into the build's type-check.

## Decisions and assumptions

- **No new dependencies.** A dependency-free `cn()` in `lib/cn.ts` instead of
  `clsx`+`tailwind-merge`; the components use non-conflicting utilities so no
  class-merge resolution is needed.
- **Tokens live in `@theme` (not `@theme inline`)** in `app/globals.css` so the CSS
  custom properties are emitted on `:root` and can be referenced from the hand-written
  `.text-display-*` type-scale classes and from `body`.
- **Fonts** via `next/font/google`: `Inter` (variable) as `--font-inter` /
  `--font-sans`, `Playfair_Display` (weights 400–700) as `--font-playfair` /
  `--font-display`. Replaces Geist.
- **Colours** taken verbatim from the sheet (primary 100–500, neutral 50–900);
  added `primary-600 #ea580c` for the primary-button hover shown in the sheet, plus
  `success-500` / `info-500` for status + the Lesson badge, and `canvas` / `surface`
  surface tokens (`canvas` sampled from the artwork at `#faf7f4`).
- **Components are presentational and server-compatible** — no `"use client"`.
  `Pagination` takes optional `onPageChange` / `getHref` so a Client Component can
  make it interactive without changing the library.
- **`tsconfig.json` `exclude`** gains `agent`, `.agents`, `.claude` so `next build`
  type-checks only real app source, not vendored skill reference code (which does not
  compile on its own).
- Reference sheet is reproduced as-is. The only layout liberties: page widened to
  `max-w-7xl`, section grids collapse responsively down to one column on mobile
  (per `AGENTS.md` §3), and the button matrix scrolls inside its own container on
  narrow viewports.

## Files touched

- `app/globals.css` — replaced token layer: colours, radius (`xs`–`xl`), shadows
  (`sm`–`xl`), font families, `body` base, `.text-display-1..small` type-scale
  classes, `.eyebrow`.
- `app/layout.tsx` — Inter + Playfair via `next/font`; metadata.
- `app/design-system/page.tsx` — the design-system reference page (sections 01–14).
- `app/page.tsx` — minimal home page linking to `/design-system`.
- `tsconfig.json` — `exclude` additions.
- `lib/cn.ts` — new.
- `components/ui/` — new: `icon`, `button`, `badge`, `input`, `select`,
  `progress-bar`, `status-indicator`, `breadcrumbs`, `pagination`, `navbar`, `logo`,
  `card` (`Card` + `CourseCard` / `LessonCard` / `ResourceCard`), `index.ts` barrel.

## Requirements

- Tokens match the sheet's stated values (hex, px sizes / line-heights, weights,
  radii, shadow formulas, 4px spacing base).
- Button specs: 44px height, radius 12px, padding 16px (lg) / 12px (md), Inter
  Medium; variants primary / secondary / tertiary / text; states default / hover /
  disabled.
- Field specs: 44px height, radius 12px, 1px `#E2E8F0` border, 16px padding, focus
  border `#FB923C`.
- Icons on a 24×24 grid, 2px outline stroke, rounded caps; outline + filled sets.
- Everything responsive to mobile; desktop matches the reference.

## Security considerations

None. No network, no auth, no tokens, no user input handling, no server routes. All
static, prerendered.

## Acceptance criteria

- `/design-system` renders all 14 labelled sections resembling the reference.
- `npx tsc --noEmit` clean for `app/ components/ lib/`.
- `npx eslint app components lib` clean.
- `npx next build` succeeds; `/` is static (`○`).

## Checks run

- `npx tsc --noEmit` — clean (project source).
- `npx eslint app components lib` — clean (fixed one `react-hooks/static-components`
  error by hoisting `Pagination`'s cell component to module scope).
- `npx next build` — success, `/` prerendered static.
- Visual check via headless Chrome screenshot at 1600px against the reference.

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/design-system` (linked from `/`).
2. Confirm sections 01–14 are present and match `design/vertex-designsystem.png`:
   colour swatches + hex, type scale, 4px spacing scale, radius/shadow samples,
   outline + filled icon rows, button matrix (variants × states), search input with
   `⌘K` and the select, badges, status indicators, 35% progress bar, the four card
   types, navbar + breadcrumbs + pagination, the four principles.
3. Narrow the window to ~375px: every section should stack to one column with no
   horizontal page scroll (the button matrix scrolls within its own box).
4. Tab through buttons / input / select / pagination: visible focus ring, select
   opens, pagination arrows disabled at bounds.
