import { Heart } from 'lucide-react';
import siluetaColtejer from '../assets/decor/fondo_lepinot.png';

const Footer = () => {
    return (
        <footer className="bg-cream">

            <img
                src={siluetaColtejer}
                alt="Silueta Coltejer"
                className="w-full"
            />
        </footer>
    );
};

export default Footer;
