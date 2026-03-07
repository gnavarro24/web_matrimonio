import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import DressCode from './components/DressCode';
import Rsvp from './components/Rsvp';
import Faq from './components/Faq';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-porcelain relative overflow-x-hidden">
            <Navbar />
            <Hero />

            <div className="relative">
                <OurStory />
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
    );
}

export default App;
