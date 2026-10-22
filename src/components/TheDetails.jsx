import SectionWrapper from './SectionWrapper';
import couplePhoto from '../assets/decor/details_pareja.webp';
import venuePhoto from '../assets/decor/details_lugar.webp';
// Marco: foto real (Cooper Hewitt, dominio público) recortada, con la talla reducida.
import framePhoto from '../assets/decor/details_marco.webp';
import flowerShape from '../assets/decor/details_flor.webp';

const Polaroid = ({ src, className }) => (
    <span className={`absolute block bg-[#f4f2ee] p-[2.2%] pb-[8%] shadow-[0_8px_18px_rgba(0,0,0,0.35)] ${className}`}>
        <img loading="lazy" decoding="async" src={src} alt="" className="block w-full aspect-square object-cover" />
    </span>
);

// Composición: espejo con marco dorado, flor con el título y dos polaroids encima.
const TheDetails = () => (
    <SectionWrapper id="details" className="bg-[#413c22] py-16 md:py-24 scroll-mt-16">
        <div className="text-center">
            <a
                href="/invitacion/details"
                className="group relative inline-block w-[min(21rem,100%)] sm:w-[26rem] md:w-[34rem] aspect-[545/555] text-[#413c22] transition-transform duration-500 ease-out hover:scale-105 focus-visible:outline-none focus-visible:scale-105"
            >
                <span aria-hidden="true" className="absolute left-1/2 -top-[8%] h-[116%] aspect-[880/1372] -translate-x-1/2">
                    {/* Vidrio de espejo envejecido detrás de la abertura del marco */}
                    <span className="absolute left-[19%] right-[18.5%] top-[32%] bottom-[21%] rounded-[50%] shadow-[inset_0_0_28px_rgba(0,0,0,0.55)] bg-[radial-gradient(ellipse_70%_60%_at_38%_30%,rgba(255,255,255,.22),transparent_60%),linear-gradient(160deg,#8d8a7b,#6f6c5d_45%,#4f4c3e)]" />
                    <img loading="lazy" decoding="async" src={framePhoto} alt="" className="absolute inset-0 w-full h-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)]" />
                </span>

                <span className="absolute left-0 top-[17%] w-[70%] aspect-square flex items-center justify-center -rotate-[8deg]">
                    {/* La silueta va como máscara para poder darle color */}
                    <span aria-hidden="true" className="absolute inset-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]">
                        <span
                            className="block w-full h-full bg-[#f7f2e9]"
                            style={{ WebkitMask: `url(${flowerShape}) center / contain no-repeat`, mask: `url(${flowerShape}) center / contain no-repeat` }}
                        />
                    </span>
                    <span className="relative -mt-[30px] flex flex-col items-center">
                        <h2 className="text-[2.6rem] sm:text-5xl md:text-[4rem] leading-[0.95] font-anastasia">
                            The<br />Details
                        </h2>
                        <span className="-mt-1 md:-mt-2 font-cormorant uppercase tracking-[0.15em] text-xs sm:text-sm md:text-lg border-b border-transparent group-hover:border-[#413c22] group-focus-visible:border-[#413c22] transition-colors duration-300">
                            Click Aquí
                        </span>
                    </span>
                </span>

                <Polaroid src={couplePhoto} className="left-[54%] top-[7%] w-[42%] -rotate-[7deg]" />
                <Polaroid src={venuePhoto} className="left-[50%] top-[47%] w-[42%] rotate-[20deg]" />
            </a>
        </div>
    </SectionWrapper>
);

export default TheDetails;
