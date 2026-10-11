import SectionWrapper from './SectionWrapper';
import couplePhoto from '../assets/decor/details_pareja.jpg';
import venuePhoto from '../assets/decor/details_lugar.jpg';
import mirrorPhoto from '../assets/decor/details_espejo.webp';
import flowerShape from '../assets/decor/details_flor.webp';

const Polaroid = ({ src, className }) => (
    <span className={`absolute block bg-[#f4f2ee] p-[2.2%] pb-[8%] shadow-[0_8px_18px_rgba(0,0,0,0.35)] ${className}`}>
        <img src={src} alt="" className="block w-full aspect-square object-cover" />
    </span>
);

// Composición: espejo dorado, flor con el título y dos polaroids encima.
const TheDetails = () => (
    <SectionWrapper id="details" className="bg-[#413c22] py-16 md:py-24 scroll-mt-16">
        <div className="text-center">
            <a
                href="/invitacion/details"
                className="group relative inline-block w-[min(21rem,100%)] sm:w-[26rem] md:w-[34rem] aspect-[545/555] text-[#413c22] transition-transform duration-500 ease-out hover:scale-105 focus-visible:outline-none focus-visible:scale-105"
            >
                <img
                    src={mirrorPhoto}
                    alt=""
                    className="absolute left-1/2 -top-[8%] h-[116%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
                />

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
