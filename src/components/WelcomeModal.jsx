import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import waxSealImage from '../assets/decor/sello_cera.webp';
import toscanaImage from '../assets/decor/toscana.webp';

// Pantalla de entrada de la invitación: sobre cerrado con el sello en la punta de la solapa,
// sobre una foto de la Toscana desenfocada y oscurecida (scale-105 tapa el borde que deja el blur).
// ⚠️ Foto: Eric Kilby, CC BY-SA 2.0 (Wikimedia Commons). La licencia pide dar crédito; se quitó de esta
// pantalla a pedido de Gustavo (2026-10-03).
//
// Animación (diseño del 2026-10-14): al cargar, el sobre cae, el sello se estampa y el nombre se escribe;
// con el mouse, el sobre se inclina en 3D. Al tocar (el sello o cualquier parte), el sello se parte,
// estallan hojitas y la solapa se abre. Entrada (2026-10-17, sin tarjeta): la cámara "entra" al sobre,
// que crece y se desvanece mientras el fondo se aclara y deja ver la portada. `paso` lleva la secuencia.
const PASOS = [ // [ms desde el toque, paso]: 1 sello roto · 2 solapa abierta · 3 entrada al sobre
    [0, 1], [380, 2], [1000, 3],
];
const SOLAPA_ATRAS_MS = 760; // a mitad del giro la solapa pasa detrás del sobre
const CIERRE_MS = 2200;
const entrada = { duration: 1, ease: [0.55, 0, 0.9, 0.45] }; // acelera, como lanzarse hacia adentro

const SELLO = { left: '50%', top: '55.6%' }; // punta de la solapa
const mitadIzq = 'polygon(0 0,52% 0,44% 30%,55% 52%,46% 74%,52% 100%,0 100%)';
const mitadDer = 'polygon(52% 0,100% 0,100% 100%,52% 100%,46% 74%,55% 52%,44% 30%)';
const centrado = { ...SELLO, x: '-50%', y: '-50%' };

const coloresHoja = ['#a7ad89', '#697857', '#e9dfc8', '#c9c3a4'];
const hojas = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
    const d = 110 + ((i * 29) % 90);
    return { dx: Math.cos(a) * d, dy: Math.sin(a) * d - 30, r: (i * 67) % 360, w: 9 + (i % 4) * 2, h: 15 + (i % 3) * 4, c: coloresHoja[i % 4] };
});
const polvo = Array.from({ length: 14 }, (_, i) => ({
    x: `${(i * 37 + 11) % 100}%`, y: `${40 + ((i * 53) % 60)}%`, s: 2 + (i % 3), dur: 7 + (i % 5) * 1.6, delay: i * 1.3,
}));

const Envelope = ({ guestName, paso, solapaAtras, tilt }) => {
    const sinMovimiento = useReducedMotion();
    const fondo = `transition-opacity duration-700 delay-300 ${paso >= 3 ? 'opacity-0' : ''}`; // el sobre arranca primero
    return (
        <>
            <img fetchpriority="high" src={toscanaImage} alt="" className={`absolute inset-0 w-full h-full object-cover [object-position:38%_50%] md:[object-position:50%_60%] blur-[5px] scale-105 ${fondo}`} />
            <div className={`absolute inset-0 bg-[rgba(20,25,15,0.86)] ${fondo}`} />

            {!sinMovimiento && (
                <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${fondo}`}>
                    {polvo.map((p, i) => (
                        <motion.span
                            key={i}
                            className="absolute rounded-full bg-[#e9dcb4] shadow-[0_0_6px_rgba(233,220,180,0.8)]"
                            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
                            initial={{ opacity: 0 }}
                            animate={{ y: [0, -140], opacity: [0, 0.9, 0] }}
                            transition={{ duration: p.dur, delay: p.delay % p.dur, repeat: Infinity, ease: 'linear' }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                animate={paso >= 3 ? { scale: 7, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ scale: entrada, opacity: { duration: 0.5, delay: 0.4 } }}
                style={{ transformOrigin: '50% 40%' }}
                className="relative px-6 text-center text-porcelain"
            >
                <motion.div
                    animate={{ rotateX: paso ? 0 : tilt.x, rotateY: paso ? 0 : tilt.y }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    style={{ transformPerspective: 1000 }}
                    className="mx-auto w-[min(86vw,32rem)]"
                >
                    <motion.div
                        initial={sinMovimiento ? false : { y: '-130%', rotate: -14, opacity: 0 }}
                        animate={{ y: ['-130%', '5%', '-2%', '0%'], rotate: [-14, 1, -4, -3], opacity: [0, 1, 1, 1] }}
                        transition={{ duration: 1.1, times: [0, 0.55, 0.75, 1], ease: 'easeOut' }}
                        className="relative aspect-[11/8]"
                    >
                        <div aria-hidden="true" className="absolute inset-0 rounded-[7px] bg-[#e6dbc2] shadow-[0_22px_30px_rgba(0,0,0,0.45)]" />

                        <svg viewBox="0 0 440 320" aria-hidden="true" className="absolute inset-0 z-[3] w-full h-full overflow-visible">
                            <path d="M0 10 L214 174 L0 320 Z" fill="#efe6d1" />
                            <path d="M440 10 L226 174 L440 320 Z" fill="#efe6d1" />
                            <path d="M0 10 L214 174 L0 320 M440 10 L226 174 L440 320" fill="none" stroke="#d9cfb6" strokeWidth="0.8" />
                            <path d="M0 320 L206 168 Q220 158 234 168 L440 320 Z" fill="#fbf7ec" stroke="#d9cfb6" strokeWidth="0.8" />
                        </svg>

                        {guestName && (
                            <motion.p
                                initial={sinMovimiento ? false : { clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{ duration: 1.4, delay: 1.5, ease: 'easeInOut' }}
                                className="absolute z-[4] inset-x-[8%] bottom-[5%] truncate font-['Pinyon_Script'] text-[clamp(1.35rem,7vw,2.6rem)] leading-tight text-[#4f4a2c]"
                            >
                                {guestName}
                            </motion.p>
                        )}

                        {/* Solapa superior: gira hacia atrás y, pasada la mitad, queda detrás de la carta */}
                        <motion.div
                            aria-hidden="true"
                            animate={{ rotateX: paso >= 2 ? 180 : 0 }}
                            transition={{ duration: 0.75, ease: [0.5, 0.05, 0.3, 1] }}
                            style={{ transformOrigin: '50% 0', transformPerspective: 1000 }}
                            className={`absolute inset-0 ${solapaAtras ? 'z-[1]' : 'z-[5]'}`}
                        >
                            <svg viewBox="0 0 440 320" className="w-full h-full overflow-visible drop-shadow-[0_4px_5px_rgba(107,93,54,0.3)]">
                                <path d="M0 8 Q0 0 8 0 L432 0 Q440 0 440 8 C396 46 300 142 246 176 Q220 192 194 176 C140 142 44 46 0 8 Z" fill="#fffdf7" />
                                <path d="M30 12 L410 12 C372 46 292 128 242 160 Q220 173 198 160 C148 128 68 46 30 12 Z" fill="none" stroke="#c2b48a" strokeWidth="0.9" />
                            </svg>
                        </motion.div>

                        {/* Hojitas que estallan al romper el sello */}
                        <span aria-hidden="true" className="absolute z-[6] pointer-events-none" style={SELLO}>
                            {paso >= 1 && !sinMovimiento && hojas.map((h, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute left-0 top-0 rounded-[0_100%_0_100%]"
                                    style={{ width: h.w, height: h.h, marginLeft: -h.w / 2, marginTop: -h.h / 2, background: h.c }}
                                    initial={{ scale: 0.3, opacity: 1 }}
                                    animate={{ x: h.dx, y: h.dy, rotate: h.r, scale: 1, opacity: 0 }}
                                    transition={{ duration: 1.4, ease: [0.12, 0.75, 0.3, 1] }}
                                />
                            ))}
                        </span>

                        {!sinMovimiento && (
                            <motion.span
                                aria-hidden="true"
                                className="absolute z-[5] w-[26%] aspect-square rounded-full border-2 border-[rgba(247,242,233,0.7)] pointer-events-none"
                                style={centrado}
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: [0.6, 2.1], opacity: [0.7, 0] }}
                                transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
                            />
                        )}
                        {paso === 0 && !sinMovimiento && (
                            <motion.span
                                aria-hidden="true"
                                className="absolute z-[5] w-[26%] aspect-square rounded-full shadow-[0_0_0_2px_rgba(233,220,180,0.8),0_0_22px_6px_rgba(233,220,180,0.45)] pointer-events-none"
                                style={centrado}
                                initial={{ opacity: 0 }}
                                animate={{ scale: [1, 1.22, 1], opacity: [0.55, 0, 0.55] }}
                                transition={{ duration: 2.2, delay: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        )}

                        {/* El sello: se estampa al llegar y se parte en dos al tocarlo. El clic sube al fondo, que es quien abre. */}
                        <motion.button
                            type="button"
                            aria-label="Abrir la invitación"
                            initial={sinMovimiento ? false : { scale: 2.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={paso ? undefined : { scale: 1.08 }}
                            whileTap={paso ? undefined : { scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.95 }}
                            style={centrado}
                            className="absolute z-[7] w-[24%] aspect-square rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-porcelain"
                        >
                            {[[mitadIzq, { x: -38, y: 46, rotate: -42 }], [mitadDer, { x: 40, y: 50, rotate: 38 }]].map(([clip, rota], i) => (
                                <motion.img
                                    key={i}
                                    src={waxSealImage}
                                    alt=""
                                    className="absolute inset-0 w-full h-full drop-shadow-xl"
                                    style={{ clipPath: clip }}
                                    animate={paso >= 1 ? { ...rota, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: [0.3, 0.6, 0.4, 1], opacity: { duration: 0.5, delay: 0.15 } }}
                                />
                            ))}
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={paso ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
                    transition={paso ? { duration: 0.3 } : { delay: 2.1, duration: 0.7 }}
                    className="mt-10 font-cormorant text-lg sm:text-xl md:text-2xl tracking-wide [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
                >
                    Toca el sello para abrir tu invitación
                </motion.p>
            </motion.div>
        </>
    );
};

// `envelope`: muestra el sobre (invitación); sin él, solo el sello sobre fondo oscuro (save the date).
// onRevelar: al entrar al sobre la página de abajo ya debe verse (el sobre se desvanece sobre ella).
const WelcomeModal = ({ isOpen, onClose, onStartMusic, onRevelar, envelope = false, guestName = '' }) => {
    const sinMovimiento = useReducedMotion();
    const [paso, setPaso] = useState(0);
    const [solapaAtras, setSolapaAtras] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const timers = useRef([]);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const handleEnter = () => {
        // Guardar en localStorage que el usuario ya interactuó
        localStorage.setItem('wedding-audio-enabled', 'true');
        onStartMusic();
        onClose();
    };

    // La música arranca con el toque (los navegadores lo exigen); la invitación aparece al terminar la animación.
    const openEnvelope = () => {
        if (paso) return;
        localStorage.setItem('wedding-audio-enabled', 'true');
        onStartMusic();
        if (sinMovimiento) return onClose();
        const luego = (ms, fn) => timers.current.push(setTimeout(fn, ms));
        PASOS.forEach(([ms, n]) => luego(ms, () => setPaso(n)));
        luego(PASOS[2][0], () => onRevelar?.());
        luego(SOLAPA_ATRAS_MS, () => setSolapaAtras(true));
        luego(CIERRE_MS, onClose);
    };

    // Solo con mouse: en el celular el dedo no "pasa por encima" y el sobre saltaría.
    const inclinar = (e) => {
        if (e.pointerType !== 'mouse' || paso) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        setTilt({ x: -y * 16, y: x * 22 });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={envelope ? openEnvelope : handleEnter}
                    onPointerMove={envelope ? inclinar : undefined}
                    onPointerLeave={() => setTilt({ x: 0, y: 0 })}
                    className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer ${envelope ? `transition-colors duration-700 delay-300 ${paso >= 3 ? 'bg-transparent' : 'bg-[#2b331f]'}` : 'bg-black/95 backdrop-blur-md'}`}
                >
                    {envelope ? <Envelope guestName={guestName} paso={paso} solapaAtras={solapaAtras} tilt={tilt} /> : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="text-center"
                    >
                        {/* Imagen del sello */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, type: "spring", damping: 15 }}
                            className="mb-8"
                        >
                            <img
                                src={waxSealImage}
                                alt="Sello de cera"
                                className="w-48 h-48 mx-auto drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Texto pequeño para indicar click */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-white/80 font-cormorant text-sm tracking-wider"
                        >
                            Click para entrar
                        </motion.p>
                    </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;