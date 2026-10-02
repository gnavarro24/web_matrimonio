import SectionWrapper from './SectionWrapper';

const TheDetails = () => (
    <SectionWrapper id="details" className="bg-cream py-16 md:py-24 scroll-mt-16">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl text-black/80">
                <span className="font-cormorant">The </span>
                <span className="font-anastasia">Details</span>
            </h2>
            <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-cormorant text-dusty-olive">
                Sábado, 20 de marzo de 2027 · Medellín, Colombia
            </p>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-cormorant text-black/70">
                Horarios, cómo llegar, dónde quedarse y todo lo que necesitas saber para celebrar con nosotros.
            </p>
            <a
                href="/invitacion/details"
                className="mt-10 inline-block px-10 py-4 border border-dusty-olive text-dusty-olive hover:bg-dusty-olive hover:text-white transition-all duration-300 tracking-widest uppercase text-sm"
            >
                Ver los detalles
            </a>
        </div>
    </SectionWrapper>
);

export default TheDetails;
