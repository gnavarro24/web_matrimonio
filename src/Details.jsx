import Navbar from './components/Navbar';
import SectionWrapper from './components/SectionWrapper';
import Faq from './components/Faq';
import { volver } from './volver';
import bannerImage from './assets/decor/details_banner.webp';
import kissPhoto from './assets/decor/details_fondo_beso.webp';
import poolPhoto from './assets/decor/details_fondo_piscina.webp';
import {
    MapPin, Car, CarTaxiFront, Hotel, Instagram, MessageCircle, ArrowUpRight, ArrowLeft,
} from 'lucide-react';
import {
    TimelineIconDefs, ArrowRight, ArrowDownLeft, WelcomeIcon, CeremonyIcon, CocktailIcon, DinnerIcon, CakeIcon, PartyIcon, FarewellIcon, MakeupIcon,
} from './components/TimelineIcons';

// Datos editables. Lo marcado "Por confirmar" es placeholder hasta tener los datos reales.
// Dirección tomada de winkeventos.com (schema de la página de Le Pinot).
const venueQuery = encodeURIComponent('Le Pinot Venue, Cr 19 #36C Sur-259, Loma del Escobero, Envigado, Antioquia');
const venue = {
    name: 'Le Pinot',
    instagram: 'lepinot_',
    time: '4:00 PM',
    address: 'Cr 19 #36C Sur-259, Loma del Escobero · Envigado, Antioquia',
    mapLink: `https://www.google.com/maps/search/?api=1&query=${venueQuery}`,
    directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${venueQuery}`,
};

const timeline = [
    { time: '4:00 PM', title: 'Bienvenida', icon: WelcomeIcon },
    { time: '4:30 PM', title: 'Ceremonia', icon: CeremonyIcon },
    { time: '5:30 PM', title: 'Cóctel', icon: CocktailIcon },
    { time: '7:00 PM', title: 'Cena', icon: DinnerIcon },
    { time: '8:30 PM', title: 'Postre', icon: CakeIcon },
    { time: '9:00 PM', title: 'Fiesta', icon: PartyIcon },
    { time: '2:00 AM', title: 'Despedida', icon: FarewellIcon },
];

const directions = [
    { icon: Car, title: 'En carro', text: 'Le Pinot queda en la Loma del Escobero, en Envigado, a unos 10 minutos de Medellín. Habrá parqueadero disponible en el lugar.' },
    { icon: CarTaxiFront, title: 'En taxi', text: 'Recomendamos reservar taxi o Uber con anticipación, sobre todo para el regreso.' },
];

// Hotel aliado. El enlace es el de descuento del grupo (group=GeraldineyGustavo); las fechas van al fin de semana
// de la boda y el invitado las ajusta en el motor de reservas.
const partnerHotel = {
    name: 'Wake BioHotel',
    badge: 'Hotel aliado',
    text: 'Nos aliamos con Wake BioHotel para que vivas una experiencia de lujo. Reserva con nuestro enlace y recibe un descuento especial del 25 %.',
    link: 'https://be.synxis.com/?Hotel=97123&Chain=5154&Dest=DS&config=SBE_WAKE_BIOHOTEL_V1&theme=SBE_WAKE_BIOHOTEL_V1&locale=es-MX&arrive=2027-03-20&depart=2027-03-21&adult=1&child=0&group=GeraldineyGustavo',
};

// instagram: usuario sin @ · phone: con indicativo, ej. '+57 300 123 4567' (vacío = no se muestra)
// firstName: con quién se saluda en el mensaje de WhatsApp. Precios y condiciones los da cada una por WhatsApp.
const makeupArtists = [
    { name: 'Camila Bustamante', firstName: 'Camila', detail: 'Maquillaje y peinado', badge: 'Maquilladora de la novia', note: 'Camila maquillará a la novia; su equipo atenderá a las invitadas.', instagram: 'camibustamantemakeup', phone: '+57 319 7417234' },
    { name: 'Catalina Rico', firstName: 'Catalina', detail: 'Maquillaje y peinado', instagram: 'cataricomakeup', phone: '+57 301 4482958' },
    { name: 'Lili Uribe', firstName: 'Lili', detail: 'Maquillaje y peinado', instagram: 'liliuribemakeup', phone: '+57 301 6133512' },
];

const whatsappLink = (phone, firstName) => {
    const text = firstName && `Hola ${firstName}, me gustaría agendar servicio de maquillaje y peinado para la boda de Gera & Gus el 20 de marzo`;
    return `https://wa.me/${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

const dressCode = {
    style: 'Black Tie',
    intro: 'Será una noche de gala: queremos verte con tu mejor look, y listo para bailar hasta el final.',
    looks: [
        { title: 'Donna', text: 'Vestido largo de gala' },
        { title: 'Uomo', text: 'Smoking todo negro', note: 'Sin corbatín de colores.' },
    ],
    // Colores que los invitados deben evitar
    reserved: [
        { name: 'Tonos verdes', color: '#697857' },
        { name: 'Blanco', color: '#ffffff' },
        { name: 'Beige', color: '#e3d5b8' },
    ],
    note: 'Te pedimos no usar estos tonos: están reservados.',
    extraNote: 'Te agradecemos también evitar los estampados tropicales.',
    // Tablero de Pinterest con ejemplos (vacío = el botón no se muestra)
    pinterest: 'https://co.pinterest.com/gisettev08/the-guests-black-tie/?invite_code=98318ace22c1481db0191d711313831c&sender=966444538694802389',
};

const otherDetails = [
    { title: 'Solo adultos', text: 'Aunque adoramos a sus pequeños, esta será una celebración solo para adultos. ¡Esperamos que disfruten la noche con nosotros!' },
];

const navLinks = [
    { title: "Invitación", href: "/invitacion" },
    { title: "Detalles", href: "#top" },
    { title: "Regalos", href: "/invitacion/regalos" },
    { title: "RSVP", href: "/invitacion#rsvp" },
];

// Estilo de la página: secciones que alternan verde (#4a4529, texto crema) y beige (#f7f2e9, texto verde).
// --acc es el acento de cada fondo: el salvia de la paleta no se lee sobre beige, ahí va uno más oscuro.
const tones = {
    green: 'bg-[#4a4529] text-[#f7f2e9] [--acc:#a7ad89]',
    beige: 'bg-[#f7f2e9] text-[#4a4529] [--acc:#586748]',
};
const accent = "text-[color:var(--acc)]";
const body = "text-[19px] md:text-[21px] font-cormorant italic font-medium leading-[1.55] opacity-90";
const keyInfo = "text-[28px] md:text-[34px] font-cormorant font-semibold leading-tight";
const column = "max-w-xl mx-auto text-center";
const btn = "inline-flex items-center justify-center gap-2.5 min-h-[52px] w-full sm:w-auto px-10 py-3 border border-current font-sans text-[13px] font-bold uppercase tracking-[0.28em] transition-opacity duration-300 hover:opacity-70";
const btnFilled = `${btn} !border-[#4a4529] bg-[#4a4529] text-[#f7f2e9]`;

const SectionTitle = ({ children }) => (
    <div className="text-center mb-10 md:mb-14">
        <h2 className="text-[3.5rem] md:text-[5rem] font-anastasia leading-[1.1] [-webkit-text-stroke-width:0.4px] md:[-webkit-text-stroke-width:0.5px]">
            {children}
        </h2>
        <div aria-hidden="true" className="mt-4 md:mt-5 flex items-center justify-center gap-3">
            <span className="w-14 md:w-[72px] h-px bg-[color:var(--acc)]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[color:var(--acc)]" />
            <span className="w-14 md:w-[72px] h-px bg-[color:var(--acc)]" />
        </div>
    </div>
);

// photo: foto de fondo, muy atenuada bajo un velo verde (solo para secciones verdes).
const Section = ({ tone = 'green', title, photo, photoClass = '', veil = 'opacity-[0.86]', className = '', children, ...rest }) => (
    <SectionWrapper className={`relative z-0 overflow-hidden py-16 md:py-24 ${tones[tone]} ${className}`} {...rest}>
        {photo && (
            <>
                <img loading="lazy" decoding="async" src={photo} alt="" aria-hidden="true" className={`absolute inset-0 -z-20 w-full h-full object-cover ${photoClass}`} />
                <div aria-hidden="true" className={`absolute inset-0 -z-10 bg-[#4a4529] ${veil}`} />
            </>
        )}
        {title && <SectionTitle>{title}</SectionTitle>}
        {children}
    </SectionWrapper>
);

const Label = ({ children, as: Tag = 'h3', className = '' }) => (
    <Tag className={`text-[17px] md:text-[19px] font-cormorant font-bold uppercase tracking-[0.24em] ${className}`}>{children}</Tag>
);

// Círculo de línea fina para los iconos de sección (sobre beige).
const Medallion = ({ children }) => (
    <span aria-hidden="true" className="mx-auto flex items-center justify-center w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-full border border-[#4a4529]/45">
        {children}
    </span>
);
const medallionIcon = "w-11 h-11 md:w-[52px] md:h-[52px]";

const Recommendation = ({ name, firstName, detail, badge, note, instagram, phone }) => (
    <div className="flex flex-col border border-[#4a4529]/30 px-5 py-7 md:px-6 md:py-8">
        {badge && (
            <p className={`mb-3 pb-3 border-b border-[#4a4529]/20 text-xs font-sans font-bold uppercase tracking-[0.14em] ${accent}`}>{badge}</p>
        )}
        <Label as="h4" className="!tracking-[0.18em] leading-snug">{name}</Label>
        <p className={`mt-2.5 ${body}`}>{detail}</p>
        {note && <p className={`mt-1 text-[19px] md:text-xl font-cormorant font-semibold leading-snug ${accent}`}>{note}</p>}
        {(instagram || phone) && (
            <div className="mt-auto pt-5 flex flex-col items-center gap-1.5">
                {phone && (
                    <a href={whatsappLink(phone, firstName)} target="_blank" rel="noopener noreferrer" className={`${btnFilled} sm:!w-full !px-4 !text-xs !tracking-[0.18em]`}>
                        <MessageCircle size={16} className="shrink-0" /> Escribir por WhatsApp
                    </a>
                )}
                {instagram && (
                    <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] text-[19px] font-cormorant italic font-semibold transition-opacity hover:opacity-70">
                        <Instagram size={20} strokeWidth={1.6} /> @{instagram}
                    </a>
                )}
            </div>
        )}
    </div>
);

function Details() {
    return (
        <div id="top" className="pagina-verde min-h-screen bg-[#4a4529] text-[#f7f2e9] overflow-clip">
            <Navbar navLinks={navLinks} />
            <a
                href="/invitacion"
                onClick={volver}
                className="fixed left-4 top-[88px] z-40 inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#f7f2e9]/95 text-[#4a4529] border border-[#4a4529]/30 shadow-md font-sans text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
                <ArrowLeft size={16} /> Regresar
            </a>

            <header className="relative h-[60svh] min-h-[380px] md:h-[75vh] flex items-start md:items-center justify-center overflow-hidden">
                <img fetchpriority="high"
                    src={bannerImage}
                    alt="Gustavo y Geraldine"
                    className="absolute inset-0 w-full h-full object-cover [object-position:56%_55%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />
                <h1 className="relative z-10 pt-24 md:pt-16 px-6 text-center text-[4.25rem] sm:text-7xl md:text-[7rem] leading-[1.1] font-anastasia text-porcelain drop-shadow-lg [-webkit-text-stroke-width:0.5px]">
                    The Details
                </h1>
            </header>

            <Section tone="beige" title="Fecha y lugar">
                {/* Marco de doble línea, como .elegant-frame */}
                <div className="max-w-[920px] mx-auto border border-[#4a4529]/45 p-[5px] md:p-1.5">
                    <div className="border border-[#4a4529]/45 px-5 py-9 md:px-10 md:py-14 grid md:grid-cols-2 gap-7 md:gap-12 text-center">
                        <div>
                            <Label className={accent}>Fecha</Label>
                            <p className={`mt-3 ${keyInfo}`}>Sábado, 20 de marzo de 2027</p>
                            <p className="mt-2 text-[26px] md:text-3xl font-cormorant font-bold tracking-[0.08em]">{venue.time}</p>
                        </div>
                        <div aria-hidden="true" className="md:hidden mx-auto w-24 h-px bg-[#4a4529]/30" />
                        <div>
                            <Label className={accent}>Lugar</Label>
                            <p className={`mt-3 ${keyInfo}`}>{venue.name}</p>
                            <p className={`mt-2 ${body}`}>{venue.address}</p>
                            {venue.instagram && (
                                <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2.5 min-h-[44px] text-[19px] md:text-[21px] font-cormorant italic font-semibold transition-opacity hover:opacity-70">
                                    <Instagram size={22} strokeWidth={1.6} /> Conoce el lugar · @{venue.instagram}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                {venue.mapLink && (
                    <div className="mt-7 md:mt-10 text-center">
                        <a href={venue.mapLink} target="_blank" rel="noopener noreferrer" className={btnFilled}>
                            <MapPin size={16} /> Ver mapa
                        </a>
                    </div>
                )}
            </Section>

            <Section title="Itinerario">
                <TimelineIconDefs />
                {/* Móvil: dos columnas que se leen por filas (→ y luego ↙). Desde lg: dos filas que se leen por columnas (↓ y luego ↗).
                    El último va solo, centrado. */}
                <ol className="max-w-[1120px] mx-auto grid grid-cols-2 gap-x-6 gap-y-[68px] text-center lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:auto-cols-fr lg:gap-x-14 lg:gap-y-24">
                    {timeline.map(({ time, title, icon: Icon }, i) => {
                        const isLast = i === timeline.length - 1;
                        const isFirstOfPair = i % 2 === 0;
                        return (
                            <li key={title} className={`relative flex flex-col items-center ${isLast ? 'col-span-2 lg:col-span-1 lg:row-span-2 lg:self-center' : ''}`}>
                                <Icon className="w-[132px] h-[132px] lg:w-40 lg:h-40 xl:w-44 xl:h-44" />
                                <p className="mt-3 lg:mt-4 text-xl lg:text-2xl font-cormorant font-bold tracking-[0.16em] lg:tracking-[0.2em] whitespace-nowrap">{time}</p>
                                <p className="mt-0.5 lg:mt-1 text-2xl lg:text-[28px] font-cormorant italic font-medium text-[#f7f2e9]/90">{title}</p>
                                {!isLast && isFirstOfPair && (
                                    <ArrowRight className={`absolute top-14 -right-[27px] w-[30px] lg:top-auto lg:right-auto lg:-bottom-16 lg:left-1/2 lg:-translate-x-1/2 lg:rotate-90 lg:w-9 ${accent}`} />
                                )}
                                {!isLast && !isFirstOfPair && (
                                    <ArrowDownLeft className={`absolute -bottom-[54px] -left-[34px] w-11 lg:bottom-auto lg:left-auto lg:-top-[72px] lg:-right-[52px] lg:w-[52px] lg:rotate-180 ${accent}`} />
                                )}
                            </li>
                        );
                    })}
                </ol>
            </Section>

            <Section tone="beige" title="Indicaciones">
                <div className="max-w-[920px] mx-auto grid md:grid-cols-2 gap-11 md:gap-14 text-center">
                    {directions.map(({ icon: Icon, title, text }) => (
                        <div key={title}>
                            <Medallion><Icon strokeWidth={1.2} className={medallionIcon} /></Medallion>
                            <Label className="mt-4 md:mt-5 md:!text-[21px]">{title}</Label>
                            <p className={`mt-2.5 ${body}`}>{text}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-9 md:mt-12 text-center">
                    <a href={venue.directionsLink} target="_blank" rel="noopener noreferrer" className={btn}>
                        <MapPin size={16} /> Abrir en Google Maps
                    </a>
                </div>
            </Section>

            <Section title="Dress code" photo={kissPhoto} photoClass="[object-position:55%_30%]">
                <div className="max-w-[760px] mx-auto text-center flex flex-col gap-9 md:gap-12">
                    <div>
                        <p className="text-[34px] md:text-[44px] font-cormorant font-bold uppercase tracking-[0.22em] leading-[1.15]">{dressCode.style}</p>
                        <p className={`mt-3.5 ${body}`}>{dressCode.intro}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 py-7 md:py-8 border-y border-[#f7f2e9]/25">
                        {dressCode.looks.map((look) => (
                            <div key={look.title}>
                                <Label className={accent}>{look.title}</Label>
                                <p className="mt-2 text-[25px] md:text-[28px] font-cormorant font-semibold">{look.text}</p>
                                {look.note && <p className={`mt-1 ${body}`}>{look.note}</p>}
                            </div>
                        ))}
                    </div>
                    <div>
                        <Label className="md:!text-[21px]">Colores reservados</Label>
                        <ul className="mt-6 md:mt-7 flex justify-center gap-3 md:gap-8">
                            {dressCode.reserved.map(({ name, color }) => (
                                <li key={name} className="w-[104px] md:w-[120px]">
                                    <span className="block w-16 h-[84px] md:w-[72px] md:h-[94px] mx-auto rounded-t-full border border-[#f7f2e9]/35" style={{ backgroundColor: color }} />
                                    <span className="mt-2.5 block text-lg md:text-xl font-cormorant font-semibold">{name}</span>
                                </li>
                            ))}
                        </ul>
                        <p className={`mt-5 md:mt-6 ${body}`}>{dressCode.note}</p>
                        <p className={`mt-1 ${body}`}>{dressCode.extraNote}</p>
                    </div>
                    {dressCode.pinterest && (
                        <a href={dressCode.pinterest} target="_blank" rel="noopener noreferrer" className="sm:self-center inline-flex items-center justify-center gap-3 min-h-[68px] px-5 md:px-10 py-3 bg-[#f7f2e9] text-[#4a4529] text-[22px] md:text-[26px] font-cormorant italic font-bold leading-tight shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-[1.03]">
                            Busca inspiración para el gran día aquí <ArrowUpRight size={22} className="shrink-0" />
                        </a>
                    )}
                </div>
            </Section>

            <Section tone="beige" title="Recomendados">
                <div className="max-w-[1040px] mx-auto text-center">
                    <Medallion><Hotel strokeWidth={1.2} className={medallionIcon} /></Medallion>
                    <Label className="mt-4 md:mt-5 md:!text-[21px]">Estadía</Label>
                    <p className={`mt-2.5 max-w-[620px] mx-auto ${body}`}>
                        Puedes reservar directamente en el hotel o Airbnb que prefieras. Zonas en las que te recomendamos hospedarte:
                    </p>
                    <ul className={`mt-5 max-w-[620px] mx-auto grid grid-cols-2 gap-6 ${body}`}>
                        <li><strong className="block not-italic font-bold">Medellín</strong> El Poblado</li>
                        <li><strong className="block not-italic font-bold">Envigado</strong> La Frontera y alrededores de Viva Envigado</li>
                    </ul>
                    <p className={`mt-2 max-w-[620px] mx-auto ${body}`}>
                        Así estarás a <strong className="not-italic font-bold">máximo 15 minutos</strong> del lugar.
                    </p>
                    {/* Marco de doble línea, como el de Fecha y lugar */}
                    <div className="mt-7 md:mt-9 max-w-[560px] mx-auto border border-[#4a4529]/45 p-[5px] md:p-1.5">
                        <div className="border border-[#4a4529]/45 px-5 py-8 md:px-10 md:py-10">
                            <p className={`text-xs font-sans font-bold uppercase tracking-[0.14em] ${accent}`}>{partnerHotel.badge}</p>
                            <p className={`mt-2.5 ${keyInfo}`}>{partnerHotel.name}</p>
                            <p className={`mt-3 ${body}`}>{partnerHotel.text}</p>
                            <a href={partnerHotel.link} target="_blank" rel="noopener noreferrer" className={`${btnFilled} mt-6 !px-6 !tracking-[0.2em]`}>
                                Reservar con descuento <ArrowUpRight size={16} className="shrink-0" />
                            </a>
                        </div>
                    </div>

                    <div aria-hidden="true" className="my-[52px] md:my-[72px] mx-auto w-[120px] md:w-40 h-px bg-[#4a4529]/25" />

                    <Medallion><MakeupIcon className="w-14 h-14 md:w-[66px] md:h-[66px]" /></Medallion>
                    <Label className="mt-4 md:mt-5 md:!text-[21px]">Maquillaje</Label>
                    <p className={`mt-2.5 max-w-[620px] mx-auto ${body}`}>Hemos preseleccionado estas tres maquilladoras para ustedes. Si desean reservar su servicio, cada una cuenta con un equipo con capacidad para atender a varias personas ese día.</p>
                    <div className="mt-7 md:mt-9 grid md:grid-cols-3 gap-4 md:gap-6">
                        {makeupArtists.map((artist, i) => <Recommendation key={i} {...artist} />)}
                    </div>
                </div>
            </Section>

            <Section title="Otros detalles">
                <div className={`${column} space-y-10`}>
                    {otherDetails.map((item) => (
                        <div key={item.title}>
                            <Label className="!text-[22px] md:!text-[26px]">{item.title}</Label>
                            <p className={`mt-3 ${body}`}>{item.text}</p>
                            {item.link && (
                                <a href={item.link.href} className={`${btn} mt-5`}>
                                    {item.link.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Section tone="beige" title="Preguntas" id="faq" className="scroll-mt-16">
                <Faq />
            </Section>

            <Section photo={poolPhoto} photoClass="[object-position:50%_40%]" veil="opacity-90" className="!py-[88px] md:!py-[120px] text-center">
                <Label as="p">Con amor</Label>
                <p className="mt-2.5 text-[3.25rem] md:text-[5rem] font-anastasia leading-[1.15] [-webkit-text-stroke-width:0.4px] md:[-webkit-text-stroke-width:0.5px]">Gustavo &amp; Geraldine</p>
                <a href="/invitacion" className={`${btn} mt-9 md:mt-10`}>
                    Volver a la invitación
                </a>
            </Section>
        </div>
    );
}

export default Details;
