import { motion, AnimatePresence } from 'framer-motion';
import waxSealImage from '../assets/decor/sello_cera.png';
import toscanaImage from '../assets/decor/toscana.jpg';

// Pantalla de entrada de la invitación: sobre cerrado con el sello en la punta de la solapa,
// ⚠️ Foto: Eric Kilby, CC BY-SA 2.0 (Wikimedia Commons). La licencia pide dar crédito; se quitó de esta
// pantalla a pedido de Gustavo (2026-10-03).
// sobre una foto de la Toscana desenfocada y oscurecida (scale-105 tapa el borde que deja el blur). Si el enlace trae el nombre del invitado, va escrito en el sobre.
// El clic del sello sube al fondo, que es quien abre (igual que tocar cualquier parte de la pantalla).
const Envelope = ({ guestName }) => (
    <>
        <img src={toscanaImage} alt="" className="absolute inset-0 w-full h-full object-cover [object-position:38%_50%] md:[object-position:50%_60%] blur-[5px] scale-105" />
        <div className="absolute inset-0 bg-[rgba(20,25,15,0.86)]" />

        <div className="relative px-6 text-center text-porcelain">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="relative mx-auto w-[min(86vw,32rem)] aspect-[11/8]"
            >
                <svg viewBox="0 0 440 320" aria-hidden="true" className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_22px_28px_rgba(0,0,0,0.45)]">
                    <defs>
                        <linearGradient id="envelope-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdfaf1" /><stop offset="1" stopColor="#f1e9d7" /></linearGradient>
                        <linearGradient id="envelope-flap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffdf7" /><stop offset="1" stopColor="#f4eddc" /></linearGradient>
                        <filter id="envelope-flap-shadow" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#6b5d36" floodOpacity="0.32" /></filter>
                    </defs>
                    <rect width="440" height="320" rx="10" fill="url(#envelope-paper)" />
                    {/* Solapas laterales e inferior */}
                    <path d="M0 10 L210 172 L0 320 Z" fill="#e9dfc8" opacity="0.55" />
                    <path d="M440 10 L230 172 L440 320 Z" fill="#e9dfc8" opacity="0.55" />
                    <path d="M0 320 L206 168 Q220 158 234 168 L440 320 Z" fill="#fbf7ec" stroke="#d9cfb6" strokeWidth="0.8" />
                    {/* Solapa superior curva, con filete interior */}
                    <path d="M0 8 Q0 0 8 0 L432 0 Q440 0 440 8 C396 46 300 142 246 176 Q220 192 194 176 C140 142 44 46 0 8 Z" fill="url(#envelope-flap)" filter="url(#envelope-flap-shadow)" />
                    <path d="M30 12 L410 12 C372 46 292 128 242 160 Q220 173 198 160 C148 128 68 46 30 12 Z" fill="none" stroke="#c2b48a" strokeWidth="0.9" />
                </svg>
                <motion.button
                    type="button"
                    aria-label="Abrir la invitación"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring", damping: 15 }}
                    className="absolute left-1/2 top-[55.6%] w-[24%] -ml-[12%] -mt-[12%] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusty-olive"
                >
                    <img src={waxSealImage} alt="" className="w-full drop-shadow-xl" />
                </motion.button>
                {guestName && (
                    <p className="absolute inset-x-[8%] bottom-[5%] truncate font-['Pinyon_Script'] text-[clamp(1.35rem,7vw,2.6rem)] leading-tight text-[#4f4a2c]">{guestName}</p>
                )}
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-10 font-cormorant text-lg sm:text-xl md:text-2xl tracking-wide [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
            >
                Toca el sello para abrir tu invitación
            </motion.p>
        </div>

    </>
);

// `envelope`: muestra el sobre (invitación); sin él, solo el sello sobre fondo oscuro (save the date).
const WelcomeModal = ({ isOpen, onClose, onStartMusic, envelope = false, guestName = '' }) => {
    const handleEnter = () => {
        // Guardar en localStorage que el usuario ya interactuó
        localStorage.setItem('wedding-audio-enabled', 'true');
        onStartMusic();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={handleEnter}
                    className={`fixed inset-0 z-50 flex items-center justify-center cursor-pointer ${envelope ? 'bg-[#2b331f]' : 'bg-black/95 backdrop-blur-md'}`}
                >
                    {envelope ? <Envelope guestName={guestName} /> : (
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