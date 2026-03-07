import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import fotoWeb from '../assets/decor/Save_the_Date.png';

const OurStory = () => {
    const calculateTimeLeft = () => {
        // Set a date 3 months from now for demo purposes
        const difference = +new Date("2027-05-20") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                min: Math.floor((difference / 1000 / 60) % 60),
                seg: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    return (
        <SectionWrapper id="story" className="bg-cream">
            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="text-8xl sm:text-7xl md:text-[10rem] font-cormorant text-center text-dark-olive"
                >
                    20.03.27
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl mb-10 mt-5 font-cormorant text-center text-dark-olive"
                >
                    Medellín, Colombia
                </motion.div>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex justify-center gap-8 md:gap-12 font-sans text-dark-olive"
                >
                    {Object.keys(timeLeft).map((interval) => (
                        <div key={interval} className="flex flex-col items-center">
                            <span className="font-serif text-xl sm:text-3xl md:text-4xl">{timeLeft[interval] || '0'}</span>
                            <span className="text-[10px] sm:text-xs uppercase tracking-widest mt-2">{interval}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={fotoWeb}
                            alt="Couple Moment"
                            className="relative z-10 w-full"
                        />
                    </motion.div>
                </div>

                <div className="order-1 md:order-2 text-center md:text-left">
                    <p className="text-lg sm:text-2xl md:text-3xl text-black/80 mb-6 font-normal font-cormorant text-center">
                        Queremos que formes parte de este capítulo tan importante en nuestras vidas,
                        que brindes con nosotros, que rías con nosotros
                        y que bailes hasta que la noche se vuelva recuerdo.
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl text-black/80 font-normal font-cormorant text-center">
                        Esperamos que nos puedas acompañar
                        para celebrar este dulce amor que hoy se convierte en promesa.
                    </p>
                    <div className="order-3 mt-12">
                        <p className="text-5xl sm:text-7xl md:text-9xl text-black/80 font-normal font-cormorant text-center">
                            The
                        </p>
                        <p className="text-5xl sm:text-7xl md:text-9xl text-black/80 font-normal font-anastasia text-center mr-5 sm:text-justify sm:mr-0">
                            Navelas
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default OurStory;
