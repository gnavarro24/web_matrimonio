import { useState, useEffect } from 'react';
import { Check, Heart, Loader2 } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { RSVP_API } from '../useInvitado';

const field = "w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent";
const label = "block text-sm uppercase tracking-wider mb-2 text-gray-500";
const btn = "w-full px-3 py-4 border border-dusty-olive uppercase tracking-[0.12em] sm:tracking-[0.2em] text-sm transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60";

// `invitado` viene de useInvitado() (lo carga Invitation, que también lo usa en el sobre de entrada).
const Confirmacion = ({ invitado }) => {
    const { code, guest, setGuest, status, reload } = invitado;
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ asistentes: 1, mensaje: '' });
    const [sending, setSending] = useState(''); // 'si' | 'no': qué botón se está enviando
    const [submitError, setSubmitError] = useState('');

    // Al cargar la invitación, proponer lo ya respondido o todos los cupos
    useEffect(() => {
        if (guest) setForm((f) => ({ ...f, asistentes: guest.asistentes || guest.cupos }));
    }, [guest]);

    const respond = async (asiste) => {
        setSending(asiste);
        setSubmitError('');
        try {
            // Sin cabecera Content-Type: así el navegador no hace preflight, que Apps Script no responde.
            const res = await fetch(RSVP_API, { method: 'POST', body: JSON.stringify({ codigo: code, asiste, ...form }) });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error);
            setGuest(data);
            setEditing(false);
        } catch {
            setSubmitError('No pudimos guardar tu respuesta. Intenta de nuevo en un momento.');
        }
        setSending('');
    };

    const answered = guest?.asiste && !editing;

    return (
        <div className="px-6 md:px-16 py-5 bg-cream">
            <SectionWrapper id="rsvp" className="bg-cream border-2 border-dusty-olive p-10 scroll-mt-20">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-5xl sm:text-6xl mb-6 text-black/80">
                        <span className="font-cormorant">Confirma tu </span>
                        <span className="font-anastasia">asistencia</span>
                    </h2>

                    {status === 'no-code' && (
                        <p className="text-xl font-cormorant text-black/70">
                            Para confirmar, abre el enlace personal que te enviamos con tu invitación.
                        </p>
                    )}


                    {status === 'invalid' && (
                        <p className="text-xl font-cormorant text-black/70" role="alert">
                            No encontramos tu invitación. Revisa que el enlace esté completo o escríbenos.
                        </p>
                    )}

                    {status === 'error' && (
                        <div role="alert">
                            <p className="text-xl font-cormorant text-black/70">No pudimos cargar tu invitación.</p>
                            <button type="button" onClick={reload} className="mt-4 text-dusty-olive underline underline-offset-4 font-cormorant text-xl">
                                Intentar de nuevo
                            </button>
                        </div>
                    )}

                    {guest && (
                        <>
                            <p className="text-sm uppercase tracking-widest text-dry-sage font-sans">Invitación para</p>
                            <p className="mt-1 text-3xl sm:text-4xl font-cormorant text-dusty-olive">{guest.nombre}</p>
                            <p className="mt-2 mb-8 text-sm uppercase tracking-widest text-dry-sage font-sans">
                                {guest.cupos === 1 ? '1 cupo reservado para ti' : `${guest.cupos} cupos reservados para ustedes`}
                            </p>
                        </>
                    )}

                    {status === 'loading' && (
                        <p className="flex items-center justify-center gap-2 text-xl font-cormorant text-black/70" role="status">
                            <Loader2 className="animate-spin" size={20} /> Buscando tu invitación…
                        </p>
                    )}

                    {guest && answered && (
                        <div aria-live="polite">
                            <div className="w-14 h-14 rounded-full bg-dusty-olive text-white flex items-center justify-center mx-auto mb-4">
                                <Check size={28} />
                            </div>
                            <p className="text-2xl font-cormorant text-black/80">
                                {guest.asiste === 'si'
                                    ? `¡Gracias! Confirmaste ${guest.asistentes} ${guest.asistentes === 1 ? 'asistente' : 'asistentes'}. Nos vemos el 20 de marzo.`
                                    : 'Gracias por avisarnos. Los llevaremos en el corazón ese día.'}
                            </p>
                            <button type="button" onClick={() => setEditing(true)} className="mt-6 text-dusty-olive underline underline-offset-4 font-cormorant text-xl">
                                Cambiar mi respuesta
                            </button>
                        </div>
                    )}

                    {guest && !answered && (
                        <form onSubmit={(e) => { e.preventDefault(); respond('si'); }} className="space-y-8">
                            {guest.cupos > 1 && (
                                <fieldset>
                                    <legend className={`${label} mx-auto`}>¿Cuántos asistirán?</legend>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {Array.from({ length: guest.cupos }, (_, n) => n + 1).map((n) => (
                                            <label key={n} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="asistentes"
                                                    value={n}
                                                    checked={form.asistentes === n}
                                                    onChange={() => setForm({ ...form, asistentes: n })}
                                                    className="peer sr-only"
                                                />
                                                <span className="flex w-12 h-12 items-center justify-center rounded-full border border-dusty-olive text-xl font-cormorant text-dusty-olive transition-colors peer-checked:bg-dusty-olive peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-dusty-olive peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#f7f2e9]">
                                                    {n}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            )}

                            <div className="text-left">
                                <label htmlFor="rsvp-mensaje" className={label}>Mensaje para los novios (opcional)</label>
                                <textarea id="rsvp-mensaje" rows={3} maxLength={500} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={field} />
                            </div>

                            {submitError && <p role="alert" className="text-red-700 font-cormorant text-lg">{submitError}</p>}

                            <div className="space-y-3">
                                <button type="submit" disabled={!!sending} className={`${btn} bg-dusty-olive text-white hover:bg-dry-sage hover:border-dry-sage`}>
                                    {sending === 'si' ? <><Loader2 className="animate-spin" size={18} /> Enviando...</> : <><Heart size={16} /> Confirmar asistencia</>}
                                </button>
                                <button type="button" onClick={() => respond('no')} disabled={!!sending} className={`${btn} text-dusty-olive hover:bg-dusty-olive hover:text-white`}>
                                    {sending === 'no' ? <><Loader2 className="animate-spin" size={18} /> Enviando...</> : (guest.cupos === 1 ? 'No podré acompañarlos' : 'No podremos acompañarlos')}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Confirmacion;
