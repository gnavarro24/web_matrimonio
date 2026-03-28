import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const SimpleAudioTest = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
    const audioRef = useRef(null);

    const handleButtonClick = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Auto-reproducir al montar
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            setTimeout(() => {
                audio.play().catch(() => {});
            }, 500);
        }
    }, []);

    // Manejar cambio de pestaña
    useEffect(() => {
        const handleVisibilityChange = () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (document.hidden) {
                if (!audio.paused) {
                    setWasPlayingBeforeHide(true);
                    audio.pause();
                } else {
                    setWasPlayingBeforeHide(false);
                }
            } else {
                if (wasPlayingBeforeHide) {
                    audio.play();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [wasPlayingBeforeHide]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 99999
            }}
        >
            <audio
                ref={audioRef}
                src={src}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <button
                onClick={handleButtonClick}
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#697857',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    boxShadow: '0 3px 12px rgba(0,0,0,0.3)'
                }}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
        </div>
    );
};

export default SimpleAudioTest;