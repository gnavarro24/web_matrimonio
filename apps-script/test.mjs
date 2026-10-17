// Prueba Code.gs en Node con una hoja de cálculo falsa en memoria:  node apps-script/test.mjs
// `cargar` también lo usa un servidor de prueba local para probar el formulario sin Google.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export function cargar(filas) {
    const celdas = [['Código', 'Nombre', 'Cupos', 'Enlace', 'Asiste', 'Asistentes', 'Mensaje', 'Respondió', 'Alergias'], ...filas];
    const hoja = {
        getLastRow: () => celdas.length,
        getRange: (fila, col, nFilas = 1, nCols = 1) => ({
            getValues: () => Array.from({ length: nFilas }, (_, r) => Array.from({ length: nCols }, (_, c) => celdas[fila - 1 + r]?.[col - 1 + c] ?? '')),
            setValues: (valores) => valores.forEach((v, r) => v.forEach((x, c) => { celdas[fila - 1 + r][col - 1 + c] = x; })),
            setValue: (x) => { celdas[fila - 1][col - 1] = x; },
        }),
    };
    const ctx = vm.createContext({
        SpreadsheetApp: { openById: () => ({ getSheetByName: () => hoja }) },
        ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (t) => ({ setMimeType: () => t }) },
        LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    });
    vm.runInContext(readFileSync(new URL('./Code.gs', import.meta.url), 'utf8'), ctx);
    return {
        celdas,
        get: (i) => JSON.parse(vm.runInContext('doGet', ctx)({ parameter: { codigo: i } })),
        post: (body) => JSON.parse(vm.runInContext('doPost', ctx)({ postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } })),
        generarEnlaces: () => vm.runInContext('generarEnlaces', ctx)(),
    };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const s = cargar([
        ['ABC234', 'Familia Pérez', 3, '', '', '', '', ''],
        ['XYZ789', 'Tía Marta', 1, '', '', '', '', ''],
        ['', 'Sin código aún', 2, '', '', '', '', ''],
    ]);

    // Consulta: el nombre y los cupos salen de la hoja, no de la URL
    assert.deepEqual(s.get('abc234 '), { ok: true, nombre: 'Familia Pérez', cupos: 3, asiste: '', asistentes: 0, alergias: '' });
    assert.deepEqual(s.get('NOEXISTE'), { ok: false, error: 'codigo' });
    assert.deepEqual(s.get(''), { ok: false, error: 'codigo' }); // no debe coincidir con la fila sin código
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
    assert.equal(s.celdas[1][4], '', 'los intentos inválidos no escriben nada');

    // Confirmar, y luego cambiar la respuesta sobre la misma fila
    assert.deepEqual(s.post({ codigo: 'abc234', asiste: 'si', asistentes: 2, mensaje: '=HYPERLINK("http://x")', alergias: '=Maní' }),
        { ok: true, nombre: 'Familia Pérez', cupos: 3, asiste: 'si', asistentes: 2, alergias: "'=Maní" });
    assert.equal(s.celdas[1][6], '\'=HYPERLINK("http://x")', 'el mensaje no puede guardarse como fórmula');
    assert.ok(s.celdas[1][7] instanceof Date || typeof s.celdas[1][7] === 'object');
    assert.equal(s.get('ABC234').asiste, 'si');
    assert.deepEqual(s.post({ codigo: 'ABC234', asiste: 'no', asistentes: 3, mensaje: 'x'.repeat(900) }).asistentes, 0);
    assert.equal(s.celdas[1][6].length, 500);
    assert.equal(s.celdas[1][8], '', 'quien no asiste no deja alergias guardadas');
    assert.equal(s.celdas[2][4], '', 'no toca filas de otros invitados');

    // Pulsar muchas veces confirmar / no asistir sobrescribe la misma fila: nunca crea registros
    const filasAntes = s.celdas.length;
    for (const asiste of ['si', 'no', 'si', 'si', 'no', 'si']) s.post({ codigo: 'ABC234', asiste, asistentes: 3 });
    assert.equal(s.celdas.length, filasAntes, 'no se crean filas nuevas');
    assert.equal(s.celdas.filter((f) => f[0] === 'ABC234').length, 1, 'el invitado sigue teniendo una sola fila');
    assert.deepEqual(s.celdas[1].slice(4, 6), ['si', 3], 'queda la última respuesta');
    s.post({ codigo: 'ABC234', asiste: 'no' });
    assert.deepEqual(s.celdas[1].slice(4, 6), ['no', 0]);

    // Enlaces: conserva los códigos existentes y crea los que faltan
    s.generarEnlaces();
    assert.equal(s.celdas[1][0], 'ABC234');
    assert.equal(s.celdas[1][3], 'https://PEGAR_DOMINIO/invitacion?i=ABC234');
    assert.match(s.celdas[3][0], /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    assert.equal(s.get(s.celdas[3][0]).nombre, 'Sin código aún');
    const antes = s.celdas[3][0];
    s.generarEnlaces();
    assert.equal(s.celdas[3][0], antes, 'volver a ejecutarlo no cambia códigos');

    console.log('OK: Code.gs pasa todas las comprobaciones');
}
