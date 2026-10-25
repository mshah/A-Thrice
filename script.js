'use strict';
const albumInfo = {
  afterlives: {
    number:'01 / RELEASED 19 AUGUST 2026',
    title:'Citizen of Empire: Afterlives',
    sub:'What survives an empire after its flags come down?',
    paragraphs:[
      'The expanded version of Citizen of Empire widens the frame from individual identity to the infrastructure of empire: ports, papers, passports, customs, legal systems and cultural inheritance.',
      'The record moves from being misread to rewriting the systems and routes that shaped the modern world. Its final movement finds new life in a city made by migration.'
    ],
    tags:['POLITICAL HIP-HOP','TRIP-HOP','DIASPORA','INFRASTRUCTURE'],
    link:'https://a-thrice.bandcamp.com/album/citizen-of-empire-afterlives'
  },
  panic: {
    number:'02 / RELEASED 28 APRIL 2026',
    title:'Panic by Design',
    sub:'A concept album about fear as infrastructure.',
    paragraphs:[
      'Panic by Design follows the machinery that teaches people to live in a state of permanent alert: media, platforms, surveillance systems, institutional language and the monetisation of public dread.',
      'It moves through overstimulation, bureaucracy and the human cost of routine emergency, searching for lucidity rather than a comforting illusion of safety.'
    ],
    tags:['POLITICAL HIP-HOP','TECHNOLOGY','FEAR ECONOMY','SATIRE'],
    link:'https://a-thrice.bandcamp.com/album/panic-by-design'
  },
  empire: {
    number:'03 / RELEASED 9 MARCH 2026',
    title:'Citizen of Empire',
    sub:'Identity is a whole history, not a category.',
    paragraphs:[
      'Citizen of Empire is about migration, belonging and the absurdity of being constantly misread. It traces a life across Britain, East Africa, India and the United States—and the historical scripts waiting at every border.',
      'Sharp, personal and politically alert, the album answers reductive questions with music rather than accepting the terms of the question.'
    ],
    tags:['POLITICAL HIP-HOP','IDENTITY','MIGRATION','EMPIRE'],
    link:'https://a-thrice.bandcamp.com/album/citizen-of-empire'
  }
};
const nav = document.getElementById('mainNav');
const toggle = document.getElementById('menuToggle');
function closeNav(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');document.body.classList.remove('nav-open');}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('nav-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeNav();});
const dialog = document.getElementById('albumDialog');
const content = document.getElementById('dialogContents');
const close = document.getElementById('dialogClose');
let prevFocus = null;
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{
  const x = albumInfo[b.dataset.modal]; if(!x)return;
  prevFocus = document.activeElement;
  content.innerHTML=`<div class="eyebrow">${x.number}</div><h2 id="dialogTitle">${x.title}</h2><p class="dialog-sub">${x.sub}</p>${x.paragraphs.map(p=>`<p>${p}</p>`).join('')}<div class="dialog-tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="action action-primary" href="${x.link}" target="_blank" rel="noopener noreferrer">Listen on Bandcamp ↗</a>`;
  dialog.showModal();
  close.focus();
}));
close.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{prevFocus?.focus?.();});
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{rootMargin:'0px 0px -30px 0px',threshold:0.06});
document.querySelectorAll('.album-card,.exhibit-card,.prints-text,.print-display,.section-heading,.about-grid').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
