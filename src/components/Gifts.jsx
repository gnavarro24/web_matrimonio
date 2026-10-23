import { Plane } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const Gifts = () => (
    <SectionWrapper id="regalos" className="bg-cream py-16 md:py-24 scroll-mt-16">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-10 text-5xl md:text-6xl font-anastasia leading-tight text-black/80">Gifts</h2>
            <a
                href="/invitacion/regalos"
                className="group relative inline-block w-72 h-52 sm:w-80 sm:h-60 md:w-96 md:h-72 -rotate-2 text-dusty-olive transition-transform duration-500 ease-out hover:scale-105 hover:rotate-0 focus-visible:outline-none focus-visible:scale-105"
            >
                {/* Sobre de correo aéreo: borde a rayas, matasellos y estampilla */}
                <svg
                    viewBox="0 0 320 240"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full drop-shadow-[0_6px_14px_rgba(107,93,54,0.28)] transition-[filter] duration-500 group-hover:drop-shadow-[0_12px_22px_rgba(107,93,54,0.38)]"
                >
                    <defs>
                        <pattern id="correo-aereo" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <rect width="24" height="24" className="fill-porcelain" />
                            <rect width="8" height="24" className="fill-dusty-olive" />
                            <rect x="12" width="8" height="24" className="fill-dry-sage" />
                        </pattern>
                    </defs>
                    <rect width="320" height="240" rx="6" fill="url(#correo-aereo)" />
                    <rect x="9" y="9" width="302" height="222" rx="3" className="fill-porcelain" />
                    <g fill="none" stroke="currentColor" strokeLinecap="round" opacity="0.55">
                        <circle cx="232" cy="78" r="21" strokeWidth="1" />
                        <circle cx="232" cy="78" r="15" strokeWidth="0.8" />
                        <path d="M150 66 q7 -6 14 0 t14 0 t14 0 t14 0" strokeWidth="1" />
                        <path d="M150 76 q7 -6 14 0 t14 0 t14 0 t14 0" strokeWidth="1" />
                        <path d="M150 86 q7 -6 14 0 t14 0 t14 0 t14 0" strokeWidth="1" />
                    </g>
                    <rect x="240" y="24" width="54" height="64" className="fill-[#f7f2e9]" stroke="currentColor" strokeWidth="2.4" strokeDasharray="0.1 4.6" strokeLinecap="round" />
                    <rect x="245" y="29" width="44" height="54" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M251 76 h32" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <Plane
                    aria-hidden="true"
                    strokeWidth={1.3}
                    className="absolute left-[79%] top-[16.5%] w-[9%] h-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
                <span className="absolute left-[8%] top-[11.5%] border border-dusty-olive px-2 py-1 font-sans text-[9px] md:text-[11px] uppercase tracking-[0.22em]">
                    Per via aerea
                </span>
                <span className="absolute inset-x-0 bottom-[10%] flex flex-col items-center">
                    <h3 className="text-4xl sm:text-[2.6rem] md:text-5xl text-black/80 font-anastasia whitespace-nowrap">Honeymoon fund</h3>
                    <span className="mt-1 md:mt-2 font-cormorant uppercase tracking-[0.25em] text-sm md:text-base border-b border-transparent group-hover:border-dusty-olive group-focus-visible:border-dusty-olive transition-colors duration-300">
                        Click aquí
                    </span>
                </span>
            </a>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl font-cormorant text-black/70">
                Tu presencia es nuestro mejor regalo. Si además quieres tener un detalle con nosotros,{' '}
                <a href="/invitacion/regalos" className="underline underline-offset-4 decoration-dusty-olive/60 transition-colors hover:text-black">da clic aquí</a>{' '}
                y ayúdanos a llegar a la meta de nuestro honeymoon o de nuestro primer hogar.
            </p>
        </div>
    </SectionWrapper>
);

export default Gifts;
