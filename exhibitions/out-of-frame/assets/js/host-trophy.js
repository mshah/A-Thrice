(() => {
  'use strict';
  const data = window.OOF_HOST_DATA;
  if (!data || !Array.isArray(data.scenes) || data.scenes.length !== 13) return;
  const cards = data.scenes, sourceMap = data.sources;
  const byId = Object.fromEntries(cards.map(card => [card.id, card]));
  const filters = document.getElementById('cbChapterFilters');
  const chapterList = document.getElementById('cbChapterList');
  const panel = document.getElementById('cbResearchPanel');
  const concept = document.getElementById('cbStageConcept');
  const source = document.getElementById('cbStageSource');
  const conceptBtn = document.getElementById('cbConceptBtn');
  const sourceBtn = document.getElementById('cbSourceBtn');
  const stageCaption = document.getElementById('cbStageCaption');
  if (![filters, chapterList, panel, concept, source, conceptBtn, sourceBtn, stageCaption].every(Boolean)) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const displayName = card => card.title;
  let active = 'CB-01';
  let theme = 'All';
  let tab = 'story';
  let revealed = false, zoom = 1;
  const markers = document.getElementById('cbHotspots');
  const reveal = document.getElementById('cbRevealBtn');
  const viewport = document.getElementById('cbStageWindow');
  const dialog = document.getElementById('cbDetailDialog');
  function renderMarkers() {
    markers.replaceChildren();
    if (!revealed) return;
    cards.filter(matches).forEach(card => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'hotspot' + (card.id === active ? ' active' : '');
      button.style.left = card.x + '%'; button.style.top = card.y + '%';
      button.textContent = card.id.slice(-2); button.setAttribute('aria-label', card.id + ': ' + card.title);
      button.setAttribute('aria-pressed', String(card.id === active));
      button.addEventListener('click', () => selectCard(card.id, true)); markers.append(button);
    });
  }
  function locate() {
    showImageSlot('concept'); revealed = true; reveal.setAttribute('aria-pressed', 'true'); reveal.textContent = 'Hide chapter markers'; renderMarkers();
    viewport.scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center'});
    viewport.scrollTo({left: Math.max(0, concept.offsetWidth * byId[active].x / 100 - viewport.clientWidth / 2), behavior: reducedMotion() ? 'auto' : 'smooth'});
    markers.querySelector('.active')?.focus({preventScroll:true});
  }
  reveal.addEventListener('click', () => { revealed = !revealed; reveal.setAttribute('aria-pressed', String(revealed)); reveal.textContent = revealed ? 'Hide chapter markers' : 'Reveal thirteen chapters'; renderMarkers(); });
  for (const [id, delta] of [['cbZoomIn', .25], ['cbZoomOut', -.25]]) document.getElementById(id).addEventListener('click', () => {
    zoom = Math.max(1, Math.min(3, zoom + delta)); concept.style.width = (zoom * 100) + '%';
    document.getElementById('cbZoomOut').disabled = zoom === 1; document.getElementById('cbZoomIn').disabled = zoom === 3;
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());

  function showImageSlot(which) {
    const sourceMode = which === 'source';
    concept.hidden = sourceMode;
    source.hidden = !sourceMode;
    conceptBtn.setAttribute('aria-pressed', String(!sourceMode));
    reveal.disabled = sourceMode;
    document.getElementById('cbZoomIn').disabled = sourceMode || zoom === 3;
    document.getElementById('cbZoomOut').disabled = sourceMode || zoom === 1;
    sourceBtn.setAttribute('aria-pressed', String(sourceMode));
    stageCaption.textContent = sourceMode
      ? 'Historical photograph · browser view extracted from the approved composite, not the original JPEG file.'
      : 'Approved panorama · full photographic border retained; surrounding colour is interpretive reconstruction.';
  }
  conceptBtn.addEventListener('click', () => showImageSlot('concept'));
  sourceBtn.addEventListener('click', () => showImageSlot('source'));

  const matches = card => theme === 'All' || card.theme === theme;
  function renderFilters() {
    filters.replaceChildren();
    for (const name of data.themes) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-chip';
      button.textContent = name;
      button.setAttribute('aria-pressed', String(name === theme));
      button.addEventListener('click', () => {
        theme = name;
        if (!matches(byId[active])) active = cards.find(matches).id;
        tab = 'story';
        renderFilters();
        renderChapters();
        renderPanel();
      });
      filters.append(button);
    }
  }

  function renderChapters() {
    renderMarkers();
    chapterList.replaceChildren();
    for (const card of cards.filter(matches)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chapter-btn' + (active === card.id ? ' active' : '');
      button.setAttribute('aria-current', active === card.id ? 'true' : 'false');
      const number = document.createElement('span');
      number.textContent = card.id.slice(-2);
      const title = document.createElement('span');
      title.textContent = card.title;
      button.append(number, title);
      button.addEventListener('click', () => selectCard(card.id, true));
      chapterList.append(button);
    }
  }

  function sourceMarkup(keys) {
    return '<div class="cb-source-collection"><h4>Source references from the master packet</h4><ul>' +
      keys.map(key => {
        const ref = sourceMap[key];
        if (!ref) return '';
        const label = ref.url
          ? '<a href="' + esc(ref.url) + '" target="_blank" rel="noopener noreferrer">' + esc(ref.label) + ' ↗</a>'
          : '<span>' + esc(ref.label) + '</span>';
        return '<li><strong>' + esc(key) + '.</strong> ' + label + '<small>' + esc(ref.type) + '</small></li>';
      }).join('') + '</ul></div>';
  }

  function tabMarkup(card, choice) {
    if (choice === 'story') {
      return '<div class="story"><p>' + esc(card.annotation) + '</p></div>' +
        '<p class="cb-note">This is audience-facing draft text from ' + esc(data.artwork.packetVersion) + '; editorial approval is pending.</p>';
    }
    if (choice === 'evidence') {
      return '<div class="evidence-box"><strong>Historical foundation / scope</strong><p>' + esc(card.evidence) + '</p></div>' +
        '<div class="cb-subject-anchor"><strong>Source or contextual anchor:</strong> ' + esc(card.anchor) + '</div>' +
        '<p class="cb-note"><strong>Evidence grades are claim-specific:</strong> A = source-visible or exact-exposure fact; B = same expedition or album; C = contextual period evidence; D = openly disclosed artistic choice. A person documented elsewhere is not proven to stand beyond the edge of this photograph.</p>' + sourceMarkup(card.sourceKeys);
    }
    return '<div class="evidence-box"><strong>Do not claim or depict as fact</strong><p>' + esc(card.limits) + '</p></div>' +
      '<p class="cb-note"><strong>Visual status:</strong> ' + esc(card.visualStatus) + '. Marker placement does not establish historical identity.</p>';
  }

  function activateTab(next) {
    tab = next;
    const tabs = Array.from(panel.querySelectorAll('[role="tab"]'));
    const body = document.getElementById('cbTabContent');
    for (const button of tabs) {
      const selected = button.dataset.tab === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected) body.setAttribute('aria-labelledby', button.id);
    }
    body.innerHTML = tabMarkup(byId[active], tab);
  }

  function renderPanel() {
    const card = byId[active];
    if (!card) return;
    const visible = cards.filter(matches);
    const index = visible.indexOf(card);
    panel.innerHTML = `
      <div class="cb-panel-overline"><span>${esc(card.id)} · ${esc(card.theme)}</span><span>Research annotation draft</span></div>
      <h3 id="cbPanelTitle">${esc(displayName(card))}</h3>
      <p class="cb-question">${esc(card.question)}</p>
      <section class="image-evidence" aria-label="Chapter close-up"><div class="image-evidence-heading"><span class="eyebrow">Look closer · ${esc(card.id)}</span><span class="image-evidence-type">${esc(card.detailType)}</span></div><div class="image-evidence-grid"><figure class="image-close"><button class="detail-image-button" id="cbEnlarge" type="button" aria-label="Enlarge detail: ${esc(card.title)}"><img src="${esc(card.detail)}" alt="${esc(card.detailCaption)}"><span class="detail-enlarge">↗ Enlarge detail</span></button><figcaption>${esc(card.detailCaption)}</figcaption></figure><aside class="image-locator"><div class="locator-heading">Where this detail sits</div><img src="${esc(card.locator)}" alt="Panorama with this chapter’s crop outlined in gold"><p>A navigation anchor, not proof of an undocumented action’s location.</p><button class="btn sm" id="cbLocate" type="button">Find this in the panorama ↑</button></aside></div></section>
      <div class="research-tabs cb-tabs" role="tablist" aria-label="Read the selected chapter">
        <button class="research-tab" type="button" id="cb-tab-story" role="tab" data-tab="story" aria-controls="cbTabContent">The story</button>
        <button class="research-tab" type="button" id="cb-tab-evidence" role="tab" data-tab="evidence" aria-controls="cbTabContent">Evidence &amp; sources</button>
        <button class="research-tab" type="button" id="cb-tab-limits" role="tab" data-tab="limits" aria-controls="cbTabContent">Limits</button>
      </div>
      <div id="cbTabContent" class="cb-tabpanel" role="tabpanel"></div>
      <div class="cb-previous-next">
        <button type="button" data-step="-1" ${index === 0 ? 'disabled' : ''}>← Previous chapter</button>
        <button type="button" data-step="1" ${index === visible.length - 1 ? 'disabled' : ''}>Next chapter →</button>
      </div>
    `;
    const tabs = Array.from(panel.querySelectorAll('[role="tab"]'));
    for (const button of tabs) {
      button.addEventListener('click', () => activateTab(button.dataset.tab));
      button.addEventListener('keydown', event => {
        const start = tabs.indexOf(button);
        let next = start;
        if (event.key === 'ArrowRight') next = (start + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (start + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabs[next].dataset.tab);
        tabs[next].focus();
      });
    }
    panel.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
      const next = visible[index + Number(button.dataset.step)];
      if (next) selectCard(next.id, true, true);
    }));
    panel.querySelector('#cbLocate').addEventListener('click', locate);
    panel.querySelector('#cbEnlarge').addEventListener('click', () => {
      document.getElementById('cbDetailImage').src = card.detail;
      document.getElementById('cbDetailImage').alt = card.detailCaption;
      document.getElementById('cbDetailCaption').textContent = card.title + ' — ' + card.detailCaption;
      dialog.showModal();
    });
    activateTab(tab);
  }

  function selectCard(id, fromClick = false, focusPanel = false) {
    if (!byId[id]) return;
    active = id;
    if (!matches(byId[id])) { theme = 'All'; renderFilters(); }
    tab = 'story';
    renderChapters();
    renderPanel();
    if (fromClick) {
      const frag = '#' + active.toLowerCase();
      if (window.location.hash !== frag) {
        try { window.history.replaceState(null, '', frag); }
        catch (_) { window.location.hash = frag; }
      }
      if (focusPanel || window.innerWidth < 850) {
        panel.focus({preventScroll: true});
        panel.scrollIntoView({behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start'});
      }
    }
  }

  function fromHash() {
    const id = window.location.hash.slice(1).toUpperCase();
    if (byId[id]) selectCard(id, false);
  }
  renderFilters();
  renderChapters();
  renderPanel();
  showImageSlot('concept');
  fromHash();
  window.addEventListener('hashchange', fromHash);
})();