# Controlled Burn lyrics, annotations and Bandcamp overlay

Apply this after the previous **A-Thrice lyrics index and Citizen of Empire lyrics overlay**. Extract the ZIP into the **A-Thrice website root**, beside the main `index.html`. Merge folders and replace the included files.

This overlay includes root-level `lyrics.html` and `lyrics-index.css` files. The ZIP should be extracted at the website root.

## Included

- Updated `albums/controlled-burn.html` with the full twelve-track Bandcamp album player and a linked track list.
- Twelve song pages in `albums/controlled-burn/`, each with lyrics, an individual Bandcamp player, an About section, artist annotations, further notes and reading references.
- The annotation controller and stylesheet for these pages.
- An updated central lyrics index listing Controlled Burn’s twelve local annotated song pages. It now covers 42 locally annotated songs, plus the nine original Citizen of Empire lyric pages.
- The existing master-index stylesheet, included unchanged.

The Controlled Burn track order follows the public Bandcamp album: Smoke Season is track 5 and Polyester Girl is track 6. The album includes the packet’s album-level About text, recurring images and connections across the A-Thrice catalogue in expandable sections.

## Reading and listening

Underlined lyric lines open their annotations. Notes appear beside the lyrics on wider screens and below the selected line on smaller screens. Readers can show all notes, close the selected notes, or share a link to an individual annotation. Opening notes keeps the player in place.

Lyrics and annotations are ordinary HTML. They remain readable with JavaScript disabled; expandable notes and direct fragment links still work. Each player has a direct Bandcamp listening/purchase link as a fallback.

## Sources and wording

Lyrics, About sections and 163 annotations come from **A-THRICE_CONTROLLED_BURN_Genius_Annotation_Packet_FULL.docx** in Google Drive. All 1,501 lyric lines are preserved. The packet’s distinction between documented intent, canon echoes, secondary readings and factual context is retained.

Internal drafting material, empty metadata headings and source-document workflow notes are omitted from the public pages. A few publication references were adjusted for the website, such as replacing “belongs on Genius” with wording about a secondary interpretation. Lyric wording is unchanged.

Bandcamp: https://a-thrice.bandcamp.com/album/controlled-burn

Album ID: `3000049631`. Each track player uses its matching public-release track ID. The website source baseline is GitHub commit `fce2d746fa30bf863a40db28d3a8d49a01c2159b`, together with the central index delivered in the preceding overlay.

## Checks and local review

The patch passed lyric-fidelity, annotation-text, HTML structure, local-link, player-ID and public player-configuration checks. The annotation controls passed 24 desktop/mobile DOM scenarios covering selection, close, show all, resizing, shared links, keyboard Escape, focus return, new-tab navigation and player continuity.

A browser preview was unavailable. After installation, check the visual layout on desktop and mobile and test live Bandcamp playback. No playback was started during the automated checks. Embedded audio requires an internet connection.

Only the Controlled Burn album files and its entry on the master index are updated. Other album pages, song pages, images, exhibition files and global styles are outside this overlay.
