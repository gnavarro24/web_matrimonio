import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const AudioPlayer = ({
    src,
    className = ""
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    // Función para verificar el estado del audio y sincronizar
    const checkAudioState = () => {
        if (audioRef.current) {
            const actuallyPlaying = !audioRef.current.paused && !audioRef.current.ended;
            setIsPlaying(actuallyPlaying);
        }
    };

    // Auto-reproducir cuando el componente se monta
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.5; // Volumen moderado
        audio.loop = true; // Loop automático

        // Verificar estado cada 100ms para mantener sincronización
        intervalRef.current = setInterval(checkAudioState, 100);

        // Event listeners para eventos importantes
        const handleLoadedData = () => {
            console.log('Audio cargado');
        };

        const handlePlay = () => {
            console.log('Audio empezó a reproducir');
            setIsPlaying(true);
        };

        const handlePause = () => {
            console.log('Audio pausado');
            setIsPlaying(false);
        };

        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        // Intentar reproducir automáticamente
        const attemptAutoPlay = async () => {
            try {
                await audio.play();
                console.log('Auto-reproducción iniciada exitosamente');
            } catch (error) {
                console.log('Autoplay bloqueado por el navegador:', error.message);
                setIsPlaying(false);
            }
        };

        // Delay para asegurar que el audio esté cargado
        const timer = setTimeout(attemptAutoPlay, 1000);

        return () => {
            clearTimeout(timer);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    // Manejar visibilidad de la página
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (!audio.paused) {
                    setWasPlayingBeforeHide(true);
                    audio.pause();
                } else {
                    setWasPlayingBeforeHide(false);
                }
            } else {
                if (wasPlayingBeforeHide) {
                    audio.play().catch(console.error);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [wasPlayingBeforeHide]);

    const handleClick = () => {
        const audio = audioRef.current;
        if (!audio) {
            console.log('Audio ref no disponible');
            return;
        }

        console.log('Botón clickeado. Estado actual:', audio.paused ? 'pausado' : 'reproduciendo');

        if (audio.paused || audio.ended) {
            // Está pausado, vamos a reproducir
            audio.play()
                .then(() => {
                    console.log('Reproducción iniciada');
                    setIsPlaying(true);
                })
                .catch(error => {
                    console.error('Error al reproducir:', error);
                    setIsPlaying(false);
                });
        } else {
            // Está reproduciendo, vamos a pausar
            audio.pause();
            console.log('Música pausada');
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
            <audio ref={audioRef} src={src} preload="auto" />

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-14 h-14 bg-dusty-olive/90 backdrop-blur-sm text-white rounded-full shadow-2xl hover:bg-dusty-olive transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 cursor-pointer"
                aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
                type="button"
            >
                {isPlaying ? (
                    <Pause size={20} className="drop-shadow-sm" />
                ) : (
                    <Play size={20} className="ml-0.5 drop-shadow-sm" />
                )}
            </button>

            {/* Indicador visual sutil cuando está reproduciendo */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dusty-olive/30"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
            )}
        </motion.div>
    );
};

export default AudioPlayer;