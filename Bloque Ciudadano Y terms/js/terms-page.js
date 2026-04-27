/* ════════════════════════════════════════
   TERMS PAGE — Cambio de pestañas
   ════════════════════════════════════════ */

function switchTab(tabId, btn) {
  // Desactivar todos los paneles y botones
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Activar el seleccionado
  document.getElementById('tab-' + tabId).classList.add('active');
  btn.classList.add('active');
}
