import { gifts } from '../src/gifts.js';

const ids = new Set(gifts.map((g) => g.id));

// Sin base de datos: todos los contadores viven en un solo objeto guardado, p. ej.
// { "gelato": 12, "vespa": 3 }.
export class Regalos {
    constructor(state) {
        this.state = state;
    }

    async fetch(request) {
        // El body se lee ANTES de tocar el objeto guardado: entre el get y el put no puede
        // haber ningún otro await, o dos aportes simultáneos se pisarían y se perdería uno.
        const id = request.method === 'POST' ? (await request.json().catch(() => ({}))).id : null;
        if (id !== null && !ids.has(id)) return Response.json({ error: 'Regalo desconocido' }, { status: 400 });

        const counts = (await this.state.storage.get('counts')) || {};
        if (id) {
            counts[id] = (counts[id] || 0) + 1;
            this.state.storage.put('counts', counts);
        }
        return Response.json({ counts }, { headers: { 'Cache-Control': 'no-store' } });
    }
}

export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);
        if (pathname === '/api/regalos' && ['GET', 'POST'].includes(request.method)) {
            // ponytail: sin límite por invitado en el servidor (solo localStorage en el cliente);
            // si alguien infla los contadores, añadir rate limiting de Cloudflare a /api/*.
            return env.REGALOS.get(env.REGALOS.idFromName('boda')).fetch(request);
        }
        return env.ASSETS.fetch(request);
    },
};
