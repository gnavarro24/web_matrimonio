import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import { volver } from './volver';

// Fotos sin repetir las de otras páginas. Prefijo = grupo, número = orden:
// a = mosaico de arriba (propuesta en Las Vegas, carpeta "Modificadas con ai"),
// s = save the date (las que no usan Detalles ni la invitación), p = propuesta (fila del medio de abajo).
const todas = import.meta.glob('./assets/decor/collage/*.webp', { eager: true, import: 'default' });
const grupo = (letra) => Object.keys(todas).filter((r) => r.split('/').pop().startsWith(letra)).sort().map((r) => todas[r]);
const arriba = grupo('a'); // en móvil se ven 9
const std = grupo('s');
const abajo = [std.slice(0, 5), grupo('p'), std.slice(5, 10)]; // tres filas: save the date, propuesta, save the date

const navLinks = [
    { title: "Invitación", href: "/invitacion" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "Regalos", href: "/invitacion/regalos" },
    { title: "RSVP", href: "/invitacion#rsvp" },
];

// Un solo párrafo: se lee en el celular. Texto de Gustavo, tal cual.
const historia = '2019 fue el año en que nos conocimos pero nuestros sueños y planes nos llevarían a lugares diferentes. Tuvieron que pasar mudanzas, cambios de ciudad, nuevos trabajos y una pandemia, hasta que en 2022 una llamada de cumpleaños, un concierto de Maná, un viaje a Punta Cana, y Dios volvió a unir nuestras historias para darle una oportunidad a lo que había nacido años atrás. En 2025 nos dijimos que sí en Las Vegas, entre un concierto de Bruno Mars y una cita en uno de los edificios más altos del mundo. Y desde entonces hemos vivido uno de los años más maravillosos juntos, seguros de que Dios ya nos había escogido a cada uno para este camino.';

// Las fotos aparecen de una en una: cada foto que entra en pantalla se pone en la cola, y la cola muestra una cada PAUSA ms.
const PAUSA = 140;
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const useCola = () => {
    const cola = useRef([]);
    const timer = useRef(null);
    useEffect(() => () => clearTimeout(timer.current), []);
    return useCallback((mostrar) => {
        if (quieto()) return mostrar();
        cola.current.push(mostrar);
        if (timer.current) return;
        const siguiente = () => {
            const f = cola.current.shift();
            if (!f) { timer.current = null; return; }
            f();
            timer.current = setTimeout(siguiente, PAUSA);
        };
        siguiente();
    }, []);
};

// Mosaico (diseño D): cada foto entra a la cola al verse y aparece con un leve zoom hacia atrás.
const Foto = ({ src, encolar, className = '', diferida = false }) => {
    const [on, setOn] = useState(false);
    return (
        <motion.div viewport={{ once: true, amount: 0.3 }} onViewportEnter={() => encolar(() => setOn(true))} className={`overflow-hidden ${className}`}>
            <img src={src} alt="" loading={diferida ? 'lazy' : undefined} decoding="async" className={`block w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out ${on ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.08]'}`} />
        </motion.div>
    );
};

function Historia() {
    const encolar = useCola();
    return (
        <div id="top" className="pagina-verde min-h-screen bg-[#4a4529] text-[#f7f2e9] overflow-clip">
            <Navbar navLinks={navLinks} />
            <a
                href="/invitacion"
                onClick={volver}
                className="fixed left-4 top-[88px] z-40 inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#f7f2e9]/95 text-[#4a4529] border border-[#4a4529]/30 shadow-md font-sans text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
                <ArrowLeft size={16} /> Regresar
            </a>

            <header className="relative pt-[72px]">
                <div aria-hidden="true" className="grid grid-cols-3 md:grid-cols-6 gap-[3px] bg-[#3a361f]">
                    {arriba.map((src, i) => <Foto key={src} src={src} encolar={encolar} diferida={i >= 9} className={`aspect-[3/4] ${i >= 9 ? 'hidden md:block' : ''}`} />)}
                </div>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 md:h-72 bg-gradient-to-b from-transparent to-[#4a4529] to-[92%] pointer-events-none" />
                <h1 className="absolute inset-x-0 -bottom-4 md:-bottom-6 text-center font-anastasia text-[3.5rem] md:text-[5.5rem] leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">Nuestra historia</h1>
            </header>

            <section className="max-w-[640px] mx-auto px-7 pt-10 md:pt-14 text-center">
                <p className="font-cormorant italic font-medium text-[19px] md:text-[22px] leading-[1.65]">{historia}</p>
            </section>

            <section className="max-w-[420px] mx-8 sm:mx-auto mt-7 bg-[#f7f2e9] text-[#4a4529] p-1 shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                <div className="border border-[#4a4529]/35 px-5 pt-5 pb-4 text-center">
                    <p className="font-cormorant italic font-semibold text-[17px] md:text-[19px] leading-[1.35]">
                        Así como es de especial nuestra historia y seguramente tú has tenido un rol en ella, soñamos con que nos acompañes en nuestro día.
                    </p>
                    <p className="mt-3 font-cormorant font-bold uppercase tracking-[0.24em] text-[11px] text-[#586748]">Con amor</p>
                    <p className="font-anastasia text-[2rem] md:text-[2.4rem] leading-[1.15] whitespace-nowrap">Gustavo &amp; Geraldine</p>
                </div>
            </section>

            {/* Cada fila: 4 fotos en móvil, 5 desde md */}
            <div aria-hidden="true" className="mt-10 flex flex-col gap-[3px]">
                {abajo.map((fila, f) => (
                    <div key={f} className="grid grid-cols-4 md:grid-cols-5 gap-[3px]">
                        {fila.map((src, i) => <Foto key={src} src={src} encolar={encolar} diferida className={`aspect-square ${i === 4 ? 'hidden md:block' : ''}`} />)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Historia;
