import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const AudioPlayerFinal = forwardRef(({ src }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
    const audioRef = useRef(null);

    // Exponer método play para el componente padre
    useImperativeHandle(ref, () => ({
        play: async () => {
            const audio = audioRef.current;
            if (audio) {
                try {
                    await audio.play();
                    console.log('🎵 Auto-reproducción iniciada desde ref');
                    return true;
                } catch (error) {
                    console.error('🎵 Error en auto-reproducción:', error);
                    return false;
                }
            }
            return false;
        }
    }));

    // FUNCIÓN DE CLICK CON DEBUG EXTREMO
    const handleClick = (e) => {
        console.log('🚨 === CLICK EVENT START ===');
        console.log('🚨 Event type:', e.type);
        console.log('🚨 Event target:', e.target);
        console.log('🚨 Event currentTarget:', e.currentTarget);

        const audio = audioRef.current;
        console.log('🚨 Audio ref exists:', !!audio);

        if (!audio) {
            console.log('🚨 ❌ NO AUDIO REF - SALIENDO');
            return;
        }

        console.log('🚨 Audio.paused:', audio.paused);
        console.log('🚨 Audio.ended:', audio.ended);
        console.log('🚨 Audio.currentTime:', audio.currentTime);
        console.log('🚨 React isPlaying:', isPlaying);

        if (audio.paused || audio.ended) {
            console.log('🚨 ▶️ INTENTANDO REPRODUCIR...');
            audio.play()
                .then(() => {
                    console.log('🚨 ✅ PLAY EXITOSO');
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.log('🚨 ❌ PLAY ERROR:', error);
                });
        } else {
            console.log('🚨 ⏸️ INTENTANDO PAUSAR...');
            try {
                audio.pause();
                console.log('🚨 ✅ PAUSE EJECUTADO');
                setIsPlaying(false);
            } catch (error) {
                console.log('🚨 ❌ PAUSE ERROR:', error);
            }
        }
        console.log('🚨 === CLICK EVENT END ===');
    };

    // Event listeners simples para sincronizar estado
    const handleAudioPlay = () => {
        console.log('🔥 EVENTO PLAY');
        setIsPlaying(true);
    };

    const handleAudioPause = () => {
        console.log('🔥 EVENTO PAUSE');
        setIsPlaying(false);
    };

    // Funcionalidad de cambio de pestaña
    useEffect(() => {
        const handleVisibilityChange = () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (document.hidden) {
                // Página perdió foco
                console.log('🔥 Perdió foco');
                if (!audio.paused) {
                    setWasPlayingBeforeHide(true);
                    audio.pause();
                    console.log('🔥 Pausado por pérdida de foco');
                } else {
                    setWasPlayingBeforeHide(false);
                }
            } else {
                // Página recuperó foco
                console.log('🔥 Recuperó foco');
                if (wasPlayingBeforeHide) {
                    audio.play();
                    console.log('🔥 Reanudado tras recuperar foco');
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [wasPlayingBeforeHide]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed bottom-6 right-6 z-40"
        >
            {/* AUDIO ELEMENT SIMPLE */}
            <audio
                ref={audioRef}
                src={src}
                loop
                preload="auto"
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
            />

            {/* BOTÓN ULTRA BÁSICO SIN FRAMER MOTION */}
            <button
                onClick={handleClick}
                onMouseDown={(e) => console.log('🚨 MOUSE DOWN:', e.type)}
                onMouseUp={(e) => console.log('🚨 MOUSE UP:', e.type)}
                onPointerDown={(e) => console.log('🚨 POINTER DOWN:', e.type)}
                onPointerUp={(e) => console.log('🚨 POINTER UP:', e.type)}
                className="flex items-center justify-center w-14 h-14 bg-dusty-olive text-white rounded-full shadow-2xl cursor-pointer"
                type="button"
                style={{
                    border: 'none',
                    outline: 'none',
                    zIndex: 9999,
                    pointerEvents: 'all'
                }}
            >
                {isPlaying ? (
                    <Pause size={20} className="drop-shadow-sm" style={{ pointerEvents: 'none' }} />
                ) : (
                    <Play size={20} className="ml-0.5 drop-shadow-sm" style={{ pointerEvents: 'none' }} />
                )}
            </button>

            {/* Indicador visual cuando reproduce */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dusty-olive/30"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
            )}
        </motion.div>
    );
});

AudioPlayerFinal.displayName = 'AudioPlayerFinal';

export default AudioPlayerFinal;