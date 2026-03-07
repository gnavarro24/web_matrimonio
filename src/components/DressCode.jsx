import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const DressCode = () => {
    const colors = [
        { name: 'Dusty Olive', hex: '#697857' },
        { name: 'Dry Sage', hex: '#a7ad89' },
    ];

    return (
        <SectionWrapper className="bg-cream text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl mb-6 text-black">Código de Vestimenta</h2>
                <p className="text-xl font-serif text-dusty-olive mb-8 italic">Etiqueta Rigurosa / Formal</p>

                <p className="mb-12 text-black/80">
                    Queremos que te sientas elegante y cómodo.
                    Sugerimos vestidos largos para ellas y traje oscuro para ellos.
                </p>

                <div className="mb-12">
                    <h3 className="uppercase tracking-widest text-sm mb-6 font-bold">Paleta Sugerida</h3>
                    <div className="flex justify-center gap-6">
                        {colors.map((color) => (
                            <motion.div
                                key={color.name}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div
                                    className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-xs">{color.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 border border-dry-sage inline-block">
                    <h3 className="font-serif text-xl mb-4">Nota Importante</h3>
                    <p className="text-sm text-gray-500">
                        Reservado el color blanco exclusivamente para la novia.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default DressCode;
