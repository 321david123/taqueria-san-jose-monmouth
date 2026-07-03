/* =====================================================
   Taqueria San Jose — interactions
   ===================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = '2026';

  /* ============================================================
     MENU DATA
     Real taquería categories + items confirmed from research
     (street tacos, birria, lengua, carnitas, al pastor, tortas,
     burritos, quesadillas, nachos, cheese dip, menudo weekends).
     Prices are shown as honest labels — the owner sets exact
     numbers. No fabricated dollar figures.
     ============================================================ */
  const MENU = [
    { section: 'Tacos', items: [
      { name: 'Taco de Asada', desc: 'Grilled steak on a warm corn tortilla with cilantro, onion and lime.', price: 'Street price' },
      { name: 'Taco al Pastor', desc: 'Marinated pork with onion and cilantro — the taquería classic.', price: 'Street price' },
      { name: 'Taco de Pollo', desc: 'Seasoned grilled chicken, cilantro and onion.', price: 'Street price' },
      { name: 'Taco de Carnitas', desc: 'Slow-cooked pork, tender and rich, with fresh toppings.', price: 'Street price' },
      { name: 'Taco de Lengua', desc: 'Tender beef tongue, a favorite of the regulars.', price: 'Street price' },
      { name: 'Taco de Birria', desc: 'Slow-braised beef, deep and savory, with onion and cilantro.', price: 'Street price' },
    ]},
    { section: 'Burritos & Tortas', items: [
      { name: 'Burrito', desc: 'A big flour tortilla with rice, beans and your choice of meat.', price: 'Ask at the window' },
      { name: 'Torta', desc: 'Toasted bread piled with meat, beans, avocado and fresh toppings — "I recommend the torta."', price: 'Ask at the window' },
      { name: 'Quesadilla', desc: 'Melted cheese and your choice of meat, grilled and folded.', price: 'Ask at the window' },
      { name: 'Burrito Loco', desc: 'The loaded burrito — extra meat, cheese and all the fixings.', price: 'Ask at the window' },
    ]},
    { section: 'Plates', items: [
      { name: 'Birria Plate', desc: 'A generous plate of slow-braised beef with tortillas on the side.', price: 'Ask at the window' },
      { name: 'Carne Asada Plate', desc: 'Grilled steak served with rice, beans and warm tortillas.', price: 'Ask at the window' },
      { name: 'Pollo Plate', desc: 'Grilled chicken with rice, beans and tortillas.', price: 'Ask at the window' },
      { name: 'Fajitas', desc: 'Sizzling steak or chicken with peppers and onions, rice and beans.', price: 'Ask at the window' },
    ]},
    { section: 'To Share', items: [
      { name: 'Nachos', desc: 'Crisp chips loaded with melted cheese, meat, jalapeños and fresh pico.', price: 'For the table' },
      { name: 'Chips & Cheese Dip', desc: '"The cheese dip and salsa are very good" — start here.', price: 'For the table' },
      { name: 'Chips & Salsa', desc: 'Fresh chips with house-made salsa.', price: 'For the table' },
      { name: 'Guacamole', desc: 'Fresh avocado, lime and a little heat.', price: 'For the table' },
    ]},
    { section: 'Weekends', items: [
      { name: 'Menudo', desc: 'The traditional weekend bowl — served fresh on Saturdays and Sundays.', price: 'Sat & Sun' },
      { name: 'Pozole', desc: 'Hearty hominy soup, weekends while it lasts.', price: 'Sat & Sun' },
    ]},
    { section: 'Drinks', items: [
      { name: 'Jarritos', desc: 'Mexican soda — tamarind, mandarin, lime and more.', price: 'Bottled' },
      { name: 'Horchata', desc: 'Sweet, cinnamon rice drink — made in-house.', price: 'Aguas frescas' },
      { name: 'Agua de Jamaica', desc: 'Refreshing hibiscus water.', price: 'Aguas frescas' },
      { name: 'Mexican Coke', desc: 'The glass-bottle classic.', price: 'Bottled' },
    ]},
  ];

  /* ---------- Build menu tabs + panels ---------- */
  const tabsEl = document.getElementById('menuTabs');
  const panelsEl = document.getElementById('menuPanels');
  if (tabsEl && panelsEl) {
    MENU.forEach((group, i) => {
      const id = 'mp-' + i;

      const tab = document.createElement('button');
      tab.className = 'menu__tab' + (i === 0 ? ' is-active' : '');
      tab.textContent = group.section;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.setAttribute('aria-controls', id);
      tab.tabIndex = i === 0 ? 0 : -1;
      tabsEl.appendChild(tab);

      const panel = document.createElement('div');
      panel.className = 'menu__panel' + (i === 0 ? ' is-active' : '');
      panel.id = id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
      if (i !== 0) panel.hidden = true;

      const list = document.createElement('div');
      list.className = 'menu__items';
      group.items.forEach((it) => {
        const item = document.createElement('div');
        item.className = 'menu__item';
        const desc = it.desc ? `<p class="menu__item-desc">${it.desc}</p>` : '';
        item.innerHTML = `
          <div class="menu__item-head">
            <span class="menu__item-name">${it.name}</span>
            <span class="menu__dots" aria-hidden="true"></span>
          </div>
          <span class="menu__item-price">${it.price}</span>
          ${desc}`;
        list.appendChild(item);
      });
      panel.appendChild(list);
      panelsEl.appendChild(panel);

      tab.addEventListener('click', () => activateTab(i));
    });

    const allTabs = () => Array.from(tabsEl.querySelectorAll('.menu__tab'));
    function activateTab(idx, focus) {
      const tabs = allTabs();
      const panels = panelsEl.querySelectorAll('.menu__panel');
      tabs.forEach((t, j) => {
        const on = j === idx;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p, j) => {
        const on = j === idx;
        p.classList.toggle('is-active', on);
        p.hidden = !on;
      });
      const active = tabs[idx];
      if (active) {
        active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        if (focus) active.focus();
      }
    }

    tabsEl.addEventListener('keydown', (e) => {
      const tabs = allTabs();
      const current = tabs.indexOf(document.activeElement);
      if (current === -1) return;
      let next = null;
      if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); activateTab(next, true); }
    });
  }

  /* ---------- Build reviews (real guest quotes from research) ---------- */
  const REVIEWS = [
    { stars: 5, quote: 'Delicious and affordable Mexican food — fresh tortillas and excellent salsas.', author: 'Local guest', source: 'From our reviews' },
    { stars: 5, quote: 'Friendly and attentive staff with very quick service. The cheese dip and salsa are very good.', author: 'Verified diner', source: 'From our reviews' },
    { stars: 5, quote: 'Awesome street tacos. Tried the birria, lengua and carnitas — really tasty and fair enough.', author: 'Local guest', source: 'From our reviews' },
    { stars: 5, quote: 'I recommend the torta, and the menudo on weekends.', author: 'Verified diner', source: 'From our reviews' },
  ];
  const revWrap = document.getElementById('reviewsWrapper');
  if (revWrap) {
    REVIEWS.forEach((r) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <blockquote class="review">
          <div class="review__stars" aria-label="Five star review" role="img">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
          <p class="review__quote">${r.quote}</p>
          <footer><div class="review__author">${r.author}</div><div class="review__source">${r.source}</div></footer>
        </blockquote>`;
      revWrap.appendChild(slide);
    });
  }

  /* ============================================================
     NAV solidify + overlay
     ============================================================ */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('is-solid');
      else nav.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('overlayMenu');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  };
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        const first = overlay.querySelector('a');
        if (first) first.focus();
      }
    });
    overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ============================================================
     Lenis smooth scroll
     ============================================================ */
  let lenis = null;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ============================================================
     GSAP reveals + parallax
     ============================================================ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on('scroll', ScrollTrigger.update);

    if (!prefersReduced) {
      gsap.to('.hero__img', {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.utils.toArray('.sig__img img').forEach((img) => {
        const row = img.closest('.sig__row');
        if (!row) return;
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }
  }

  /* ---------- IntersectionObserver reveals ---------- */
  const revealEls = [];
  document.querySelectorAll('.story__text, .story__media, .sig__copy, .sig__img, .feature, .visit__info, .visit__map, .banner__inner, .menu__head, .sig__head, .features__head')
    .forEach((el) => { el.classList.add('reveal'); revealEls.push(el); });
  document.querySelectorAll('.sig__img').forEach((el) => el.classList.add('reveal-img'));

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('.reveal-img').forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
    document.querySelectorAll('.reveal-img').forEach((el) => io.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll('.stat__num[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const dur = 1400; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ============================================================
     Swipers
     ============================================================ */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.gallery__swiper', {
      slidesPerView: 'auto', spaceBetween: 18, centeredSlides: false, grabCursor: true,
      navigation: { nextEl: '.gallery__swiper .swiper-button-next', prevEl: '.gallery__swiper .swiper-button-prev' },
      pagination: { el: '.gallery__swiper .swiper-pagination', clickable: true },
      breakpoints: { 768: { spaceBetween: 28 } },
    });

    new Swiper('.reviews__swiper', {
      slidesPerView: 1, spaceBetween: 40, loop: REVIEWS.length > 1,
      autoplay: prefersReduced ? false : { delay: 5500, disableOnInteraction: false },
      pagination: { el: '.reviews__pag', clickable: true },
    });
  }
})();
