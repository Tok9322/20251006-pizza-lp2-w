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
