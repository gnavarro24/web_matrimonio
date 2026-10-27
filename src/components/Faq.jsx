import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const enlace = "underline underline-offset-4 decoration-[color:var(--acc)] font-semibold transition-opacity hover:opacity-70";

// Editable. Las respuestas repiten datos que ya están en la página de detalles:
// si cambia la hora, el lugar o el código de vestimenta, actualizar también aquí.
const questions = [
    {
        question: "¿Cuándo y dónde es la boda?",
        answer: "El sábado 20 de marzo de 2027 a las 4:00 PM en Le Pinot, en la Loma del Escobero, Envigado. Más arriba encuentras el mapa.",
    },
    {
        question: "¿Cómo confirmo mi asistencia?",
        answer: <>Con el enlace personal que te enviamos: en la invitación está la sección <a href="/#rsvp" className={enlace}>«Confirma tu asistencia»</a>. Si tus planes cambian, puedes volver a entrar y cambiar tu respuesta.</>,
    },
    {
        question: "¿Puedo llevar acompañante?",
        answer: "Tu invitación indica cuántos cupos reservamos para ti. Por el espacio del lugar, no podremos recibir personas adicionales.",
    },
    {
        question: "Si no puedo asistir, ¿puedo ceder mi cupo?",
        answer: "Los cupos son personales y van a nombre propio: no se pueden transferir a otra persona. Si no puedes acompañarnos, cuéntanoslo en la confirmación; te vamos a extrañar.",
    },
    {
        question: "¿Puedo llevar niños?",
        answer: "Aunque adoramos a sus pequeños, esta será una celebración solo para adultos. Los bebés de brazos (0 a 1 año) son bienvenidos.",
    },
    {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Black Tie. Ellas, vestido largo de gala; ellos, smoking todo negro, sin corbatín de colores. Te pedimos evitar los tonos verdes, el blanco y el beige (están reservados), y los estampados tropicales.",
    },
    {
        question: "¿Hay parqueadero?",
        answer: "Sí, habrá parqueadero disponible en el lugar. Si piensas brindar, te recomendamos reservar taxi o Uber con anticipación, sobre todo para el regreso.",
    },
    {
        question: "¿Qué les podemos regalar?",
        answer: <>Tu presencia es nuestro mejor regalo. Si además quieres tener un detalle con nosotros, en la <a href="/regalos" className={enlace}>página de Regalos</a> puedes ayudarnos a llegar a la meta de nuestro honeymoon o de nuestro primer hogar.</>,
    },
];

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#4a4529]/30">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="w-full min-h-[68px] md:min-h-[76px] py-[18px] md:py-5 flex justify-between items-center gap-4 text-left transition-opacity hover:opacity-70"
            >
                <span className="font-cormorant font-semibold text-[22px] md:text-[26px] leading-tight">{question}</span>
                {isOpen ? <Minus size={24} strokeWidth={1.6} className="shrink-0" /> : <Plus size={24} strokeWidth={1.6} className="shrink-0 text-[color:var(--acc)]" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-[19px] md:text-[21px] font-cormorant italic font-medium leading-[1.55] opacity-90">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Solo la lista: la sección, el título y los colores (fondo beige, --acc) los pone Details.jsx.
const Faq = () => (
    <div className="max-w-[760px] mx-auto border-t border-[#4a4529]/30">
        {questions.map((q, i) => (
            <FaqItem key={i} {...q} />
        ))}
    </div>
);

export default Faq;
