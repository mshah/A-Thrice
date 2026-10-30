(function () {
  'use strict';
  let cleanup = function () {};
  function mount(options = {}) {
  cleanup();
  const root = document.querySelector('.mic-shop');
  const catalogue = window.MIC_SHOP_CATALOGUE;
  if (!catalogue || !root) return;
  const controller = new AbortController();
  const listen = (node, event, handler) => node.addEventListener(event, handler, {signal:controller.signal});
  let observer = null;
  const products = catalogue.products;
  const byId = new Map(products.map(product => [product.id, product]));
  const asset = image => window.MIC_SHOP_ASSETS?.[image.file] || 'assets/' + image.file;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function productTrigger(product, className, text) {
    const button = element('button', className, text);
    button.type = 'button';
    button.dataset.shopProduct = product.id;
    return button;
  }
  function renderCards() {
    document.querySelectorAll('[data-shop-collection]').forEach(grid => {
      products.filter(product => product.collection === grid.dataset.shopCollection).forEach(product => {
        const card = element('article', 'shop-product-card');
        const imageButton = productTrigger(product, 'shop-card-image');
        imageButton.setAttribute('aria-label', 'View ' + product.name + ' — ' + product.type);
        const photo = element('img');
        photo.src = asset(product.images[0]);
        photo.alt = product.images[0].alt;
        photo.loading = 'lazy';
        photo.decoding = 'async';
        photo.width = product.collection === 'insignia' ? 1122 : 1536;
        photo.height = product.collection === 'insignia' ? 1402 : 1024;
        imageButton.append(photo, element('span', 'shop-stock', 'Out of Stock'));
        const heading = element('h3');
        heading.append(productTrigger(product, '', product.name));
        card.append(imageButton, element('p', 'shop-card-type', product.type), heading);
        if (product.slogan) card.append(element('p', 'shop-slogan', product.slogan));
        card.append(element('p', 'shop-card-description', product.description), productTrigger(product, 'shop-text-button', 'View item ↗'));
        grid.append(card);
      });
    });
  }

  function renderViews(container, images, active, onSelect) {
    container.replaceChildren();
    if (images.length < 2) return;
    images.forEach((image, index) => {
      const button = element('button', '', image.label);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(index === active));
      listen(button, 'click', () => onSelect(index));
      container.append(button);
    });
  }

  let featureIndex = 0;
  const collector = byId.get('collateral-style-display');
  const featureImage = document.getElementById('shop-feature-img');
  const featureEnlarge = document.getElementById('shop-feature-enlarge');
  function setFeature(index) {
    featureIndex = index;
    const image = collector.images[index];
    featureImage.src = asset(image);
    featureImage.alt = image.alt;
    featureEnlarge.setAttribute('aria-label', 'Enlarge ' + image.label + ' for Collateral Style');
    const container = document.getElementById('shop-feature-views');
    if (!container.children.length) renderViews(container, collector.images.slice(0, 3), index, setFeature);
    else Array.from(container.children).forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }

  const productDialog = document.getElementById('shop-product-dialog');
  const dialogImage = document.getElementById('shop-dialog-img');
  let currentProduct = collector;
  let productImageIndex = 0;
  let previousOverflow = '';
  function syncScrollLock() {
    const locked = productDialog.open || imageDialog.open;
    if (locked && document.documentElement.style.overflow !== 'hidden') {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    } else if (!locked) document.documentElement.style.overflow = previousOverflow;
  }
  function setProductImage(index) {
    productImageIndex = index;
    const image = currentProduct.images[index];
    dialogImage.src = asset(image);
    dialogImage.alt = image.alt;
    document.getElementById('shop-dialog-enlarge').setAttribute('aria-label', 'Enlarge ' + image.label + ' for ' + currentProduct.name);
    const views = document.getElementById('shop-dialog-views');
    Array.from(views.children).forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  function populateProduct(product) {
    currentProduct = product;
    document.getElementById('shop-dialog-title').textContent = product.name;
    document.getElementById('shop-dialog-type').textContent = product.type;
    const slogan = document.getElementById('shop-dialog-slogan');
    slogan.textContent = product.slogan || '';
    slogan.hidden = !product.slogan;
    document.getElementById('shop-dialog-copy').textContent = product.description;
    const related = document.getElementById('shop-dialog-related');
    related.replaceChildren(...(product.related || []).map(item => { const link = element('a', 'shop-text-button', item.label); link.href = item.href; return link; }));
    document.getElementById('shop-dialog-details').replaceChildren(...product.details.map(detail => element('li', '', detail)));
    renderViews(document.getElementById('shop-dialog-views'), product.images, 0, setProductImage);
    setProductImage(0);
    document.getElementById('shop-product-position').textContent = (products.indexOf(product) + 1) + ' / ' + products.length;
  }
  function openProduct(product) {
    populateProduct(product);
    if (!productDialog.open) productDialog.showModal();
    productDialog.scrollTop = 0;
    syncScrollLock();
  }
  function moveProduct(direction) {
    const next = (products.indexOf(currentProduct) + direction + products.length) % products.length;
    populateProduct(products[next]);
    productDialog.scrollTop = 0;
  }
  listen(document, 'click', event => {
    const trigger = event.target.closest('[data-shop-product]');
    if (trigger && byId.has(trigger.dataset.shopProduct)) openProduct(byId.get(trigger.dataset.shopProduct));
    const preview = event.target.closest('[data-shop-preview]');
    if (preview) {
      const product = byId.get(preview.dataset.shopPreview);
      const index = Number(preview.dataset.shopImage || 0);
      if (product && product.images[index]) openImages(product, index);
    }
  });
  listen(document.getElementById('shop-product-close'), 'click', () => productDialog.close());
  listen(productDialog, 'close', syncScrollLock);
  listen(productDialog, 'click', event => { if (event.target === productDialog) {
    const box = productDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) productDialog.close();
  }});
  listen(document.getElementById('shop-previous-product'), 'click', () => moveProduct(-1));
  listen(document.getElementById('shop-next-product'), 'click', () => moveProduct(1));
  listen(productDialog, 'keydown', event => {
    if (event.key === 'ArrowLeft' && !imageDialog.open) { event.preventDefault(); moveProduct(-1); }
    if (event.key === 'ArrowRight' && !imageDialog.open) { event.preventDefault(); moveProduct(1); }
  });
  listen(document.getElementById('shop-dialog-enlarge'), 'click', () => openImages(currentProduct, productImageIndex));

  const imageDialog = document.getElementById('shop-image-dialog');
  const largeImage = document.getElementById('shop-large-img');
  const viewport = document.getElementById('shop-image-viewport');
  const zoomButton = document.getElementById('shop-image-zoom');
  let lightboxProduct = collector;
  let lightboxIndex = 0;
  function resetZoom() {
    viewport.classList.remove('is-zoomed');
    zoomButton.setAttribute('aria-pressed', 'false');
    zoomButton.textContent = 'Zoom in';
    viewport.scrollTo(0, 0);
  }
  function setLightboxImage(index) {
    lightboxIndex = index;
    const image = lightboxProduct.images[index];
    largeImage.src = asset(image);
    largeImage.alt = image.alt;
    document.getElementById('shop-image-caption').textContent = lightboxProduct.name + ' · ' + image.label;
    document.getElementById('shop-image-counter').textContent = (index + 1) + ' / ' + lightboxProduct.images.length + ' · ' + lightboxProduct.name;
    document.getElementById('shop-previous-image').disabled = lightboxProduct.images.length < 2;
    document.getElementById('shop-next-image').disabled = lightboxProduct.images.length < 2;
    resetZoom();
  }
  function openImages(product, index) {
    lightboxProduct = product;
    setLightboxImage(index);
    if (!imageDialog.open) imageDialog.showModal();
    syncScrollLock();
  }
  function moveImage(direction) {
    setLightboxImage((lightboxIndex + direction + lightboxProduct.images.length) % lightboxProduct.images.length);
  }
  listen(document.getElementById('shop-image-close'), 'click', () => imageDialog.close());
  listen(imageDialog, 'close', syncScrollLock);
  listen(document.getElementById('shop-previous-image'), 'click', () => moveImage(-1));
  listen(document.getElementById('shop-next-image'), 'click', () => moveImage(1));
  listen(imageDialog, 'keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveImage(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveImage(1); }
  });
  listen(zoomButton, 'click', () => {
    const zoomed = viewport.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Fit image' : 'Zoom in';
    if (!zoomed) viewport.scrollTo(0, 0);
  });
  listen(featureEnlarge, 'click', () => openImages(collector, featureIndex));
  listen(document.getElementById('shop-certificate-open'), 'click', () => openImages(collector, 1));
  listen(document.getElementById('shop-certificate-link'), 'click', () => openImages(collector, 1));

  if ('IntersectionObserver' in window) {
    const links = Array.from(root.querySelectorAll('.shop-collection-nav a'));
    const sections = links.map(link => document.querySelector('#' + link.dataset.shopJump));
    function updateCurrent() {
      const target = sections.filter(section => section.getBoundingClientRect().top <= 150).pop() || sections[0];
      links.forEach(link => {
        if ('#' + link.dataset.shopJump === '#' + target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    observer = new IntersectionObserver(updateCurrent, {rootMargin: '-70px 0px -40% 0px', threshold: [0, 0.1, 0.5, 1]});
    sections.forEach(section => observer.observe(section));
    links.forEach(link => listen(link, 'click', () => {
      links.forEach(item => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'location');
    }));
  }
  root.querySelectorAll('[data-shop-jump]').forEach(link => listen(link, 'click', event => {
    event.preventDefault();
    const id = link.dataset.shopJump;
    history.pushState(null, '', '#/shop/' + id);
    root.querySelector('#' + id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));
  renderCards();
  setFeature(0);
  cleanup = function () {
    controller.abort();
    if (observer) observer.disconnect();
    if (productDialog.open) productDialog.close();
    if (imageDialog.open) imageDialog.close();
    document.documentElement.style.overflow = previousOverflow;
    cleanup = function () {};
  };
  if (options.section && root.querySelector('#' + CSS.escape(options.section))) {
    requestAnimationFrame(() => root.querySelector('#' + CSS.escape(options.section))?.scrollIntoView({behavior:'instant'}));
  }
  }
  window.MIC_GIFT_SHOP = {render:()=>window.MIC_GIFT_SHOP_MARKUP, mount, unmount:()=>cleanup()};
})();
