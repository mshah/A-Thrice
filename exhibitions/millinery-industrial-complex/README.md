# The Millinery–Industrial Complex

**Standalone virtual exhibition · A-Thrice · initial working build**

This is a complete, static, self-contained exhibition website. It contains the homepage, fictional foyer, Gallery I (thirteen couture works), Gallery II (thirteen detail studies with curatorial notes and source links), Gallery III (Victory Merch editorials paired with cap photographs in virtual cases), a **separate** gift shop, and an about page.

### Opening the site

- Open `index.html` in a web browser, or (recommended for testing) start a local server in this directory with `python -m http.server 8080` and go to `http://localhost:8080/`.
- No build system, API keys, framework installation or account is needed.
- The package is ready to host as a static website on Cloudflare Pages, Netlify, GitHub Pages or similar services. No domain or hosting has been connected.

### Key routes

- `#/` — Landing page, led by **Collateral Style**
- `#/foyer` — Imagined museum entrance and three Victory Merch glass cases
- `#/gallery-1` — All thirteen final couture portraits
- `#/artwork/09` — Individual artwork viewer (01–13)
- `#/gallery-2` — All thirteen close-up details
- `#/study/09` — Individual detail view, evidence discussion and sources (01–13)
- `#/gallery-3` — Editorial wall prints and display-case caps, separate from shop
- `#/merch/09` — Individual merch exhibition view (01–13)
- `#/shop` — Gift shop catalogue, all thirteen items **Out of Stock**
- `#/product/09` — Product detail (01–13), disabled purchase action
- `#/about` — Curatorial statement, fictional-institution disclaimer

### Exhibition assets and content

- Images were prepared from the user's provided files and compressed as `.webp` for web display. 13 portrait artworks, 13 cap product images, 13 detail photographs and the available Victory Merch editorial photographs are integrated.
- `data.js` is the offline exhibition data consumed by the website. `data.json` is an equivalent source for future CMS or framework migration.
- Gallery II historical statements and source links follow the supplied curatorial annotation packet. The Christmas Strike merchandise slogan is overridden to **PEACE ON EARTH / TERMS MAY APPLY**, per the user's newer decision.
- The logo uses the divided gold-and-black laurel wreath with crossed missile and millinery needle from the supplied exhibition identity artwork. No British royal seals are used.
- These are **digital artwork concepts**; neither a real museum installation nor physical inventory is represented. The imagined V&A context is clearly disclosed.

### Shop policy in this version

Every Victory Merch listing is labelled **OUT OF STOCK**. No prices, cart, payments, checkout, stock counts, order requests, shipping claims, or mailing-list forms are implemented. When physical products or editions are defined, these pages can be wired to a separate commerce platform.

### Future finishing work

Check all final image selections and attribution, complete any missing campaign/editorial pairs, refine factual source review, add final image alt text, confirm whether to use the real V&A name in marketing, select a domain, and connect hosting. Bodoni Moda and IBM Plex font files are loaded from Google Fonts when online; system-font fallbacks are defined.
