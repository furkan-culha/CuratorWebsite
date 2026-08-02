/* ============================================================
   iletisim.js — İletişim sayfası JS
   Form validasyonu + SSS accordion
   ============================================================ */
   'use strict';

   /* ---- FORM ---- */
   const form       = document.getElementById('contactForm');
   const submitBtn  = document.getElementById('submitBtn');
   const successMsg = document.getElementById('formSuccess');
   
   if (form && submitBtn && successMsg) {
   
     // Canlı hata temizleme
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
       if (!valid) {
         // İlk hatalı alana scroll
         const first = form.querySelector('.field-error');
         if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
         return;
       }
   
       // Loading state
       const btnText    = submitBtn.querySelector('.btn-text');
       const btnArrow   = submitBtn.querySelector('.material-symbols-outlined');
       const btnSpinner = submitBtn.querySelector('.btn-spinner');
   
       submitBtn.disabled = true;
       btnText.textContent = 'Gönderiliyor…';
       if (btnArrow)   btnArrow.hidden   = true;
       if (btnSpinner) btnSpinner.hidden = false;
   
       // Simüle edilmiş API — gerçek projede fetch() ile değiştirin
       await new Promise(r => setTimeout(r, 1400));
   
       form.reset();
       submitBtn.hidden = true;
       successMsg.hidden = false;
       successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
     });
   }
   
   /* ---- SSS ACCORDION ---- */
   document.querySelectorAll('.faq-question').forEach(btn => {
     btn.addEventListener('click', () => {
       const isOpen = btn.getAttribute('aria-expanded') === 'true';
       const answer = btn.nextElementSibling;
   
       // Tüm diğerlerini kapat
       document.querySelectorAll('.faq-question').forEach(other => {
         if (other !== btn) {
           other.setAttribute('aria-expanded', 'false');
           const otherAnswer = other.nextElementSibling;
           if (otherAnswer) otherAnswer.classList.remove('open');
         }
       });
   
       // Bunu aç/kapat
       btn.setAttribute('aria-expanded', String(!isOpen));
       if (answer) answer.classList.toggle('open', !isOpen);
     });
   });
   