// Show a placeholder tone if an image file is missing
document.querySelectorAll('.ph img').forEach(img => {
  if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) img.classList.add('missing');
  img.addEventListener('error', () => img.classList.add('missing'));
  img.addEventListener('load', () => img.classList.remove('missing'));
});

document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

// Header border on scroll
const header = document.getElementById('top');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), {passive: true});

// Mobile menu
const btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); btn.setAttribute('aria-expanded', false);
}));

// Photo lightbox (About page)
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-cap'),
        lbClose = document.getElementById('lb-close');
  let lastFocus;
  document.querySelectorAll('.gallery figure').forEach(fig => {
    fig.tabIndex = 0;
    const open = () => {
      const img = fig.querySelector('img');
      lastFocus = fig;
      lbImg.classList.remove('missing');
      lbImg.src = img.getAttribute('src'); lbImg.alt = img.alt;
      lbCap.textContent = fig.querySelector('figcaption').textContent;
      lb.classList.add('open'); lbClose.focus();
    };
    fig.addEventListener('click', open);
    fig.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  const close = () => { lb.classList.remove('open'); lastFocus && lastFocus.focus(); };
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
}

// Experience career line: click a stop to show its details
const metro = document.querySelector('.metro');
if (metro) {
  const panel = document.getElementById('stop-panel');
  const btns = metro.querySelectorAll('.stop-btn');
  const show = id => {
    btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.id === id));
    panel.innerHTML = document.getElementById('d-' + id).innerHTML;
  };
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.id)));
  show(metro.dataset.default);
}

// Projects: click a small screen to show it on the device
document.querySelectorAll('.proj').forEach(card => {
  const main = card.querySelector('.dev-img');
  card.querySelectorAll('.thumb').forEach(t => t.addEventListener('click', () => {
    card.querySelectorAll('.thumb').forEach(x => x.setAttribute('aria-pressed', x === t));
    main.src = t.dataset.src; main.alt = t.dataset.alt;
  }));
});
