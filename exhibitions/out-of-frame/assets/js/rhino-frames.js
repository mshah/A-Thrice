(function(){
  const buttons = Array.from(document.querySelectorAll('[data-mode]'));
  const view = document.querySelector('.rhino-images');
  if (!buttons.length || !view) return;

  function setMode(mode){
    view.dataset.view = mode;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    const figures = Array.from(view.querySelectorAll('.rhino-image'));
    if(mode === 'both'){
      figures.forEach(fig => fig.hidden = false);
    } else if(mode === '1898'){
      figures[0].hidden = false;
      figures[1].hidden = true;
    } else if(mode === '1900'){
      figures[0].hidden = true;
      figures[1].hidden = false;
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  setMode('both');
})();
