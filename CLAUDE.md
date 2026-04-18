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

All pricing flows through `App.jsx`:

1. `sqft = length × width × shape.factor`
2. `matCost = sqft × material.sqftRate`
3. `frameCost = sqft × 11 × height.frameMult × frostMult × shape.factor`
4. `footings = ceil(sqft/75) piers × $170 ($240 frost)`
5. `railingCost = perimeter-ish linear ft × railing.rate` (only if height requires railing)
6. `stairs = height.stairAdder`
7. Feature costs toggle on/off; labor-intensive ones scale with state labor mult.
8. `laborCost = subtotal × (0.55 × (stateLaborMult × metroMult - 1) + 0.55)`
9. `total = (matCost + frame + footings + railing + stairs + features + labor + permit) × 1.08` (8% contingency)

StatePage, CityPage, and DataPage duplicate this model internally for sample 300 sqft decks. If you change pricing in App.jsx, change it in those three files too.

## Adding pages

1. Add component to `src/`.
2. Route it in `AppRoutes.jsx`.
3. Add slug(s) to `src/routes.js`.
4. Add entry to `public/sitemap.xml`.
5. Run `npm run build` and verify page count.

## Theme

Editorial Depth palette: warm paper `#FAF8F3`, deep teal brand `#0F4C5C`, ink black `#0A0A0A`. Fonts: Inter (UI), Fraunces (display serif). Loaded in `index.html`.
