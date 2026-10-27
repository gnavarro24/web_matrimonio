import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import poster from '../assets/decor/video_poster.webp';

// Videos en public/video, ya recortados desde el segundo 11 del original (se salta el intro del save the date) y sin audio:
// portada-movil.mp4 = recorte vertical 9:16 del centro (lo que se ve en un celular en vertical, 608×1080, 11,6 MB);
// portada.mp4 = 1080p completo para pantallas horizontales (22,6 MB). Antes era un único archivo de 95 MB en R2.
// El póster es el primer cuadro: se ve al instante mientras carga. Si cambia el video, regenerar video_poster.webp.
// Se elige al cargar con matchMedia: `media` en <source> no lo respetan todos los navegadores (WebKit lo ignora).
// ponytail: si giran el teléfono no cambia de versión; object-cover recorta igual.
const videoPortada = window.matchMedia('(orientation: portrait)').matches ? '/video/portada-movil.mp4' : '/video/portada.mp4';

const VideoHero = ({ videoShouldPlay = false }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (videoShouldPlay) video.play().catch(() => {});
        else video.pause();
    }, [videoShouldPlay]);

    return (
        <header id="home" className="relative h-[100svh] min-h-[520px] flex items-center justify-center overflow-hidden bg-black bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }}>
            {/* Fondo mudo y sin controles. ponytail: sin controls nativos para que no haya botón de fullscreen (iOS ignora controlsList) */}
            <video
                ref={videoRef}
                poster={poster}
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                src={videoPortada}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

            <div className="relative z-10 w-full px-4 pt-16 text-center text-porcelain">
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-[2.25rem] sm:text-[2.5rem] leading-[1.1] font-anastasia overflow-visible pr-2 drop-shadow-lg"
                >
                    Love has a date
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="mt-4 sm:mt-6 drop-shadow-md"
                >
                    <p className="text-5xl sm:text-8xl md:text-[9rem] leading-tight font-anastasia overflow-visible pr-2">Gustavo &amp; Geraldine</p>
                    <p className="text-5xl sm:text-6xl md:text-7xl mt-2 sm:mt-4 font-cormorant">20.03.27</p>
                    <p className="text-xl sm:text-2xl md:text-3xl mt-1 font-cormorant">Medellín, Colombia</p>
                </motion.div>
            </div>
        </header>
    );
};

export default VideoHero;
