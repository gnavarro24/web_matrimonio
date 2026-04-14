import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import videoNavelas from '../assets/decor/theNavelas.mp4';

const VideoSection = () => {
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
