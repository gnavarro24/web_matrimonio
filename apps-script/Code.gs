/**
 * Confirmación oficial de asistencia (RSVP) — Google Apps Script.
 *
 * Invitados: pestaña "Tarjeta Wedding Guest List" de "The Navelas Wedding Planning Spreadsheet".
 *
 *   A Invitado | B Family Name | C Invite sent | D # of guests | E Mensaje | F Código
 *
 * Cada fila con Family Name (B) y # of guests (D) es una invitación: B es el nombre que ve el invitado
 * y D sus cupos. Las demás filas (acompañantes sin cupos propios) se ignoran.
 * `generarEnlaces` le pone a cada invitación su código (F) y el mensaje de WhatsApp con su enlace (E).
 *
 * Respuestas: pestaña "Invitacion" de "RSVP Matrimonio Gustavo y Geraldine" (la de "Save The Date" no se toca):
 *
 *   A Código | B Nombre | C Cupos | D Asiste | E Asistentes | F Mensaje | G Respondió | H Alergias | I Regalo
 *
 * I son los planes del Honeymoon fund que eligió la invitación, separados por coma y sin repetir
 * (p. ej. "Las noches de hotel y recuerdos inolvidables, Nuestro primer hogar"); cada plan suma un aporte en la web.
 *
 * El enlace de cada invitado solo lleva su código:  https://thenavelas.website/?i=ABC234
 * El nombre y los cupos no viajan en la URL: la web los pide aquí con el código,
 * así que nadie puede verlos ni cambiarlos editando el enlace.
 *
 * Cada invitación tiene UNA fila de respuesta: confirmar, cambiar de opinión o pulsar varias veces
 * sobrescribe esa fila; solo se crea la primera vez que responde.
 */

const LISTA_ID = '1Yao7RQdFQTqJ4frYQv4JcnZCXmo91_mMwBdIRPrLEpA';
const LISTA_PESTANA = 'Tarjeta Wedding Guest List';
const RESPUESTAS_ID = '1xslragrwE05pHB0uQDIED6BkvCMQwIayINax4ONv2hM';
const RESPUESTAS_PESTANA = 'Invitacion';
// Dirección pública de la invitación (la portada del sitio), sin "/" al final.
const SITIO = 'https://thenavelas.website';

const COL = { nombre: 2, cupos: 4, mensaje: 5, codigo: 6 }; // columnas de la lista (A = 1)
const ENCABEZADOS = ['Código', 'Nombre', 'Cupos', 'Asiste', 'Asistentes', 'Mensaje', 'Respondió', 'Alergias', 'Regalo'];
const COL_REGALO = 9;
// Planes del Honeymoon fund: mismo `id` que src/gifts.js; en la hoja se escribe el título.
const REGALOS = {
  'tiquetes': 'Los tiquetes de avión',
  'hotel': 'Las noches de hotel y recuerdos inolvidables',
  'luna-de-miel': 'Las excursiones',
  'nuestro-hogar': 'Nuestro primer hogar',
};
// Títulos viejos que pueden seguir escritos en la hoja.
const ANTES = { 'Las noches de hotel': 'hotel', 'Las noches de hotel y excursiones': 'hotel', 'Las noches de hotel y desayunos con vista': 'hotel' };
// Celda de la hoja ("Las noches de hotel y recuerdos inolvidables, Nuestro primer hogar") → ids de los planes, sin repetir.
function idsRegalos_(celda) {
  const ids = [];
  String(celda || '').split(',').forEach(function (parte) {
    const t = parte.trim();
    const id = Object.keys(REGALOS).filter(function (k) { return REGALOS[k] === t || k === t || ANTES[t] === k; })[0];
    if (id && ids.indexOf(id) < 0) ids.push(id);
  });
  return ids;
}
const celdaRegalos_ = function (ids) { return ids.map(function (id) { return REGALOS[id]; }).join(', '); };
// [NOMBRE] = nombre de la invitación ("Flia." en vez de "Familia"); [CONTIGO] = "contigo" con 1 cupo, "con ustedes" con más.
const MENSAJE = '¡Hola [NOMBRE]! 🤍💌 La cuenta regresiva ha comenzado🥂✨ Nos llena de alegría compartir [CONTIGO] este capítulo tan especial de nuestra historia. Haz clic y descubre todos los detalles de nuestro gran día: [LINK LINK] 💍 Con cariño, The Navelas 🤍';
const MAX_MENSAJE = 500;
// Sin 0/O, 1/I/L: los códigos se pueden dictar sin confusiones.
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function lista_() {
  return SpreadsheetApp.openById(LISTA_ID).getSheetByName(LISTA_PESTANA);
}

function respuestas_() {
  const libro = SpreadsheetApp.openById(RESPUESTAS_ID);
  const hoja = libro.getSheetByName(RESPUESTAS_PESTANA) || libro.insertSheet(RESPUESTAS_PESTANA);
  // La pestaña ya existe vacía: los encabezados se ponen la primera vez que se usa.
  if (hoja.getLastRow() === 0) hoja.getRange(1, 1, 1, ENCABEZADOS.length).setValues([ENCABEZADOS]);
  return hoja;
}

function filas_(hoja, columnas) {
  const ultima = hoja.getLastRow();
  return ultima < 2 ? [] : hoja.getRange(2, 1, ultima - 1, columnas).getValues();
}

function normalizar_(codigo) {
  return String(codigo || '').trim().toUpperCase();
}

// Devuelve { fila, datos } de la fila cuyo código (en `columna`) coincide, o null.
function buscar_(hoja, columna, columnas, codigo) {
  const buscado = normalizar_(codigo);
  if (!buscado) return null;
  const filas = filas_(hoja, columnas);
  for (let i = 0; i < filas.length; i++) {
    if (normalizar_(filas[i][columna - 1]) === buscado) return { fila: i + 2, datos: filas[i] };
  }
  return null;
}

// Fila de la lista → { nombre, cupos }, o null si le falta el nombre o los cupos.
function invitacion_(f) {
  const nombre = String(f[COL.nombre - 1]).trim();
  const cupos = parseInt(f[COL.cupos - 1], 10);
  return nombre && cupos >= 1 ? { nombre: nombre, cupos: cupos } : null;
}

// { CODIGO: { nombre, cupos } } de toda la lista. Abrir la hoja de planeación tarda ~1 s, así que se guarda
// 10 min en la caché de Apps Script: un cambio de nombre o cupos en la lista tarda hasta 10 min en verse
// (o nada, si se ejecuta generarEnlaces, que borra la caché).
const CACHE_LISTA = 'lista';
function invitaciones_() {
  const cache = CacheService.getScriptCache();
  const guardada = cache.get(CACHE_LISTA);
  if (guardada) return JSON.parse(guardada);
  const mapa = {};
  filas_(lista_(), COL.codigo).forEach(function (f) {
    const codigo = normalizar_(f[COL.codigo - 1]);
    const inv = invitacion_(f);
    if (codigo && inv) mapa[codigo] = inv;
  });
  cache.put(CACHE_LISTA, JSON.stringify(mapa), 600);
  return mapa;
}

// Nombre y cupos salen de la lista; la respuesta (si ya respondió), de la pestaña Invitacion.
function invitado_(codigo) {
  const inv = invitaciones_()[normalizar_(codigo)];
  if (!inv) return null;
  const respuesta = buscar_(respuestas_(), 1, ENCABEZADOS.length, codigo);
  const r = respuesta ? respuesta.datos : [];
  return {
    ok: true,
    nombre: inv.nombre,
    cupos: inv.cupos,
    asiste: String(r[3] || '').toLowerCase(), // '', 'si' o 'no'
    asistentes: parseInt(r[4], 10) || 0,
    alergias: String(r[7] || ''), // vuelve a la web para no perderla al cambiar la respuesta
    regalos: idsRegalos_(r[8]),
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
// GET ?regalos=1 → cuántas invitaciones eligieron cada plan: { ok, counts: { hotel: 2, … } }.
function doGet(e) {
  if (e.parameter.regalos) return json_({ ok: true, counts: contarRegalos_() });
  return json_(invitado_(e.parameter.codigo) || { ok: false, error: 'codigo' });
}

function contarRegalos_() {
  const counts = {};
  filas_(respuestas_(), COL_REGALO).forEach(function (f) {
    idsRegalos_(f[COL_REGALO - 1]).forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
  });
  return counts;
}

// POST { codigo, asiste: 'si' | 'no', asistentes, mensaje, alergias } → guarda la respuesta en la fila de la invitación.
// POST { codigo, regalo } → suma ese plan del Honeymoon fund a los de la invitación (sin repetirlo).
// POST { codigo, regalo, quitar: true } → lo quita.
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
    const inv = invitado_(entrada.codigo);
    if (!inv) return json_({ ok: false, error: 'codigo' });
    const codigo = normalizar_(entrada.codigo);
    const hoja = respuestas_();
    const previa = buscar_(hoja, 1, ENCABEZADOS.length, codigo);

    if (entrada.regalo !== undefined) {
      if (!REGALOS.hasOwnProperty(entrada.regalo)) return json_({ ok: false, error: 'regalo' });
      const tiene = inv.regalos.indexOf(entrada.regalo) >= 0;
      if (tiene !== !!entrada.quitar) return json_(inv); // ya lo tenía (o ya no lo tenía): nada que cambiar
      const celda = celdaRegalos_(entrada.quitar
        ? inv.regalos.filter(function (id) { return id !== entrada.regalo; })
        : inv.regalos.concat([entrada.regalo]));
      if (previa) hoja.getRange(previa.fila, COL_REGALO).setValue(celda);
      else hoja.appendRow([codigo, inv.nombre, inv.cupos, '', '', '', '', '', celda]);
      return json_(invitado_(codigo));
    }

    if (entrada.asiste !== 'si' && entrada.asiste !== 'no') return json_({ ok: false, error: 'asiste' });

    const asistentes = entrada.asiste === 'si' ? Number(entrada.asistentes) : 0;
    if (entrada.asiste === 'si' && !(Number.isInteger(asistentes) && asistentes >= 1 && asistentes <= inv.cupos)) {
      return json_({ ok: false, error: 'asistentes' });
    }

    const alergias = entrada.asiste === 'si' ? texto_(entrada.alergias) : '';
    // Columnas A–H: la respuesta nunca borra el regalo (I).
    const fila = [codigo, inv.nombre, inv.cupos, entrada.asiste, asistentes, texto_(entrada.mensaje), new Date(), alergias];
    if (previa) hoja.getRange(previa.fila, 1, 1, fila.length).setValues([fila]);
    else hoja.appendRow(fila.concat(['']));
    return json_(invitado_(codigo));
  } finally {
    candado.releaseLock();
  }
}

// Código de 6 letras sacado del nombre y la fila: siempre da lo mismo para la misma lista,
// así los enlaces de la vista previa son los que quedan en la hoja.
function codigo_(semilla) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, semilla, Utilities.Charset.UTF_8);
  let codigo = '';
  for (let n = 0; n < 6; n++) codigo += ALFABETO.charAt((bytes[n] + 256) % ALFABETO.length);
  return codigo;
}

/**
 * Ejecutar desde el editor (▶) cada vez que agreguen invitaciones o cambien cupos.
 * A cada invitación le pone un código si no tiene (F) y reescribe su mensaje con el enlace (E).
 * Nunca cambia un código ya existente: los enlaces enviados siguen sirviendo
 * (si después cambian el nombre o los cupos en la lista, la web muestra los nuevos).
 */
function generarEnlaces() {
  const hoja = lista_();
  const filas = filas_(hoja, COL.codigo);
  const usados = {};
  filas.forEach(function (f) { if (normalizar_(f[COL.codigo - 1])) usados[normalizar_(f[COL.codigo - 1])] = true; });

  hoja.getRange(1, COL.codigo).setValue('Código');
  filas.forEach(function (f, i) {
    const inv = invitacion_(f);
    if (!inv) return;
    let codigo = normalizar_(f[COL.codigo - 1]);
    for (let intento = 0; !codigo; intento++) {
      const nuevo = codigo_(f[COL.nombre - 1] + '|' + (i + 2) + '|' + intento);
      if (!usados[nuevo]) codigo = nuevo;
    }
    usados[codigo] = true;
    hoja.getRange(i + 2, COL.mensaje, 1, 2).setValues([[MENSAJE
      .replace('[NOMBRE]', inv.nombre.replace(/^\s*(familia|flia)\b\.?\s*/i, 'Flia. '))
      .replace('[CONTIGO]', inv.cupos === 1 ? 'contigo' : 'con ustedes')
      .replace('[LINK LINK]', SITIO + '/?i=' + codigo), codigo]]);
  });
  CacheService.getScriptCache().remove(CACHE_LISTA); // la web ve los cambios de la lista al instante
}
