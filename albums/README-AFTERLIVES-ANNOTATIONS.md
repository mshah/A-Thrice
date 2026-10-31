# Citizen of Empire: Afterlives — annotated lyrics overlay

Extract all contents of this ZIP directly into your existing **A-Thrice/albums** folder. Replace `citizen-of-empire-afterlives.html` and merge the `citizen-of-empire-afterlives` folder. Do not create a second `albums` folder inside `albums`.

## Included

- Updated album page with its Bandcamp album player and seventeen-song tracklist.
- Seventeen individual song pages, each with the correct Bandcamp track player, lyrics and artist annotations.
- 547 annotations, with overlapping packet entries consolidated.
- Shared styles and an annotation controller in `citizen-of-empire-afterlives/annotations.css` and `annotations.js`.

The tracklist follows the public Bandcamp release, including **Suspended Sentence** at track 6. All seventeen songs are included in one sequence. The page title **H-1B-Sides** follows the supplied lyrics and packet; its player points to the Bandcamp track labelled **H1-B-Sides**.

The patch uses its own scoped annotation files and preserves the website’s existing global styles, fonts, cover art and navigation. It does not replace any Panic by Design files or exhibition files.

## Reading and listening

Underlined lyric lines open their artist annotations. On wider screens, notes appear alongside the lyrics. At widths of 900 pixels or less, notes open beneath the selected line. “Show all annotations” opens the complete commentary. Close notes with the button or Escape. Each note has a shareable link.

The lyrics and notes are included directly in the HTML. There is no database, build step or JSON fetch. With JavaScript disabled, the links lead to expandable notes following the lyrics. There is no autoplay. Opening notes keeps the current player intact; navigating to another HTML page starts a new page and does not preserve playback between songs.

## Source handling

Annotations, song overviews, language notes and interpretive context come from **A-Thrice: Citizen of Empire Afterlives Genius Packet**. Lyrics follow **Citizen of Empire: Afterlives Album Suno Formatted Lyrics** when the packet omits lyrics or quotes an earlier wording. Production prompts and performance instructions are omitted from the lyric text; section labels and useful voice changes remain.

The packet contains duplicate entries for 3 Migrations Deep and H-1B-Sides. Distinct annotation passages were retained and duplicate headings consolidated. Thirty-two annotation headings were aligned with the lyric wording, including phonetic Gujarati and Swahili spellings and excerpts that the packet compresses across several lines. Internal drafting references were removed from public-facing commentary.

British Asian Standard Time has two complete versions in the Suno document. The title-tagged version, which agrees more closely with the published Bandcamp lyrics, is used consistently; the two versions are not mixed. Suspended Sentence is filed under the earlier title Same Machine, Younger Age in part of the packet; the website uses the current released title.

The album order, durations, track links and player IDs were checked against https://a-thrice.bandcamp.com/album/citizen-of-empire-afterlives. The source website baseline is GitHub commit `80cbb2becdbf3a925844cbb87edaafbda853f4a6`.

## Editing later

Each song is an ordinary HTML file. Edit lyrics in `.lyric-text` spans and notes in `.annotation-body` blocks. Keep `line-…` and `note-…` IDs stable so shared links continue to work. An annotated line’s `data-notes` attribute lists its associated note IDs.

## Validation and local review

The patch was checked for source fidelity, annotation coverage, HTML structure, internal file links, shared note links, correct players and annotation interactions in desktop and mobile layout modes. All eighteen Bandcamp player endpoints returned valid configurations without starting playback.

A browser preview was unavailable in the build environment. After installing, open the album page and review it at desktop and mobile widths, listen to several tracks, and try opening, closing and sharing annotations. Embedded playback requires an internet connection.
