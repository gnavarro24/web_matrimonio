import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
    {
        question: "¿Hay estacionamiento disponible?",
        answer: "Sí, tanto la iglesia como el salón cuentan con servicio de valet parking sin costo para los invitados."
    },
    {
        question: "¿Puedo llevar niños?",
        answer: "Aunque amamos a los pequeños, hemos decidido que nuestra boda sea un evento solo para adultos. Agradecemos su comprensión."
    },
    {
        question: "¿Tienen convenio con hoteles?",
        answer: "Sí, hemos reservado un bloque de habitaciones en el Hotel Real de Minas con la tarifa especial 'Boda Ana y Mateo' para reservas antes del 20 de Abril."
    },
    {
        question: "¿Cuál es el código de vestimenta?",
        answer: "El código es Etiqueta Rigurosa. Mujeres de vestido largo (evitar color blanco) y hombres de traje oscuro."
    }
];

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-dry-sage/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-dry-sage transition-colors"
            >
                <span className="font-serif text-lg">{question}</span>
                {isOpen ? <Minus size={20} className="text-dry-sage" /> : <Plus size={20} className="text-dry-sage/60" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-black/70 font-light leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    return (
        <SectionWrapper className="bg-cream">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl mb-12 text-center text-black">Preguntas Frecuentes</h2>
                <div className="bg-white p-8 md:p-12 shadow-sm border border-dry-sage/20">
                    {questions.map((q, i) => (
                        <FaqItem key={i} {...q} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Faq;
