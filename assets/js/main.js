'use strict';

/* ---- NAV SCROLL ---- */
const nav = document.getElementById("mainNav")
if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20)
    window.addEventListener("scroll", onScroll, {passive: true})
    onScroll()
}

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const btnNav    = document.querySelector('.btn-nav');

if (hamburger && navLinks) {
  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    if (btnNav) btnNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    if (btnNav) btnNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Link tıklanınca kapat
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Dışarı tıklanınca kapat
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) closeMenu();
  });

  // ESC tuşu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---- CONTACT FORM ---- */
const form       = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form && successMsg) {
  // Canlı validasyon — hata sınırını temizle
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) field.classList.remove('field-error');
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validasyon
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('field-error');
        valid = false;
      }
    });
    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    const btnText = btn.querySelector('.btn-text') ?? btn;
    const original = btnText.textContent;

    btn.disabled = true;
    btnText.textContent = 'Gönderiliyor…';

    // Gerçek bir API'ye bağlandığında burası fetch() olur
    await new Promise(r => setTimeout(r, 1200));

    form.reset();
    btn.hidden = true;
    successMsg.hidden = false;
  });
}