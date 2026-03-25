import { Heart } from 'lucide-react';
import fondoMedellin from '../assets/decor/fondoMedellin.jpeg';

const Footer = () => {
    return (
        <footer className="bg-cream">

            <img
                src={fondoMedellin}
                alt="Silueta Coltejer"
                className="w-full"
            />
        </footer>
    );
};

export default Footer;
