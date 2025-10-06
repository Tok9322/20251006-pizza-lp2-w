// Simple Lightbox for gallery images
(function(){
  const gallery = document.querySelector('#gallery .masonry');
  const lb = document.getElementById('lightbox');
  const lbImg = lb?.querySelector('img');
  const lbClose = lb?.querySelector('[data-close]');

  if(!gallery || !lb || !lbImg) return;

  // Open on image click (event delegation)
  gallery.addEventListener('click', (e) => {
    const target = e.target;
    if(!(target instanceof HTMLImageElement)) return;
    const src = target.getAttribute('src');
    const alt = target.getAttribute('alt') || '';
    if(!src) return;
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  // Close actions
  function close(){
    lb.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  lb.addEventListener('click', (e) => {
    // Close when clicking backdrop or close button
    const isBackdrop = e.target === lb;
    const isCloseBtn = (e.target instanceof HTMLElement) && e.target.hasAttribute('data-close');
    if(isBackdrop || isCloseBtn) close();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') close();
  });
})();

// Menu category filter
(function(){
  const container = document.querySelector('#menu');
  if(!container) return;
  const buttons = container.querySelectorAll('.filter-btn');
  const cards = container.querySelectorAll('.cards .card');

  function applyFilter(key){
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const show = (key === 'all') || (cat === key);
      card.classList.toggle('is-hidden', !show);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-filter') || 'all';
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilter(key);
      // optional: update hash
      history.replaceState(null, '', `#menu:${key}`);
    });
  });

  // Initialize from hash if present (#menu:pizza etc.)
  const m = location.hash.match(/#menu:(\w+)/);
  const initial = m ? m[1] : 'all';
  const initBtn = [...buttons].find(b => b.getAttribute('data-filter') === initial);
  if(initBtn){
    initBtn.click();
  } else {
    applyFilter('all');
  }
})();

// Back to top button
(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  const TH = 300; // threshold in px
  const onScroll = () => {
    if(window.scrollY > TH){
      btn.classList.add('is-show');
    } else {
      btn.classList.remove('is-show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
