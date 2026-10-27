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

// status: 'no-code' | 'loading' | 'invalid' | 'error' | 'ready'
// guest: { nombre, cupos, asiste, asistentes } tal como está en la hoja
export function useInvitado() {
    const [code] = useState(readCode);
    const [guest, setGuestRaw] = useState(null);
    // Todo lo que llega de la hoja pasa por aquí, así el nombre se ve igual en el sobre y en la confirmación.
    const setGuest = useCallback((data) => setGuestRaw(data && { ...data, nombre: abreviarFamilia(data.nombre) }), []);
    const [status, setStatus] = useState(code ? 'loading' : 'no-code');

    const reload = useCallback(() => {
        setStatus('loading');
        fetch(`${RSVP_API}?codigo=${encodeURIComponent(code)}`)
            .then((r) => r.json())
            .then((data) => {
                if (!data.ok) {
                    localStorage.removeItem('invitado');
                    return setStatus('invalid');
                }
                setGuest(data);
                setStatus('ready');
            })
            .catch(() => setStatus('error'));
    }, [code, setGuest]);

    useEffect(() => {
        if (code) reload();
    }, [code, reload]);

    return { code, guest, setGuest, status, reload };
}
