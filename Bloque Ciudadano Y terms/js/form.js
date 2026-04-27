/* ════════════════════════════════════════
   FORM — Validación y envío a AppScript

   CONFIGURAR: reemplaza APPSCRIPT_URL con
   la URL de tu Google Apps Script Web App
   (Publicar → Implementar como app web)
   ════════════════════════════════════════ */

const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHgWmmPlLsyfvrZ2hm3YRz-_9Bancxx0Swn2cLRlpjOFgyVrl9NlzR6AGzAw4XyDGHSA/exec';

const form      = document.getElementById('registroForm');
const submitBtn = document.getElementById('submitBtn');
const msgBox    = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar aceptación de términos
  if (!document.getElementById('terminos').checked) {
    showMessage('Debes aceptar los términos y condiciones para continuar.', 'error');
    return;
  }

  // Validar campos de texto obligatorios
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (field.type === 'checkbox') return;
    if (!field.value.trim()) {
      field.style.borderColor = '#e53935';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showMessage('Por favor completa todos los campos obligatorios.', 'error');
    return;
  }

  // Estado enviando
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  hideMessage();

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    await fetch(APPSCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',            // AppScript requiere no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // no-cors siempre devuelve opaque → asumimos éxito si no hubo excepción
    showMessage('¡Registro exitoso! Nos pondremos en contacto contigo pronto. Revisa tu WhatsApp.', 'success');
    form.reset();

  } catch {
    showMessage('Ocurrió un error al enviar tu registro. Intenta de nuevo o contáctanos directamente.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Registro';
  }
});

// Limpiar borde rojo al corregir un campo
form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => { field.style.borderColor = ''; });
});

function showMessage(text, type) {
  msgBox.textContent = text;
  msgBox.className = 'form-message ' + type;
  msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideMessage() {
  msgBox.className = 'form-message';
}
