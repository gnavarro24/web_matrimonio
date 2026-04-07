import SectionWrapper from './SectionWrapper';
import ImageCarousel from './ImageCarousel';
import { motion } from 'framer-motion';

import postCardSaveTheDateGusGera from '../assets/decor/postcard_save_the_date_gus_gera.jpg';
import saveTheDatePostCard from '../assets/decor/save_the_date_postcard.jpg';
import stratCoin from '../assets/decor/strat_coin.jpg';
import gallery1 from '../assets/decor/gallery_1.png';
import gallery2 from '../assets/decor/gallery_2.png';
import gallery3 from '../assets/decor/gallery_3.png';
import gallery4 from '../assets/decor/gallery_4.jpg';
import gallery5 from '../assets/decor/gallery_5.jpg';
import gallery6 from '../assets/decor/gallery_6.jpg';
import gallery7 from '../assets/decor/gallery_7.jpg';
import gallery8 from '../assets/decor/gallery_8.jpg';
import gallery9 from '../assets/decor/gallery_9.jpg';
import gallery10 from '../assets/decor/gallery_10.jpg';
import gallery11 from '../assets/decor/gallery_11.jpg';
import gallery12 from '../assets/decor/gallery_12.jpg';
import gallery13 from '../assets/decor/gallery_13.jpg';
import gallery14 from '../assets/decor/gallery_14.jpg';
import gallery15 from '../assets/decor/gallery_15.jpg';
import gallery16 from '../assets/decor/gallery_16.jpg';
import gallery17 from '../assets/decor/gallery_17.jpg';
import gallery18 from '../assets/decor/gallery_18.jpg';
import gallery19 from '../assets/decor/gallery_19.jpg';
import gallery20 from '../assets/decor/gallery_20.jpg';
import gallery21 from '../assets/decor/gallery_21.jpg';
import gallery22 from '../assets/decor/gallery_22.jpg';

const Gallery = () => {
    const images = [
        {
            src: postCardSaveTheDateGusGera
        },
        {
            src: saveTheDatePostCard,
        },
        {
            src: stratCoin
        },
        {
            src: gallery1
        },
        {
            src: gallery2
        },
        {
            src: gallery3
        },
        { src: gallery4 },
        { src: gallery5 },
        { src: gallery6 },
        { src: gallery7 },
        { src: gallery8 },
        { src: gallery9 },
        { src: gallery10 },
        { src: gallery11 },
        { src: gallery12 },
        { src: gallery13 },
        { src: gallery14 },
        { src: gallery15 },
        { src: gallery16 },
        { src: gallery17 },
        { src: gallery18 },
        { src: gallery19 },
        { src: gallery20 },
        { src: gallery21 },
        { src: gallery22 }
    ];

    return (
        <SectionWrapper id="gallery" className="bg-cream pt-10 pb-5">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-[34px] md:text-6xl font-cormorant text-dusty-olive">
                        No fue un solo momento,
                    </h2>
                    <p className="text-[18px] md:text-xl text-black/70 font-cormorant max-w-2xl mx-auto">
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
                        className=""
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