# The Millinery–Industrial Complex

Standalone exhibition by A-Thrice — Gallery II full-hat context update, 25 October 2026.

## Open the website

Extract the ZIP and double-click `index.html`. Keep the files and `assets` folder together. No installation or command-line server is required. Exhibition content and images are included locally; Google Fonts load when internet access is available, with system-font fallbacks.

This archive contains the complete exhibition, with `index.html` at the ZIP root for your existing static hosting project. Saving this archive does not change the live Cloudflare deployment; upload it as the next deployment when ready.

## Gallery II: full-hat context

Every Details Revealed study (`#/study/01` through `#/study/13`) now pairs its existing close-up with the matching complete couture hat beneath it. These thirteen supplied hat-only images are shown without their veils, at a smaller size, with the complete image visible rather than cropped. Selecting the context image opens the full-resolution WebP in a new tab.

The close-up stays first, followed immediately by the context figure. On narrower screens the two images remain together above the curatorial analysis. Each image has an artwork-specific description and a clearly labelled full-image link.

The new `hatContextImage` field is added to each work in `data.json` and `data.js`; the artwork images are in `assets/hat-context/`. Existing close-ups, portraits, annotations, sources, the book-cover homepage hero, and all 26 gift shop listings are preserved.

## Gift shop collections

| Order | Collection | Listings |
| --- | --- | --- |
| I | Exhibition book | 1 |
| II | Limited-edition Victory Merch caps | 13 |
| III | Exhibition pins and cockades | 4 |
| IV | Tote-and-pouch sets | 2 |
| V | Everyday streetwear caps | 3 |
| VI | Boxed exhibition postcards | 3 |

The book section leads the shop, with the supplied cover and a Safe Passage sample interior spread. Both can be enlarged, and the book detail viewer offers Cover and Inside look photographs. The book is Out of Stock and no price, page count, binding, format or ISBN is invented.

The collector section follows with Collateral Style, its exhibition presentation box, certificate of artwork and receipt. A clearly labelled expandable catalogue contains all thirteen original ornate Victory Merch caps. Product photographs, certificate imagery and the cockade reverse can be inspected in enlarged image viewers with fit/zoom controls.

The everyday caps are separate listings from the limited-edition collection. The three boxed postcard sets are Couture Portraits (13 cards), Beneath the Ornament (6 cards), and Victory Merch (4 cards). The Christmas Strike retains **PEACE ON EARTH / TERMS MAY APPLY**.

Every listing is **Out of Stock**. No new prices, edition limits, inventory figures or fulfilment details have been invented. Prices and edition numbers visible within supplied artwork photographs remain part of those images; they are not checkout values. There is no cart, checkout, payment collection or order form.

The certificate example belongs to Collateral Style. It is shown as that work’s documentation, rather than as a certificate for the other twelve designs.

## Preserved exhibition

The homepage hero now shows the full exhibition book cover, including its title and A-Thrice credit, and links to the book section in the shop. The foyer, Gallery I portraits, Gallery II studies and research, Gallery III displays, and About page remain in the package. Existing `#/product/01` through `#/product/13` links still work and now point visitors toward the collector section for certificates. The homepage’s gift shop description reflects the expanded range. Gallery image assets and curatorial data are unchanged.

The website retains the established Imperial Oxblood, Victory Red, Antique Gold, Pearl Ivory, Mourning Onyx and American Navy palette, with Bodoni Moda and IBM Plex typography. The fictional museum setting and A-Thrice attribution are preserved.

## Useful routes

- `#/shop` — gift shop entrance
- `#/shop/book` — exhibition book and inside look
- `#/shop/collector-editions` — limited-edition caps and certificates
- `#/shop/insignia` — pins and cockades
- `#/shop/totes` — tote sets
- `#/shop/everyday-caps` — streetwear caps
- `#/shop/postcards` — boxed postcard sets
- `#/gallery-1`, `#/gallery-2`, `#/gallery-3` — exhibition galleries

`data.js` / `data.json` contain the original exhibition data. `shop-catalogue.json` contains the expanded shop catalogue; `shop-data.js` provides the same data and shop markup without requiring a network fetch. `shop.js` owns shop interactions and `shop.css` scopes the shop design.

## Validation

JavaScript syntax, all 26 catalogue entries, shop section links, and local image references were checked. All 13 original caps, 17 merchandise photographs, the two book images, and all 13 new full-hat context images are included. Existing gallery image assets were preserved byte for byte. Existing curatorial data is unchanged apart from adding the `hatContextImage` field. All thirteen study routes and their matching context images were checked. The available preview service was unavailable, so live desktop/mobile layout and native-dialog interaction checks remain unverified.
