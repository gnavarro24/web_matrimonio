import { useState, useEffect, useCallback } from 'react';

// Apps Script que guarda la lista de invitados y sus respuestas (ver apps-script/Code.gs).
export const RSVP_API = import.meta.env.VITE_RSVP_API;

// Enlace personal: /?i=ABC234
// La URL solo lleva el código; el nombre y los cupos se cargan de la lista "Tarjeta Wedding Guest List".
// El código se recuerda para que siga valiendo al volver desde Detalles o Regalos.
const readCode = () => {
    const fromUrl = new URLSearchParams(window.location.search).get('i');
    if (fromUrl) localStorage.setItem('invitado', fromUrl);
    return fromUrl || localStorage.getItem('invitado') || '';
};

// Regla de la boda: la palabra "Familia" al inicio del nombre nunca se muestra; va abreviada como "Flia."
// La lista de invitados escribe "Flia" sin punto: también se corrige.
const abreviarFamilia = (nombre = '') => nombre.replace(/^\s*(familia|flia)\b\.?\s*/i, 'Flia. ');

// La hoja tarda 1–3 s en responder. Para que el nombre se vea antes:
// - la consulta sale al cargar la página (precargar, desde main.jsx), no cuando ya se pintó la invitación;
// - lo último que respondió la hoja queda en el celular y se muestra al instante en la siguiente visita,
//   mientras se vuelve a consultar por si cambió algo.
const GUARDADO = 'invitado_datos';
const leerGuardado = (code) => {
    try {
        const g = JSON.parse(localStorage.getItem(GUARDADO));
        return g?.code === code ? { ...g.data, nombre: abreviarFamilia(g.data.nombre) } : null;
    } catch {
        return null;
    }
};
let pedido = null; // { code, promesa }: una sola consulta por carga, compartida por todas las páginas
const consultar = (code) => {
    if (pedido?.code !== code) {
        pedido = { code, promesa: fetch(`${RSVP_API}?codigo=${encodeURIComponent(code)}`).then((r) => r.json()) };
        pedido.promesa.catch(() => { pedido = null; }); // si falla, "Reintentar" vuelve a consultar
    }
    return pedido.promesa;
};
export const precargar = () => {
    const code = readCode();
    if (code && RSVP_API) consultar(code);
};

// status: 'no-code' | 'loading' | 'invalid' | 'error' | 'ready'
// guest: { nombre, cupos, asiste, asistentes, alergias, regalos: [ids] } tal como está en la hoja
export function useInvitado() {
    const [code] = useState(readCode);
    const [guest, setGuestRaw] = useState(() => leerGuardado(code));
    // Todo lo que llega de la hoja pasa por aquí, así el nombre se ve igual en el sobre y en la confirmación.
    const setGuest = useCallback((data) => {
        if (data) {
            pedido = { code, promesa: Promise.resolve(data) }; // otra página de esta carga ve la respuesta nueva
            try { localStorage.setItem(GUARDADO, JSON.stringify({ code, data })); } catch { /* sin memoria en el celular */ }
        }
        setGuestRaw(data && { ...data, nombre: abreviarFamilia(data.nombre) });
    }, [code]);
    const [status, setStatus] = useState(() => (!code ? 'no-code' : leerGuardado(code) ? 'ready' : 'loading'));

    const reload = useCallback(() => {
        if (!leerGuardado(code)) setStatus('loading');
        consultar(code)
            .then((data) => {
                if (!data.ok) {
                    localStorage.removeItem('invitado');
                    localStorage.removeItem(GUARDADO);
                    setGuestRaw(null);
                    return setStatus('invalid');
                }
                setGuest(data);
                setStatus('ready');
            })
            .catch(() => { if (!leerGuardado(code)) setStatus('error'); });
    }, [code, setGuest]);

    useEffect(() => {
        if (code) reload();
    }, [code, reload]);

    return { code, guest, setGuest, status, reload };
}
