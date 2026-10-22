import { MessageCircle, Mail, Instagram } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import logo from '../assets/decor/logo.png';

// Contacto de la wedding planner. Lo que quede en null no se muestra.
const planner = {
    name: 'Mariana Agudelo',
    whatsapp: '+57 333 2939511',
    email: null,
    instagram: null, // sin @
};

const whatsappLink = (phone) =>
    `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, tengo una pregunta sobre la boda de Gera & Gus el 20 de marzo.')}`;
const link = "inline-flex items-center justify-center gap-2.5 min-h-[52px] w-full sm:w-auto px-7 py-3 border border-[#f7f2e9]/60 font-sans text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#f7f2e9] hover:text-[#413c22]";

const Contacto = () => {
    const { name, whatsapp, email, instagram } = planner;
    const hayDatos = whatsapp || email || instagram;
    return (
        <SectionWrapper id="contacto" className="bg-[#413c22] text-[#f7f2e9] py-20 md:py-28 text-center scroll-mt-16">
            <img loading="lazy" decoding="async" src={logo} alt="G & G" className="mx-auto h-20 md:h-24 brightness-0 invert opacity-90" />
            <p className="mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-dry-sage">¿Tienes alguna pregunta?</p>
            <p className="max-w-xl mx-auto mt-4 text-xl md:text-2xl font-cormorant italic font-medium leading-relaxed">
                Nuestra wedding planner te ayudará con todo lo que necesites{name ? ':' : '.'}
            </p>
            {name && <p className="mt-2 text-3xl md:text-4xl font-cormorant font-semibold">{name}</p>}

            {hayDatos ? (
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
                    {whatsapp && (
                        <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className={link}>
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                    )}
                    {email && (
                        <a href={`mailto:${email}`} className={`${link} normal-case tracking-[0.06em]`}>
                            <Mail size={16} /> {email}
                        </a>
                    )}
                    {instagram && (
                        <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className={`${link} normal-case tracking-[0.06em]`}>
                            <Instagram size={16} /> @{instagram}
                        </a>
                    )}
                </div>
            ) : (
                <p className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.22em] text-dry-sage">Muy pronto compartiremos su contacto aquí</p>
            )}

        </SectionWrapper>
    );
};

export default Contacto;
