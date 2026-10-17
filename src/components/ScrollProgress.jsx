import { motion, useScroll } from 'framer-motion';

// Hilo de progreso: línea fina arriba que se llena al bajar por la página.
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    return <motion.div aria-hidden="true" className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-[#586748] origin-left" style={{ scaleX: scrollYProgress }} />;
}
