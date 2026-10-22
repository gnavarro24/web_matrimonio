import SectionWrapper from './SectionWrapper';
import fotoFondo from '../assets/decor/historia/7510.webp';
import encaje from '../assets/decor/historia_encaje.webp';

// Inspirada en "Our Story" de studiogwyn (Canva): foto a color y, encima, centrada y algo translúcida, la tarjeta de papel con borde
// de encaje calado. La imagen del encaje es la de esa plantilla (pasada por Gustavo el 2026-10-18).
// Toda la tarjeta lleva a la página de la historia.
const NuestraHistoria = () => (
    <SectionWrapper id="historia" className="relative z-0 overflow-hidden py-24 md:py-32 scroll-mt-16 text-center">
        <img loading="lazy" decoding="async" src={fotoFondo} alt="" aria-hidden="true" className="absolute inset-0 -z-20 w-full h-full object-cover [object-position:45%_20%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/20" />

        <a
            href="/invitacion/historia"
            className="group relative inline-flex items-center justify-center w-[min(20rem,84%)] sm:w-[22rem] md:w-[25rem] aspect-[1600/1591] text-[#4a4529] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5 focus-visible:outline-none focus-visible:-translate-y-1.5"
        >
            <img loading="lazy" decoding="async" src={encaje} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.82] drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]" />
            <span className="relative flex flex-col items-center">
                <h2 className="text-[2.5rem] sm:text-[2.9rem] md:text-[3.3rem] leading-[0.95] font-anastasia">
                    Nuestra<br />historia
                </h2>
                <span className="mt-4 font-cormorant font-semibold uppercase tracking-[0.2em] text-sm md:text-base border-b border-transparent group-hover:border-current group-focus-visible:border-current transition-colors duration-300">
                    Click aquí
                </span>
            </span>
        </a>
    </SectionWrapper>
);

export default NuestraHistoria;
