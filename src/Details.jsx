import Navbar from './components/Navbar';
import SectionWrapper from './components/SectionWrapper';
import bannerImage from './assets/decor/foto_web.jpg';
import {
    MapPin, Car, CarTaxiFront, Sparkles, Church, Wine, UtensilsCrossed, Cake, Music, MoonStar,
    Hotel, Brush, Instagram, Phone, Shirt,
} from 'lucide-react';

// Datos editables. Lo marcado "Por confirmar" es placeholder hasta tener los datos reales.
const venue = {
    name: 'Lugar por confirmar',
    time: '4:00 PM',
    address: 'Dirección por confirmar · Medellín, Colombia',
    mapLink: '',
};

const timeline = [
    { time: '4:00 PM', title: 'Bienvenida', icon: Sparkles },
    { time: '4:30 PM', title: 'Ceremonia', icon: Church },
    { time: '5:30 PM', title: 'Cóctel', icon: Wine },
    { time: '7:00 PM', title: 'Cena', icon: UtensilsCrossed },
    { time: '8:30 PM', title: 'Pastel', icon: Cake },
    { time: '9:00 PM', title: 'Fiesta', icon: Music },
    { time: '2:00 AM', title: 'Despedida', icon: MoonStar },
];

const directions = [
    { icon: Car, title: 'En carro', text: 'Habrá parqueadero disponible en el lugar. Indicaciones por confirmar.' },
    { icon: CarTaxiFront, title: 'En taxi', text: 'Recomendamos pedir taxi o Uber con anticipación, sobre todo para el regreso.' },
];

// instagram: usuario sin @ · phone: con indicativo, ej. '+57 300 123 4567' (vacío = no se muestra)
const hotels = [
    { name: 'Hotel por confirmar', detail: 'Dirección · Medellín', note: 'A X minutos del lugar', instagram: '', phone: '' },
    { name: 'Hotel por confirmar', detail: 'Dirección · Medellín', note: 'A X minutos del lugar', instagram: '', phone: '' },
    { name: 'Hotel por confirmar', detail: 'Dirección · Medellín', note: 'A X minutos del lugar', instagram: '', phone: '' },
];

const makeupArtists = [
    { name: 'Maquilladora por confirmar', detail: 'Maquillaje y peinado', note: 'Servicio a domicilio', instagram: '', phone: '' },
    { name: 'Maquilladora por confirmar', detail: 'Maquillaje y peinado', note: 'Servicio a domicilio', instagram: '', phone: '' },
];

const dressCode = {
    style: 'Formal',
    intro: 'Queremos que te sientas elegante y cómodo para bailar toda la noche.',
    looks: [
        { title: 'Ellas', text: 'Vestido largo o midi elegante.' },
        { title: 'Ellos', text: 'Traje oscuro, corbata opcional.' },
    ],
    note: 'Por tradición, te pedimos evitar el color blanco: está reservado para la novia.',
};

const otherDetails = [
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

const RecommendationCard = ({ name, detail, note, instagram, phone }) => (
    <div className="bg-porcelain border border-dry-sage p-8 text-center">
        <h4 className="text-2xl font-cormorant text-dusty-olive">{name}</h4>
        <p className="mt-3 text-lg font-cormorant text-black/70">{detail}</p>
        <p className="mt-1 text-sm uppercase tracking-widest text-dry-sage font-sans">{note}</p>
        {(instagram || phone) && (
            <div className="mt-5 flex justify-center gap-5 text-dusty-olive">
                {instagram && (
                    <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${name}`} className="p-2 hover:text-dry-sage">
                        <Instagram size={22} />
                    </a>
                )}
                {phone && (
                    <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp de ${name}`} className="p-2 hover:text-dry-sage">
                        <Phone size={22} />
                    </a>
                )}
            </div>
        )}
    </div>
);

const btn = "inline-block px-8 py-4 border border-dusty-olive tracking-widest uppercase text-sm transition-all duration-300";

function Details() {
    return (
        <div id="top" className="min-h-screen bg-cream overflow-x-hidden">
            <Navbar navLinks={navLinks} />

            <header className="relative h-[60svh] min-h-[380px] md:h-[75vh] flex items-start md:items-center justify-center overflow-hidden">
                <img
                    src={bannerImage}
                    alt="Gustavo y Geraldine"
                    className="absolute inset-0 w-full h-full object-cover [object-position:68%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />
                <div className="relative z-10 pt-24 md:pt-16 px-6 text-center text-porcelain drop-shadow-lg">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl">
                        <span className="font-cormorant">The </span>
                        <span className="font-anastasia">Details</span>
                    </h1>
                    <p className="mt-4 text-2xl sm:text-3xl font-cormorant">Gustavo &amp; Geraldine</p>
                </div>
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
                    {timeline.map(({ time, title, icon: Icon }) => (
                        <li key={title} className="relative pl-10 pb-8 last:pb-0">
                            <span className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-porcelain border border-dusty-olive flex items-center justify-center text-dusty-olive">
                                <Icon size={18} />
                            </span>
                            <p className="text-sm uppercase tracking-widest text-dry-sage font-sans">{time}</p>
                            <p className="text-2xl sm:text-3xl font-cormorant text-black/80">{title}</p>
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
                <SectionTitle>Código de vestimenta</SectionTitle>
                <div className="max-w-3xl mx-auto text-center">
                    <Shirt size={30} className="mx-auto text-dusty-olive" />
                    <p className="mt-4 text-4xl sm:text-5xl font-anastasia text-black/80">{dressCode.style}</p>
                    <p className="mt-4 text-lg sm:text-xl font-cormorant text-black/70">{dressCode.intro}</p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {dressCode.looks.map((look) => (
                            <div key={look.title} className="bg-porcelain border border-dry-sage p-8">
                                <h3 className="text-2xl sm:text-3xl font-cormorant text-dusty-olive">{look.title}</h3>
                                <p className="mt-3 text-lg font-cormorant text-black/70">{look.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 text-lg sm:text-xl font-cormorant italic text-black/70">{dressCode.note}</p>
                </div>
            </SectionWrapper>

            <SectionWrapper className="py-12 md:py-16">
                <SectionTitle>Recomendados</SectionTitle>
                <div className="max-w-5xl mx-auto space-y-14">
                    <div>
                        <h3 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-cormorant text-black/80">
                            <Hotel size={26} className="text-dusty-olive" /> Hoteles
                        </h3>
                        <p className="max-w-2xl mx-auto mt-3 mb-8 text-center text-lg sm:text-xl font-cormorant text-black/70">
                            Puedes reservar directamente en el hotel que prefieras. Estas son nuestras recomendaciones:
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {hotels.map((hotel, i) => <RecommendationCard key={i} {...hotel} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-cormorant text-black/80">
                            <Brush size={26} className="text-dusty-olive" /> Maquillaje y peinado
                        </h3>
                        <p className="max-w-2xl mx-auto mt-3 mb-8 text-center text-lg sm:text-xl font-cormorant text-black/70">
                            Si quieres que te arreglen para el gran día, estas son las maquilladoras que recomendamos:
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
                            {makeupArtists.map((artist, i) => <RecommendationCard key={i} {...artist} />)}
                        </div>
                    </div>
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
        </div>
    );
}

export default Details;
