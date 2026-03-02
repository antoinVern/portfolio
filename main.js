/* ══════════════════════════════════════════
   main.js
   - Navbar scroll effect + burger menu
   - Scroll reveal (IntersectionObserver)
   - Contact form submit
   - Project filters (projects.html)
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ───────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ── BURGER MENU ─────────────────────── */
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('nav-mobile');
  if (burger && navMobile) {
    burger.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = '';
      }
    });
    // Close on link click
    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMobile.classList.remove('open'));
    });
  }

  /* ── SCROLL REVEAL ───────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || '0';
          el.style.transitionDelay = delay + 's';
          el.classList.add('visible');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => obs.observe(el));
  }

  /* ── CONTACT FORM ────────────────────── */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      success.classList.add('visible');
    });
  }

  /* ── PROJECT FILTERS ─────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards  = document.querySelectorAll('.proj-card');
  if (filterBtns.length && projCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.cat;
        projCards.forEach(card => {
          const match = cat === 'all' || card.dataset.cat === cat;
          card.dataset.hidden = match ? 'false' : 'true';
        });
      });
    });
  }

  /* ── ACTIVE NAV LINK ─────────────────── */
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href === currentPage) a.classList.add('active');
    else if (currentPage === '' && href === 'index.html') a.classList.add('active');
  });

});
