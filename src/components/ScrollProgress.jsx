import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

// Hilo de progreso: línea fina arriba que se llena al bajar por la página.
// Abajo, una flecha translúcida que sube y baja para avisar que hay más contenido; solo en la primera pantalla:
// se va apenas se empieza a bajar.
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [falta, setFalta] = useState(false);
    useEffect(() => {
        const medir = () => setFalta(window.scrollY < window.innerHeight * 0.4 && document.documentElement.scrollHeight > window.innerHeight + 80);
        medir();
        window.addEventListener('scroll', medir, { passive: true });
        window.addEventListener('resize', medir);
        const t = setInterval(medir, 1000); // las páginas cargan diferidas y cambian de alto
        return () => { window.removeEventListener('scroll', medir); window.removeEventListener('resize', medir); clearInterval(t); };
    }, []);
    return (
        <>
            <motion.div aria-hidden="true" className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-[#586748] origin-left" style={{ scaleX: scrollYProgress }} />
            <div aria-hidden="true" className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-opacity duration-500 ${falta ? 'opacity-100' : 'opacity-0'}`}>
                <motion.svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    className="w-11 h-11 p-2 rounded-full bg-white/45 backdrop-blur-[2px] text-[#4a4529]/80 shadow-[0_2px_10px_rgba(0,0,0,0.18)] motion-reduce:!transform-none"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path d="M6 9l6 6 6-6" />
                </motion.svg>
            </div>
        </>
    );
}
