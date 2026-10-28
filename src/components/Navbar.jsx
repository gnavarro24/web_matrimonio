import { useState } from 'react';
import logo from '../assets/decor/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const defaultLinks = [
    { title: "Inicio", href: "#home" },
    /* { title: "Nuestra Historia", href: "#story" },
    { title: "Detalles", href: "#details" }, */
    { title: "RSVP", href: "#rsvp" },
];

const Navbar = ({ navLinks = defaultLinks }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="G & G" width="40" height="40" className="h-10 w-auto" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.title}
                            href={link.href}
                            className="text-sm tracking-widest uppercase hover:text-dry-sage transition-colors text-black"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden min-w-[4.5rem] border border-dusty-olive/60 px-3 py-1.5 text-sm tracking-widest uppercase text-dusty-olive"
                    aria-label={isOpen ? "Cerrar guía" : "Abrir guía"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "Cerrar" : "Guía"}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-porcelain border-b border-t border-dry-sage overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-black text-sm tracking-widest uppercase hover:text-dry-sage"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
