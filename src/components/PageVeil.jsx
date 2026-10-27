import { useEffect, useState } from 'react';
import logo from '../assets/decor/logo.png';
import { navegar } from '../navegacion';

// Telón entre páginas: al tocar un enlace interno el telón sube y cubre, se cambia de página sin recargar
// (navegacion.js) y se levanta. "Regresar" hace preventDefault (history.back) y por eso no pasa por aquí.
const nombres = { '/': 'Invitación', '/details': 'Detalles', '/regalos': 'Regalos', '/historia': 'Nuestra historia' };
const nombre = (path) => nombres[path.replace(/\/+$/, '') || '/'] || '';
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export default function PageVeil() {
    const [fase, setFase] = useState('oculto');
    const [destino, setDestino] = useState(() => nombre(window.location.pathname));

    useEffect(() => {
        if (fase === 'cubre') {
            const t = setTimeout(() => setFase('sale'), 350);
            return () => clearTimeout(t);
        }
        if (fase === 'sale') {
            const t = setTimeout(() => setFase('oculto'), 750);
            return () => clearTimeout(t);
        }
    }, [fase]);

    useEffect(() => {
        let timer;
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = e.target.closest('a[href]');
            if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
            e.preventDefault();
            const destino = url.pathname + url.search + url.hash;
            if (quieto()) return navegar(destino); // sin telón, pero igual sin recargar (la música sigue)
            setDestino(nombre(url.pathname));
            setFase('entra');
            timer = setTimeout(() => {
                navegar(destino);
                setFase('cubre');
            }, 650);
        };
        document.addEventListener('click', onClick);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', onClick);
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
