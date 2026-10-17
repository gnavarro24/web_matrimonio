import { useState } from 'react';
import { motion } from 'framer-motion';

// Al entrar en pantalla la sección sube y, con la clase "on", sus títulos h2 se descubren (index.css).
const SectionWrapper = ({ children, className = "", id = "", style }) => {
    const [on, setOn] = useState(false);
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onViewportEnter={() => setOn(true)}
            className={`revela ${on ? 'on' : ''} px-6 md:px-20 ${className}`}
            style={style}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
