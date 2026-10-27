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
import { useInvitado } from './useInvitado';
import { yaNavego } from './navegacion';

const navLinks = [
    { title: "Inicio", href: "#home" },
    { title: "Detalles", href: "/details" },
    { title: "Regalos", href: "/regalos" },
    { title: "RSVP", href: "#rsvp" },
];

// El sobre sale solo cuando la invitación es la primera página de la carga: al volver desde una subpágina
// (atrás, "Regresar", menú) no se recarga y no sale otra vez; al refrescar, sí.
function Invitation() {
    const [saltarSobre] = useState(yaNavego);
    const [showModal, setShowModal] = useState(!saltarSobre);
    const [revelado, setRevelado] = useState(saltarSobre); // la página se ve mientras el sobre se desvanece encima
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
        // Llegando desde /details con #rsvp: saltar a la sección tras abrir
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
                onStartMusic={() => window.dispatchEvent(new Event('musica-activar'))}
                onRevelar={() => setRevelado(true)}
                envelope
                guestName={invitado.guest?.nombre || ''}
            />

        </div>
    );
}

export default Invitation;
