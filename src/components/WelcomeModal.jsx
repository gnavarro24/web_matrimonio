import { motion, AnimatePresence } from 'framer-motion';
import waxSealImage from '../assets/decor/sello_cera.png';

const WelcomeModal = ({ isOpen, onClose, onStartMusic }) => {
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
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center cursor-pointer"
                >
                    {/* Contenido central del modal */}
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;