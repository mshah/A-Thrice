# QA — Out of Frame v1.4

## Build / local validation

- Buffalo annotation packet v4.0: all **13** IDs (BC-01…BC-13), scene titles, questions, visible descriptions, curatorial text, evidence, individual claim grades, cautions, cross-links and source keys transferred; **29** reference keys preserved.
- Hotspots from source table 5, normalized against **2172 × 724**; overlaps in rectangles remain possible and the numbered list is the reliable alternative. The independent overlay audit is in `previews/buffalo-v1.4-hotspot-audit.jpg`.
- Interactive JS and the other local JS pass static syntax validation.
- Isolated Chromium document tests (required because the environment blocks localhost/file navigation) passed for desktop and mobile. Checked scene selection, all 13 evidence/source tabs on desktop, sample chapters on mobile, show/hide markers, original view, zoom, reset, detail dialog / Escape and no runtime JS errors. Those are functional checks; **not** final deployed-browser or physical mobile tests.
- Relative internal asset/page links checked, PNG/WEBP/TIFF decoded and ZIP CRC tested.
- Royal Ring v2.14 image assets and original nine-chapter JS retained from the prior patch; no new remapping of Royal Ring was undertaken.

## Editorial publication gates

- Verify historic source URLs, credit/rights scope and edition-specific page quotations; master packet notes some are unresolved.
- Test the draft hotspot hit regions on physical touch devices, especially BC-03/04 and BC-04/09 overlap zones.
- Accepted Buffalo Corner panorama v2.1 is web-ready as **working art**, but not a certified exhibition-resolution print master. Source-TIFF re-integration / print proof remains pending.
- Ensure public context is not interpreted as a recovered panoramic negative or a single simultaneous historical moment.


### v1.4.1 follow-up
- Buffalo Corner explorer updated to mirror the Royal Ring chapter interaction pattern.
- Confirmed 13 chapter buttons, markers, chapter tabs, enlarged detail dialog, original-photo toggle and deep-link loading.


### v1.4.2 editorial and interaction audit
- All 13 Buffalo Corner public narratives reviewed against annotation packet v4.0; exact predecessor texts retained in `packetAnnotation` for traceability.
- Both artwork explorers now use aligned research-chapter, locator, button, evidence and source labels.
- About/Method text updated to cover both completed artworks; home/collection CTAs harmonised.
- The chapter IDs, research questions, evidence fields, grades, citations, bounds and raster images are unchanged.
- Isolated Chromium checks passed for all 13 Buffalo and all 9 Royal chapter selections on desktop; sampled mobile chapters; zoom, source-photo view, detail dialog, filters, reset and marker reveal/hide. No JS page errors.
- Direct hosted-path deployment was not tested; runtime browser policy blocks localhost/file URLs. Preview tests injected exact site HTML, local CSS, scripts and image content into isolated Chromium documents.


### v1.5 historical background verification
- Built on full v1.4.2 website and checked that the artwork source images, details, annotation data and original JS were unchanged.
- Added separate 433-word Buffalo Corner and 523-word Royal Ring introductory histories (not counting captions, provenance or source lists).
- Reviewed history against Buffalo Corner Master Annotation Packet v4.0, Royal Ring Master Annotation Packet v0.4, Smithsonian, LOC, ANU and Asian Art Museum records. The original-photograph photographer/operator uncertainty is explicit for both.
- Isolated Chromium checks using exact HTML, CSS, artwork images and injected local JS/data scripts passed at desktop and mobile viewport sizes. Tested original-photo presence, reading section, 13/9 chapter buttons, jump links, reveal markers, panels and source tabs; no page errors.
- The run cannot establish live Cloudflare Workers navigation or physical mobile-device behavior; these remain deployment checks.
