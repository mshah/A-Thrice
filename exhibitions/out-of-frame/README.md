# OUT OF FRAME — Exhibition website v1.5

**Complete static website** for **Out of Frame: The Making of a Trophy**. Buffalo Corner is now Study 01 and The Royal Ring is Study 02.

## Opening the site

1. Extract the ZIP while preserving its `Out_of_Frame_Site` directory structure.
2. Open `Out_of_Frame_Site/index.html` in a browser. The site is plain HTML/CSS/JavaScript and has no backend or build step.
3. For deployment, upload all contents of `Out_of_Frame_Site/` as a replacement for the previous static site, retaining relative paths.

## Main pages

- `index.html` — series entrance, Buffalo Corner first, both artworks, essays and method links.
- `works/index.html` — collection, Buffalo Corner then The Royal Ring.
- `works/buffalo-corner.html` — historical introduction to Roosevelt’s 1909 Kamiti visit and photograph, plus **13-chapter** interactive experience with panorama, close-ups, evidence layers, source references and deep links.
- `works/the-royal-ring.html` — historical introduction to George V’s December 1911 Nepalese hunt and photographic album, plus original **nine-chapter** interactive experience retaining its **v2.14** image and v1.3 alignment fixes.
- `essays/` — four working-draft curatorial essays.
- `method.html` and `about.html` — interpretive and project background.

## Buffalo Corner assets / source integrity

- `assets/images/buffalo-corner-v2.1-master.png` — **exact supplied** 2172 × 724 working panorama; no markers baked into it.
- `assets/images/buffalo-corner-view.webp`, `buffalo-corner-hero.webp` — browser derivative images, not enlarged master exports.
- `assets/images/buffalo-corner-archival-original.tiff` — **byte-for-byte** copy of supplied archival source TIFF, 2448 × 2188; print border and handwritten marks retained. The JPEG beside it is a browser-view copy, not an archival replacement.
- `assets/images/buffalo-details/` — all 13 art detail crops and reference locators **derived from the accepted panorama**. No unverified historical comparator image is published.
- `assets/js/buffalo-data.js` — 13 scene annotations, evidence and limits, 29 source entries, native and normalized bounds and five thematic paths, transcribed from the v4.0 packet.
- `assets/js/buffalo-corner.js` — accessible scene navigation and explorer behaviour.

**Research limits:** The sepia rectangle contains the historical photograph; the colour field is contemporary artistic reconstruction. It combines different moments. Scene coordinates are navigational working bounds, not historic measurements. Ali operating a camera is an explicitly counterfactual intervention. Source endpoints and rights claims in the packet have not all been independently rechecked. The v2.1 working PNG is not a final exhibition-resolution print proof.

See `RELEASE_v1_5.md`, `QA_NOTES.md` and `ROYAL_RING_ALIGNMENT_AUDIT_v1_3.md` for changes and technical checks.


## v1.4.2 editorial consistency pass
Buffalo Corner and The Royal Ring now use the same research-chapter terminology, control labels, evidence key, locator copy and source framing. All thirteen Buffalo chapters received line edits; the original v4.0 packet copy is retained in the non-displayed `packetAnnotation` field for editorial traceability. The About and Method pages now accurately describe both completed experiences. See `EDITORIAL_STYLE_GUIDE_v1_4_2.md`.


## v1.5 historical background addition

Each artwork introduces **The hunt and the photograph** between the panoramic first encounter and its numbered chapters. Jump links let visitors read the context or continue directly to the chapters. Separate museum-ivory reading panels preserve original photograph views, research context, unknown attribution and source links. The homepage and collection descriptions now explain the two historical occasions. Four essay drafts, all interactive chapter data and artwork pixels remain unchanged.

## Photographic case note (proposed, manual review)

- `essays/one-photograph-two-frames.html` is a standalone case study linked from the essays landing and homepage, not numbered among the four curatorial essays or the installation artworks.
- The 1898/1900 figure preview is a **low-resolution, side-by-side atlas** derived from user-supplied scanned PDFs, not a recovered camera negative. It is built into `assets/images/rhino-1898-1900-preview.svg` for a reviewable static PR. Links take readers to the publications for close inspection. The two sources use different crops; do not call one the uncropped original.
- The page is responsive and keyboard-operable (three view buttons). Production QA should replace the small embedded preview with larger scans if permissions allow.
