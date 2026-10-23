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
import standByMeAudio from './assets/decor/stand-by-me.m4a';

const navLinks = [
    { title: "Inicio", href: "#home" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "Regalos", href: "/invitacion/regalos" },
    { title: "RSVP", href: "#rsvp" },
];

// Quien vuelve desde una subpágina (atrás, "Regresar", menú) no ve el sobre otra vez; al refrescar sí sale.
// La marca la deja main.jsx al abrir una subpágina y se gasta aquí. No sirve el tipo de navegación:
// Safari en iPhone reporta "reload" al volver atrás cuando recarga la página.
const MARCA = 'en-subpagina';
const vieneDeAdentro = () => {
    try {
        const si = !!sessionStorage.getItem(MARCA);
        sessionStorage.removeItem(MARCA);
        return si;
    } catch { return false; }
};
const llegaDeSubpagina = vieneDeAdentro(); // una vez por carga (StrictMode llamaría dos veces un inicializador de useState)

function Invitation() {
    const saltarSobre = llegaDeSubpagina;
    const [showModal, setShowModal] = useState(!saltarSobre);
    const [revelado, setRevelado] = useState(saltarSobre); // la página se ve mientras el sobre se desvanece encima
    // Sin sobre no hay toque que arranque la música: se monta igual (respeta la pausa guardada).
    const [audioEnabled, setAudioEnabled] = useState(saltarSobre);
    const invitado = useInvitado();

    // Vuelta atrás restaurada de la caché del navegador (sin recargar): gastar la marca para que refrescar muestre el sobre
    useEffect(() => {
        const alVolver = (e) => { if (e.persisted) try { sessionStorage.removeItem(MARCA); } catch { /* nada */ } };
        window.addEventListener('pageshow', alVolver);
        return () => window.removeEventListener('pageshow', alVolver);
    }, []);

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

            {audioEnabled && <SimpleAudioTest src={standByMeAudio} />}
        </div>
    );
}

export default Invitation;
