import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import videoExample from '../assets/decor/video_web.mp4';

const useTypewriter = (text, speed = 100, delay = 1500) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    return { displayed, done: displayed.length === text.length };
};

const Hero = () => {
    const { displayed: typewriterText, done: typewriterDone } = useTypewriter('Save the Date', 120, 1800);

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
                    className="text-5xl sm:text-8xl md:text-[10rem] font-anastasia text-porcelain overflow-visible pr-4"
                >
                    Gustavo &amp; Geraldine
                </motion.p>
                <p className="text-xl sm:text-4xl md:text-5xl mb-4 font-cormorant text-porcelain">
                    {typewriterText}
                    {!typewriterDone && <span className="inline-block w-[2px] h-[1em] bg-porcelain ml-1 align-middle animate-pulse" />}
                </p>
            </div>
        </header>
    );
};

export default Hero;
