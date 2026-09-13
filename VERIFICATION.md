# Version 6 verification

**534 of 534 DOM/runtime checks passed.**

The test ran the actual homepage and project scripts with bundled Leaflet and local geography in jsdom 26.1.0. Canvas support was disabled in the harness so Leaflet's SVG renderer could run in the DOM environment. The production pages retain their standard browser renderer settings. No online map requests were needed for the default state.

| Page | Passed checks |
|---|---:|
| index.html | 13 / 13 |
| projects/P01.html | 33 / 33 |
| projects/P02.html | 33 / 33 |
| projects/P03.html | 33 / 33 |
| projects/P04.html | 33 / 33 |
| projects/P05.html | 33 / 33 |
| projects/P06.html | 33 / 33 |
| projects/P07.html | 35 / 35 |
| projects/P08.html | 29 / 29 |
| projects/P09.html | 32 / 32 |
| projects/P10.html | 30 / 30 |
| projects/P11.html | 30 / 30 |
| projects/P12.html | 33 / 33 |
| projects/P13.html | 33 / 33 |
| projects/P14.html | 35 / 35 |
| projects/P15.html | 32 / 32 |
| projects/P16.html | 34 / 34 |

Checks covered local map activation, closed-at-entry details, all navigation sections, available technical-dossier tabs, layer toggles, opening and closing data/details, linked table rows, table sorting, nonempty CSV generation, keyboard search, a simulated satellite failure returning to local geography, mobile panel state, resets, and the projects' existing domain self-tests where available. The homepage checks covered search, empty states, category filtering, grid/list view, next/previous previews, modal closing, and mobile menu state.

All 23 JavaScript files/inline blocks passed syntax parsing. All 184 checked local HTML references resolve. The archive includes all 16 project pages and 16 matching data previews. No OpenStreetMap, CARTO, or OpenTopoMap tile endpoint remains in the project pages.

## Verification limits

This is a code and DOM/runtime verification, not a full visual browser test. Local HTTP/file previews were blocked by the session's browser security policy. Desktop/mobile pixel layout, touch gestures, actual print output, real full-screen behavior, clipboard permissions, and live Esri imagery availability were not verified in a browser. Data previews were derived from project geometry rather than captured from a live browser.

## Source preservation

The original project datasets and analytical methods remain in their project pages. The identified P10 empty-barrier graph defect was corrected; the corrected trace passed its upstream-trace self-test. P16's former custom renderer was replaced with bundled Leaflet and its startup view ordering was corrected. Updated shared styles and interaction code reside under `assets/`.
