import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const SimpleAudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Forzar auto-reproducción al cargar
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            // Intentar reproducir después de un pequeño delay
            const timer = setTimeout(() => {
                audio.play()
                    .then(() => {
                        console.log('🎵 Auto-reproducción exitosa');
                        setIsPlaying(true);
                    })
                    .catch(error => {
                        console.log('🎵 Auto-reproducción bloqueada:', error.message);
                        setIsPlaying(false);
                    });
            }, 100);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClick = () => {
        const audio = audioRef.current;
        console.log('🎵 Click detectado!');

        if (audio) {
            if (isPlaying) {
                console.log('🎵 Pausando...');
                audio.pause();
                setIsPlaying(false);
            } else {
                console.log('🎵 Reproduciendo...');
                audio.play();
                setIsPlaying(true);
            }
        }
    };

    const handlePlay = () => {
        console.log('🎵 Event: play');
        setIsPlaying(true);
    };

    const handlePause = () => {
        console.log('🎵 Event: pause');
        setIsPlaying(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <audio
                ref={audioRef}
                src={src}
                loop
                onPlay={handlePlay}
                onPause={handlePause}
                autoPlay
            />

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-14 h-14 bg-dusty-olive text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
            >
                {isPlaying ? (
                    <Pause size={20} />
                ) : (
                    <Play size={20} className="ml-0.5" />
                )}
            </button>
        </motion.div>
    );
};

export default SimpleAudioPlayer;