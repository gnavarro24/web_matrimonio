import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoSection = () => {
    return (
        <SectionWrapper id="video" className="bg-cream pt-10 pb-10">
            <div className="max-w-4xl mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video bg-white border-2 border-dusty-olive rounded-lg overflow-hidden flex items-center justify-center"
                >
                    {/* Placeholder - reemplazar con <video> cuando esté listo */}
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full border-2 border-dusty-olive flex items-center justify-center mx-auto mb-4">
                            <Play className="text-dusty-olive ml-1" size={36} />
                        </div>
                        <p className="text-lg md:text-xl font-cormorant text-dusty-olive">
                            Video próximamente
                        </p>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default VideoSection;
