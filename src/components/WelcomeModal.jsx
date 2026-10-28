import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import waxSealImage from '../assets/decor/sello_cera.webp';
import toscanaImage from '../assets/decor/toscana.webp';
import logo from '../assets/decor/logo.png';
import dibujos from '../assets/decor/tarjeta_dibujos.webp';

// Pantalla de entrada de la invitación: sobre cerrado con el sello en la punta de la solapa,
// sobre una foto de la Toscana desenfocada y oscurecida (scale-105 tapa el borde que deja el blur).
// ⚠️ Foto: Eric Kilby, CC BY-SA 2.0 (Wikimedia Commons). La licencia pide dar crédito; se quitó de esta
// pantalla a pedido de Gustavo (2026-10-03).
//
// Animación (diseño del 2026-10-14): al cargar, el sobre cae con el sello ya puesto (sin estampado, 2026-10-25) y el nombre se escribe;
// con el mouse, el sobre se inclina en 3D. Al tocar (el sello o cualquier parte), el sello se parte,
// estallan hojitas y la solapa se abre. Entrada (2026-10-17, sin tarjeta): la cámara "entra" al sobre,
// que crece y se desvanece mientras el fondo se aclara y deja ver la portada. `paso` lleva la secuencia.
// Tarjeta (2026-10-23): la tarjeta con los padres está guardada en el sobre. Al abrir la solapa, el sobre baja
// y sale de la pantalla mientras la tarjeta queda afuera, como si alguien lo jalara: la tarjeta solo sube un poco
// hasta el centro de la pantalla y se queda quieta unos segundos para leerla. Un toque la salta.
const LECTURA_MS = 3000; // desde que la tarjeta quedó libre
const SACAR = { duration: 1.1, ease: [0.45, 0, 0.25, 1] }; // sobre y tarjeta con la misma curva: la tarjeta se mueve suave
const PASOS = [ // [ms desde el toque, paso]: 1 sello roto · 2 solapa abierta · 3 el sobre baja y suelta la tarjeta · 4 entrada
    [0, 1], [380, 2], [850, 3], [850 + SACAR.duration * 1000 + LECTURA_MS, 4],
];
const SOLAPA_ATRAS_MS = 760; // a mitad del giro la solapa pasa detrás del sobre
const SALIDA_MS = 1000; // de la entrada (paso 4) al cierre

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

// Tarjeta "Ondulada con velas" (lienzo de diseño, 2026-10-24): papel de borde ondulado con filete en relieve; los
// dibujos se recortaron de la plantilla que pasó Gustavo. Medidas en cqw (ancho de la tarjeta) para que escale igual
// en celular y escritorio. Vive dentro del sobre, entre el fondo y el bolsillo; el recorte la esconde por debajo del
// borde inferior del sobre, así que solo se ve lo que ya salió por arriba.
const BORDE = 'M80 2L90 5L101 12L111 20L122 27L132 30L143 27L153 20L164 12L174 5L185 2L195 5L206 12L216 20L226 27L237 30L247 27L258 20L268 12L279 5L289 2L300 5L310 12L321 20L331 27L342 30L352 27L362 20L374 13L387 10L399 13L408 22L412 35L411 49L409 60L409 69L413 77L420 87L428 97L435 107L438 118L435 128L428 139L420 149L413 160L410 170L413 181L420 191L428 202L435 212L438 222L435 233L428 243L420 254L413 264L410 275L413 285L420 296L428 306L435 317L438 327L435 338L428 348L420 358L413 369L410 379L413 390L420 400L428 411L435 421L438 432L435 442L428 453L420 463L413 474L410 484L413 494L420 505L428 515L435 526L438 536L435 547L428 557L420 568L413 578L410 589L413 599L420 610L428 620L435 630L438 641L435 653L426 663L414 670L404 674L396 679L392 687L388 698L382 710L372 719L360 723L350 720L339 713L329 705L318 698L308 695L297 698L287 705L276 713L266 720L255 723L245 720L234 713L224 705L214 698L203 695L193 698L182 705L172 713L161 720L151 723L140 720L130 713L119 705L109 698L98 695L88 698L78 705L66 712L53 715L41 712L32 703L28 690L29 676L31 665L31 656L27 648L20 638L12 628L5 618L2 607L5 597L12 586L20 576L27 565L30 555L27 544L20 534L12 523L5 513L2 503L5 492L12 482L20 471L27 461L30 450L27 440L20 429L12 419L5 408L2 398L5 387L12 377L20 367L27 356L30 346L27 335L20 325L12 314L5 304L2 293L5 283L12 272L20 262L27 251L30 241L27 231L20 220L12 210L5 199L2 189L5 178L12 168L20 157L27 147L30 136L27 126L20 115L12 105L5 95L2 84L5 72L14 62L26 55L36 51L44 46L48 38L52 27L58 15L68 6Z';
const FILETE = 'M80 22L90 24L100 30L110 38L120 44L129 46L139 44L149 38L159 30L169 24L179 22L189 24L199 30L209 38L219 44L228 46L238 44L248 38L258 30L268 24L278 22L288 24L298 30L308 38L317 44L327 46L337 44L347 38L357 30L368 25L381 26L391 33L396 45L396 58L394 68L394 76L396 84L402 94L410 104L416 114L418 124L416 133L410 143L402 153L396 163L394 173L396 183L402 193L410 203L416 213L418 222L416 232L410 242L402 252L396 262L394 272L396 282L402 292L410 302L416 312L418 321L416 331L410 341L402 351L396 361L394 371L396 381L402 391L410 401L416 411L418 420L416 430L410 440L402 450L396 460L394 470L396 480L402 490L410 500L416 509L418 519L416 529L410 539L402 549L396 559L394 569L396 579L402 589L410 599L416 608L418 618L416 628L410 638L402 648L395 655L390 661L388 669L385 679L381 690L372 699L360 703L350 701L340 695L330 687L320 681L311 679L301 681L291 687L281 695L271 701L261 703L251 701L241 695L231 687L221 681L212 679L202 681L192 687L182 695L172 701L162 703L152 701L142 695L132 687L123 681L113 679L103 681L93 687L83 695L72 700L59 699L49 692L44 680L44 667L46 657L46 649L44 641L38 631L30 621L24 611L22 601L24 592L30 582L38 572L44 562L46 552L44 542L38 532L30 522L24 512L22 503L24 493L30 483L38 473L44 463L46 453L44 443L38 433L30 423L24 413L22 404L24 394L30 384L38 374L44 364L46 354L44 344L38 334L30 324L24 314L22 305L24 295L30 285L38 275L44 265L46 255L44 245L38 235L30 225L24 216L22 206L24 196L30 186L38 176L44 166L46 156L44 146L38 136L30 126L24 117L22 107L24 97L30 87L38 77L45 70L50 64L52 56L55 46L59 35L68 26Z';
const Tarjeta = ({ tarjetaRef, paso, y }) => (
    <div aria-hidden={paso < 3} className="absolute inset-0 z-[2] pointer-events-none [clip-path:inset(-3000%_0_0_0)]">
        <motion.div
            ref={tarjetaRef}
            initial={false}
            animate={paso >= 4 ? { y, opacity: 0, scale: 1.12 } : { y, opacity: 1, scale: 1 }}
            transition={paso >= 4 ? { duration: 0.8, ease: [0.55, 0, 0.9, 0.45] } : SACAR}
            style={{ containerType: 'inline-size' }}
            className="absolute left-[6%] top-[6%] w-[88%] aspect-[440/725] font-cormorant text-[#57552f] text-center"
        >
            <svg viewBox="0 0 440 725" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_18px_28px_rgba(20,20,10,0.45)]">
                <path d={BORDE} fill="#e9e4db" />
                <path d={FILETE} fill="none" stroke="#fbf9f4" strokeWidth="2.2" transform="translate(1 1.2)" />
                <path d={FILETE} fill="none" stroke="#c9bfb0" strokeWidth="1.1" />
            </svg>
            <div className="absolute left-[34%] top-[5.5%] w-[57%] h-[38.6%] rounded-full bg-[rgba(90,84,70,0.14)] blur-[9.5cqw] -rotate-[28deg]" />
            <div className="absolute left-[12.7%] right-[12.7%] top-[10.8%] h-[52.4%] flex flex-col items-center justify-between">
                <img src={logo} alt="" className="w-[15.9cqw] [filter:brightness(0)_invert(0.84)_drop-shadow(1px_1.4px_0_rgba(255,255,255,0.95))_drop-shadow(-1px_-1px_0_rgba(110,98,78,0.45))]" />
                <p className="text-[4.77cqw] italic font-semibold leading-[1.35]">Con la bendición de Dios<br />y de nuestros padres</p>
                <div className="w-full grid grid-cols-2 gap-[2.7cqw] text-[4.32cqw] font-bold leading-[1.35] text-[#4c4a28]">
                    <p>Rogers Navarro<br />Omaira de la Ossa</p>
                    <p>Ricardo Vela<br />Lilia Torrenegra</p>
                </div>
                <p className="text-[4.77cqw] italic font-semibold leading-[1.35]">tenemos el placer de invitarlos<br />a nuestra boda</p>
            </div>
            <img src={dibujos} alt="" className="absolute left-[12.5%] top-[64.55%] w-[75.9%]" />
        </motion.div>
    </div>
);

const Envelope = ({ guestName, cargando, paso, solapaAtras, tilt }) => {
    const sinMovimiento = useReducedMotion();
    // Si el nombre llega después de abrir la página (la hoja tarda), se escribe enseguida, sin la espera inicial.
    const llegoTarde = useRef(false);
    if (cargando) llegoTarde.current = true;
    const nombreLargo = guestName.length > 22; // ~lo que cabe en una línea a la letra normal
    const sobreRef = useRef(null);
    const tarjetaRef = useRef(null);
    // Paso 3: el sobre baja hasta salir de la pantalla; la tarjeta sube dentro de él lo justo para que, en
    // pantalla, solo se desplace hasta quedar centrada. Las transformaciones no cambian offsetHeight.
    // Se mide una sola vez: en el paso 4 el rect ya incluye el desplazamiento y devolvería el sobre a su sitio.
    const medida = useRef(null);
    if (paso >= 3 && !medida.current && sobreRef.current && tarjetaRef.current) {
        const sobre = sobreRef.current.getBoundingClientRect();
        const alto = tarjetaRef.current.offsetHeight;
        const topeTarjeta = sobre.top + sobre.height * 0.06; // top-[6%]
        const enPantalla = (window.innerHeight - alto) / 2 - topeTarjeta;
        const baja = window.innerHeight - sobre.top + sobre.height * 0.65 + 20; // la solapa abierta sobresale ~60 % por arriba
        medida.current = { bajaSobre: baja, subeTarjeta: enPantalla - baja };
    }
    const { bajaSobre = 0, subeTarjeta = 0 } = paso >= 3 ? medida.current ?? {} : {};
    const fondo = `transition-opacity duration-700 delay-300 ${paso >= 4 ? 'opacity-0' : ''}`; // el sobre arranca primero
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
                initial={false}
                animate={{ y: bajaSobre }}
                transition={SACAR}
                className="relative px-6 text-center text-porcelain"
            >
                <motion.div
                    animate={{ rotateX: paso ? 0 : tilt.x, rotateY: paso ? 0 : tilt.y }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    style={{ transformPerspective: 1000 }}
                    className="mx-auto w-[min(92vw,32rem,62vh)]"
                >
                    {/* Al abrirlo se endereza: la tarjeta sale recta y no se corre de lado al subir */}
                    <motion.div
                        ref={sobreRef}
                        initial={sinMovimiento ? false : { y: '-130%', rotate: -14, opacity: 0 }}
                        animate={paso ? { y: '0%', rotate: 0, opacity: 1 } : { y: ['-130%', '5%', '-2%', '0%'], rotate: [-14, 1, -4, -3], opacity: [0, 1, 1, 1] }}
                        transition={paso ? { duration: 0.4, ease: 'easeOut' } : { duration: 1.1, times: [0, 0.55, 0.75, 1], ease: 'easeOut' }}
                        className="relative aspect-[11/8]"
                    >
                        <div aria-hidden="true" className="absolute inset-0 rounded-[7px] bg-[#e6dbc2] shadow-[0_22px_30px_rgba(0,0,0,0.45)]" />

                        <Tarjeta tarjetaRef={tarjetaRef} paso={paso} y={subeTarjeta} />

                        <svg viewBox="0 0 440 320" aria-hidden="true" className="absolute inset-0 z-[3] w-full h-full overflow-visible">
                            <path d="M0 10 L214 174 L0 320 Z" fill="#efe6d1" />
                            <path d="M440 10 L226 174 L440 320 Z" fill="#efe6d1" />
                            <path d="M0 10 L214 174 L0 320 M440 10 L226 174 L440 320" fill="none" stroke="#d9cfb6" strokeWidth="0.8" />
                            <path d="M0 320 L206 168 Q220 158 234 168 L440 320 Z" fill="#fbf7ec" stroke="#d9cfb6" strokeWidth="0.8" />
                        </svg>

                        {/* Mientras la hoja responde, el sobre avisa dónde irá el nombre */}
                        {!guestName && cargando && (
                            <p role="status" className="absolute z-[4] inset-x-[8%] bottom-[7%] font-cormorant italic text-[clamp(0.95rem,4.2vw,1.35rem)] text-[#4f4a2c]/70 animate-pulse motion-reduce:animate-none">
                                Cargando invitación…
                            </p>
                        )}

                        {guestName && (
                            <motion.p
                                initial={sinMovimiento ? false : { clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{ duration: 1.4, delay: llegoTarde.current ? 0.1 : 1.5, ease: 'easeInOut' }}
                                className={`absolute z-[4] inset-x-[8%] bottom-[5%] font-['Pinyon_Script'] leading-tight text-[#4f4a2c] break-words ${nombreLargo ? 'text-[clamp(1.05rem,5vw,1.9rem)]' : 'text-[clamp(1.35rem,7vw,2.6rem)]'}`}
                            >
                                {/* Nombre largo: letra más pequeña y, si son dos personas, una encima de la otra ("Ana Pérez" / "& Luis Gómez") */}
                                {(nombreLargo ? guestName.split(/\s+(?=(?:&|y)\s)/) : [guestName]).map((linea) => <span key={linea} className="block">{linea}</span>)}
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

                        {/* El sello: llega pegado al sobre y se parte en dos al tocarlo. El clic sube al fondo, que es quien abre. */}
                        <motion.button
                            type="button"
                            aria-label="Abrir la invitación"
                            whileHover={paso ? undefined : { scale: 1.08 }}
                            whileTap={paso ? undefined : { scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
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
const WelcomeModal = ({ isOpen, onClose, onStartMusic, onRevelar, envelope = false, guestName = '', cargando = false }) => {
    const sinMovimiento = useReducedMotion();
    const [paso, setPaso] = useState(0);
    const [solapaAtras, setSolapaAtras] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const timers = useRef([]);
    const salio = useRef(false);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const handleEnter = () => {
        // Guardar en localStorage que el usuario ya interactuó
        localStorage.setItem('wedding-audio-enabled', 'true');
        onStartMusic();
        onClose();
    };

    // La música arranca con el toque (los navegadores lo exigen); la invitación aparece al terminar la animación.
    const openEnvelope = () => {
        if (paso >= 3) return entrar(); // la tarjeta ya está a la vista: un toque salta la espera
        if (paso) return;
        localStorage.setItem('wedding-audio-enabled', 'true');
        onStartMusic();
        if (sinMovimiento) return onClose();
        const luego = (ms, fn) => timers.current.push(setTimeout(fn, ms));
        PASOS.slice(0, -1).forEach(([ms, n]) => luego(ms, () => setPaso(n)));
        luego(SOLAPA_ATRAS_MS, () => setSolapaAtras(true));
        luego(PASOS[3][0], entrar);
    };

    const entrar = () => {
        if (salio.current) return;
        salio.current = true;
        setPaso(4);
        onRevelar?.();
        timers.current.push(setTimeout(onClose, SALIDA_MS));
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
                    className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer ${envelope ? `transition-colors duration-700 delay-300 ${paso >= 4 ? 'bg-transparent' : 'bg-[#2b331f]'}` : 'bg-black/95 backdrop-blur-md'}`}
                >
                    {envelope ? <Envelope guestName={guestName} cargando={cargando} paso={paso} solapaAtras={solapaAtras} tilt={tilt} /> : (
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