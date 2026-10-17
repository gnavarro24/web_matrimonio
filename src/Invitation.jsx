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

// Quien vuelve desde Detalles o Regalos ya abrió el sobre: va directo a la invitación.
// Al entrar por el enlace o refrescar la página, el sobre se muestra de nuevo.
// Volver con "atrás" (o "Regresar" en Detalles) tampoco lo muestra si el sobre ya se abrió en esta pestaña.
const vieneDeAdentro = () => {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav?.type === 'back_forward' && sessionStorage.getItem('sobre-abierto')) return true;
    if (nav?.type !== 'navigate' || !document.referrer) return false;
    const ref = new URL(document.referrer);
    return ref.origin === window.location.origin && ref.pathname.startsWith('/invitacion/');
};

function Invitation() {
    const [showModal, setShowModal] = useState(() => !vieneDeAdentro());
    const [audioEnabled, setAudioEnabled] = useState(false);
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
        sessionStorage.setItem('sobre-abierto', '1');
        // Llegando desde /invitacion/details con #rsvp: saltar a la sección tras abrir
        if (window.location.hash) {
            setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
        }
    };

    return (
        <div className="min-h-screen bg-porcelain relative overflow-x-hidden">
            <div style={{ visibility: showModal ? 'hidden' : 'visible' }}>
                <Navbar navLinks={navLinks} />
                <VideoHero videoShouldPlay={!showModal} />
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
                envelope
                guestName={invitado.guest?.nombre || ''}
            />

            {audioEnabled && <SimpleAudioTest src={gipsyKingsAudio} />}
        </div>
    );
}

export default Invitation;
