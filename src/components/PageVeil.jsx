import { useEffect, useState } from 'react';
import logo from '../assets/decor/logo.png';

// Telón entre páginas: cada página es una carga completa, así que al tocar un enlace interno el telón
// sube y cubre, se navega, y la página nueva arranca cubierta (marca en sessionStorage) y lo levanta.
// "Regresar" de Detalles hace preventDefault (history.back) y por eso no pasa por aquí.
const KEY = 'velo';
const nombres = { '/invitacion': 'Invitación', '/invitacion/details': 'Detalles', '/invitacion/regalos': 'Regalos', '/invitacion/historia': 'Nuestra historia' };
const nombre = (path) => nombres[path.replace(/\/+$/, '')] || '';
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const leer = () => {
    try {
        const v = sessionStorage.getItem(KEY);
        sessionStorage.removeItem(KEY);
        return v;
    } catch { return null; }
};

export default function PageVeil() {
    const [fase, setFase] = useState(() => (leer() && !quieto() ? 'cubre' : 'oculto'));
    const [destino, setDestino] = useState(() => nombre(window.location.pathname));

    useEffect(() => {
        if (fase === 'cubre') {
            const t = setTimeout(() => setFase('sale'), 350);
            return () => clearTimeout(t);
        }
        if (fase === 'sale') {
            document.documentElement.classList.remove('velo-llega');
            const t = setTimeout(() => setFase('oculto'), 750);
            return () => clearTimeout(t);
        }
    }, [fase]);

    useEffect(() => {
        let timer;
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || quieto()) return;
            const a = e.target.closest('a[href]');
            if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
            e.preventDefault();
            setDestino(nombre(url.pathname));
            setFase('entra');
            timer = setTimeout(() => {
                try { sessionStorage.setItem(KEY, '1'); } catch { /* sin telón al llegar */ }
                window.location.href = url.href;
            }, 650);
        };
        // Volver con "atrás" restaura la página desde bfcache con el telón puesto: levantarlo.
        const onShow = (e) => { if (e.persisted) setFase((f) => (f === 'oculto' ? f : 'sale')); };
        document.addEventListener('click', onClick);
        window.addEventListener('pageshow', onShow);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', onClick);
            window.removeEventListener('pageshow', onShow);
        };
    }, []);

    return (
        <div aria-hidden="true" className={`velo velo-${fase}`}>
            <img src={logo} alt="" className="velo-mono h-24 md:h-28 brightness-0 invert" />
            <span className="velo-linea w-20 h-px bg-dry-sage" />
            <span className="velo-mono font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-[#e4e7d4]">{destino}</span>
        </div>
    );
}
