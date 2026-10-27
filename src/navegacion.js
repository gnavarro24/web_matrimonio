// Navegación sin recargar entre las páginas de la invitación: así la música (montada una sola vez en main.jsx)
// sigue sonando al cambiar de vista. Cada entrada que se crea aquí lleva `interna` y la posición del scroll.
const avisar = () => window.dispatchEvent(new Event('ruta'));
let navego = false; // true después del primer cambio de página en esta carga

export const ruta = () => window.location.pathname.replace(/\/+$/, '') || '/';
export const yaNavego = () => navego;

export const navegar = (href) => {
    history.replaceState({ ...history.state, y: window.scrollY }, '');
    history.pushState({ interna: true }, '', href);
    navego = true;
    avisar();
};

if (typeof window !== 'undefined') {
    history.scrollRestoration = 'manual';
    window.addEventListener('popstate', () => { navego = true; avisar(); });
}
