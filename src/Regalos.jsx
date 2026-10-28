import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Check, Copy, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import { volver } from './volver';
import SectionWrapper from './components/SectionWrapper';
import { PlaneIcon, BedIcon, HouseIcon, MapIcon, BankIcon, GlobeIcon } from './components/GiftIcons';
import { gifts, bankAccounts } from './gifts';
import { useInvitado, RSVP_API } from './useInvitado';

const icons = {
    'tiquetes': PlaneIcon,
    'hotel': BedIcon,
    'luna-de-miel': MapIcon,
    'nuestro-hogar': HouseIcon,
};
const bankIcons = { colombia: BankIcon, usa: GlobeIcon };
// Mancha de fondo de cada icono: una forma distinta por tarjeta.
const blobs = ['58% 42% 55% 45% / 48% 56% 44% 52%', '45% 55% 42% 58% / 56% 46% 54% 44%', '52% 48% 60% 40% / 44% 52% 48% 56%'];

const navLinks = [
    { title: "Invitación", href: "/" },
    { title: "RSVP", href: "/#rsvp" },
    { title: "Detalles", href: "/details" },
    { title: "Regalos", href: "#top" },
    { title: "Nuestra historia", href: "/historia" },
];

const btn = "inline-block px-8 py-4 border border-dusty-olive tracking-widest uppercase text-sm transition-all duration-300";
const ink = "text-[#4a4529]";
const kicker = "font-sans font-bold uppercase text-[#586748]";

// Ruta punteada Medellín → luna de miel con un avioncito de papel que flota.
const Route = () => {
    const quieto = useReducedMotion();
    return (
        <svg aria-hidden="true" viewBox="0 0 520 120" className="w-full max-w-[520px] h-auto mx-auto text-dusty-olive" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 96C150-10 370-10 480 96" strokeWidth="1.6" strokeDasharray="2 9" />
            <circle cx="40" cy="96" r="5" fill="currentColor" stroke="none" />
            <path d="M480 104c-7-9-12-14-12-20a6 6 0 0 1 12-3a6 6 0 0 1 12 3c0 6-5 11-12 20Z" fill="currentColor" stroke="none" />
            <motion.g animate={quieto ? {} : { y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <path d="M232 30L292 8L270 50L258 34Z" fill="#fffdf7" strokeWidth="1.8" />
                <path d="M258 34L292 8M258 34L256 48L264 41" strokeWidth="1.8" />
            </motion.g>
            <g className="font-sans" fontSize="11" fontWeight="700" letterSpacing="2.4" fill="#586748" stroke="none" textAnchor="middle">
                <text x="40" y="118">MEDELLÍN</text>
                <text x="470" y="118">HONEYMOON</text>
            </g>
        </svg>
    );
};

// Cada invitación puede elegir uno o varios planes (cada uno una sola vez). Quedan en la hoja, columna Regalo
// de "Invitacion" (ver apps-script/Code.gs), y de ahí sale el contador de aportes.
const pedirConteo = () => fetch(`${RSVP_API}?regalos=1`).then((r) => r.json());

function Regalos() {
    const { code, guest, setGuest, status } = useInvitado();
    const elegidos = guest?.regalos || [];
    const [counts, setCounts] = useState({});
    const [sending, setSending] = useState(null);
    const guardando = useRef(false); // mientras se guarda, el polling no pisa el +1 que ya se ve
    const [burst, setBurst] = useState(null); // regalo cuyo corazón está volando
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(null); // fila recién copiada

    // Los aportes se cuentan en la hoja (una invitación = un aporte), así el número coincide con lo guardado.
    // ponytail: "tiempo real" por polling cada 8 s con la pestaña visible; Google tarda ~1 s por consulta.
    useEffect(() => {
        const load = () => {
            if (document.hidden || guardando.current) return;
            pedirConteo()
                .then((d) => { if (d.ok && !guardando.current) setCounts(d.counts); })
                .catch(() => {});
        };
        load();
        const timer = setInterval(load, 8000);
        document.addEventListener('visibilitychange', load);
        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', load);
        };
    }, []);

    // quitar = true deshace la elección de ese plan (también queda así en la hoja).
    const give = async (id, quitar = false) => {
        setError('');
        if (!guest) {
            return setError(status === 'loading' ? 'Un momento, estamos cargando tu invitación…' : 'Para elegir tu plan, abre el enlace personal de tu invitación.');
        }
        // Se ve al instante (la hoja tarda unos segundos en responder); si no se guarda, se deshace.
        const antes = guest;
        const sumar = (n) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + n) }));
        setGuest({ ...guest, regalos: quitar ? elegidos.filter((g) => g !== id) : [...elegidos, id] });
        sumar(quitar ? -1 : 1);
        if (!quitar) setBurst(id);
        setSending(id); // mientras tanto los demás botones esperan: dos guardados cruzados se pisarían
        guardando.current = true;
        try {
            const data = await (await fetch(RSVP_API, { method: 'POST', body: JSON.stringify({ codigo: code, regalo: id, quitar }) })).json();
            if (!data.ok) throw new Error(data.error);
            setGuest(data);
            // Por si ya lo había elegido desde otro celular: el número exacto sale de la hoja.
            await pedirConteo().then((d) => d.ok && setCounts(d.counts)).catch(() => {});
        } catch {
            setGuest(antes);
            sumar(quitar ? 1 : -1);
            setError(quitar ? 'No pudimos quitar este plan. Intenta de nuevo en un momento.' : 'No pudimos guardar tu elección. Intenta de nuevo en un momento.');
        }
        guardando.current = false;
        setSending(null);
    };

    const copy = async (key, value) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(key);
            setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
        } catch {
            // Sin permiso de portapapeles: el dato sigue visible y se puede seleccionar a mano.
        }
    };


    return (
        <div id="top" className="min-h-screen bg-cream overflow-clip">
            <Navbar navLinks={navLinks} />
            <a
                href="/"
                onClick={volver}
                className="fixed left-4 top-[88px] z-40 inline-flex items-center gap-2 min-h-[44px] px-4 bg-[#f7f2e9]/95 text-[#4a4529] border border-[#4a4529]/30 shadow-md font-sans text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
                <ArrowLeft size={16} /> Regresar
            </a>

            <header className={`pt-28 md:pt-32 px-6 text-center ${ink}`}>
                <Route />
                <h1 className="mt-5 text-6xl sm:text-7xl md:text-8xl">
                    <span className="font-cormorant">Honeymoon </span>
                    <span className="font-anastasia">fund</span>
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-xl md:text-2xl font-cormorant italic font-medium">
                    1. Elige tus planes o regalos favoritos.
                </p>
            </header>

            <SectionWrapper className={`py-12 md:py-16 ${ink}`}>
                {elegidos.length > 0 && (
                    <p className="max-w-2xl mx-auto mb-8 text-center text-xl font-cormorant italic font-medium">
                        Elegiste: <strong className="not-italic font-semibold">{gifts.filter((g) => elegidos.includes(g.id)).map((g) => g.title).join(', ')}</strong>. ¡Gracias! Puedes sumar o quitar los planes que quieras.
                    </p>
                )}
                <p role="alert" className="mb-6 text-center text-lg font-cormorant text-red-700 empty:hidden">{error}</p>
                <div className="max-w-[1072px] mx-auto grid gap-x-[30px] gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                    {gifts.map(({ id, title, text, goal, cta }, i) => {
                        const Icon = icons[id];
                        const count = counts[id] || 0;
                        const percent = Math.min(100, Math.round((count / goal) * 100));
                        return (
                            <div key={id} className={`group relative bg-porcelain border ${elegidos.includes(id) ? 'border-dusty-olive ring-2 ring-dusty-olive' : 'border-dry-sage'} px-7 pt-[38px] pb-[30px] text-center flex flex-col items-center gap-3 shadow-[0_10px_24px_rgba(74,69,41,0.10)] transition duration-300 odd:-rotate-[1.2deg] even:rotate-[1.1deg] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_18px_34px_rgba(74,69,41,0.16)]`}>
                                <span aria-hidden="true" className="absolute inset-2 border border-dashed border-dry-sage pointer-events-none" />
                                {percent >= 100 && (
                                    <span className="absolute -top-4 -right-2.5 w-[86px] h-[86px] rounded-full bg-dusty-olive text-porcelain flex items-center justify-center rotate-12 font-sans text-[11px] font-bold uppercase tracking-[0.12em] leading-tight shadow-[0_6px_12px_rgba(74,69,41,0.25)]">
                                        ¡Meta<br />cumplida!
                                    </span>
                                )}
                                <span className="relative w-[124px] h-[124px] flex items-center justify-center">
                                    <span aria-hidden="true" className="absolute inset-1.5 bg-[#e4e7d4]" style={{ borderRadius: blobs[i % blobs.length] }} />
                                    {Icon && <Icon className="relative w-[92px] h-[92px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />}
                                </span>
                                <p className={`${kicker} text-[11px] tracking-[0.24em]`}>{elegidos.includes(id) ? '♥ Tu elección' : `Plan n.º ${i + 1}`}</p>
                                <h2 className="text-3xl leading-[1.1] font-cormorant font-semibold">{title}</h2>
                                {text && <p className="mb-2 text-xl leading-snug font-cormorant italic font-medium">{text}</p>}

                                <div className="mt-auto w-full flex flex-col gap-3">
                                    <div
                                        role="progressbar"
                                        aria-label={title}
                                        aria-valuenow={percent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        className="relative h-[22px]"
                                    >
                                        <span className="absolute inset-x-0 top-2.5 border-t-2 border-dashed border-dry-sage" />
                                        <span className="absolute left-0 top-[9px] h-1 rounded-full bg-dusty-olive transition-[width] duration-700 ease-out" style={{ width: `${percent}%` }} />
                                        <Heart size={22} fill="currentColor" stroke="#fffdf7" strokeWidth={1.5} className="absolute top-0 -ml-[11px] text-dusty-olive transition-[left] duration-700 ease-out" style={{ left: `${percent}%` }} />
                                    </div>
                                    <p className={`${kicker} text-xs tracking-[0.18em]`}>
                                        {percent >= 100 ? `${count} aportes` : `${count} de ${goal} aportes · ${percent}%`}
                                    </p>

                                    {sending === id ? (
                                        <p className="min-h-[52px] flex items-center justify-center gap-2 bg-dusty-olive text-porcelain" aria-live="polite">
                                            <Loader2 size={18} className="animate-spin" /><span className="font-sans text-[13px] font-bold uppercase tracking-[0.2em]">Guardando…</span>
                                        </p>
                                    ) : elegidos.includes(id) ? (
                                        <>
                                            <p className="min-h-[52px] flex items-center justify-center bg-dusty-olive text-porcelain font-anastasia text-3xl leading-none">¡Mil gracias!</p>
                                            <button
                                                type="button"
                                                onClick={() => give(id, true)}
                                                disabled={!!sending}
                                                className="mx-auto min-h-[44px] px-3 text-[#586748] font-cormorant italic text-lg underline underline-offset-4 decoration-dusty-olive/50 transition-opacity hover:opacity-70 disabled:opacity-50"
                                            >
                                                Quitar este plan
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => give(id)}
                                            disabled={!!sending}
                                            className="min-h-[52px] w-full px-4 py-3 border border-dusty-olive text-[#586748] font-sans text-[13px] font-bold uppercase tracking-[0.2em] transition duration-300 hover:bg-dusty-olive hover:text-porcelain active:scale-95 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a4529]"
                                        >
                                            {cta}
                                        </button>
                                    )}
                                </div>

                                {burst === id && (
                                    <motion.span
                                        aria-hidden="true"
                                        initial={{ opacity: 1, y: 0, scale: 0.6 }}
                                        animate={{ opacity: 0, y: -120, scale: 1.6 }}
                                        transition={{ duration: 1 }}
                                        onAnimationComplete={() => setBurst(null)}
                                        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-dusty-olive pointer-events-none"
                                    >
                                        <Heart size={28} fill="currentColor" />
                                    </motion.span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <p className="max-w-2xl mx-auto mt-11 text-center text-[19px] leading-normal font-cormorant italic font-medium">
                    2. Tu selección nos hará saber tu regalo.<br />
                    Puedes hacer tu aporte con los datos bancarios que encontrarás abajo o en la lluvia de sobres el día de la boda. ¡Gracias!
                </p>
            </SectionWrapper>

            <SectionWrapper id="datos-bancarios" className={`pb-12 md:pb-16 scroll-mt-16 ${ink}`}>
                <h2 className="text-center text-5xl sm:text-6xl font-anastasia leading-tight">Datos bancarios</h2>
                <div aria-hidden="true" className="mt-3 flex items-center justify-center gap-2.5 text-dusty-olive">
                    <span className="w-14 border-t border-current" />
                    <span className="w-[7px] h-[7px] rotate-45 bg-current" />
                    <span className="w-14 border-t border-current" />
                </div>
                <div className="max-w-[872px] mx-auto mt-8 grid gap-7 md:grid-cols-2">
                    {bankAccounts.map(({ id, title, note, rows }) => {
                        const Icon = bankIcons[id] || BankIcon;
                        return (
                            <div key={id} className="bg-porcelain border border-dry-sage px-6 sm:px-7 pt-7 pb-4">
                                <div className="flex items-center gap-4 pb-4 text-left">
                                    <Icon className="shrink-0 w-[60px] h-[60px]" />
                                    <div>
                                        <h3 className="text-[28px] leading-[1.1] font-cormorant font-semibold">{title}</h3>
                                        <p className="mt-1 text-lg font-cormorant italic font-medium">{note}</p>
                                    </div>
                                </div>
                                <dl className="divide-y divide-[#d9dcc8] border-t border-[#d9dcc8]">
                                    {rows.map(({ label, value, copy: canCopy }) => {
                                        const key = `${id}-${label}`;
                                        return (
                                            <div key={key} className="py-3 flex items-center justify-between gap-3">
                                                <div className="min-w-0 text-left">
                                                    <dt className={`${kicker} text-[11px] tracking-[0.2em]`}>{label}</dt>
                                                    <dd className="mt-0.5 text-[22px] font-cormorant font-semibold break-words select-all">{value}</dd>
                                                </div>
                                                {canCopy && (
                                                    <button
                                                        type="button"
                                                        onClick={() => copy(key, value)}
                                                        aria-label={`Copiar ${label}`}
                                                        className="shrink-0 w-[46px] h-[46px] inline-flex items-center justify-center border border-dusty-olive text-[#586748] transition-colors duration-300 hover:bg-dusty-olive hover:text-porcelain"
                                                    >
                                                        {copied === key ? <Check size={18} /> : <Copy size={18} />}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </dl>
                            </div>
                        );
                    })}
                </div>
                <p role="status" className="mt-4 text-center text-sm uppercase tracking-widest text-dusty-olive font-sans empty:hidden">{copied ? 'Copiado' : ''}</p>
            </SectionWrapper>

            <div className="px-6 pb-16 flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
                <a href="/#rsvp" className={`${btn} w-full sm:w-auto bg-dusty-olive text-white hover:bg-dry-sage hover:border-dry-sage`}>
                    Confirmar asistencia
                </a>
                <a href="/" className={`${btn} w-full sm:w-auto text-dusty-olive hover:bg-dusty-olive hover:text-white`}>
                    Volver a la invitación
                </a>
            </div>
        </div>
    );
}

export default Regalos;
