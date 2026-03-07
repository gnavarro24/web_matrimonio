import { motion } from 'framer-motion';
import videoExample from '../assets/decor/video_web.mov';

const Hero = () => {


    return (
        <header id="home" className="relative h-screen flex items-center justify-center overflow-clip">
            {/* Background Video with Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    src={videoExample}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white px-4">


                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-5xl sm:text-8xl md:text-[10rem] mb-6 font-anastasia text-porcelain !leading-tight overflow-visible pr-4"
                >
                    Gustavo &amp; Geraldine
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl sm:text-3xl md:text-4xl mb-4 font-cormorant text-porcelain"
                >
                    Save the Date
                </motion.p>
            </div>
        </header>
    );
};

export default Hero;
