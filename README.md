# Md. Ashaduzzaman — GIS & Spatial Decision Systems Portfolio

Version 6 · Static website · 16 interactive GIS case studies

Open `index.html` after extracting the complete ZIP. Keep the `assets` and `projects` folders beside it. The homepage and the default maps work without a build step, account, API key, or internet connection.

## What changed

- The homepage follows the supplied portrait reference: warm white, forest green, sage, strong sans-serif typography, a blended portrait, and four capability cards.
- All 16 project shells share the same design tokens, readable panels, controls, detail drawers, tables, and project documentation styling.
- Leaflet 1.9.4 and regional Natural Earth geography are bundled. The default map no longer requests OpenStreetMap, CARTO, OpenTopoMap, or CDN resources.
- Satellite imagery remains an optional online layer. Failed tiles are removed and the map returns to the bundled regional layer after repeated errors or a loading timeout.
- The homepage has combined keyword/category filtering, a project count, grid/list views, keyboard-friendly quick previews, previous/next project controls, and an email-copy button.
- Project pages have a collapsible side panel, mobile panel close controls, full-screen controls, a scale bar, coordinates, linked table/detail selection, sortable tables, and CSV export for the current data tab.
- Escape closes details/panels/tables; `/` focuses project search. Popups remain overlays. Checkboxes preserve multi-selection.
- P16 uses the same bundled Leaflet runtime as the other projects. Its initial map view is established before adding its interactive layers.
- P10's graph builder now applies a device barrier only when a barrier is specified. Previously, an empty barrier also excluded uncontrolled network connections.

## Basemap and data scope

**Regional map · offline** uses a bundled selection of Natural Earth's country polygons, rivers, major roads, urban areas, and places. It provides real, generalized geographic context around Bangladesh and nearby areas. It is not a street-level or cadastral basemap. At close zoom, the project's detailed demonstration layers remain available, while the regional background retains its original level of detail.

**Satellite · online** uses Esri's World Imagery service. Internet access and service availability are required. Its current imagery, coverage, and access conditions are controlled by the provider. Online imagery has not been downloaded or included in this ZIP.

The original project datasets, spatial models, analysis controls, field forms, and technical dossiers are retained. These are portfolio demonstrations; use their documented assumptions and limitations when interpreting results.

The homepage previews are SVGs drawn from the actual bundled project geometry. They are geographic data previews, not screenshots of a browser session.

## Local use

Extract the full ZIP and open `index.html`. Normal map navigation, analysis, filters, and data export use local files. Some browser features, including full-screen mode and clipboard access, depend on the browser and its security settings.

For a local HTTP preview, run from this folder:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Upload the extracted contents to your repository root.
2. Keep `index.html`, `.nojekyll`, `assets/`, and `projects/` together.
3. In **Settings → Pages**, deploy the `main` branch and root folder.

All website assets and project links use relative paths, so a repository subpath is supported. No server-side runtime, package installation, or build process is needed.

## Maintain the design

- `assets/design-tokens.css` — shared colors, focus states, and typography defaults.
- `assets/home.css` / `assets/home.js` — homepage, project gallery, navigation, and quick previews.
- `assets/project-base.css` — shared GIS component structure.
- `assets/project-theme.css` — desktop/mobile project appearance and layout.
- `assets/pXX-extras.css` — styles for project-specific analysis controls.
- `assets/maps.js` / `assets/geography.js` — local basemap and imagery fallback.
- `assets/project-ui.js` — shared navigation, accessibility, linked tables, and export behavior.
- `projects/P01.html` through `projects/P16.html` — original data and domain logic.

## Verification

See `VERIFICATION.md` and `VERIFICATION.json`. The website was checked with script parsing, local-reference validation, and DOM/runtime simulations. The test environment used local assets only. Browser visual inspection and real device checks were unavailable because the session's browser security policy blocked local previews; no claim of screenshot-verified rendering is made.

## Contact

- Email: plan.ashad@gmail.com
- LinkedIn: https://www.linkedin.com/in/mohammad-ashaduzzaman/
- Mobile / WhatsApp: +880 1748 118745
- WeChat / Telegram: +880 1748 118745

Developed and Designed by Md. Ashaduzzaman.
