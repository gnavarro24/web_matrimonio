// Prueba Code.gs en Node con hojas de cálculo falsas en memoria:  node apps-script/test.mjs
// `cargar` también lo usan el servidor de prueba local y la vista previa de enlaces.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const hojaFalsa = (celdas) => ({
    getLastRow: () => celdas.length,
    getRange: (fila, col, nFilas = 1, nCols = 1) => ({
        getValues: () => Array.from({ length: nFilas }, (_, r) => Array.from({ length: nCols }, (_, c) => celdas[fila - 1 + r]?.[col - 1 + c] ?? '')),
        setValues: (valores) => valores.forEach((v, r) => v.forEach((x, c) => { (celdas[fila - 1 + r] ??= [])[col - 1 + c] = x; })),
        setValue: (x) => { (celdas[fila - 1] ??= [])[col - 1] = x; },
    }),
    appendRow: (fila) => celdas.push([...fila]),
});

// `lista`: filas de "Tarjeta Wedding Guest List" sin encabezado: [Invitado, Family Name, Invite sent, # of guests, Mensaje, Código]
export function cargar(lista) {
    const celdas = [['Wedding Guest Name(s)', 'Family Name', 'Invite sent', '# of guests', 'Mensaje'], ...lista];
    const respuestas = []; // la pestaña Invitacion empieza vacía, como en la hoja real
    const libros = { Lista: hojaFalsa(celdas), Respuestas: hojaFalsa(respuestas) };
    const cache = new Map(); // CacheService de Apps Script
    const ctx = vm.createContext({
        SpreadsheetApp: {
            openById: (id) => ({
                getSheetByName: (nombre) => (id.startsWith('1Yao') && nombre === 'Tarjeta Wedding Guest List' ? libros.Lista
                    : id.startsWith('1xsl') && nombre === 'Invitacion' ? libros.Respuestas : null),
            }),
        },
        Utilities: {
            DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' },
            // Como Apps Script: bytes con signo (-128..127)
            computeDigest: (alg, texto) => [...createHash(alg).update(texto, 'utf8').digest()].map((b) => (b > 127 ? b - 256 : b)),
        },
        CacheService: { getScriptCache: () => ({ get: (k) => cache.get(k) ?? null, put: (k, v) => cache.set(k, v), remove: (k) => cache.delete(k) }) },
        ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (t) => ({ setMimeType: () => t }) },
        LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    });
    vm.runInContext(readFileSync(new URL('./Code.gs', import.meta.url), 'utf8'), ctx);
    return {
        celdas,
        respuestas,
        cache,
        get: (i) => JSON.parse(vm.runInContext('doGet', ctx)({ parameter: { codigo: i } })),
        regalos: () => JSON.parse(vm.runInContext('doGet', ctx)({ parameter: { regalos: '1' } })),
        post: (body) => JSON.parse(vm.runInContext('doPost', ctx)({ postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } })),
        generarEnlaces: () => vm.runInContext('generarEnlaces', ctx)(),
    };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const s = cargar([
        ['Ana Pérez', 'Flia Pérez', '', 3, '', 'ABC234'],
        ['Luis Pérez', 'Flia Pérez', '', '', '', ''], // acompañante: sin cupos propios
        ['Marta', 'Tía Marta', '', 1, '', 'XYZ789'],
        ['Nuevo', 'Sin código aún', '', 2, '', ''],
        ['Sin nombre', '', '', 1, '', ''],
        ['Repetido', 'Sin código aún', '', 2, '', ''], // mismo nombre que otra invitación
    ]);

    // Consulta: el nombre y los cupos salen de la lista, no de la URL
    assert.deepEqual(s.get('abc234 '), { ok: true, nombre: 'Flia Pérez', cupos: 3, asiste: '', asistentes: 0, alergias: '', regalos: [] });
    assert.deepEqual(s.get('NOEXISTE'), { ok: false, error: 'codigo' });
    assert.deepEqual(s.get(''), { ok: false, error: 'codigo' }); // no debe coincidir con filas sin código
    assert.deepEqual(s.get(undefined), { ok: false, error: 'codigo' });

    // No se puede confirmar más gente que los cupos, ni colar datos raros
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'si', asistentes: 4 }).error, 'asistentes');
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'si', asistentes: 0 }).error, 'asistentes');
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'si', asistentes: 1.5 }).error, 'asistentes');
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'si' }).error, 'asistentes');
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'quizás', asistentes: 1 }).error, 'asiste');
    assert.equal(s.post({ codigo: 'NOEXISTE', asiste: 'si', asistentes: 1 }).error, 'codigo');
    assert.equal(s.post({ asiste: 'si', asistentes: 1 }).error, 'codigo');
    assert.equal(s.post('esto no es json').error, 'formato');
    assert.equal(s.respuestas.length, 1, 'los intentos inválidos no escriben respuestas (solo los encabezados)');

    // Confirmar crea la fila en Invitacion; cambiar la respuesta la sobrescribe
    assert.deepEqual(s.post({ codigo: 'abc234', asiste: 'si', asistentes: 3, mensaje: '=HYPERLINK("http://x")', alergias: '=Maní' }),
        { ok: true, nombre: 'Flia Pérez', cupos: 3, asiste: 'si', asistentes: 3, alergias: "'=Maní", regalos: [] });
    assert.deepEqual(s.respuestas[0], ['Código', 'Nombre', 'Cupos', 'Asiste', 'Asistentes', 'Mensaje', 'Respondió', 'Alergias', 'Regalo']);
    assert.deepEqual(s.respuestas[1].slice(0, 6), ['ABC234', 'Flia Pérez', 3, 'si', 3, '\'=HYPERLINK("http://x")'], 'el mensaje no puede guardarse como fórmula');
    assert.ok(s.respuestas[1][6] instanceof Date || typeof s.respuestas[1][6] === 'object');
    assert.equal(s.get('ABC234').asiste, 'si');
    assert.equal(s.post({ codigo: 'ABC234', asiste: 'no', asistentes: 3, mensaje: 'x'.repeat(900) }).asistentes, 0);
    assert.equal(s.respuestas[1][5].length, 500);
    assert.equal(s.respuestas[1][7], '', 'quien no asiste no deja alergias guardadas');

    // Pulsar muchas veces confirmar / no asistir sobrescribe la misma fila
    for (const asiste of ['si', 'no', 'si', 'si', 'no', 'si']) s.post({ codigo: 'ABC234', asiste, asistentes: 3 });
    assert.equal(s.respuestas.length, 2, 'una sola fila por invitación');
    assert.deepEqual(s.respuestas[1].slice(3, 5), ['si', 3], 'queda la última respuesta');
    s.post({ codigo: 'XYZ789', asiste: 'no' });
    assert.equal(s.respuestas.length, 3);
    assert.deepEqual(s.respuestas[1].slice(3, 5), ['si', 3], 'no toca la fila de otra invitación');

    // Honeymoon fund: varios planes por invitación, sin repetir, y responder después no los borra
    assert.equal(s.post({ codigo: 'ABC234', regalo: 'yate' }).error, 'regalo');
    assert.equal(s.post({ codigo: 'ABC234', regalo: 'constructor' }).error, 'regalo', 'no acepta propiedades heredadas');
    assert.equal(s.post({ codigo: 'NOEXISTE', regalo: 'spa' }).error, 'codigo');
    assert.deepEqual(s.post({ codigo: 'abc234', regalo: 'spa' }).regalos, ['spa']);
    assert.equal(s.respuestas[1][8], 'Un día de spa', 'en la hoja queda el título');
    assert.deepEqual(s.post({ codigo: 'ABC234', regalo: 'hotel' }).regalos, ['spa', 'hotel']);
    assert.equal(s.respuestas[1][8], 'Un día de spa, Las noches de hotel');
    assert.deepEqual(s.post({ codigo: 'ABC234', regalo: 'spa' }).regalos, ['spa', 'hotel'], 'repetir un plan no lo duplica');
    assert.equal(s.respuestas[1][8], 'Un día de spa, Las noches de hotel');
    s.post({ codigo: 'ABC234', asiste: 'no' });
    assert.deepEqual(s.get('ABC234').regalos, ['spa', 'hotel'], 'cambiar la respuesta no borra los regalos');
    assert.deepEqual(s.regalos(), { ok: true, counts: { spa: 1, hotel: 1 } }, 'el contador sale de la hoja');

    // Enlaces: conserva los códigos existentes, crea los que faltan y escribe el mensaje solo en invitaciones
    s.generarEnlaces();
    assert.equal(s.celdas[0][5], 'Código');
    assert.equal(s.celdas[1][5], 'ABC234');
    assert.match(s.celdas[1][4], /^¡Hola! 🤍💌 .* nuestro gran día: https:\/\/thenavelas\.website\/\?i=ABC234 💍 Con cariño, The Navelas 🤍$/);
    assert.equal(s.celdas[2][4], '', 'el acompañante sin cupos no recibe mensaje');
    assert.equal(s.celdas[2][5], '');
    assert.equal(s.celdas[5][5], '', 'sin nombre no hay invitación');
    const [nuevo, repetido] = [s.celdas[4][5], s.celdas[6][5]];
    assert.match(nuevo, /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    assert.notEqual(nuevo, repetido, 'dos invitaciones con el mismo nombre tienen códigos distintos');
    assert.equal(s.get(nuevo).nombre, 'Sin código aún');
    // Elegir regalo antes de confirmar asistencia crea la fila solo con el regalo
    assert.deepEqual(s.post({ codigo: nuevo, regalo: 'tren' }).regalos, ['tren']);
    assert.deepEqual(s.respuestas.at(-1), [nuevo, 'Sin código aún', 2, '', '', '', '', '', 'Los viajes en tren']);
    assert.deepEqual(s.post({ codigo: nuevo, asiste: 'si', asistentes: 2 }).regalos, ['tren'], 'confirmar después conserva el regalo');
    assert.deepEqual(s.regalos().counts, { spa: 1, hotel: 1, tren: 1 });
    s.generarEnlaces();
    assert.equal(s.celdas[4][5], nuevo, 'volver a ejecutarlo no cambia códigos');

    // La lista se lee de la caché; cambiar cupos se ve tras ejecutar generarEnlaces (que la borra)
    assert.equal(s.get('XYZ789').cupos, 1);
    s.celdas[3][3] = 5;
    assert.equal(s.get('XYZ789').cupos, 1, 'sin borrar la caché sigue el valor anterior');
    s.generarEnlaces();
    assert.equal(s.get('XYZ789').cupos, 5);

    // Los códigos son los mismos en cada ejecución desde cero (la vista previa coincide con la hoja)
    const desdeCero = () => { const h = cargar([['Nuevo', 'Sin código aún', '', 2, '', '']]); h.generarEnlaces(); return h.celdas[1][5]; };
    assert.equal(desdeCero(), desdeCero());

    console.log('OK: Code.gs pasa todas las comprobaciones');
}
