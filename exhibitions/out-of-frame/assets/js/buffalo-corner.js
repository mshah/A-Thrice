(() => {
  'use strict';
  const data=window.OOF_BUFFALO_DATA;
  if(!data || !Array.isArray(data.scenes))return;
  const CARDS=data.scenes, SOURCES=data.sources;
  const map=Object.fromEntries(CARDS.map(c=>[c.id,c]));
  const categories=['All','The image','Labour','Social life','Land & life'];
  const stage=document.getElementById('stage'), win=document.getElementById('stageWindow');
  const image=document.getElementById('sceneImage'), hotspots=document.getElementById('hotspots');
  const chapterList=document.getElementById('chapterList'), filterEl=document.getElementById('chapterFilters');
  const panel=document.getElementById('researchPanel'), revealBtn=document.getElementById('revealBtn');
  const originalBtn=document.getElementById('originalBtn'), caption=document.getElementById('stageCaption');
  const hint=document.getElementById('stageHint'), zoomIn=document.getElementById('zoomIn'), zoomOut=document.getElementById('zoomOut');
  const detailDialog=document.getElementById('detailDialog'), detailFullImage=document.getElementById('detailFullImage'), detailFullCaption=document.getElementById('detailFullCaption');
  const stageOriginal='../assets/images/buffalo-corner-archival-view.jpg', stageColour='../assets/images/buffalo-corner-view.webp';
  let revealed=false, original=false, active=null, tab='story', filter='All', zoom=1;
  const esc=str=>String(str ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth=()=>reduced()?'auto':'smooth';
  const fits=c=>filter==='All'||c.theme===filter;

  function renderFilters(){
    filterEl.replaceChildren();
    for(const name of categories){
      const b=document.createElement('button');
      b.className='filter-chip';
      b.type='button';
      b.textContent=name;
      b.setAttribute('aria-pressed',String(name===filter));
      b.addEventListener('click',()=>{filter=name;renderFilters();renderNav();renderHotspots();});
      filterEl.append(b);
    }
  }

  function renderNav(){
    chapterList.replaceChildren();
    for(const c of CARDS.filter(fits)){
      const b=document.createElement('button');
      b.className='chapter-btn'+(active===c.id?' active':'');
      b.type='button';
      b.setAttribute('aria-current',active===c.id?'true':'false');
      b.innerHTML=`<span>${esc(c.id.slice(-2))}</span><span>${esc(c.short || c.title)}</span>`;
      b.addEventListener('click',()=>openCard(c.id));
      chapterList.append(b);
    }
  }

  function createHotspot(c){
    const b=document.createElement('button');
    b.className='hotspot'+(active===c.id?' active':'');
    b.type='button';
    b.style.left=c.x+'%';
    b.style.top=c.y+'%';
    b.setAttribute('aria-label',c.id+': '+c.title);
    b.textContent=c.id.slice(-2);
    b.addEventListener('click',()=>openCard(c.id));
    return b;
  }

  function renderHotspots(){
    hotspots.replaceChildren();
    if(!revealed || original)return;
    for(const c of CARDS.filter(fits))hotspots.append(createHotspot(c));
  }

  function moveTo(c){
    if(original)return;
    const width=stage.getBoundingClientRect().width;
    const desired=width*c.x/100-win.clientWidth/2;
    win.scrollTo({left:Math.max(0,desired),behavior:smooth()});
  }

  function openCard(id){
    active=id;
    tab='story';
    if(!revealed){
      revealed=true;
      revealBtn.setAttribute('aria-pressed','true');
      revealBtn.textContent='Hide chapter markers';
    }
    if(original)setOriginal(false);
    renderNav();
    renderHotspots();
    renderDetail();
    moveTo(map[id]);
    const nextHash='#'+id.toLowerCase();
    if(location.hash!==nextHash){
      try{history.replaceState(null,'',nextHash)}catch(e){location.hash=nextHash;}
    }
    if(window.innerWidth<901){panel.scrollIntoView({behavior:smooth(),block:'start'});}
  }

  function refsHtml(c){
    return '<ul class="source-list">'+c.sources.map(k=>{
      const r=SOURCES[k] || {label:'Source listed in master annotation packet',url:''};
      return `<li><strong>${esc(k)}.</strong> ${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)} ↗</a>`:esc(r.label)}<small>${r.url?'External source listed in packet':'Source label from packet'}</small></li>`;
    }).join('')+'</ul>';
  }

  function detailPhoto(c){
    const title=(c.detailTitle || c.short || c.title);
    const detailCaption=c.visible;
    const sourceType=c.id==='BC-01'?'Archival source in the reconstruction':'Contemporary reconstruction';
    return `<section class="image-evidence" aria-label="Visual close-up for ${esc(c.id)}"><div class="image-evidence-heading"><span class="eyebrow">Look closer · ${esc(c.id)}</span><span class="image-evidence-type">${esc(sourceType)}</span></div><h4>${esc(title)}</h4><div class="image-evidence-grid"><figure class="image-close"><button type="button" class="detail-image-button" id="openDetail" aria-label="Enlarge detail: ${esc(title)}"><img src="${esc(c.detail)}" alt="${esc(detailCaption)}" decoding="async"><span class="detail-enlarge" aria-hidden="true">↗ Enlarge detail</span></button><figcaption>${esc(detailCaption)}</figcaption></figure><aside class="image-locator"><div class="locator-heading">Where this detail sits</div><img src="${esc(c.locator)}" alt="Overview of the frozen artwork with the selected detail highlighted in gold" loading="lazy" decoding="async"><p>The highlighted area locates this chapter in the artwork. It does not establish where an undocumented action occurred.</p><button class="btn sm" type="button" id="locateVignette">Find this in the panorama ↑</button></aside></div></section>`;
  }

  function wireDetailImage(c){
    const open=panel.querySelector('#openDetail'), locate=panel.querySelector('#locateVignette');
    if(open)open.addEventListener('click',()=>openDetailImage(c.detail,c.visible));
    if(locate)locate.addEventListener('click',()=>{if(original)setOriginal(false);setZoom(1.5);moveTo(c);win.scrollIntoView({behavior:smooth(),block:'center'});});
  }

  function openDetailImage(src,captionText){
    detailFullImage.src=src;
    detailFullImage.alt=captionText;
    detailFullCaption.textContent=captionText;
    if(typeof detailDialog.showModal==='function')detailDialog.showModal();
    else detailDialog.setAttribute('open','');
  }

  detailDialog.querySelector('.detail-dialog-close').addEventListener('click',()=>detailDialog.close());
  detailDialog.addEventListener('click',event=>{if(event.target===detailDialog)detailDialog.close()});

  function renderEmpty(){
    panel.innerHTML=`<span class="eyebrow">First encounter · The wider camp</span><h3>Look around before you read.</h3><p class="story">Find the small sepia portrait within the colour field. Notice the camera on the left, the porters and wagon, the working camp, the dancers, the cattle and the wetland beyond.</p><p class="question">What appears to be a single trophy image becomes more complicated when you begin to investigate it.</p><div style="margin-top:26px"><button id="startStories" type="button" class="btn primary">Explore the thirteen chapters ↗</button></div>`;
    panel.querySelector('#startStories').addEventListener('click',()=>{reveal();openCard('BC-01')});
  }

  function renderDetail(){
    if(!active){renderEmpty();return}
    const c=map[active];
    panel.innerHTML=`<span class="eyebrow">${esc(c.id)} · ${esc(c.theme)}</span><h3>${esc(c.title)}</h3><p class="question">${esc(c.question)}</p>${detailPhoto(c)}<div class="research-tabs" role="tablist" aria-label="Research layers"><button class="research-tab" type="button" role="tab" data-tab="story" aria-selected="${tab==='story'}">The story</button><button class="research-tab" type="button" role="tab" data-tab="evidence" aria-selected="${tab==='evidence'}">Evidence &amp; limits</button><button class="research-tab" type="button" role="tab" data-tab="sources" aria-selected="${tab==='sources'}">Sources</button></div><div id="researchBody" role="tabpanel"></div><p class="disclosure">Evidence grades apply to individual claims: A visible in the original photograph; B documented at the event or expedition; C contextual evidence; D artistic reconstruction.</p><div class="next-prev"><button id="prevChapter" type="button">← Previous</button><button id="nextChapter" type="button">Next →</button></div>`;
    panel.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.tab;renderDetail()}));
    const target=panel.querySelector('#researchBody');
    if(tab==='story')target.innerHTML=`<p class="story">${esc(c.annotation)}</p>`;
    else if(tab==='evidence')target.innerHTML=`<p>${esc(c.evidence)}</p><div class="evidence-box"><strong>Claim-level evidence</strong><p>${esc(c.grades)}</p></div><h4>Limits of the record</h4><p>${esc(c.limits)}</p>`;
    else target.innerHTML=`<p>Selected sources for this chapter. A source describing the expedition does not, by itself, establish a figure’s position in the reconstructed scene.</p>${refsHtml(c)}`;
    wireDetailImage(c);
    const idx=CARDS.findIndex(t=>t.id===c.id);
    panel.querySelector('#prevChapter').addEventListener('click',()=>openCard(CARDS[(idx-1+CARDS.length)%CARDS.length].id));
    panel.querySelector('#nextChapter').addEventListener('click',()=>openCard(CARDS[(idx+1)%CARDS.length].id));
  }

  function reveal(){
    revealed=true;
    revealBtn.setAttribute('aria-pressed','true');
    revealBtn.textContent='Hide chapter markers';
    renderHotspots();
    renderNav();
    hint.textContent='Choose a marker or research chapter. Its position is a navigation anchor, not proof of historical placement.';
  }

  function toggleReveal(){
    if(!revealed){
      reveal();
      if(!active)openCard('BC-01');
    }else{
      revealed=false;
      revealBtn.setAttribute('aria-pressed','false');
      revealBtn.textContent='Reveal thirteen chapters';
      renderHotspots();
      hint.textContent='Story markers hidden. Move freely through the image.';
    }
  }

  function setZoom(newZ){
    zoom=Math.min(2,Math.max(1,newZ));
    const natural=Math.max(win.clientWidth,1000);
    stage.style.width=(natural*zoom)+'px';
    zoomOut.disabled=zoom<=1;
    zoomIn.disabled=zoom>=2;
    if(active&&!original)moveTo(map[active]);
  }

  function setOriginal(state){
    original=state;
    originalBtn.setAttribute('aria-pressed',String(original));
    originalBtn.textContent=original?'Return to panorama':'Original photograph';
    image.src=original?stageOriginal:stageColour;
    image.alt=original?'The unchanged buffalo trophy photograph with five named men before a tent and three buffalo heads.':'Interpretive full-colour panorama of the Kamiti camp containing an unchanged inset of the original sepia photograph.';
    stage.classList.toggle('original',original);
    stage.style.width=original?'100%':'';
    if(!original)setZoom(zoom);
    zoomIn.disabled=original;
    zoomOut.disabled=original;
    renderHotspots();
    caption.textContent=original?'BC-01: archival photograph, shown as a browser JPEG copy of the full original scan; the TIFF is retained separately unchanged.':'Accepted working panorama v2.1 · This is a browser-optimised display copy; the archival original is separately available unchanged.';
    hint.textContent=original?'The original does not document the reconstructed surroundings.':'Swipe, pan or choose a research marker to investigate.';
    if(original){
      panel.innerHTML=`<span class="eyebrow">The historical original</span><h3>The image that survives.</h3><p>The original full-bordered archival scan is shown without alteration. It identifies Richard John Cuninghame, Kermit Roosevelt, Theodore Roosevelt, Edmund Heller and Hugh Heatley with three buffalo trophy heads in front of a tent. The colour panorama around it is a contemporary artistic reconstruction, not a newly discovered wider negative.</p><p><a class="text-link" href="../assets/images/buffalo-corner-archival-original.tiff" download>Download the unchanged source TIFF</a></p><button type="button" id="backExpanded" class="btn primary">Return to the expanded artwork</button>`;
      panel.querySelector('#backExpanded').addEventListener('click',()=>setOriginal(false));
    }else renderDetail();
  }

  function reset(){
    active=null;
    revealed=false;
    original=false;
    filter='All';
    tab='story';
    zoom=1;
    stage.classList.remove('original');
    image.src=stageColour;
    stage.style.width='';
    originalBtn.textContent='Original photograph';
    originalBtn.setAttribute('aria-pressed','false');
    revealBtn.textContent='Reveal thirteen chapters';
    revealBtn.setAttribute('aria-pressed','false');
    caption.textContent='Accepted working panorama v2.1 · This is a browser-optimised display copy; the archival original is separately available unchanged.';
    hint.textContent='On smaller screens, swipe horizontally to move through the scene.';
    renderFilters();renderNav();renderHotspots();renderEmpty();
    zoomOut.disabled=true;zoomIn.disabled=false;win.scrollLeft=0;
    try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
    document.getElementById('artwork-intro').scrollIntoView({behavior:smooth()});
  }

  document.getElementById('enterBuffalo').addEventListener('click',()=>document.getElementById('experience').scrollIntoView({behavior:smooth()}));
  document.getElementById('originalFromLanding').addEventListener('click',()=>{setOriginal(true);document.getElementById('experience').scrollIntoView({behavior:smooth()})});
  revealBtn.addEventListener('click',toggleReveal);
  originalBtn.addEventListener('click',()=>setOriginal(!original));
  zoomIn.addEventListener('click',()=>setZoom(+(zoom+.25).toFixed(2)));
  zoomOut.addEventListener('click',()=>setZoom(+(zoom-.25).toFixed(2)));
  document.getElementById('resetBuffalo').addEventListener('click',reset);

  let dragging=false,lastX=0;
  win.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;if(e.pointerType==='touch')return;dragging=true;lastX=e.clientX;win.classList.add('dragging');try{win.setPointerCapture(e.pointerId)}catch(_){}});
  win.addEventListener('pointermove',e=>{if(!dragging)return;win.scrollLeft+=lastX-e.clientX;lastX=e.clientX;});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])win.addEventListener(event,()=>{dragging=false;win.classList.remove('dragging');});
  win.addEventListener('keydown',e=>{if(e.target!==win)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){win.scrollBy({left:e.key==='ArrowRight'?110:-110,behavior:smooth()});e.preventDefault();}});
  window.addEventListener('resize',()=>{if(!original){stage.style.width=zoom>1?(Math.max(win.clientWidth,1000)*zoom)+'px':'';if(active)moveTo(map[active]);}});
  window.addEventListener('hashchange',()=>{const id=location.hash.slice(1).toUpperCase();if(map[id]&&id!==active)openCard(id);});

  renderFilters();renderNav();renderHotspots();renderEmpty();zoomOut.disabled=true;
  const initial=location.hash.slice(1).toUpperCase();
  if(map[initial])openCard(initial);
})();
