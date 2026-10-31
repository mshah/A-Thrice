# Annotation labels overlay

Apply this after the latest Controlled Burn overlay. Extract the ZIP into the **A-Thrice website root**, beside the main `index.html`. Merge the `albums` folder and replace the included files. Reload the lyric pages after installation.

This updates all 42 annotated song pages across Panic by Design, Citizen of Empire: Afterlives and Controlled Burn, along with their annotation controllers and scoped stylesheets.

The annotation box now says **“Artist’s annotation for the selected lyric.”** Annotation totals are also removed from the “Show all annotations” button, the complete-notes status and the badges beside lyric lines. Screen-reader labels now say “Read the artist’s annotation.” The lyric layout uses the space previously reserved for count badges.

The original Citizen of Empire lyric pages already link to the Afterlives notes and have no counted annotation box.

Lyric text, authored notes, players, links and fragment IDs were compared with the preceding versions. Annotation controls passed 84 desktop/mobile DOM scenarios covering selection, closing, showing all notes, resizing, shared links, keyboard Escape, focus return, new-tab navigation and player continuity. Browser layout and live playback were not tested.

Source baseline: GitHub commit `5f1be965226c9a65e7593952b9e996effa820690` for Panic by Design and Afterlives, plus the Controlled Burn overlay supplied in the preceding patch.
