import { useState, useEffect } from 'react';

const weddingDate = new Date("2027-03-20T16:00:00-05:00");

const calculateTimeLeft = () => {
    const difference = weddingDate.getTime() - new Date().getTime();
    if (difference <= 0) return {};
    return {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
    };
};

const Countdown = ({ className = "gap-8 md:gap-12" }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`flex justify-center font-sans ${className}`}>
            {Object.keys(timeLeft).map((interval) => (
                <div key={interval} className="flex flex-col items-center">
                    <span className="font-serif text-xl sm:text-3xl md:text-4xl">{timeLeft[interval] || '0'}</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest mt-2">{interval}</span>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
