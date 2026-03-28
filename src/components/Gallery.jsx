import SectionWrapper from './SectionWrapper';
import ImageCarousel from './ImageCarousel';
import { motion } from 'framer-motion';

import saveTheDate from '../assets/decor/Save_the_Date.png';
import fotoWeb from '../assets/decor/foto_web.jpg';
import fondoMedellin from '../assets/decor/fondoMedellin.jpeg';

const Gallery = () => {
    const images = [
        {
            src: saveTheDate,
            alt: 'Save the Date - Los Navelas'
        },
        {
            src: fotoWeb,
            alt: 'Foto de la pareja'
        },
        {
            src: fondoMedellin,
            alt: 'Medellín, Colombia'
        }
    ];

    return (
        <SectionWrapper id="gallery" className="bg-porcelain py-16">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-cormorant text-dusty-olive mb-6">
                        No fue un solo momento,
                    </h2>
                    <p className="text-lg md:text-xl text-black/70 font-cormorant max-w-2xl mx-auto">
                        fueron muchos…
                        los que nos trajeron hasta aquí.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <ImageCarousel
                        images={images}
                        autoPlay={true}
                        autoPlayInterval={5000}
                        showControls={true}
                        showIndicators={true}
                        className="min-h-[300px] max-h-[500px] md:min-h-[400px] md:max-h-[600px] lg:min-h-[500px] lg:max-h-[700px]"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-12"
                >
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default Gallery;