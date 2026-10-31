/* Lyrics and notes are already in the HTML. This only enhances their navigation. */
(() => {
  'use strict';
  const page = document.querySelector('.panic-lyrics-page');
  if (!page) return;
  const panel = page.querySelector('#artist-notes');
  const list = page.querySelector('#notes-list');
  const status = page.querySelector('#notes-status');
  const showAllButton = page.querySelector('#show-all-notes');
  const panelClose = page.querySelector('#close-notes');
  const notes = Array.from(list.querySelectorAll('.annotation-note'));
  const noteById = new Map(notes.map(note => [note.id, note]));
  const triggers = Array.from(page.querySelectorAll('.annotated-line'));
  const mobile = window.matchMedia('(max-width: 900px)');
  const inline = document.createElement('div');
  inline.className = 'inline-notes';
  inline.hidden = true;
  const inlineHeader = document.createElement('div');
  inlineHeader.className = 'inline-notes-header';
  const inlineLabel = document.createElement('p');
  inlineLabel.textContent = 'ARTIST’S ANNOTATIONS';
  const inlineClose = document.createElement('button');
  inlineClose.type = 'button';
  inlineClose.className = 'notes-close';
  inlineClose.textContent = 'Close notes';
  inlineHeader.append(inlineLabel, inlineClose);
  inline.append(inlineHeader);
  let activeLine = null;
  let selected = [];
  let all = false;
  const idsFor = trigger => trigger.dataset.notes.split(' ').filter(id => noteById.has(id));

  function updateTriggers() {
    for (const trigger of triggers) {
      const expanded = idsFor(trigger).some(id => {
        const note = noteById.get(id);
        return !note.hidden && note.open;
      });
      trigger.setAttribute('aria-expanded', String(expanded));
      trigger.classList.toggle('is-selected', trigger === activeLine);
    }
  }

  function render() {
    // Restore source order before moving the active notes into their mobile slot.
    for (const note of notes) list.append(note);
    inline.hidden = true;
    inline.remove();
    for (const note of notes) {
      const visible = all || selected.includes(note.id);
      note.hidden = !visible;
      note.open = visible;
    }
    if (mobile.matches && !all && activeLine && selected.length) {
      activeLine.closest('.lyric-line').after(inline);
      for (const id of selected) inline.append(noteById.get(id));
      inline.hidden = false;
    }
    panel.hidden = mobile.matches && !all;
    panelClose.hidden = !selected.length || all;
    showAllButton.textContent = all ? 'Close all annotations' : `Show all ${notes.length} annotations`;
    showAllButton.setAttribute('aria-pressed', String(all));
    status.textContent = all
      ? `${notes.length} artist annotations. Each note has a link you can share.`
      : selected.length
        ? `${selected.length} ${selected.length === 1 ? 'annotation' : 'annotations'} for the selected lyric.`
        : 'Choose an underlined lyric to read its annotation, or show all notes.';
    updateTriggers();
  }

  function setFragment(id) {
    try {
      const url = new URL(window.location.href);
      url.hash = id || '';
      window.history.replaceState(null, '', url.href);
    } catch (_) {
      // Notes still work if a browser restricts history changes on local files.
    }
  }

  function selectLine(trigger, noteId, focus = false) {
    activeLine = trigger;
    selected = idsFor(trigger);
    all = false;
    render();
    if (focus) noteById.get(noteId || selected[0])?.querySelector('summary').focus({preventScroll:true});
  }

  function closeSelected() {
    const origin = activeLine;
    selected = [];
    activeLine = null;
    all = false;
    render();
    setFragment('');
    origin?.focus({preventScroll:true});
  }

  function followFragment(focus = false) {
    const id = window.location.hash.slice(1);
    if (!noteById.has(id)) return;
    const trigger = triggers.find(line => idsFor(line).includes(id));
    if (!trigger) return;
    selectLine(trigger, id, focus);
    const scrollToLyric = () => trigger.closest('.lyric-line').scrollIntoView({block:'start',behavior:'instant'});
    if (focus) scrollToLyric();
    else window.requestAnimationFrame(scrollToLyric);
  }

  for (const trigger of triggers) {
    trigger.setAttribute('aria-controls', idsFor(trigger).join(' '));
    trigger.addEventListener('click', event => {
      // Preserve open-in-new-tab and copy-link behavior.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      event.preventDefault();
      const id = idsFor(trigger)[0];
      selectLine(trigger, id, true);
      setFragment(id);
    });
  }
  for (const note of notes) note.addEventListener('toggle', updateTriggers);
  for (const link of page.querySelectorAll('.note-permalink')) {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      event.preventDefault();
      setFragment(link.hash.slice(1));
      followFragment(true);
    });
  }
  inlineClose.addEventListener('click', closeSelected);
  panelClose.addEventListener('click', closeSelected);
  showAllButton.addEventListener('click', () => {
    all = !all;
    selected = [];
    activeLine = null;
    setFragment('');
    render();
  });
  page.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected.length && !all) closeSelected();
  });
  window.addEventListener('hashchange', () => followFragment(true));
  mobile.addEventListener('change', render);
  page.classList.add('annotations-ready');
  showAllButton.hidden = false;
  render();
  followFragment(false);
})();
