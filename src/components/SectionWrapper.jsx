import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = "", id = "", style }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`px-6 md:px-20 ${className}`}
            style={style}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
