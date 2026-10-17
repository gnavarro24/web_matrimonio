import { ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import fotoParis from '../assets/decor/gallery_14.jpg';

// Inspirada en "Our Story" de studiogwyn (Canva): foto de la pareja en blanco y negro y, encima,
// una tarjeta con marco tipo encaje. Toda la tarjeta lleva a la página de la historia.
const Esquina = ({ className }) => (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={`absolute w-8 h-8 md:w-10 md:h-10 text-[#a7ad89] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 36V14a10 10 0 0 1 10-10h22" />
        <path d="M10 36V18a8 8 0 0 1 8-8h18" />
        <circle cx="14" cy="14" r="2.5" fill="currentColor" stroke="none" />
    </svg>
);

const NuestraHistoria = () => (
    <SectionWrapper id="historia" className="relative z-0 overflow-hidden py-24 md:py-36 scroll-mt-16">
        <img src={fotoParis} alt="" aria-hidden="true" className="absolute inset-0 -z-20 w-full h-full object-cover [object-position:50%_40%] grayscale contrast-[1.1]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />

        {/* Borde de "encaje": festón de puntos entre dos líneas */}
        <a
            href="/invitacion/historia"
            className="group relative block max-w-[560px] mx-auto bg-porcelain p-2.5 md:p-3 shadow-[0_24px_50px_rgba(0,0,0,0.45)] -rotate-1 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_34px_60px_rgba(0,0,0,0.5)] focus-visible:rotate-0 focus-visible:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-porcelain"
        >
            <div className="border border-[#a7ad89] p-[5px]">
                <div className="relative border-2 border-dotted border-[#a7ad89]/80 px-7 py-12 md:px-14 md:py-16 text-center text-[#4a4529]">
                    <Esquina className="left-2 top-2" />
                    <Esquina className="right-2 top-2 rotate-90" />
                    <Esquina className="right-2 bottom-2 rotate-180" />
                    <Esquina className="left-2 bottom-2 -rotate-90" />

                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#586748]">Nuestra historia</p>
                    <h2 className="mt-3 font-anastasia text-[3.4rem] md:text-[4.5rem] leading-[1.05]">The Navelas</h2>
                    <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 text-[#586748]">
                        <span className="w-12 h-px bg-current" />
                        <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                        <span className="w-12 h-px bg-current" />
                    </div>
                    <p className="mt-6 text-xl md:text-2xl font-cormorant italic font-medium leading-relaxed">
                        Dos caminos, muchas ciudades y un sí.<br />Así llegamos hasta aquí.
                    </p>
                    <span className="mt-7 inline-flex flex-col items-center gap-1.5">
                        <span className="inline-flex items-center gap-2.5 min-h-[44px] font-cormorant text-lg font-semibold uppercase tracking-[0.18em] text-[#413c22]">
                            Click aquí
                            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.6} className="transition-transform duration-[400ms] group-hover:translate-x-1.5" />
                        </span>
                        <span aria-hidden="true" className="block w-full h-px bg-[#413c22] origin-left scale-x-[.35] transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                </div>
            </div>
        </a>
    </SectionWrapper>
);

export default NuestraHistoria;
