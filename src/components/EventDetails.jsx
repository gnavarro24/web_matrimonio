import SectionWrapper from './SectionWrapper';
import { MapPin, Clock, Calendar } from 'lucide-react';

const EventCard = ({ title, time, location, address, mapLink, image }) => (
    <div className="bg-white shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-dry-sage">
        <div className="h-64 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-8 text-center">
            <h3 className="text-3xl font-serif text-dusty-olive mb-6">{title}</h3>

            <div className="flex flex-col gap-4 text-black/80 mb-8 font-sans">
                <div className="flex items-center justify-center gap-2">
                    <Calendar size={20} className="text-dry-sage" />
                    <span>Sábado, 20 de Mayo, 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Clock size={20} className="text-dry-sage" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <MapPin size={20} className="text-dry-sage" />
                    <span>{location}</span>
                </div>
                <p className="text-sm text-gray-500 italic mt-1">{address}</p>
            </div>

            <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-dusty-olive text-dusty-olive hover:bg-dusty-olive hover:text-white transition-all duration-300 tracking-widest uppercase text-sm"
            >
                Ver Mapa
            </a>
        </div>
    </div>
);

const EventDetails = () => {
    return (
        <SectionWrapper id="details" className="bg-cream">
            <div className="text-center mb-16">
                <span className="text-dusty-olive uppercase tracking-widest text-sm">¿Dónde & Cuándo?</span>
                <h2 className="text-4xl md:text-5xl mt-4">Detalles del Evento</h2>
            </div>

            <div className="max-w-4xl mx-auto flex justify-center">
                <div className="w-full md:w-2/3">
                    <EventCard
                        title="Celebración"
                        time="04:00 PM"
                        location="Le Pinot"
                        address="Carretera Federal 45, Ciudad de México"
                        mapLink="https://maps.app.goo.gl/RUgM9M2f3k9d5fbS8"
                        image="https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default EventDetails;
