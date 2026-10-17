import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import SimpleAudioTest from './components/SimpleAudioTest';
import gipsyKingsAudio from './assets/decor/gipsy_kings-volare-2min.mp3';

function App() {
    const [showModal, setShowModal] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);

    // Bloquear scroll mientras el modal está abierto
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const handleStartMusic = () => setAudioEnabled(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-porcelain relative overflow-x-hidden">
            <div style={{ visibility: showModal ? 'hidden' : 'visible' }}>
            <Navbar />
            <Hero videoShouldPlay={!showModal} />

            <div className="relative">
                <VideoSection />
            </div>

            <div className="relative">
                <OurStory />
            </div>

            <div className="relative">
                <Gallery />
            </div>

            <div className="relative">
                <Rsvp />
            </div>

            <Footer />
            </div>

            {/* Modal de bienvenida */}
            <WelcomeModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onStartMusic={handleStartMusic}
            />

            {/* Audio Player TEST - Solo se renderiza después de dar permiso */}
            {audioEnabled && (
                <SimpleAudioTest src={gipsyKingsAudio} />
            )}
        </div>
    );
}

export default App;
