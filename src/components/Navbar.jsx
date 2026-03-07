import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/decor/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { title: "Inicio", href: "#home" },
        /* { title: "Nuestra Historia", href: "#story" },
        { title: "Detalles", href: "#details" }, */
        { title: "RSVP", href: "#rsvp" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="G & G" className="h-10" />
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
                    className="md:hidden text-dusty-olive"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
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
