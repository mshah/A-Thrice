# Out of Frame — exhibition website v1.4

Complete replacement release, assembled from v1.3 plus the Royal Ring v2.14 patch. Adds Buffalo Corner: The Wider Camp using the supplied v2.1 / 2172 × 724 pixel panorama and the v4.0 annotation packet. The homepage now begins with Buffalo Corner as Study 01, then The Royal Ring as Study 02.

## Visitor experience
- `works/buffalo-corner.html` — all 13 scenes BC-01 through BC-13; original photograph view and downloadable unmodified archival TIFF; show/hide research markers, pan, zoom, reset, filters, five thematic paths, chapter-to-chapter and related-scene navigation, hash routes (`#bc-04`), artwork details with local locator thumbnails, claim-level evidence and source references.
- `index.html` and `works/index.html` — Buffalo first, Royal Ring second, updated home photography and visitor copy.
- Existing Royal Ring v2.14, four essays, method and about remain in the package.

## Interpretive and rights safeguards
- The v4.0 packet is the authority for copy, evidence grades and source IDs. External reference links are preserved from that packet, NOT all freshly checked.
- Art detail crops and locator images are derived from the accepted 2172 × 724 panorama and do not introduce additional historic information. They are **not** external photographic comparators.
- The sepia archival scan is retained byte-for-byte in `assets/images/buffalo-corner-archival-original.tiff` (2448 × 2188). `buffalo-corner-archival-view.jpg` is a browser-display conversion. The framed archival derivative visible in the panorama remains part of the accepted composite; no additional unregistered overlay was added.
- The artist accepted panorama v2.1 as a WORKING image; final high-resolution print, exact historic subject placement, image-specific source/rights audit, and physical proof remain separate gates.
- Claim grades A/B/C/D follow the packet and refer to **individual claims**; BC-02 Ali with a camera is explicitly counterfactual, and no reconstructed scenes are asserted as simultaneous.
- Hotspot bounds are the packet’s draft rectangles; markers use their centers, with manual functional browser tests. They are navigational guides, not geographic or documentary coordinates.

## Installation
Unzip and deploy the contents of `Out_of_Frame_Site/` over the existing static website, replacing matching files and keeping the included folder hierarchy. Open `Out_of_Frame_Site/index.html` locally for preview. No server, database, bundler or build process required. Google Fonts require an internet connection; system serif/sans fallbacks are provided.


## v1.4.1 — Buffalo chapter explorer alignment
- Reworked Buffalo Corner's interactive explorer to mirror the Royal Ring interaction model.
- Replaced the theme-path-first UI with a chapter-driven navigation panel.
- Renamed and numbered Buffalo scene entries as research chapters with the same navigation treatment.
- Standardised the research panel layout, detail crop presentation and locator image structure.
