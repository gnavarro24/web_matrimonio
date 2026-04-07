import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import cuadroMonet from '../assets/decor/cuadro_monet.jpeg';
import bustoItaliano from '../assets/decor/busto_italiano.png';

const Rsvp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+57',
        phone: '',
        attending: 'yes',
        guests: '1',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = 'Por favor ingresa tu nombre completo';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor ingresa un email válido';
        }

        if (!formData.phone || formData.phone.trim().length === 0) {
            newErrors.phone = 'Por favor ingresa tu número celular';
        } else {
            const cleanPhone = formData.phone.replace(/\s/g, '');
            if (formData.countryCode === '+57') {
                if (cleanPhone.length !== 10 || !/^3\d{9}$/.test(cleanPhone)) {
                    newErrors.phone = 'Ingresa un número celular válido de Colombia (ej: 300 123 4567)';
                }
            } else if (formData.countryCode === '+1') {
                if (cleanPhone.length !== 10 || !/^\d{10}$/.test(cleanPhone)) {
                    newErrors.phone = 'Ingresa un número celular válido de USA (ej: 555 123 4567)';
                }
            }
        }

        if (!formData.attending) {
            newErrors.attending = 'Por favor confirma tu asistencia';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const lastSubmission = localStorage.getItem(`rsvp_${formData.email}`);
        if (lastSubmission) {
            const lastTime = new Date(lastSubmission);
            const now = new Date();
            const timeDiff = now - lastTime;
            const hoursDiff = timeDiff / (1000 * 60 * 60);

            if (hoursDiff < 1) {
                alert('Ya enviaste una respuesta recientemente. Si necesitas hacer cambios, por favor contacta directamente a los novios.');
                return;
            }
        }

        setStatus('submitting');
        const timestamp = new Date().toISOString();
        const submissionId = `${formData.email}_${Date.now()}`;

        const cleanCountryCode = formData.countryCode.replace('+', ''); // Remover el +
        const dataToSend = {
            submissionId: submissionId,
            timestamp: timestamp,
            name: formData.name,
            email: formData.email,
            countryCode: cleanCountryCode,
            phone: formData.phone,
            fullPhone: cleanCountryCode + ' ' + formData.phone,
            attending: formData.attending
        };


        try {
            await fetch('https://script.google.com/macros/s/AKfycbzmQaeDZMJqIHEEw3rrxtLzScUs3kx66TwvNtTvEp3bS363SlfbYDuE_t0oLsM7auJU/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            setStatus('success');
            setFormData({ name: '', email: '', countryCode: '+57', phone: '', attending: 'yes', guests: '1', message: '' });
            localStorage.setItem(`rsvp_${formData.email}`, timestamp);
        } catch {
            setStatus('idle');
            alert('Hubo un error al enviar. Por favor intenta de nuevo.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="px-6 md:px-16 py-5 bg-cream">
        <SectionWrapper id="rsvp" className="bg-cream border-2 border-dusty-olive p-10 relative overflow-visible">
            {/* Floating bust - left side */}
            {/*<div className="absolute left-2 w-16 h-16 md:left-4 md:w-24 md:h-24 pointer-events-none z-10" style={{top: '-30px'}}>
                <img
                    src={bustoItaliano}
                    alt="Busto italiano"
                    className="w-full h-full object-contain rotate-12 drop-shadow-lg"
                />
            </div>*/}

            {/* Floating decorative element */}
            <div className="absolute right-2 w-24 sm:w-28 md:right-12 md:top-1/2 md:-translate-y-1/2 md:w-44 pointer-events-none z-10" style={{top: '-70px', rotate: '-15deg'}}>
                <div className="relative">
                    <img
                        src={cuadroMonet}
                        alt="Cuadro Monet"
                        className="w-full rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                        <p className="text-base sm:text-lg md:text-2xl font-anastasia text-black drop-shadow-md leading-snug text-center">
                            Por favor <br />
                            conf<span className="relative inline-block">i<span className="absolute font-serif text-[0.8em]" style={{top: '1.5px', left: '60%', transform: 'translateX(68%)'}}>&#180;</span></span>rmanos tu <br />
                            asistencia antes<br />
                            del 31 de julio.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto pt-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl mt-4 mb-4 text-black font-blackGold"><span className="font-anastasia">Soft&nbsp;</span> RSVP</h2>
                    <p className="text-1xl sm:text-lg md:text-xl font-cormorant">Queremos prepararlo todo con amor. <br />
                        Si ya sabes con certeza si podrás acompañarnos, cuéntanoslo.
                        Nos ayudará muchísimo para planear este día tan especial con tiempo y cuidado.</p>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 p-8 text-center border border-green-100 rounded-lg"
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="text-green-600" size={32} />
                        </div>
                        <h3 className="text-2xl font-serif text-green-800 mb-2">¡Gracias por confirmar!</h3>
                        <p className="text-green-700">Hemos recibido tu respuesta correctamente.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-sm text-green-600 underline hover:text-green-800"
                        >
                            Enviar otra respuesta
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Nombre Completo*</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent ${
                                    errors.name ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                                placeholder="Ej. Juan Pérez"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Email*</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent ${
                                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                                placeholder="juan@ejemplo.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Teléfono*</label>
                            <div className="flex gap-3">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-28 p-3 border-b border-gray-300 focus:border-dusty-olive outline-none bg-transparent"
                                >
                                    <option value="+57">🇨🇴 +57</option>
                                    <option value="+1">🇺🇸 +1</option>
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`flex-1 p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent ${
                                        errors.phone ? 'border-red-500 focus:border-red-500' : ''
                                    }`}
                                    placeholder={formData.countryCode === '+57' ? '300 123 4567' : '555 123 4567'}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <div>
                                <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Asistencia*</label>
                                <select
                                    name="attending"
                                    value={formData.attending}
                                    onChange={handleChange}
                                    className={`w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none bg-transparent ${
                                        errors.attending ? 'border-red-500 focus:border-red-500' : ''
                                    }`}
                                >
                                    <option value="yes">Sí, ahí estaré para celebrar su amor.</option>
                                    <option value="no">No, los llevaré en el corazón ese día.</option>
                                </select>
                                {errors.attending && <p className="text-red-500 text-sm mt-1">{errors.attending}</p>}
                            </div>


                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-dusty-olive text-white py-4 uppercase tracking-[0.2em] hover:bg-dry-sage transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Enviando...
                                </>
                            ) : 'Confirmar Asistencia'}
                        </button>
                    </form>
                )}
            </div>
        </SectionWrapper>
        </div>
    );
};

export default Rsvp;
