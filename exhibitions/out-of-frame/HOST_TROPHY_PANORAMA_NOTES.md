# The Host and the Trophy — approved panorama integration

Replaces Study 03's reserved images with the artist-approved full-photograph panorama (9 November 2026). The 2048 × 760 master is copied without alteration. No photographer, new figure, or marker is painted into the artwork.

- Master: `assets/images/host-trophy-master.png`
- SHA-256: `626a08e65fa1c2f2be504efbf7415a9e9c1af5807587489265917c844ea05242`
- Browser/hero WebP derivatives retain the complete panorama and aspect ratio.
- Historical-photo view is a lossless crop of the composite at (398, 12)–(1309, 700). It is explicitly labelled as a composite-derived view, not a byte-original `behar.jpg` download. Original source metadata in the research packet is retained separately.
- Thirteen detail crops and gold-box locators are generated from this master. Their native pixel bounds and percentage marker positions are recorded in `assets/js/host-trophy-data.js`.
- Existing chapter prose and citations are retained. Chapters 4, 5 and 10 use contextual group/tiger anchors without assigning names or sporting credit. Chapter 11 uses reconstructed baggage handling (not a depicted tracking event). Chapter 13 uses the photograph's boundary, with no reconstructed photographer.
- Reuses the exhibition's numbered gold/green marker, close-up, locator and native enlargement-dialog styling. Controls support hidden/revealed markers, zoom, horizontal scrolling, source view, theme filtering, chapter fragments and keyboard-operated research tabs.
- Corrects next-chapter disabling at the end of a filtered list.

## Validation

- JavaScript syntax checks and `git diff --check` passed.
- All 13 bounds and anchors fit the master; all 26 image assets decode; source keys and local page links resolve.
- Master bytes match the supplied approved PNG.
- Desktop browser: all 13 chapter images loaded; markers, historical-photo toggle, zoom, locate, enlargement/close, theme filtering, evidence tabs and filtered next-button boundary checked.
- Responsive styles retain a horizontally scrollable panorama and stacked research layout. A separate mobile-device browser pass was not performed.
- Annotation text remains editorial draft; this change does not authenticate unidentified subjects or re-verify historical sources.
