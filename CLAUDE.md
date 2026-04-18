# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Commands

```bash
npm run dev       # Dev server with HMR at http://localhost:5173
npm run build     # Production build + SSR prerender (71 static pages)
npm run preview   # Preview production build locally
```

## Architecture

React 18 + Vite 6 + React Router 6 SPA with SSR prerender. Entry is `src/main.jsx`.

- `src/App.jsx` — home page + calculator. Exports `STATES`, `DECK_MATERIALS`, `DECK_SHAPES`, `T` (theme), `Nav`, `Card`, `Ttl`, `Dsc`, `Opt`, `Chip`, `Btn` for reuse.
- `src/AppRoutes.jsx` — routes mapping.
- `src/routes.js` — static path list for prerender (`getAllPaths()`).
- `src/StatePage.jsx`, `CityPage.jsx`, `HubPage.jsx`, `DataPage.jsx`, `BlogPage.jsx` — route components.
- `src/entry-server.jsx` — SSR entry used by `prerender.js`.
- `prerender.js` — builds 71 static HTML pages after Vite build.
- `public/sitemap.xml`, `public/robots.txt` — SEO.

## Cost model (single source of truth)

All pricing flows through `App.jsx`. Shapes carry four factors (sizeFactor, framingFactor, perimeterFactor, wasteFactor) so area and complexity don't double-count.

1. `footprint = length × width × shape.sizeFactor`
2. `perimeter = 2(L+W) × shape.perimeterFactor`
3. `matCost = footprint × (material.sqftRate + material.fastenerRate) × (1 + shape.wasteFactor)`
4. `frameCost = footprint × $10.50 × height.frameMult × frostMult × shape.framingFactor`
5. `pierCount = max(4, ceil(footprint/60)) + 2 if high + 2 if multilevel`
6. `footings = pierCount × $180 ($260 frost)`
7. `ledgerCost = (wraparound ? L+W : L) × $26` — only if not ground-level
8. `stairCost = stairRuns × (stepCount × (material.stepRate + $55) × widthFactor + $350)` — multilevel has 2 runs (main + between-levels shorter)
9. `railingCost = (perimeter − houseSide + stairRailingBothSides) × railing.rate`
10. Features: flat or per-sqft; labor-intensive scale with state labor; some carry `permit` surcharge.
11. `laborCost = subtotal × (0.42 + 0.40 × (stateLabor × metroMult − 1))` — narrower than pool-site swing
12. `permit = state.permit + footprint × $0.50 + Σ feature.permit`
13. `total = (subtotal + labor + permit) × 1.08` (8% contingency)

Sub-pages (StatePage, CityPage, DataPage) call the exported `estimateSample()` helper so they stay in sync automatically.

## Adding pages

1. Add component to `src/`.
2. Route it in `AppRoutes.jsx`.
3. Add slug(s) to `src/routes.js`.
4. Add entry to `public/sitemap.xml`.
5. Run `npm run build` and verify page count.

## Theme

Editorial Depth palette: warm paper `#FAF8F3`, deep teal brand `#0F4C5C`, ink black `#0A0A0A`. Fonts: Inter (UI), Fraunces (display serif). Loaded in `index.html`.
