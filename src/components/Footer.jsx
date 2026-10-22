import fondoMedellin from '../assets/decor/fondoMedellin.webp';

const Footer = () => {
    return (
        <footer className="bg-cream">

            <img loading="lazy" decoding="async"
                src={fondoMedellin}
                alt="Silueta Coltejer"
                className="w-full"
            />
        </footer>
    );
};

export default Footer;
