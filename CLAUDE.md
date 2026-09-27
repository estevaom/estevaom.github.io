# CLAUDE.md

Guidance for Claude Code in this repository.

## What this is

Estevão's personal site and CV, www.estevaom.com: one static page built with Astro and deployed to
GitHub Pages. It doubles as his CV for part-time and consulting work, so every claim on it must be true.

## Commands

```bash
bun install
bun run dev          # http://localhost:4321  (?hud shows the painting's frame rate)
bun run check        # astro check (TypeScript 6; astro check doesn't support TS 7 yet)
bun run build        # static site in dist/
CHROMIUM_PATH=/usr/bin/chromium bun run snapshots   # dist/cv.pdf + dist/og.jpg, after a build
```

## Where things live

- `data/*.json`: all content. Components only render it; don't hard-code copy in `.astro` files.
- `src/components/`: one component per section. `StarryNight.astro` owns the two canvases.
- `src/scripts/starry-night.js`: the painting engine, plain JS. `startStarryNight()` returns a single
  `stop()`, and `StarryNight.astro` calls it whenever `<html data-theme>` stops being `starry-night`.
- `src/styles/global.css`: layout, the theme tokens, and the `@media print` rules that turn the page into
  the CV PDF.
- `src/themes.ts`: the theme list. The toggle only renders once there's more than one theme.
- `.github/workflows/deploy.yml`: check, build, snapshots, deploy. It runs on pushes to `master`.

## Rules

- **Content:** source career claims from Estevão or his journal, never from memory or the old site. Only
  list repos he created, not forks.
- **Starry Night:** everything in the painting is made of brushstrokes. No flat or outlined vector shapes;
  a village or church would need to be painted with strokes like the sky. The moon's glow sits on the lit
  crescent, and its shadowed part stays dark.
- **Other themes (Light/Dark, still to come):** simple, sober and modern, with no brushes or effects.
  A theme overrides the CSS tokens under `:root[data-theme="…"]`.
- **Verify visually:** screenshot desktop (1440×900) and a phone (390×844, with mobile emulation) and look
  at them. On phones, check that `innerWidth` equals `documentElement.clientWidth`; anything wider makes
  mobile browsers zoom out.
- **The printed CV must stay at two A4 pages:** re-run `snapshots` and check `pdfinfo dist/cv.pdf`.
