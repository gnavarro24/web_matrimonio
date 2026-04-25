import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import DressCode from './components/DressCode';
import Rsvp from './components/Rsvp';
import Faq from './components/Faq';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import AudioPlayerFinal from './components/AudioPlayerFinal';
import SimpleAudioTest from './components/SimpleAudioTest';
import gipsyKingsAudio from './assets/decor/gipsy_kings-volare-2min.mp3';

function App() {
    const [showModal, setShowModal] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const audioPlayerRef = useRef(null);

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

    // Verificar al cargar si ya se dio permiso antes
    useEffect(() => {
        // TEMPORAL: Forzar mostrar modal siempre para testing
        console.log('🎵 Mostrando modal para testing');
        setShowModal(true);

        // const hasPermission = localStorage.getItem('wedding-audio-enabled');
        // if (hasPermission === 'true') {
        //     console.log('🎵 Usuario ya dio permiso previamente');
        //     setAudioEnabled(true);
        //     // Intentar reproducir directamente después de un delay
        //     setTimeout(() => {
        //         if (audioPlayerRef.current) {
        //             audioPlayerRef.current.play()
        //                 .then(() => {
        //                     console.log('🎵 Auto-reproducción exitosa');
        //                 })
        //                 .catch(() => {
        //                     console.log('🎵 Auto-reproducción bloqueada, mostrando modal');
        //                     setShowModal(true);
        //                 });
        //         }
        //     }, 500);
        // } else {
        //     console.log('🎵 Primera visita, mostrando modal');
        //     setShowModal(true);
        // }
    }, []);

    const handleStartMusic = async () => {
        console.log('🎵 Iniciando música desde modal');
        setAudioEnabled(true);

        // Pequeño delay para asegurar que el componente se renderice
        setTimeout(async () => {
            if (audioPlayerRef.current) {
                const success = await audioPlayerRef.current.play();
                if (success) {
                    console.log('🎵 Música iniciada exitosamente');
                } else {
                    console.log('🎵 Error al iniciar música');
                }
            }
        }, 100);
    };

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

            {/* <div className="relative">
                <EventDetails />
            </div> */}

            {/* <div className="relative">
                <DressCode />
            </div> */}

            <div className="relative">
                <Rsvp />
            </div>

            {/* <Faq /> */}
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
