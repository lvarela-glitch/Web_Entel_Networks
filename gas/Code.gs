const SHEET_NAME = 'Respuestas Mazalife';
const HEADERS = [
  'Fecha de recepción', 'Nombre', 'Correo', 'Atracciones', 'Objetivos del bot',
  'WhatsApp por mes', 'Visitas web por mes', 'Compras web por mes',
  'Llamadas por mes', 'Agentes digitales', 'Agentes de voz', 'Temporada alta',
  'Versión de formulario', 'Sistemas a integrar', 'Plataformas identificadas',
  'Acciones de integración', 'Detalle de integración'
];

/** Ejecuta una vez desde Apps Script para crear la pestaña privada de respuestas. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  ensureHeaders(sheet);
}

function doPost(e) {
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw) return output({ ok: false, error: 'missing_payload' });
    const data = JSON.parse(raw);
    if (!data.contact_name || !data.contact_email) return output({ ok: false, error: 'missing_contact' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME);
    }
    ensureHeaders(sheet);
    sheet.appendRow([
      new Date(), clean(data.contact_name), clean(data.contact_email),
      list(data.attractions), list(data.bot_goals), numberOrBlank(data.whatsapp_monthly),
      numberOrBlank(data.web_visits_monthly), numberOrBlank(data.web_purchases_monthly),
      numberOrBlank(data.voice_calls_monthly), numberOrBlank(data.digital_agents),
      numberOrBlank(data.voice_agents), clean(data.peak_season), clean(data.form_version),
      list(data.systems_used), clean(data.systems_other),
      list(data.integration_actions), clean(data.integration_details)
    ]);
    return output({ ok: true });
  } catch (error) {
    console.error(error);
    return output({ ok: false, error: 'save_failed' });
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, HEADERS.length);
    return;
  }
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].filter(String);
  const missing = HEADERS.filter(header => !existing.includes(header));
  if (missing.length) {
    const startColumn = sheet.getLastColumn() + 1;
    sheet.getRange(1, startColumn, 1, missing.length).setValues([missing]).setFontWeight('bold');
    sheet.autoResizeColumns(startColumn, missing.length);
  }
}

function doGet() {
  return output({ ok: true, service: 'Mazalife CX intake' });
}
function list(value) {
  return Array.isArray(value) ? value.map(clean).join(', ') : clean(value);
}
function clean(value) {
  return String(value == null ? '' : value).slice(0, 1000).replace(/[\r\n]+/g, ' ');
}
function numberOrBlank(value) {
  if (value === '' || value == null) return '';
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : '';
}
function output(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
