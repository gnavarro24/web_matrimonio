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

export const ColosseumIcon = icon(<>
    <path d="M8 54h48" />
    <path d="M12 54V34a20 20 0 0 1 40 0v20" />
    <path d="M12 40h40M12 30h40" />
    <path d="M18 54v-8a3 3 0 0 1 6 0v8M29 54v-8a3 3 0 0 1 6 0v8M40 54v-8a3 3 0 0 1 6 0v8" />
    <path d="M19 40v-5a2.5 2.5 0 0 1 5 0v5M29.5 40v-5a2.5 2.5 0 0 1 5 0v5M40 40v-5a2.5 2.5 0 0 1 5 0v5" />
    <path d="M24 30v-4a2 2 0 0 1 4 0v4M36 30v-4a2 2 0 0 1 4 0v4" />
    <path d="M50 12c-2-3-5-4-5-7a2.5 2.5 0 0 1 5-1a2.5 2.5 0 0 1 5 1c0 3-3 4-5 7Z" fill={sage} />
</>);

export const SailboatIcon = icon(<>
    <path d="M31 8v34" />
    <path d="M34 10C44 18 50 28 52 38H34Z" fill={sage} />
    <path d="M28 16C22 24 17 31 14 38h14Z" />
    <path d="M31 8l8 3l-8 3" />
    <path d="M8 43h48l-6 9H15Z" />
    <path d="M20 47.5h4M30 47.5h4M40 47.5h4" />
    <path d="M4 59q5-4 10 0t10 0t10 0t10 0t10 0t6-1" />
</>);

export const GelatoIcon = icon(<>
    <circle cx="32" cy="14" r="8.5" />
    <circle cx="24" cy="26" r="9" fill={sage} />
    <circle cx="40" cy="26" r="9" fill={paper} />
    <path d="M17 33h30L32 60Z" fill={paper} />
    <path d="M21 40l15 12M28 33l12 10M43 40l-15 12M36 33l-12 10" />
    <path d="M32 5.5c1-3 4-4 6-3" />
    <path d="M49 12v5M46.5 14.5h5M12 12v4M10 14h4" />
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

export const VespaIcon = icon(<>
    <path d="M40 14h8M46 14L52 40" />
    <circle cx="50" cy="20" r="2.6" fill={sage} />
    <path d="M44 46a9 9 0 0 1 17-3" />
    <path d="M49 31C44 33 40 38 39 44H27" />
    <path d="M27 44c0-9-6-13-17-13c-4 0-6 5-6 11h4" fill={sage} />
    <path d="M8 27h17a3 3 0 0 1 0 6H8Z" fill={paper} />
    <circle cx="15" cy="48" r="8" fill={paper} /><circle cx="15" cy="48" r="2.5" />
    <circle cx="52" cy="48" r="8" fill={paper} /><circle cx="52" cy="48" r="2.5" />
    <path d="M2 20h7M4 24h4" />
</>);

export const SofaIcon = icon(<>
    <path d="M14 36V26a7 7 0 0 1 7-7h22a7 7 0 0 1 7 7v10" fill={paper} />
    <path d="M5 37a5.5 5.5 0 0 1 11 0v6h32v-6a5.5 5.5 0 0 1 11 0v15H5Z" fill={sage} />
    <path d="M32 43V32M16 37c0-4 4-5 8-5h16c4 0 8 1 8 5" />
    <path d="M11 52v6M53 52v6" />
    <path d="M32 14c-2.5-3-5-4-5-7a2.5 2.5 0 0 1 5-1a2.5 2.5 0 0 1 5 1c0 3-2.5 4-5 7Z" />
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
