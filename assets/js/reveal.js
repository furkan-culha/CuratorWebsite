
   'use strict';

   (() => {
     const css = document.createElement('style');
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