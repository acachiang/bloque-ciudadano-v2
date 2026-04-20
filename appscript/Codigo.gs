// ════════════════════════════════════════════════════════
//  BLOQUE CIUDADANO MEXICALENSE — Google Apps Script
//  Recibe el formulario de registro y guarda en Google Sheets
//
//  CONFIGURACIÓN:
//  1. Abre tu Google Sheet
//  2. Copia el ID de la URL:
//     https://docs.google.com/spreadsheets/d/ ►ESTE_ID◄ /edit
//  3. Pégalo en SHEET_ID abajo
//  4. Verifica que SHEET_NAME coincida con la pestaña donde
//     quieres guardar los datos (por defecto "Registros")
// ════════════════════════════════════════════════════════

const SHEET_ID   = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET';
const SHEET_NAME = 'Registros';

// ── Encabezados de columna (se crean automáticamente la primera vez) ──
const HEADERS = [
  'Fecha y Hora',
  'Nombre',
  'Apellido Paterno',
  'Apellido Materno',
  'WhatsApp',
  'Correo',
  'Organización',
  'Comentarios',
  'Términos Aceptados'
];


// ════════════════════════════════════════════════════════
//  doPost — punto de entrada del formulario
// ════════════════════════════════════════════════════════
function doPost(e) {
  try {
    // Parsear el JSON enviado desde el formulario
    const data = JSON.parse(e.postData.contents);

    const sheet = getOrCreateSheet();

    // Insertar fila con los datos
    sheet.appendRow([
      new Date().toLocaleString('es-MX', { timeZone: 'America/Tijuana' }),
      data.nombre          || '',
      data.apellidoPaterno || '',
      data.apellidoMaterno || '',
      data.whatsapp        || '',
      data.email           || '',
      data.organizacion    || '',
      data.comentarios     || '',
      data.terminos === 'on' ? 'Sí' : 'No'
    ]);

    return jsonResponse({ status: 'ok', message: 'Registro guardado correctamente.' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}


// ════════════════════════════════════════════════════════
//  doGet — prueba rápida desde el navegador
// ════════════════════════════════════════════════════════
function doGet() {
  return ContentService
    .createTextOutput('✅ El script de Bloque Ciudadano está activo.')
    .setMimeType(ContentService.MimeType.TEXT);
}


// ════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════

// Obtiene la hoja o la crea con encabezados si no existe
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Formato de encabezados
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#FF8C00');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setFontFamily('Arial');
    sheet.setFrozenRows(1);

    // Ancho de columnas
    sheet.setColumnWidth(1, 180); // Fecha
    sheet.setColumnWidth(2, 140); // Nombre
    sheet.setColumnWidth(3, 150); // Ap. Paterno
    sheet.setColumnWidth(4, 150); // Ap. Materno
    sheet.setColumnWidth(5, 150); // WhatsApp
    sheet.setColumnWidth(6, 220); // Correo
    sheet.setColumnWidth(7, 180); // Organización
    sheet.setColumnWidth(8, 250); // Comentarios
    sheet.setColumnWidth(9, 160); // Términos
  }

  return sheet;
}

// Devuelve una respuesta JSON con CORS abierto
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
