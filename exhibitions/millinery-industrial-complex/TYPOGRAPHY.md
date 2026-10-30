# Exhibition typography patch

The Millinery–Industrial Complex · A-Thrice · 30 October 2026

## Install

Extract the ZIP. Copy its `exhibitions` folder into the root of your local A-Thrice installation, merging folders and replacing the exhibition's `index.html`. Keep the added stylesheets and `assets/fonts` directory with it. Hard-refresh your browser.

The fonts do not need to be installed in Windows or macOS. The stylesheet includes the actual font bytes, so a direct double-click preview of `index.html` can use the same fonts without a network connection or separate server.

Open `typography-preview.html` in this exhibition folder for a type specimen and a browser check of all six upright/italic faces and the seven main typography roles.

## Approved roles

| Role | Typeface |
| --- | --- |
| Exhibition, gallery and artwork titles | Bodoni Moda |
| Display subtitle À la Victoire | Bodoni Moda, true italic |
| Exhibition labels, interpretation, statements and navigation | IBM Plex Sans |
| Operation dates, locations, military-equipment fields and sources | IBM Plex Mono |
| Campaign slogans displayed as website text | IBM Plex Sans, semibold uppercase |

The previous CSS already named these font families, but used serif text for artwork labels and monospace for navigation. It also relied on a remote Google Fonts stylesheet. This patch bundles the original font software and corrects those role assignments. Longer historical descriptions remain in IBM Plex Sans, as the guide specifies; record headings, dates, locations, catalogue identifiers and source references use IBM Plex Mono.

The original title sizes, colours, image assets and layouts remain in their existing stylesheets. `typography.css` loads last and owns the approved type roles. The site’s text, scripts and data are not replaced by this patch, so the preceding tone-consistency overlay can be installed independently.

Lettering embedded in the book cover, cap photographs, logos and other artwork images cannot be changed by CSS. Those image assets are not included or modified.

## Files and sources

`fonts.css` registers the three agreed CSS family names. IBM's variable files use internal family names ending in "Var"; the CSS aliases are the approved IBM Plex Sans and IBM Plex Mono names. Upright and genuine italic styles are supplied for all three families.

The six font binaries are byte-identical to their official source files. The physical font filenames have been simplified for the local asset directory; the font data has not been edited, converted or subsetted. Copyright notices and SIL Open Font License texts are included beside the fonts.

Sources and SHA-256 fingerprints:

- `BodoniModa-variable.ttf` — [official source](https://github.com/google/fonts/blob/main/ofl/bodonimoda/BodoniModa[opsz,wght].ttf); SHA-256 `550f5e34ee0a828d7941b1fe9bc58b34e5260d3f33a61532e6d0a0114e79a5cf`.
- `BodoniModa-Italic-variable.ttf` — [official source](https://github.com/google/fonts/blob/main/ofl/bodonimoda/BodoniModa-Italic[opsz,wght].ttf); SHA-256 `dfff1619f8f6871c6372f8855b67211f9a73b4e93d45aca868cd8f46a48622de`.
- `IBMPlexSans-variable.woff2` — [official source](https://github.com/IBM/plex/blob/master/packages/plex-sans-variable/fonts/complete/woff2/IBM%20Plex%20Sans%20Var-Roman.woff2); SHA-256 `e978248b6b56da9e372975322a98dd9a51135d1b375e32ed6d5ca69f3aab792d`.
- `IBMPlexSans-Italic-variable.woff2` — [official source](https://github.com/IBM/plex/blob/master/packages/plex-sans-variable/fonts/complete/woff2/IBM%20Plex%20Sans%20Var-Italic.woff2); SHA-256 `57c2e5e2d0a16054e83315a312d2d5d0166e4a6f5b27dbed28d7d9d05b5e4292`.
- `IBMPlexMono-variable.woff2` — [official source](https://github.com/IBM/plex/blob/master/packages/plex-mono-variable/fonts/complete/woff2/IBM%20Plex%20Mono%20Var-Roman.woff2); SHA-256 `ef55d69e81baa6523a9b6e015d746e707bc7e9579f18703a169cb18c36dd567b`.
- `IBMPlexMono-Italic-variable.woff2` — [official source](https://github.com/IBM/plex/blob/master/packages/plex-mono-variable/fonts/complete/woff2/IBM%20Plex%20Mono%20Var-Italic.woff2); SHA-256 `b1c1137b5de255336110167a3a66531bed1e7d14fc8a0a384bd0d7c06bdd433b`.

Site baseline: GitHub commit `808ef019283e1d64d2237a29cc7e7a5c74a45efb`. No GitHub write, commit or deployment was performed.

The Gallery II record-heading selector follows the existing detail / interpretation / historical-record order. If the study template is later reorganised, update that selector in `typography.css` at the same time. The `.record-data`, `.operation-date`, `.record-date`, `.archive-reference`, `.military-equipment` and `.record-location` utility classes are available for structured metadata. Inline mentions within narrative prose retain the prose font.
