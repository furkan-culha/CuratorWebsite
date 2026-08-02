'use strict';

/* ---- SCROLL REVEAL ---- */
(() => {
    const css = document.createElement("style")
    css.textContent = `
    [data-reveal] {
      opacity: 0;
      transform: translateY(28px);
      transition:
        opacity  .65s cubic-bezier(.16,1,.3,1),
        transform .65s cubic-bezier(.16,1,.3,1);
    }
    [data-reveal].is-visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(css);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = Number(el.dataset.revealDelay ?? 0);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();

/* ---- SAYAÇ ANİMASYONU ---- */
(() => {
    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  
    function runCounter(el) {
      const target   = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start    = performance.now();
  
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(easeOutExpo(progress) * target)
                           .toLocaleString('tr-TR');
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  
    const counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
  
    counters.forEach(c => observer.observe(c));
  })();