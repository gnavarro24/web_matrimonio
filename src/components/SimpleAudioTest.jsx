import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

// La pausa del invitado se recuerda en la pestaña: al volver desde otra página la música sigue en pausa.
const PAUSA = 'musica-pausada';
const leerPausa = () => { try { return !!sessionStorage.getItem(PAUSA); } catch { return false; } };
const guardarPausa = (pausada) => {
    try { pausada ? sessionStorage.setItem(PAUSA, '1') : sessionStorage.removeItem(PAUSA); } catch { /* no se recuerda */ }
};
const VOLUMEN = 0.15; // ponytail: iOS ignora audio.volume; ahí suena al volumen del teléfono

const SimpleAudioTest = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
    const audioRef = useRef(null);
    const wasPlayingBeforeVideoRef = useRef(false);

    const handleButtonClick = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
            guardarPausa(false);
        } else {
            audio.pause();
            setIsPlaying(false);
            guardarPausa(true);
        }
    };

    // Auto-reproducir al montar, bajito, salvo que el invitado la haya pausado
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.volume = VOLUMEN;
        if (audio && !leerPausa()) {
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

    // Pausar música cuando se reproduce el video y reanudarla al detenerlo
    useEffect(() => {
        const handleVideoPlaying = () => {
            const audio = audioRef.current;
            if (!audio) return;
            wasPlayingBeforeVideoRef.current = !audio.paused;
            if (!audio.paused) {
                audio.pause();
            }
        };

        const handleVideoStopped = () => {
            const audio = audioRef.current;
            if (!audio) return;
            if (wasPlayingBeforeVideoRef.current) {
                audio.play().catch(() => {});
                wasPlayingBeforeVideoRef.current = false;
            }
        };

        window.addEventListener('video-playing', handleVideoPlaying);
        window.addEventListener('video-stopped', handleVideoStopped);
        return () => {
            window.removeEventListener('video-playing', handleVideoPlaying);
            window.removeEventListener('video-stopped', handleVideoStopped);
        };
    }, []);

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