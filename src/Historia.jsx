import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import { volver } from './volver';
import slider1 from './assets/decor/historia/slider_1.webp';
import slider2 from './assets/decor/historia/slider_2.webp';

// Abajo: una fila que se mueve sola, con 5 fotos a la vista (carrusel_*, en orden). 8 fotos (2026-10-25):
// sin la 08 ni la 13 (son el banner y el fondo de la piscina de Detalles), ni la 03, 04 y 12 (casi iguales a otras).
const todas = import.meta.glob('./assets/decor/historia/carrusel_*.webp', { eager: true, import: 'default' });
const carrusel = Object.keys(todas).sort().map((r) => todas[r]);

const navLinks = [
    { title: "Invitación", href: "/" },
    { title: "RSVP", href: "/#rsvp" },
    { title: "Detalles", href: "/details" },
    { title: "Regalos", href: "/regalos" },
    { title: "Nuestra historia", href: "#top" },
];

// Un solo párrafo: se lee en el celular. Texto de Gustavo, tal cual.
const historia = '2019 fue el año en que nos conocimos pero nuestros sueños y planes nos llevarían a lugares diferentes. Tuvieron que pasar mudanzas, cambios de ciudad, nuevos trabajos y una pandemia, hasta que en 2022 una llamada de cumpleaños, un concierto de Maná, un viaje a Punta Cana, y Dios volvió a unir nuestras historias para darle una oportunidad a lo que había nacido años atrás. En 2025 nos dijimos que sí en Las Vegas, entre un concierto de Bruno Mars y una cita en uno de los edificios más altos del mundo. Y desde entonces hemos vivido uno de los años más maravillosos juntos, seguros de que Dios ya nos había escogido a cada uno para este camino.';

// Arriba: las fotos se turnan solas con un fundido. `pos` encuadra las caras cuando el celular recorta a lo alto.
const SLIDES = [{ src: slider1, pos: '62% 40%' }, { src: slider2, pos: '24% 40%' }];
const CAMBIO_MS = 5000;
function Historia() {
    const [slide, setSlide] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), CAMBIO_MS);
        return () => clearInterval(t);
    }, []);
    return (
        <div id="top" className="pagina-verde min-h-screen bg-[#4a4529] text-[#f7f2e9] overflow-clip">
            <Navbar navLinks={navLinks} />
            <a
                href="/"
                onClick={volver}
                className="fixed left-4 top-[88px] z-40 inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#f7f2e9]/95 text-[#4a4529] border border-[#4a4529]/30 shadow-md font-sans text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
                <ArrowLeft size={16} /> Regresar
            </a>

            <header className="relative pt-[72px]">
                <div aria-hidden="true" className="relative aspect-[3/4] md:aspect-auto md:h-[85vh] overflow-hidden bg-[#3a361f]">
                    {SLIDES.map((f, i) => (
                        <img
                            key={f.src}
                            src={f.src}
                            alt=""
                            fetchpriority={i === 0 ? 'high' : undefined}
                            style={{ objectPosition: f.pos }}
                            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[1500ms,6500ms] ease-out motion-reduce:transition-none ${slide === i ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                        />
                    ))}
                </div>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 md:h-72 bg-gradient-to-b from-transparent to-[#4a4529] to-[92%] pointer-events-none" />
                {/* La letra Anastasia dibuja el trazo ~0.2em a la derecha de su caja: el pr lo recentra */}
                <h1 className="absolute inset-x-0 -bottom-4 md:-bottom-6 pr-[0.4em] text-center font-anastasia text-[3.5rem] md:text-[5.5rem] leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">Nuestra historia</h1>
            </header>

            <section className="max-w-[640px] mx-auto px-7 pt-10 md:pt-14 text-center">
                <p className="font-cormorant italic font-medium text-[19px] md:text-[22px] leading-[1.65]">{historia}</p>
            </section>

            <section className="max-w-[420px] mx-8 sm:mx-auto mt-7 bg-[#f7f2e9] text-[#4a4529] p-1 shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                <div className="border border-[#4a4529]/35 px-5 pt-5 pb-4 text-center">
                    <p className="font-cormorant italic font-semibold text-[17px] md:text-[19px] leading-[1.35]">
                        Así como es de especial nuestra historia, seguramente tú has tenido un rol en ella, soñamos con que nos acompañes en nuestro día.
                    </p>
                    <p className="mt-3 font-cormorant font-bold uppercase tracking-[0.24em] text-[11px] text-[#586748]">Con amor</p>
                    <p className="font-anastasia text-[2rem] md:text-[2.4rem] leading-[1.15] whitespace-nowrap">Gustavo &amp; Geraldine</p>
                </div>
            </section>

            <div aria-hidden="true" className="mt-10 overflow-hidden">
                <div className="carrusel flex w-max">
                    {[...carrusel, ...carrusel].map((src, i) => (
                        <img key={i} src={src} alt="" loading="lazy" decoding="async" className="block w-[20vw] aspect-[2/3] object-cover shrink-0 mr-[3px]" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Historia;
