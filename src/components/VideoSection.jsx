import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const videoNavelas = 'https://pub-e8a7374af923467a80b60dbbb3742ea9.r2.dev/theNavelas.mp4#t=0.1';

const VideoSection = () => {
    const handlePlay = (e) => {
        const v = e.currentTarget;
        window.dispatchEvent(new CustomEvent('video-playing'));
        if (v.requestFullscreen) {
            v.requestFullscreen().catch(() => {});
        } else if (v.webkitEnterFullscreen) {
            v.webkitEnterFullscreen();
        } else if (v.webkitRequestFullscreen) {
            v.webkitRequestFullscreen();
        }
    };

    const handleStop = () => {
        window.dispatchEvent(new CustomEvent('video-stopped'));
    };

    return (
        <SectionWrapper id="video" className="bg-cream pt-10 pb-10">
            <div className="max-w-4xl mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video bg-white border-2 border-dusty-olive rounded-lg overflow-hidden"
                >
                    <video
                        src={videoNavelas}
                        controls
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        onPlay={handlePlay}
                        onPause={handleStop}
                        onEnded={handleStop}
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default VideoSection;
