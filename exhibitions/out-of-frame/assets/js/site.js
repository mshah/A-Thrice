(() => {
  const manifest=window.OOF_COLLECTION || {};
  document.querySelectorAll("[data-work-status]").forEach(el=>{const x=manifest[el.dataset.workStatus];if(x)el.textContent=x.label});
  document.querySelectorAll("[data-work-cta]").forEach(el=>{const x=manifest[el.dataset.workCta];if(x)el.textContent=x.cta});
  const toggle=document.querySelector('.nav-toggle'), links=document.getElementById('site-links');
  if(!toggle||!links)return;
  toggle.addEventListener('click',()=>{
    const expanded=toggle.getAttribute('aria-expanded')==='true';
    toggle.setAttribute('aria-expanded',String(!expanded));
    links.classList.toggle('open',!expanded);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && links.classList.contains('open')){
      links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();
    }
  });
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

  // Open the native disclosure when entering from a history link or deep link.
  const historyDisclosure=document.querySelector('details.history-disclosure');
  if(historyDisclosure){
    const openForFragment=()=>{
      const target=decodeURIComponent(window.location.hash.slice(1));
      const element=target && document.getElementById(target);
      if(element && (element===historyDisclosure || historyDisclosure.contains(element)))historyDisclosure.open=true;
    };
    document.querySelectorAll('a[href="#history"]').forEach(link=>link.addEventListener('click',()=>{historyDisclosure.open=true;}));
    document.querySelectorAll('a[href="#chapters"]').forEach(link=>link.addEventListener('click',()=>{historyDisclosure.open=false;}));
    window.addEventListener('hashchange',openForFragment);
    openForFragment();
  }
})();