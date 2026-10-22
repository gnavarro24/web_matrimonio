import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoHero from './components/VideoHero';
import TheDetails from './components/TheDetails';
import Gifts from './components/Gifts';
import Playlist from './components/Playlist';
import NuestraHistoria from './components/NuestraHistoria';
import Contacto from './components/Contacto';
import Confirmacion from './components/Confirmacion';
import WelcomeModal from './components/WelcomeModal';
import SimpleAudioTest from './components/SimpleAudioTest';
import { useInvitado } from './useInvitado';
import gipsyKingsAudio from './assets/decor/gipsy_kings-volare-2min.mp3';

const navLinks = [
    { title: "Inicio", href: "#home" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "Regalos", href: "/invitacion/regalos" },
    { title: "RSVP", href: "#rsvp" },
];

// Si el sobre ya se abrió en esta pestaña, no se muestra otra vez (atrás, "Regresar", refrescar…).
// Sin excepción para "reload": Safari en iPhone reporta así el volver atrás cuando recarga la página.
// Quien entra directo a una subpágina y luego pasa a la invitación tampoco lo ve (eso sí usa el referrer).
const vieneDeAdentro = () => {
    const nav = performance.getEntriesByType('navigation')[0];
    try {
        if (sessionStorage.getItem('sobre-abierto')) return true;
    } catch { /* sin sessionStorage: se decide por el referrer */ }
    if (nav?.type !== 'navigate' || !document.referrer) return false;
    const ref = new URL(document.referrer);
    return ref.origin === window.location.origin && ref.pathname.startsWith('/invitacion/');
};

function Invitation() {
    const [saltarSobre] = useState(vieneDeAdentro);
    const [showModal, setShowModal] = useState(!saltarSobre);
    const [revelado, setRevelado] = useState(saltarSobre); // la página se ve mientras el sobre se desvanece encima
    // Sin sobre no hay toque que arranque la música: se monta igual (respeta la pausa guardada).
    const [audioEnabled, setAudioEnabled] = useState(saltarSobre);
    const invitado = useInvitado();

    // Bloquear scroll mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    // Sin sobre que abrir (vuelve desde Detalles con #rsvp): saltar a la sección al cargar
    useEffect(() => {
        if (!showModal && window.location.hash) {
            setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        try { sessionStorage.setItem('sobre-abierto', '1'); } catch { /* el sobre volverá a salir */ }
        // Llegando desde /invitacion/details con #rsvp: saltar a la sección tras abrir
        if (window.location.hash) {
            setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
        }
    };

    return (
        <div className="min-h-screen bg-porcelain relative overflow-clip">
            <div style={{ visibility: showModal && !revelado ? 'hidden' : 'visible' }}>
                <Navbar navLinks={navLinks} />
                {/* La portada se asienta (leve zoom hacia atrás) mientras se entra al sobre. */}
                <div style={{ transform: revelado ? 'none' : 'scale(1.08)', transition: 'transform 1.6s cubic-bezier(.2,.7,.2,1)' }}>
                    <VideoHero videoShouldPlay={!showModal} />
                </div>
                <Confirmacion invitado={invitado} />
                <TheDetails />
                <Gifts />
                <Playlist />
                <NuestraHistoria />
                <Contacto />
            </div>

            <WelcomeModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onStartMusic={() => setAudioEnabled(true)}
                onRevelar={() => setRevelado(true)}
                envelope
                guestName={invitado.guest?.nombre || ''}
            />

            {audioEnabled && <SimpleAudioTest src={gipsyKingsAudio} />}
        </div>
    );
}

export default Invitation;
