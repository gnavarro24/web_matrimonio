// Ilustraciones a línea del Honeymoon fund y de los datos bancarios. Toman el color del texto;
// los rellenos salvia/porcelana son fijos.
const sage = '#a7ad89';
const paper = '#fffdf7';
const blob = '#e4e7d4';

const icon = (children) => function GiftIcon({ className = '' }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {children}
        </svg>
    );
};

export const MapIcon = icon(<>
    <path d="M6 16l16-6l20 6l16-6v38l-16 6l-20-6l-16 6Z" fill={paper} />
    <path d="M22 10v38M42 16v38" />
    <path d="M12 38c6-2 8-10 16-10s10 8 20 4" strokeDasharray="1.5 4.5" />
    <path d="M48 12c-2-3-5-4-5-7a2.5 2.5 0 0 1 5-1a2.5 2.5 0 0 1 5 1c0 3-3 4-5 7Z" fill={sage} />
    <circle cx="12" cy="38" r="2.5" fill={sage} />
</>);

export const PastaWineIcon = icon(<>
    <path d="M4 38h36c0 11-7 18-18 18S4 49 4 38Z" fill={paper} />
    <path d="M14 56h16" />
    <path d="M8 38c1-9 9-9 10 0M15 38c1-12 11-12 12 0M24 38c1-8 9-8 10 0" />
    <path d="M30 30L44 10M41 8l-2.5 4.5M44 10l-2.5 4.5M47 12l-2.5 4.5" />
    <path d="M42 22h17c0 12-3 19-8.5 19S42 34 42 22Z" fill={paper} />
    <path d="M43 29c4-2 7 2 15 0c-1 8-3.5 12-7.5 12S44 37 43 29Z" fill={sage} />
    <path d="M50.5 41v15M44 57h13" />
</>);

export const PlaneIcon = icon(<>
    <path d="M4 54q14-8 28-4t28-6" strokeDasharray="1.5 5" />
    <path d="M8 30l6-2l6 5l11-3l-9-16l5-2l15 14l10-3c4-1 6 3 2 5L18 40Z" fill={paper} />
    <path d="M29 34l-4 12l5-1l8-14" fill={sage} />
    <path d="M50 10c-2-3-5-4-5-7a2.5 2.5 0 0 1 5-1a2.5 2.5 0 0 1 5 1c0 3-3 4-5 7Z" fill={sage} />
</>);

export const BedIcon = icon(<>
    <path d="M8 22v34M56 38v18" />
    <path d="M8 46h48v-8a6 6 0 0 0-6-6H26v14" fill={paper} />
    <rect x="12" y="30" width="12" height="8" rx="4" fill={sage} />
    <path d="M8 50h48" />
    <path d="M44 8a7 7 0 1 0 6 11a6 6 0 0 1-6-11Z" fill={sage} />
    <path d="M32 12v3M30.5 13.5h3M56 22v3M54.5 23.5h3" />
</>);

export const TrainIcon = icon(<>
    <path d="M18 10h28a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z" fill={paper} />
    <path d="M17 18h30v12H17Z" fill={sage} />
    <path d="M12 36h40" />
    <circle cx="21" cy="43" r="2.5" /><circle cx="43" cy="43" r="2.5" />
    <path d="M26 6h12M22 50l-6 8M42 50l6 8M18 55h28" />
</>);

export const HouseIcon = icon(<>
    <path d="M6 30L32 8l26 22" />
    <path d="M12 26v30h40V26" fill={paper} />
    <path d="M27 56V42a5 5 0 0 1 10 0v14" fill={sage} />
    <path d="M17 34h7v7h-7ZM40 34h7v7h-7Z" />
    <path d="M44 8v8l5 4V8Z" fill={sage} />
    <path d="M32 22c-2-2.5-4-3.5-4-5.5a2 2 0 0 1 4-1a2 2 0 0 1 4 1c0 2-2 3-4 5.5Z" />
</>);

export const BankIcon = icon(<>
    <path d="M6 24L32 8L58 24Z" fill={blob} />
    <path d="M10 30h44M8 54h48M12 48h40" />
    <path d="M16 30v18M26 30v18M38 30v18M48 30v18" />
    <circle cx="32" cy="18" r="2.5" />
</>);

export const GlobeIcon = icon(<>
    <circle cx="32" cy="32" r="24" fill={blob} />
    <path d="M8 32h48M32 8c-9 7-9 41 0 48M32 8c9 7 9 41 0 48M12 20h40M12 44h40" />
</>);
