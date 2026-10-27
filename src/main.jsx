import React, { lazy, Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import PageVeil from './components/PageVeil.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import SimpleAudioTest from './components/SimpleAudioTest.jsx'
import standByMeAudio from './assets/decor/stand-by-me.m4a'
import { ruta } from './navegacion.js'
import './index.css'

// ponytail: switch por pathname, son 5 páginas estáticas; react-router si aparecen rutas dinámicas.
// Cada página en su propio archivo JS: el celular solo descarga la que abre. Se cambia sin recargar (navegacion.js).
const routes = {
    '/': () => import('./Invitation.jsx'),
    '/details': () => import('./Details.jsx'),
    '/regalos': () => import('./Regalos.jsx'),
    '/historia': () => import('./Historia.jsx'),
};
const paginas = Object.fromEntries(Object.entries(routes).map(([r, cargar]) => [r, lazy(cargar)]));
// El Save the Date (App.jsx) se conserva en /save-the-date; la portada del sitio es la invitación.
paginas['/save-the-date'] = lazy(() => import('./App.jsx'));
// Las direcciones viejas (/invitacion, /invitacion/details…) y las desconocidas van a su equivalente o a la portada,
// conservando ?i=CODIGO y #rsvp.
if (!paginas[ruta()]) {
    const sinPrefijo = ruta().replace(/^\/invitacion/, '') || '/';
    history.replaceState(null, '', (paginas[sinPrefijo] ? sinPrefijo : '/') + window.location.search + window.location.hash);
}
const inicial = ruta();

// Vuelve a la posición guardada (atrás) o arriba (página nueva). La página llega diferida: esperar a que mida.
const ubicar = () => {
    if (window.location.hash && history.state?.y == null) return; // #rsvp: lo maneja la página
    const y = history.state?.y || 0;
    const t0 = performance.now();
    const intentar = () => {
        if (document.documentElement.scrollHeight >= y + window.innerHeight || performance.now() - t0 > 1500) return window.scrollTo(0, y);
        requestAnimationFrame(intentar);
    };
    intentar();
};

function Raiz() {
    const [r, setR] = useState(inicial);
    useEffect(() => {
        const cambio = () => setR((antes) => {
            const nueva = ruta();
            if (nueva !== antes) requestAnimationFrame(ubicar);
            return nueva;
        });
        window.addEventListener('ruta', cambio);
        return () => window.removeEventListener('ruta', cambio);
    }, []);
    const Page = paginas[r] || paginas['/'];
    return (
        <>
            <Suspense fallback={null}><Page key={r} /></Suspense>
            {/* La invitación abre con el sobre: la música espera a ese toque */}
            {r !== '/save-the-date' && <SimpleAudioTest src={standByMeAudio} oculto={inicial === '/'} />}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Raiz />
        <ScrollProgress />
        <PageVeil />
    </React.StrictMode>,
)
