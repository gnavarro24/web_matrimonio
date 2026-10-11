// Sustituto local de Google para ver y probar la confirmación sin tocar la hoja real.
// Ejecuta el Code.gs de verdad sobre una hoja en memoria (se reinicia al cerrar).
//
//   node apps-script/servidor-prueba.mjs
//   VITE_RSVP_API=http://localhost:8798 npm run dev
//
// Para probar desde el celular, usar la IP del computador en vez de localhost en ambos sitios.
import http from 'node:http';
import { cargar } from './test.mjs';

const s = cargar([
    ['FAM333', 'Familia Pérez Gómez', 3, '', '', '', '', ''],
    ['TIA111', 'Tía Marta', 1, '', '', '', '', ''],
    ['PAR222', 'Andrés y Camila', 2, '', '', '', '', ''],
]);

http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c)).on('end', () => {
        const out = req.method === 'POST' ? s.post(body) : s.get(new URL(req.url, 'http://x').searchParams.get('codigo'));
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }).end(JSON.stringify(out));
        if (req.method === 'POST') console.log(`${s.celdas.length - 1} filas en la hoja`);
        if (req.method === 'POST') console.table(s.celdas.slice(1).map(([codigo, nombre, cupos, , asiste, asistentes, mensaje]) => ({ codigo, nombre, cupos, asiste, asistentes, mensaje })));
    });
}).listen(8798, () => console.log('Hoja de prueba en http://localhost:8798'));
