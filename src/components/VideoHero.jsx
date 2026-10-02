import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Countdown from './Countdown';

const START = 11; // segundos: se salta el intro del save the date
const videoNavelas = `https://pub-e8a7374af923467a80b60dbbb3742ea9.r2.dev/theNavelas.mp4#t=${START}`;

const ControlButton = ({ onClick, label, children }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-black/40 text-porcelain backdrop-blur-sm border border-white/30 hover:bg-black/60 transition-colors"
    >
        {children}
    </button>
);

const VideoHero = ({ videoShouldPlay = false }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (videoShouldPlay) video.play().catch(() => {});
        else video.pause();
    }, [videoShouldPlay]);

    // Con sonido del video, la música de fondo se pausa (eventos que escucha SimpleAudioTest)
    const audible = playing && !muted;
    useEffect(() => {
        window.dispatchEvent(new CustomEvent(audible ? 'video-playing' : 'video-stopped'));
    }, [audible]);

    // Loop manual desde START: el atributo loop volvería al segundo 0
    const handleTimeUpdate = (e) => {
        const v = e.currentTarget;
        if (v.duration && v.currentTime >= v.duration - 0.5) v.currentTime = START;
    };

    const handleLoadedMetadata = (e) => {
        if (e.currentTarget.currentTime < START) e.currentTarget.currentTime = START;
    };

    const togglePlay = () => {
        const v = videoRef.current;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
    };

    const toggleMute = () => {
        const v = videoRef.current;
        v.muted = !v.muted;
        setMuted(v.muted);
        if (!v.muted && v.paused) v.play().catch(() => {});
    };

    return (
        <header id="home" className="relative h-[100svh] min-h-[520px] flex items-center justify-center overflow-hidden bg-black">
            {/* ponytail: sin controls nativos para que no haya botón de fullscreen (iOS ignora controlsList) */}
            <video
                ref={videoRef}
                src={videoNavelas}
                muted
                playsInline
                webkit-playsinline="true"
                disablePictureInPicture
                preload="metadata"
                onContextMenu={(e) => e.preventDefault()}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={(e) => { e.currentTarget.currentTime = START; e.currentTarget.play().catch(() => {}); }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

            <div className="relative z-10 w-full px-4 pt-16 text-center text-porcelain">
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-[2.75rem] leading-[1.1] min-[400px]:text-6xl sm:text-8xl md:text-[9rem] font-anastasia overflow-visible pr-2 drop-shadow-lg"
                >
                    Gustavo &amp; Geraldine
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="mt-4 sm:mt-6 drop-shadow-md"
                >
                    <p className="text-5xl sm:text-6xl md:text-7xl font-cormorant">20.03.27</p>
                    <p className="text-xl sm:text-2xl md:text-3xl mt-1 mb-6 sm:mb-8 font-cormorant">Medellín, Colombia</p>
                    <Countdown className="gap-6 sm:gap-10 md:gap-12" />
                </motion.div>
            </div>

            <div
                className="absolute z-20 left-4 flex gap-3"
                style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
            >
                <ControlButton onClick={togglePlay} label={playing ? 'Pausar video' : 'Reproducir video'}>
                    {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </ControlButton>
                <ControlButton onClick={toggleMute} label={muted ? 'Activar sonido' : 'Silenciar video'}>
                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </ControlButton>
            </div>
        </header>
    );
};

export default VideoHero;
