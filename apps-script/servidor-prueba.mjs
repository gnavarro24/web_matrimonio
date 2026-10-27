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
    ['Ana Pérez', 'Flia Pérez Gómez', '', 3, '', 'FAM333'],
    ['Marta', 'Tía Marta', '', 1, '', 'TIA111'],
    ['Andrés', 'Andrés y Camila', '', 2, '', 'PAR222'],
]);

http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c)).on('end', () => {
        const q = new URL(req.url, 'http://x').searchParams;
        const out = req.method === 'POST' ? s.post(body) : q.get('regalos') ? s.regalos() : s.get(q.get('codigo'));
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }).end(JSON.stringify(out));
        if (req.method === 'POST') console.table(s.respuestas.slice(1).map(([codigo, nombre, cupos, asiste, asistentes, mensaje, , alergias]) => ({ codigo, nombre, cupos, asiste, asistentes, mensaje, alergias })));
    });
}).listen(8798, () => console.log('Hoja de prueba en http://localhost:8798'));
