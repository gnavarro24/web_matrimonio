import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

// Playlist colaborativa de Spotify. El enlace va tal cual lo compartió Spotify: lleva la invitación para poder agregar canciones.
const playlistLink = 'https://open.spotify.com/playlist/1gSql4C6czeCAqDSKhDOxW?si=vRW729ciQ6mO0UVlSwCFPw&utm_source=copy-link&pi=JPXR9viORfe-';

// Barritas de ecualizador: cada una sube y baja a su ritmo.
const bars = [0.9, 0.55, 1.1, 0.7, 0.95];
const Equalizer = () => {
    const quieto = useReducedMotion();
    return (
        <span aria-hidden="true" className="flex items-end gap-[3px] h-4">
            {bars.map((duration, i) => (
                <motion.span
                    key={i}
                    className="w-[3px] h-full origin-bottom bg-current"
                    animate={quieto ? { scaleY: 0.6 } : { scaleY: [0.3, 1, 0.5, 0.85, 0.3] }}
                    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </span>
    );
};

// Vinilo con la etiqueta de la boda; gira despacio y la aguja descansa encima.
const Vinyl = () => (
    <span aria-hidden="true" className="relative inline-block w-48 h-48 md:w-60 md:h-60 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] motion-safe:animate-[spin_7s_linear_infinite]">
            <circle cx="100" cy="100" r="98" fill="#15140f" />
            <g fill="none" stroke="#f7f2e9" strokeOpacity="0.13" strokeWidth="0.8">
                <circle cx="100" cy="100" r="88" />
                <circle cx="100" cy="100" r="78" />
                <circle cx="100" cy="100" r="68" />
                <circle cx="100" cy="100" r="58" />
                <circle cx="100" cy="100" r="48" />
            </g>
            {/* Brillos del vinilo */}
            <g fill="none" stroke="#f7f2e9" strokeOpacity="0.22" strokeWidth="14" strokeLinecap="round">
                <path d="M100 27 A73 73 0 0 1 151 48" />
                <path d="M100 173 A73 73 0 0 1 49 152" />
            </g>
            <circle cx="100" cy="100" r="36" className="fill-dry-sage" />
            <circle cx="100" cy="100" r="31" fill="none" stroke="#413c22" strokeOpacity="0.5" strokeWidth="0.6" />
            <text x="100" y="95" textAnchor="middle" className="font-anastasia" fontSize="21" fill="#413c22">G &amp; G</text>
            <text x="100" y="121" textAnchor="middle" className="font-cormorant" fontSize="7.5" fontWeight="700" letterSpacing="1.6" fill="#413c22">20 · 03 · 27</text>
            <circle cx="100" cy="100" r="2.6" fill="#413c22" />
        </svg>
        {/* Brazo del tocadiscos */}
        <svg viewBox="0 0 60 120" className="absolute -right-5 -top-3 w-[30%] h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] origin-[75%_12%] transition-transform duration-500 group-hover:rotate-6">
            <circle cx="45" cy="14" r="10" fill="#f7f2e9" />
            <circle cx="45" cy="14" r="4" fill="#413c22" />
            <path d="M45 14 L22 92" stroke="#f7f2e9" strokeWidth="4" strokeLinecap="round" />
            <rect x="9" y="88" width="20" height="26" rx="3" transform="rotate(16 19 101)" fill="#f7f2e9" />
        </svg>
    </span>
);

const Playlist = () => (
    <SectionWrapper id="playlist" className="bg-[#413c22] text-[#f7f2e9] py-14 md:py-20 scroll-mt-16">
        <a
            href={playlistLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 text-center md:text-left focus-visible:outline-none"
        >
            <Vinyl />
            <span className="block max-w-sm">
                <span className="inline-block -rotate-3 border border-dry-sage px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-dry-sage">
                    Tú pones la música
                </span>
                <h2 className="mt-3 text-5xl md:text-6xl font-anastasia leading-tight">Nuestra playlist</h2>
                <span className="mt-4 block text-lg sm:text-xl md:text-2xl font-cormorant italic text-[#f7f2e9]/85">
                    ¿Cuál es esa canción que te levanta de la silla? Agrégala y nos vemos en la pista.
                </span>
                <span className="mt-7 inline-flex items-center justify-center gap-3 min-h-[52px] w-full sm:w-auto px-7 py-3 bg-[#f7f2e9] text-[#413c22] font-sans text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:bg-dry-sage group-focus-visible:bg-dry-sage">
                    <Equalizer /> Agregar mi canción <ArrowUpRight size={16} className="shrink-0" />
                </span>
            </span>
        </a>
    </SectionWrapper>
);

export default Playlist;
