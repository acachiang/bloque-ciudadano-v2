/* ════════════════════════════════════════
   ANIMATIONS — Scroll fade-in con
   IntersectionObserver para elementos
   con clase .fade-in
   ════════════════════════════════════════ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
