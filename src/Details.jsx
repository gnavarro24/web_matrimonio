import Navbar from './components/Navbar';
import SectionWrapper from './components/SectionWrapper';
import Footer from './components/Footer';
import { MapPin, Car, CarTaxiFront } from 'lucide-react';

// Datos editables. Lo marcado "Por confirmar" es placeholder hasta tener los datos reales.
const venue = {
    name: 'Lugar por confirmar',
    time: '4:00 PM',
    address: 'Dirección por confirmar · Medellín, Colombia',
    mapLink: '',
};

const timeline = [
    { time: '4:00 PM', title: 'Bienvenida' },
    { time: '4:30 PM', title: 'Ceremonia' },
    { time: '5:30 PM', title: 'Cóctel' },
    { time: '7:00 PM', title: 'Cena' },
    { time: '8:30 PM', title: 'Pastel' },
    { time: '9:00 PM', title: 'Fiesta' },
    { time: '2:00 AM', title: 'Despedida' },
];

const directions = [
    { icon: Car, title: 'En carro', text: 'Habrá parqueadero disponible en el lugar. Indicaciones por confirmar.' },
    { icon: CarTaxiFront, title: 'En taxi', text: 'Recomendamos pedir taxi o Uber con anticipación, sobre todo para el regreso.' },
];

const hotels = [
    { name: 'Hotel por confirmar', address: 'Dirección · Medellín', note: 'A X minutos del lugar' },
    { name: 'Hotel por confirmar', address: 'Dirección · Medellín', note: 'A X minutos del lugar' },
    { name: 'Hotel por confirmar', address: 'Dirección · Medellín', note: 'A X minutos del lugar' },
];

const otherDetails = [
    { title: 'Código de vestimenta', text: 'Formal / cóctel: algo elegante pero cómodo para bailar toda la noche. Por tradición, te pedimos evitar el color blanco.' },
    { title: 'Solo adultos', text: 'Aunque adoramos a sus pequeños, esta será una celebración solo para adultos. ¡Esperamos que disfruten la noche con nosotros!' },
    { title: 'Regalos', text: 'Tu presencia es el mejor regalo. Si deseas darnos algo más, pronto compartiremos algunas ideas para empezar nuestra vida juntos.' },
];

const navLinks = [
    { title: "Invitación", href: "/invitacion" },
    { title: "Detalles", href: "#top" },
    { title: "RSVP", href: "/invitacion#rsvp" },
];

const SectionTitle = ({ children }) => (
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant text-dusty-olive text-center mb-10 md:mb-14">
        {children}
    </h2>
);

const btn = "inline-block px-8 py-4 border border-dusty-olive tracking-widest uppercase text-sm transition-all duration-300";

function Details() {
    return (
        <div id="top" className="min-h-screen bg-cream overflow-x-hidden">
            <Navbar navLinks={navLinks} />

            <header className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 text-center">
                <h1 className="text-6xl sm:text-7xl md:text-8xl text-black/80">
                    <span className="font-cormorant">The </span>
                    <span className="font-anastasia">Details</span>
                </h1>
                <p className="mt-6 text-2xl sm:text-3xl font-cormorant text-black/70">Gustavo &amp; Geraldine</p>
            </header>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Fecha y lugar</SectionTitle>
                <div className="max-w-xl mx-auto text-center border-2 border-dusty-olive p-8 sm:p-10">
                    <p className="text-5xl sm:text-6xl font-cormorant">20.03.27</p>
                    <p className="mt-2 text-xl sm:text-2xl font-cormorant text-black/70">Sábado · {venue.time}</p>
                    <p className="mt-6 text-2xl sm:text-3xl font-cormorant text-dusty-olive">{venue.name}</p>
                    <p className="mt-2 text-lg font-cormorant text-black/70 flex items-center justify-center gap-2">
                        <MapPin size={18} className="text-dry-sage shrink-0" />
                        {venue.address}
                    </p>
                    {venue.mapLink && (
                        <a href={venue.mapLink} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8 text-dusty-olive hover:bg-dusty-olive hover:text-white`}>
                            Ver mapa
                        </a>
                    )}
                </div>
            </SectionWrapper>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Itinerario</SectionTitle>
                <ol className="max-w-[15rem] sm:max-w-sm mx-auto relative border-l border-dry-sage">
                    {timeline.map((item) => (
                        <li key={item.title} className="relative pl-8 pb-8 last:pb-0">
                            <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-dusty-olive" />
                            <p className="text-sm uppercase tracking-widest text-dry-sage font-sans">{item.time}</p>
                            <p className="text-2xl sm:text-3xl font-cormorant text-black/80">{item.title}</p>
                        </li>
                    ))}
                </ol>
            </SectionWrapper>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Cómo llegar</SectionTitle>
                <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
                    {directions.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="bg-porcelain border border-dry-sage p-8 text-center">
                            <Icon size={28} className="mx-auto text-dusty-olive" />
                            <h3 className="mt-4 text-2xl sm:text-3xl font-cormorant text-dusty-olive">{title}</h3>
                            <p className="mt-3 text-lg font-cormorant text-black/70">{text}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Dónde quedarse</SectionTitle>
                <p className="max-w-2xl mx-auto -mt-6 mb-10 text-center text-lg sm:text-xl font-cormorant text-black/70">
                    Puedes reservar directamente en el hotel que prefieras. Estas son nuestras recomendaciones:
                </p>
                <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {hotels.map((hotel, i) => (
                        <div key={i} className="bg-porcelain border border-dry-sage p-8 text-center">
                            <h3 className="text-2xl font-cormorant text-dusty-olive">{hotel.name}</h3>
                            <p className="mt-3 text-lg font-cormorant text-black/70">{hotel.address}</p>
                            <p className="mt-1 text-sm uppercase tracking-widest text-dry-sage font-sans">{hotel.note}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Otros detalles</SectionTitle>
                <div className="max-w-2xl mx-auto space-y-10 text-center">
                    {otherDetails.map((item) => (
                        <div key={item.title}>
                            <h3 className="text-3xl sm:text-4xl font-anastasia text-black/80">{item.title}</h3>
                            <p className="mt-3 text-lg sm:text-xl font-cormorant text-black/70">{item.text}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <div className="px-6 py-16 flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
                <a href="/invitacion#rsvp" className={`${btn} w-full sm:w-auto bg-dusty-olive text-white hover:bg-dry-sage hover:border-dry-sage`}>
                    Confirmar asistencia
                </a>
                <a href="/invitacion" className={`${btn} w-full sm:w-auto text-dusty-olive hover:bg-dusty-olive hover:text-white`}>
                    Volver a la invitación
                </a>
            </div>

            <Footer />
        </div>
    );
}

export default Details;
