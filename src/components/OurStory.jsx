import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';
import dancingImage from '../assets/decor/dancing.jpg';

const useTypewriterOnView = (text, speed = 100, delay = 300) => {
    const [displayed, setDisplayed] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
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
    }, [hasStarted, text, speed, delay]);

    const done = displayed.length === text.length && hasStarted;
    return { displayed, ref, done };
};

const OurStory = ({ showDate = true }) => {
    const theTypewriter = useTypewriterOnView('The', 150, 0);
    const navelasTypewriter = useTypewriterOnView('Navelas', 120, 500);

    return (
        <>
        {showDate && (
        <section className="bg-[#413c22] text-white py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-8xl sm:text-7xl md:text-[10rem] font-cormorant text-center"
            >
                20.03.27
            </motion.div>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-10 mt-5 font-cormorant text-center">
                Medellín, Colombia
            </div>
            <Countdown />
        </section>
        )}
        <SectionWrapper id="story" className="bg-cream pt-10 pb-10 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${dancingImage})`}}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
                {/*<div className="order-2 md:order-1">
                    <div>
                        <img
                            src={fotoWeb}
                            alt="Couple Moment"
                            className="relative z-10 w-full"
                        />
                    </div>
                </div>*/}

                <div className="order-1 md:order-2 text-center md:text-left">
                    <p className="text-lg sm:text-2xl md:text-3xl text-black/80 mb-6 font-normal font-cormorant text-center">
                        Queremos que seas parte de este capítulo tan importante en nuestras vidas,
                        que brindes con nosotros, que rías con nosotros
                        y que bailes hasta que la noche se vuelva recuerdo.
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl text-black/80 font-normal font-cormorant text-center">
                        Esperamos que nos puedas acompañar
                        para celebrar este dulce amor.
                    </p>
                    <div ref={theTypewriter.ref} className="order-3 mt-12">
                        <p className="text-6xl sm:text-8xl md:text-[7rem] text-black/80 font-normal font-cormorant text-center md:mr-[70px]">
                            {theTypewriter.displayed}
                            {!theTypewriter.done && <span className="inline-block w-[2px] h-[1em] bg-black/60 ml-1 align-middle animate-pulse" />}
                        </p>
                        <p ref={navelasTypewriter.ref} className="text-7xl sm:text-9xl md:text-[7rem] text-black/80 font-normal font-anastasia text-center mr-6 sm:text-justify sm:mr-0 md:text-center md:mr-[70px]">
                            {navelasTypewriter.displayed}
                            {!navelasTypewriter.done && <span className="inline-block w-[2px] h-[1em] bg-black/60 ml-1 align-middle animate-pulse" />}
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
        </>
    );
};

export default OurStory;
