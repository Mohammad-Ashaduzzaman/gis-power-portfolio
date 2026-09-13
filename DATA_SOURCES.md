# Map data and asset sources

## Natural Earth

Regional geographic context is derived from these Natural Earth source datasets:

- `ne_50m_admin_0_countries`
- `ne_10m_rivers_lake_centerlines`
- `ne_10m_roads`
- `ne_10m_populated_places_simple`
- `ne_10m_urban_areas`

Source repository: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson

Website and terms: https://www.naturalearthdata.com/about/terms-of-use/

Natural Earth releases these map datasets into the public domain. Regional features intersecting 85.5–94.5° E and 20–28.5° N were selected, lightly simplified, and rounded to five decimal places for distribution. Some retained geographic features extend beyond this window. The data is generalized cartographic context and does not establish legal boundaries or street-level accuracy. Scale labels 1:10m and 1:50m mean 1:10 million and 1:50 million, respectively.

## Leaflet

Leaflet version 1.9.4 is distributed locally in `assets/vendor/leaflet/`, with its license retained.

Project: https://leafletjs.com/
Download: https://leafletjs.com/download.html
License: `assets/vendor/leaflet/LICENSE`

## Optional imagery

The optional satellite layer references Esri World Imagery:

https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer

Imagery is requested only after a visitor selects the online layer. Visible map attribution is retained. No imagery tiles were scraped, prefetched, or redistributed.

## Removed online basemap dependency

The previous website defaulted to OpenStreetMap's tile service, which was returning access-blocked tiles in the supplied screenshot. This version removes that dependency instead of changing request identities or routing around the restriction.

Relevant service policy: https://operations.osmfoundation.org/policies/tiles/

## Portrait

`assets/ashad-portrait-v6.png` is a portrait asset prepared with the built-in image-generation tool from the user's supplied reference design and original portrait. The original portrait remains in `assets/ashad-profile.webp`.

Asset brief: preserve the same man's recognizable face, hair, beard, olive overshirt, white undershirt, calm expression, and clasped-hands pose; create a 4:5 photographic portrait against warm white with subtle green foliage; remove all website text, cards, logos, and UI. The website composition itself is implemented in HTML and CSS.

## Case-study data

The data in P01–P16 is retained from the supplied portfolio archive. Per-project methodology, dataset descriptions, fields, assumptions, outputs, and limits remain accessible in each Project Details panel.
