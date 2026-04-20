/* ════════════════════════════════════════
   TERMS MODAL — Abrir / cerrar el modal
   de Términos y Condiciones
   ════════════════════════════════════════ */

const modal = document.getElementById('termsModal');

function openTermsModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // bloquea scroll del fondo
}

function closeTermsModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Cierra al hacer clic en el overlay (fuera del panel)
function closeTermsOnOverlay(e) {
  if (e.target === modal) closeTermsModal();
}

// Cierra con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeTermsModal();
});
