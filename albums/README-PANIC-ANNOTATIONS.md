# Panic by Design — annotated lyrics overlay

Extract all contents of this ZIP directly into your existing **A-Thrice/albums** folder. Replace `panic-by-design.html` and merge the `panic-by-design` folder. Do not create an additional `albums` folder inside `albums`.

This overlay changes only the Panic by Design album area. It preserves the website's existing header, navigation, cover art, fonts and global styles, including the separate Millinery typography and landing-image updates.

## Included

- Updated album page with a Bandcamp album player and linked tracklist.
- Thirteen song pages, each with its corresponding Bandcamp player. Suspicious Activity, Muted Thread and For Your Safety are tracks 11–13 in the public album sequence.
- All 606 annotations from the supplied packet, linked to their lyric passages.
- Shared, scoped styles and an annotation controller in `panic-by-design/annotations.css` and `panic-by-design/annotations.js`.

## Reading experience

Underlined lyric lines open the relevant notes. On wider screens, notes appear beside the lyrics. On screens 900 pixels wide or narrower, the notes open beneath the selected line. “Show all annotations” opens the complete commentary. “Close notes” or Escape returns to the lyrics. Each annotation has its own shareable fragment link.

The lyrics and notes are included directly in each HTML page. They do not require a database, a build step or a JSON fetch, and remain readable if JavaScript is disabled. With JavaScript disabled, annotation links jump to the expandable notes below the lyrics.

There is no autoplay. Opening and closing annotations does not recreate the Bandcamp player. Switching to a different HTML page starts a new page and does not preserve playback across pages.

## Source choices

Annotations and song commentary come from **Panic by Design Annotation Packet** in Google Drive. Lyric wording follows **Panic by Design Suno Formatted Lyrics**, the supplied definitive source, including where the packet omits full lyrics or quotes earlier wording. Production prompts and performance instructions have been removed from the reading pages; song-section labels remain.

Twenty-six annotation headings were brought into alignment with the definitive lyric wording. Explanations were retained, with small changes where necessary to remove obsolete wording or internal drafting instructions. No replacement lyric lines were invented.

The thirteen-track album order, track links, durations and player IDs were checked against https://a-thrice.bandcamp.com/album/panic-by-design. The source website baseline is GitHub commit `80cbb2becdbf3a925844cbb87edaafbda853f4a6`.

## Editing later

Each song is a normal HTML file. Edit the lyric text in its `.lyric-text` spans and edit the commentary inside the corresponding `.annotation-body` blocks. Keep `line-…` and `note-…` IDs stable so annotation links continue to work. The `data-notes` attribute on an annotated lyric lists the note IDs associated with that line.

## Validation and local review

The patch was checked for lyric fidelity, note coverage, HTML structure, internal links, player IDs and annotation interactions in both layout modes. The Bandcamp player endpoints were checked without starting playback.

A browser preview was unavailable in the build environment. After installing, open `panic-by-design.html` and check the layout at desktop and mobile widths, listen to several tracks, and try opening, sharing and closing annotations. The embedded players require an internet connection.

## Public track update — 31 October 2026

This correction overlay adds Bandcamp players for tracks 11–13 and updates the album and song-page labels to the public thirteen-track release. Apply it after the original annotated-lyrics overlay by extracting its contents into the same `albums` folder. Lyric text, all 606 annotations, shared styles and annotation behavior are preserved.
