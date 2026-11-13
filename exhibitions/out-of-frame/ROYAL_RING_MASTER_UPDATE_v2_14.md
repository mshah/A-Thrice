# Royal Ring v2.14 — Image-only update to exhibition website v1.3

- **Baseline:** Out of Frame Exhibition Website v1.3.
- **New artwork:** Royal Ring v2.14 Guest Seating Microedit, supplied at 2048 × 682, archived losslessly as `assets/images/royal-ring-v2.14-master.png`.
- **Caution:** The uploaded filename mentions 4344 × 1448, but the received image data is only 2048 × 682. This deployment uses the supplied native pixels, not a falsely labelled 4344-pixel upsample. For the highest detail at deep zoom, a genuine 4344 × 1448 v2.14 file can be supplied later.
- **Visual alignment check:** ORB feature registration against v2.13 resized to the supplied dimensions: 1,488 of 1,498 matches consistent with essentially no pan, crop or scale change (translation ~0.1 x, 0.3 y at 2048 × 682). The full image differs only modestly from v2.13 in pixel comparison.
- **All nine chapters:** IDs, coordinates, locator regions, texts, sources and evidence grading are unchanged from v1.3.
- **Changed derivatives:** active panorama, featured art/hero, all nine diagrammatic locators, reconstructed detail crops GV-03–08, Duke of Teck reconstructed detail.
- **Preserved:** `george-original.jpg`, archival original-based detail crops GV-01, GV-02, GV-09, v1.3 chapter alignment, all four essays' text, the previous v2.13 master and legacy v1.7 master.
- **Cache:** Updated HTML and script references use `?v=2.14` to force current image fetches after deploy.
- **Release scope:** A small incremental patch to merge into the v1.3 site; **not** a full replacement website.
