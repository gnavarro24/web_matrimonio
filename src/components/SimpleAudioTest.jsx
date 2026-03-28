import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const SimpleAudioTest = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasPlayingBeforeHide, setWasPlayingBeforeHide] = useState(false);
    const audioRef = useRef(null);

    // Test básico de click
    const handleButtonClick = () => {
        console.log('🎯 BUTTON CLICKED - FUNCIONA!');

        const audio = audioRef.current;
        if (!audio) {
            console.log('🎯 No hay audio ref');
            return;
        }

        console.log('🎯 Audio paused:', audio.paused);
        console.log('🎯 IsPlaying state:', isPlaying);

        if (audio.paused) {
            console.log('🎯 Reproduciendo audio...');
            audio.play();
            setIsPlaying(true);
        } else {
            console.log('🎯 Pausando audio...');
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Auto-reproducir al montar
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            setTimeout(() => {
                audio.play().catch(() => console.log('Auto-play bloqueado'));
            }, 500);
        }
    }, []);

    // Manejar cambio de pestaña
    useEffect(() => {
        const handleVisibilityChange = () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (document.hidden) {
                // Página perdió foco
                console.log('🎯 Perdió foco de pestaña');
                if (!audio.paused) {
                    setWasPlayingBeforeHide(true);
                    audio.pause();
                    console.log('🎯 Pausado por cambio de pestaña');
                } else {
                    setWasPlayingBeforeHide(false);
                }
            } else {
                // Página recuperó foco
                console.log('🎯 Recuperó foco de pestaña');
                if (wasPlayingBeforeHide) {
                    audio.play();
                    console.log('🎯 Reanudado tras recuperar foco');
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
                onPlay={() => {
                    console.log('🎯 AUDIO PLAY EVENT');
                    setIsPlaying(true);
                }}
                onPause={() => {
                    console.log('🎯 AUDIO PAUSE EVENT');
                    setIsPlaying(false);
                }}
            />

            <button
                onClick={handleButtonClick}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#697857',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={() => console.log('🎯 Mouse enter')}
                onMouseLeave={() => console.log('🎯 Mouse leave')}
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
        </div>
    );
};

export default SimpleAudioTest;