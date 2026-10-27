// Si se llegó desde la invitación sin recargar, "Regresar" vuelve atrás en el historial: la invitación
// vuelve a la misma posición, sin sobre. Si se entró directo a la subpágina, el enlace la abre.
export const volver = (e) => {
    if (history.state?.interna) {
        e.preventDefault();
        window.history.back();
    }
};
