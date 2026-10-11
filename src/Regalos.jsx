import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Sailboat, IceCream, Wine, Bike, Home, Heart, Check, Copy, Landmark } from 'lucide-react';
import Navbar from './components/Navbar';
import SectionWrapper from './components/SectionWrapper';
import { gifts, bankAccounts } from './gifts';

const API = '/api/regalos';
const icons = {
    'luna-de-miel': Plane,
    'paseo-en-bote': Sailboat,
    'gelato': IceCream,
    'pasta-y-vino': Wine,
    'vespa': Bike,
    'nuestro-hogar': Home,
};

const navLinks = [
    { title: "Invitación", href: "/invitacion" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "Regalos", href: "#top" },
    { title: "RSVP", href: "/invitacion#rsvp" },
];

const btn = "inline-block px-8 py-4 border border-dusty-olive tracking-widest uppercase text-sm transition-all duration-300";

// Un aporte por regalo y por dispositivo, para que el contador sea de personas.
const storageKey = (id) => `regalo_${id}`;
const alreadyGiven = () => Object.fromEntries(gifts.map((g) => [g.id, !!localStorage.getItem(storageKey(g.id))]));

function Regalos() {
    const [counts, setCounts] = useState({});
    const [given, setGiven] = useState(alreadyGiven);
    const [sending, setSending] = useState(null);
    const [burst, setBurst] = useState(null); // regalo cuyo corazón está volando
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(null); // fila recién copiada

    // ponytail: "tiempo real" por polling cada 4 s con la pestaña visible; WebSocket en el
    // Durable Object si algún día hace falta que sea instantáneo.
    useEffect(() => {
        const load = () => {
            if (document.hidden) return;
            fetch(API).then((r) => r.json()).then((d) => setCounts(d.counts)).catch(() => {});
        };
        load();
        const timer = setInterval(load, 4000);
        document.addEventListener('visibilitychange', load);
        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', load);
        };
    }, []);

    const give = async (id) => {
        setSending(id);
        setError('');
        try {
            const res = await fetch(API, { method: 'POST', body: JSON.stringify({ id }) });
            if (!res.ok) throw new Error(res.status);
            setCounts((await res.json()).counts);
            localStorage.setItem(storageKey(id), new Date().toISOString());
            setGiven((g) => ({ ...g, [id]: true }));
            setBurst(id);
        } catch {
            setError('No pudimos guardar tu aporte. Intenta de nuevo en un momento.');
        }
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

    const total = gifts.reduce((sum, g) => sum + (counts[g.id] || 0), 0);

    return (
        <div id="top" className="min-h-screen bg-cream overflow-x-hidden">
            <Navbar navLinks={navLinks} />

            <header className="pt-32 md:pt-40 px-6 text-center">
                <h1 className="text-6xl sm:text-7xl md:text-8xl text-black/80">
                    <span className="font-cormorant">Honeymoon </span>
                    <span className="font-anastasia">fund</span>
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg sm:text-xl md:text-2xl font-cormorant text-black/70">
                    Tu presencia es nuestro mejor regalo. Si además quieres aportar a nuestra luna de miel,
                    aquí te contamos en qué lo vamos a usar. Elige tus planes favoritos y ayúdanos a llegar a la meta.
                </p>
                <p className="mt-6 text-sm uppercase tracking-widest text-dry-sage font-sans" aria-live="polite">
                    {total} {total === 1 ? 'aporte' : 'aportes'} hasta ahora
                </p>
            </header>

            <SectionWrapper className="py-12 md:py-16">
                <p role="alert" className="mb-6 text-center text-lg font-cormorant text-red-700 empty:hidden">{error}</p>
                <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gifts.map(({ id, title, text, goal }) => {
                        const Icon = icons[id] || Heart;
                        const count = counts[id] || 0;
                        const percent = Math.min(100, Math.round((count / goal) * 100));
                        return (
                            <div key={id} className="relative bg-porcelain border border-dry-sage p-8 text-center flex flex-col">
                                <Icon size={30} strokeWidth={1.5} className="mx-auto text-dusty-olive" />
                                <h2 className="mt-4 text-2xl sm:text-3xl font-cormorant text-dusty-olive">{title}</h2>
                                <p className="mt-3 mb-6 text-lg font-cormorant text-black/70">{text}</p>

                                <div className="mt-auto">
                                    <div
                                        role="progressbar"
                                        aria-label={title}
                                        aria-valuenow={percent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        className="h-2 rounded-full bg-dry-sage/30 overflow-hidden"
                                    >
                                        <div className="h-full rounded-full bg-dusty-olive transition-[width] duration-700 ease-out" style={{ width: `${percent}%` }} />
                                    </div>
                                    <p className="mt-3 text-sm uppercase tracking-widest text-dry-sage font-sans">
                                        {percent >= 100
                                            ? `¡Meta cumplida! · ${count} aportes`
                                            : `${count} de ${goal} aportes · ${percent}%`}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => give(id)}
                                        disabled={given[id] || sending === id}
                                        className={`${btn} mt-6 w-full inline-flex items-center justify-center gap-2 ${given[id]
                                            ? 'bg-dusty-olive text-white cursor-default'
                                            : 'text-dusty-olive hover:bg-dusty-olive hover:text-white active:scale-95 disabled:opacity-60'}`}
                                    >
                                        {given[id] ? <><Check size={16} /> ¡Gracias!</> : <><Heart size={16} /> Aportar</>}
                                    </button>
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
                <p className="max-w-2xl mx-auto mt-10 text-center text-lg font-cormorant italic text-black/60">
                    Los aportes de esta página son simbólicos: aquí no se mueve dinero. Si quieres hacer tu aporte al Honeymoon fund, puedes usar los datos bancarios de abajo o entregarlo el día de la boda.
                </p>
            </SectionWrapper>

            <SectionWrapper id="datos-bancarios" className="pb-12 md:pb-16 scroll-mt-16">
                <h2 className="text-center text-4xl sm:text-5xl font-cormorant text-dusty-olive">Datos bancarios</h2>
                <div className="max-w-4xl mx-auto mt-8 grid gap-6 md:grid-cols-2">
                    {bankAccounts.map(({ id, title, note, rows }) => (
                        <div key={id} className="bg-porcelain border border-dry-sage p-6 sm:p-8">
                            <Landmark size={30} strokeWidth={1.5} className="mx-auto text-dusty-olive" />
                            <h3 className="mt-4 text-center text-2xl sm:text-3xl font-cormorant text-dusty-olive">{title}</h3>
                            <p className="mt-2 text-center text-lg font-cormorant text-black/70">{note}</p>
                            <dl className="mt-6 divide-y divide-dry-sage/40">
                                {rows.map(({ label, value, copy: canCopy }) => {
                                    const key = `${id}-${label}`;
                                    return (
                                        <div key={key} className="py-3 flex items-center justify-between gap-3">
                                            <div className="min-w-0 text-left">
                                                <dt className="text-xs uppercase tracking-widest text-dusty-olive font-sans">{label}</dt>
                                                <dd className="mt-1 text-xl font-cormorant text-black/80 break-words select-all">{value}</dd>
                                            </div>
                                            {canCopy && (
                                                <button
                                                    type="button"
                                                    onClick={() => copy(key, value)}
                                                    aria-label={`Copiar ${label}`}
                                                    className="shrink-0 w-11 h-11 inline-flex items-center justify-center border border-dusty-olive text-dusty-olive transition-colors duration-300 hover:bg-dusty-olive hover:text-white"
                                                >
                                                    {copied === key ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </dl>
                        </div>
                    ))}
                </div>
                <p role="status" className="mt-4 text-center text-sm uppercase tracking-widest text-dusty-olive font-sans empty:hidden">{copied ? 'Copiado' : ''}</p>
            </SectionWrapper>

            <div className="px-6 pb-16 flex flex-col sm:flex-row gap-4 justify-center items-center text-center">
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

export default Regalos;
