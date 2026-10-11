/**
 * Confirmación oficial de asistencia (RSVP) — Google Apps Script.
 *
 * Lee y escribe la pestaña "Invitados" de la hoja de cálculo:
 *
 *   A Código | B Nombre | C Cupos | D Enlace | E Asiste | F Asistentes | G Mensaje | H Respondió
 *
 * Ustedes llenan Nombre y Cupos; `generarEnlaces` rellena Código y Enlace;
 * las columnas E–H las escribe la web cuando el invitado confirma.
 *
 * El enlace de cada invitado solo lleva su código:  …/invitacion?i=ABC234
 * El nombre y los cupos no viajan en la URL: la web los pide aquí con el código,
 * así que nadie puede verlos ni cambiarlos editando el enlace.
 *
 * Cada invitado tiene UNA fila: confirmar, cambiar de opinión o pulsar varias veces
 * sobrescribe sus columnas E–H; nunca se crean filas nuevas.
 */

// ID de la hoja: lo que va entre /d/ y /edit en su URL.
const SHEET_ID = 'PEGAR_ID_DE_LA_HOJA';
// Dirección pública de la invitación, sin "/" al final.
const SITIO = 'https://PEGAR_DOMINIO/invitacion';

const PESTANA = 'Invitados';
const ENCABEZADOS = ['Código', 'Nombre', 'Cupos', 'Enlace', 'Asiste', 'Asistentes', 'Mensaje', 'Respondió'];
const MAX_MENSAJE = 500;
// Sin 0/O, 1/I/L: los códigos se pueden dictar sin confusiones.
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function hoja_() {
  const libro = SpreadsheetApp.openById(SHEET_ID);
  let hoja = libro.getSheetByName(PESTANA);
  if (!hoja) {
    hoja = libro.insertSheet(PESTANA);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS]);
  }
  return hoja;
}

function filas_(hoja) {
  const ultima = hoja.getLastRow();
  return ultima < 2 ? [] : hoja.getRange(2, 1, ultima - 1, ENCABEZADOS.length).getValues();
}

function normalizar_(codigo) {
  return String(codigo || '').trim().toUpperCase();
}

// Devuelve { fila, datos } del invitado o null. `fila` es el número de fila en la hoja.
function buscar_(hoja, codigo) {
  const buscado = normalizar_(codigo);
  if (!buscado) return null;
  const filas = filas_(hoja);
  for (let i = 0; i < filas.length; i++) {
    if (normalizar_(filas[i][0]) === buscado) return { fila: i + 2, datos: filas[i] };
  }
  return null;
}

function invitado_(datos) {
  return {
    ok: true,
    nombre: String(datos[1]),
    cupos: Math.max(1, parseInt(datos[2], 10) || 1),
    asiste: String(datos[4] || '').toLowerCase(), // '', 'si' o 'no'
    asistentes: parseInt(datos[5], 10) || 0,
  };
}

function json_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

// Un texto que empieza por = + - @ se guardaría como fórmula: se fuerza a texto.
function texto_(valor) {
  const limpio = String(valor || '').trim().slice(0, MAX_MENSAJE);
  return /^[=+\-@]/.test(limpio) ? "'" + limpio : limpio;
}

// GET ?codigo=CODIGO → datos del invitado (y su respuesta, si ya confirmó).
function doGet(e) {
  const encontrado = buscar_(hoja_(), e.parameter.codigo);
  return json_(encontrado ? invitado_(encontrado.datos) : { ok: false, error: 'codigo' });
}

// POST { codigo, asiste: 'si' | 'no', asistentes, mensaje } → guarda la respuesta en la fila del invitado.
function doPost(e) {
  let entrada;
  try {
    entrada = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'formato' });
  }

  const candado = LockService.getScriptLock();
  candado.waitLock(20000);
  try {
    const hoja = hoja_();
    const encontrado = buscar_(hoja, entrada.codigo);
    if (!encontrado) return json_({ ok: false, error: 'codigo' });

    const cupos = invitado_(encontrado.datos).cupos;
    if (entrada.asiste !== 'si' && entrada.asiste !== 'no') return json_({ ok: false, error: 'asiste' });

    const asistentes = entrada.asiste === 'si' ? Number(entrada.asistentes) : 0;
    if (entrada.asiste === 'si' && !(Number.isInteger(asistentes) && asistentes >= 1 && asistentes <= cupos)) {
      return json_({ ok: false, error: 'asistentes' });
    }

    hoja.getRange(encontrado.fila, 5, 1, 4).setValues([[entrada.asiste, asistentes, texto_(entrada.mensaje), new Date()]]);
    return json_(invitado_(buscar_(hoja, entrada.codigo).datos));
  } finally {
    candado.releaseLock();
  }
}

/**
 * Ejecutar desde el editor (▶) cada vez que agreguen invitados.
 * A cada fila con Nombre le pone un código nuevo si no tiene, y su enlace personal.
 * Nunca cambia un código ya existente: los enlaces enviados siguen sirviendo
 * (si después cambian el nombre o los cupos en la hoja, la web muestra los nuevos).
 */
function generarEnlaces() {
  const hoja = hoja_();
  const filas = filas_(hoja);
  const usados = {};
  filas.forEach(function (f) { if (normalizar_(f[0])) usados[normalizar_(f[0])] = true; });

  filas.forEach(function (f, i) {
    if (!String(f[1]).trim()) return;
    let codigo = normalizar_(f[0]);
    if (!codigo) {
      do {
        codigo = '';
        for (let n = 0; n < 6; n++) codigo += ALFABETO.charAt(Math.floor(Math.random() * ALFABETO.length));
      } while (usados[codigo]);
    }
    usados[codigo] = true;
    hoja.getRange(i + 2, 1).setValue(codigo);
    hoja.getRange(i + 2, 4).setValue(SITIO + '?i=' + codigo);
  });
}
