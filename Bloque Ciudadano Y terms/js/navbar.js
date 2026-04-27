/* ════════════════════════════════════════
   NAVBAR — Hamburger toggle para mobile
   ════════════════════════════════════════ */

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Cierra el menú al tocar cualquier enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});
