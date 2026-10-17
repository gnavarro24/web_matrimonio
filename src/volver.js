// Si se llegó desde la invitación, "Regresar" vuelve atrás en el historial: el navegador la restaura
// tal como estaba (sin sobre, en la misma posición). Si se entró directo a la subpágina, la abre.
export const volver = (e) => {
    const ref = document.referrer && new URL(document.referrer);
    if (ref && ref.origin === window.location.origin && ref.pathname.replace(/\/+$/, '') === '/invitacion') {
        e.preventDefault();
        window.history.back();
    }
};
