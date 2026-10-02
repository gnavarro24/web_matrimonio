import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoHero from './components/VideoHero';
import OurStory from './components/OurStory';
import TheDetails from './components/TheDetails';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import SimpleAudioTest from './components/SimpleAudioTest';
import gipsyKingsAudio from './assets/decor/gipsy_kings-volare-2min.mp3';

const navLinks = [
    { title: "Inicio", href: "#home" },
    { title: "Detalles", href: "/invitacion/details" },
    { title: "RSVP", href: "#rsvp" },
];

function Invitation() {
    const [showModal, setShowModal] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // Bloquear scroll mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    const handleCloseModal = () => {
        setShowModal(false);
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
                <OurStory showDate={false} />
                <TheDetails />
                <Gallery />
                <Rsvp />
                <Footer />
            </div>

            <WelcomeModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onStartMusic={() => setAudioEnabled(true)}
            />

            {audioEnabled && <SimpleAudioTest src={gipsyKingsAudio} />}
        </div>
    );
}

export default Invitation;
