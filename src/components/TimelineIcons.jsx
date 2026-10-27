// Iconos del itinerario: ilustraciones a línea elegidas por Gustavo (recortadas de su lámina, fondo transparente).
// Las flechas del recorrido siguen siendo SVG con trazo "a mano": usan el filtro #trazo-a-mano de
// <TimelineIconDefs />, que debe estar una vez en la página.
import bienvenida from '../assets/decor/timeline/bienvenida.webp';
import ceremonia from '../assets/decor/timeline/ceremonia.webp';
import coctel from '../assets/decor/timeline/coctel.webp';
import cena from '../assets/decor/timeline/cena.webp';
import pastel from '../assets/decor/timeline/pastel.webp';
import fiesta from '../assets/decor/timeline/fiesta.webp';
import despedida from '../assets/decor/timeline/despedida.webp';
import maquillaje from '../assets/decor/details_maquillaje.webp';

export const TimelineIconDefs = () => (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="trazo-a-mano" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
);

// Flechas del recorrido, con el mismo trazo
const arrowProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'url(#trazo-a-mano)', 'aria-hidden': true };

export const ArrowRight = (props) => (
    <svg viewBox="0 0 32 20" {...arrowProps} {...props}>
        <path d="M2 11 Q15 6 29 10 M22 4 L29.5 10 L22.5 16" />
    </svg>
);

export const ArrowDownLeft = (props) => (
    <svg viewBox="0 0 48 40" {...arrowProps} {...props}>
        <path d="M44 4 Q34 28 7 34 M15 25 L6.5 34.5 L18 38" />
    </svg>
);

// La ilustración va como máscara: así todos los iconos toman el color del texto (currentColor),
// también el que venía en rojo.
const icon = (src) => function TimelineIcon({ className = '' }) {
    const mask = `url(${src}) center / contain no-repeat`;
    return <span aria-hidden="true" className={`${className} inline-block bg-current`} style={{ WebkitMask: mask, mask }} />;
};

export const WelcomeIcon = icon(bienvenida); // villa con fuente
export const CeremonyIcon = icon(ceremonia); // anillo en su estuche
export const CocktailIcon = icon(coctel); // querubines sobre una copa
export const DinnerIcon = icon(cena); // mesa servida
export const CakeIcon = icon(pastel); // porción de tiramisú
export const PartyIcon = icon(fiesta); // bola de espejos
export const FarewellIcon = icon(despedida); // carro "Just Married"

// No es del itinerario (va en Recomendados), pero es otra ilustración de Gustavo y usa la misma máscara.
export const MakeupIcon = icon(maquillaje); // polvera y labial
