import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({
    images = [],
    autoPlay = true,
    autoPlayInterval = 4000,
    showControls = true,
    showIndicators = true,
    className = ""
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const intervalRef = useRef(null);

    const minSwipeDistance = 50;

    useEffect(() => {
        if (isPlaying && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, autoPlayInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, autoPlayInterval, images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    };

    const handleMouseEnter = () => {
        if (autoPlay) setIsPlaying(false);
    };

    const handleMouseLeave = () => {
        if (autoPlay) setIsPlaying(true);
    };

    if (!images || images.length === 0) {
        return (
            <div className={`relative w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
                <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
        );
    }

    return (
        <div
            className={`relative w-full overflow-hidden rounded-lg shadow-lg group ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt || `Imagen ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                    />
                </AnimatePresence>

                {showControls && images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-40 z-10"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-40 z-10"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {showIndicators && images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-white scale-125'
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;