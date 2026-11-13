# Royal Ring v1.3 — Nine-chapter image alignment audit

Image basis: **Royal Ring v2.13 locked master, 4344 × 1448**. Coordinates below are artwork pixels, not historically documented positions. The interactive markers are navigation anchors; reconstructions remain evidence-grade D.

| Chapter | Master anchor (x,y) | Locator region (x0,y0–x1,y1) | Review result |
|---|---:|---|---|
| GV-01 — The official frame | (1703, 459) | [1255, 110, 2045, 715] | Existing marker safely inside the intact sepia mount; wide original-photo locator correctly locates the full historical frame. |
| GV-02 — The mahout & elephant | (1603, 576) | [1440, 320, 1895, 695] | Existing marker in the archival elephant/mahout detail; preserves the source photograph rather than substituting reconstructed pixels. |
| GV-03 — The living wall | (2880, 352) | [2770, 190, 4260, 720] | Existing marker above the first reconstructed elephant group; large locator intentionally captures the middle-right arc of the formation. |
| GV-04 — Trackers & shikaris | (3370, 696) | [3100, 545, 3690, 995] | Focus the two foot figures instead of the foreground elephant. |
| GV-05 — Chandra Shumsher | (3150, 276) | [2800, 235, 3390, 675] | Place the interactive target above the helmeted rider, not over their face. |
| GV-06 — Elephants as infrastructure | (370, 820) | [30, 610, 1020, 1280] | Place target on the left foreground cargo elephant and secured equipment; v1.2 mistakenly targeted central-right elephant. |
| GV-07 — The unseen tiger | (3050, 1020) | [2400, 600, 3590, 1130] | Use intervening dense vegetation as an interpretive question, not an exact tiger location. |
| GV-08 — Ernest Brooks & camera | (525, 550) | [0, 330, 990, 1340] | Place target beside the camera operator and bellows camera, within the actual photographic detail. |
| GV-09 — The afterlife of the shot | (1868, 618) | [1800, 555, 2030, 720] | Narrow locator to archival mount lower-right corner containing handwritten 156; keep hotspot clear of the pencilled number. |

## Supplemental figure and interactions

- **T / Duke of Teck** is an interpretive marker at (approximately 930, 504), tied to GV-03, not a tenth chapter. Clicking it now pans to the **left** part of the panorama and displays the corresponding v2.13 reconstructed closeup; returning to GV-03 by chapter navigation pans back to the ring.
- The panorama uses the updated v2.13 WebP derived from the locked PNG. All nine overview locators were freshly regenerated against the master. GV-04’s reconstruction detail was re-cropped to make the two walking figures the main subject.
- GV-01, GV-02 and GV-09 remain historical-original closeups rather than newly synthesized details; GV-09’s overview highlight now narrows to the archival mount’s lower-right corner and pencilled “156”.
- In the thematic GV-07 chapter, the marker points to dense vegetation and **does not assert the precise position of an unseen tiger**.
- The locked PNG and the original 737 × 569 archival photograph were verified byte-identical to v1.2’s input assets.

## Publication qualification

Nine markers and locator regions were manually reviewed against the large image and checked by code for inclusion and bounds. Isolated browser smoke tests at 1440px and 390px exercised all nine chapter tabs, the Teck marker, zoom, original-photo toggle and reset with no JavaScript errors. This does **not** substitute for testing a live-hosted site or genuine mobile touch gestures: local Chromium navigation to file:// and localhost is restricted by the execution environment. The chapter evidence assessments and sourced historical claims were retained without further outside scholarly verification.
