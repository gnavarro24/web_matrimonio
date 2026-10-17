import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import { volver } from './volver';
import paris from './assets/decor/gallery_14.jpg';

// Sesión de fotos (webp de 1400 px). Clave = número de la foto: '7525', '8005'…
const sesion = Object.fromEntries(
    Object.entries(import.meta.glob('./assets/decor/historia/*.webp', { eager: true, import: 'default' }))
        .map(([ruta, url]) => [ruta.match(/(\d+)\.webp$/)[1], url]),
);

const navLinks = [
    { title: "Invitación", href: "/invitacion" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "Regalos", href: "/invitacion/regalos" },
    { title: "RSVP", href: "/invitacion#rsvp" },
];

// Fotos alrededor del texto: en móvil, tres arriba y tres abajo; desde lg, sueltas alrededor.
const arriba = [
    { src: sesion['7525'], alt: 'Geraldine y Gustavo de gala en la escalera', pos: 'lg:left-0 lg:top-0 lg:w-[230px]', rot: '-rotate-6' },
    { src: sesion['7968'], alt: 'Geraldine y Gustavo compartiendo un plato de pasta', pos: 'lg:left-[24%] lg:-top-4 lg:w-[170px]', rot: 'rotate-3' },
    { src: sesion['7653'], alt: 'Geraldine y Gustavo caminando por un jardín', pos: 'lg:right-0 lg:top-6 lg:w-[230px]', rot: 'rotate-[5deg]' },
];
const abajo = [
    { src: sesion['7639'], alt: 'Geraldine y Gustavo sentados en la escalera con su perro', pos: 'lg:left-[3%] lg:bottom-0 lg:w-[215px]', rot: 'rotate-[4deg]' },
    { src: sesion['8487'], alt: 'Geraldine y Gustavo jugando cartas', pos: 'lg:right-[24%] lg:-bottom-4 lg:w-[170px]', rot: '-rotate-3' },
    { src: sesion['8291'], alt: 'Geraldine y Gustavo brindando junto a la piscina', pos: 'lg:right-[2%] lg:bottom-3 lg:w-[220px]', rot: '-rotate-[5deg]' },
];
// La cinta lleva toda la sesión.
const cinta = Object.values(sesion).map((src) => ({ src, alt: '' })); // decorativa: son las mismas fotos de la sesión

// Bloque que se anima al entrar en pantalla: le pone "on" y el CSS (.rev en index.css) hace el resto.
const Rev = ({ as = 'div', className = '', children, ...props }) => {
    const [on, setOn] = useState(false);
    const M = motion[as];
    return (
        <M viewport={{ once: true, amount: 0.18 }} onViewportEnter={() => setOn(true)} className={`rev ${on ? 'on' : ''} ${className}`} {...props}>
            {children}
        </M>
    );
};

const Foto = ({ src, alt, pos, rot, delay }) => (
    <div className={`pola lg:absolute ${pos}`} style={{ animationDelay: delay }}>
        <div className={`bg-porcelain p-2 pb-6 lg:p-3 lg:pb-10 shadow-[0_18px_40px_rgba(65,60,34,0.22)] transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-0 ${rot}`}>
            <div className="overflow-hidden aspect-[4/5] bg-[#e4e7d4]">
                <img src={src} alt={alt} loading="lazy" className="dev block w-full h-full object-cover" style={{ animationDelay: delay }} />
            </div>
        </div>
    </div>
);

const kicker = 'font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#586748]';
const tira = 'h-[22px] bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(255,253,247,0.85)_10px_22px,transparent_22px_34px)] bg-[length:34px_10px] bg-repeat-x bg-[position:0_6px]';

function Historia() {
    return (
        <div id="top" className="min-h-screen bg-porcelain text-[#4a4529] overflow-x-hidden">
            <Navbar navLinks={navLinks} />
            <a
                href="/invitacion"
                onClick={volver}
                className="fixed left-4 top-[88px] z-40 inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#f7f2e9]/95 text-[#4a4529] border border-[#4a4529]/30 shadow-md font-sans text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
                <ArrowLeft size={16} /> Regresar
            </a>

            <header className="relative z-0 overflow-hidden min-h-[760px] flex items-center justify-center px-5 pt-[150px] pb-[100px]">
                <img src={paris} alt="" aria-hidden="true" className="kb absolute inset-0 -z-20 w-full h-full object-cover [object-position:50%_40%] grayscale contrast-[1.1]" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/40" />
                <div className="drop w-full max-w-[560px] bg-porcelain p-3 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                    <div className="border border-[#a7ad89] p-[5px]">
                        <div className="border-2 border-dotted border-[#a7ad89]/80 px-7 py-14 text-center">
                            <p className={kicker}>Nuestra historia</p>
                            <h1 className="mt-3 font-anastasia text-[3.6rem] md:text-[4.75rem] leading-[1.05]">The Navelas</h1>
                            <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 text-[#586748]">
                                <span className="w-12 h-px bg-current" />
                                <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                                <span className="w-12 h-px bg-current" />
                            </div>
                            <p className="mt-[18px] font-cormorant italic text-2xl">Geraldine &amp; Gustavo · desde [año]</p>
                        </div>
                    </div>
                </div>
                <ChevronDown aria-hidden="true" className="cue absolute left-1/2 bottom-7 -ml-3 text-porcelain" />
            </header>

            <Rev as="section" className="relative max-w-[1120px] mx-auto px-6 py-20 lg:py-0 lg:my-24 lg:min-h-[820px] lg:flex lg:items-center lg:justify-center">
                <div className="grid grid-cols-3 gap-3 lg:contents">
                    {arriba.map((f, i) => <Foto key={f.alt} {...f} delay={`${i * 150}ms`} />)}
                </div>
                <p className="up relative max-w-[460px] mx-auto my-14 lg:my-0 text-center font-cormorant italic font-medium text-[1.6rem] md:text-[1.9rem] leading-normal text-[#413c22] [animation-delay:200ms]">
                    Queremos que seas parte de este capítulo tan importante en nuestras vidas, que brindes con nosotros,
                    que rías con nosotros y que bailes hasta que la noche se vuelva recuerdo.
                </p>
                <div className="grid grid-cols-3 gap-3 lg:contents">
                    {abajo.map((f, i) => <Foto key={f.alt} {...f} delay={`${450 + i * 150}ms`} />)}
                </div>
            </Rev>

            <Rev as="section" className="bg-[#413c22] text-porcelain pt-20 pb-[90px] text-center">
                <p className={`up ${kicker} !text-[#a7ad89]`}>Momentos</p>
                <h2 className="mask mt-2.5 font-anastasia text-5xl md:text-[64px] leading-[1.2]">Lo que llevamos vivido</h2>
                <div className="group up mt-11 overflow-hidden bg-[#26230f] [animation-delay:300ms]">
                    <div aria-hidden="true" className={tira} />
                    <div className="film flex gap-3.5 w-max py-2 group-hover:[animation-play-state:paused]">
                        {cinta.concat(cinta).map((f, i) => (
                            <img key={i} src={f.src} alt={i < cinta.length ? f.alt : ''} aria-hidden={i >= cinta.length || undefined} loading="lazy" className="block w-[180px] h-[225px] md:w-[240px] md:h-[300px] object-cover sepia-[.25]" />
                        ))}
                    </div>
                    <div aria-hidden="true" className={tira} />
                </div>
            </Rev>
        </div>
    );
}

export default Historia;
