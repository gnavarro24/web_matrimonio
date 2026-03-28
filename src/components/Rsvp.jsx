import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await fetch('https://script.google.com/macros/s/AKfycby1SQDyP0GFVd0E--QMxjmqH0c_uu8mu_MOvDQtGF_BRsXMS1hzGSc-sXjzHgT6aDEG/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.countryCode + ' ' + formData.phone,
                    attending: formData.attending
                })
            });
            setStatus('success');
            setFormData({ name: '', email: '', countryCode: '+57', phone: '', attending: 'yes', guests: '1', message: '' });
        } catch {
            setStatus('idle');
            alert('Hubo un error al enviar. Por favor intenta de nuevo.');
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <SectionWrapper id="rsvp" className="bg-cream">
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
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent"
                                placeholder="juan@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Teléfono</label>
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
                                    className="flex-1 p-3 border-b border-gray-300 focus:border-dusty-olive outline-none transition-colors bg-transparent"
                                    placeholder="300 123 4567"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm uppercase tracking-wider mb-2 text-gray-500">Asistencia</label>
                                <select
                                    name="attending"
                                    value={formData.attending}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b border-gray-300 focus:border-dusty-olive outline-none bg-transparent"
                                >
                                    <option value="yes">Sí, asistiré</option>
                                    <option value="no">No podré asistir</option>
                                </select>
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
    );
};

export default Rsvp;
