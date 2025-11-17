import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const images = [
    
    { src: '/slider5.webp', alt: 'Resort view 5' },
    { src: '/slider6.webp', alt: 'Resort view 6' },
    { src: '/slider7.webp', alt: 'Resort view 7' },
    { src: '/slider8.webp', alt: 'Resort view 8' },
    { src: '/slider9.webp', alt: 'Resort view 9' },
    { src: '/slider10.webp', alt: 'Resort view 10' },
    { src: '/slider11.webp', alt: 'Resort view 11' },
    { src: '/slider12.webp', alt: 'Resort view 12' },
    { src: '/slider13.webp', alt: 'Resort view 13' },
    { src: '/slider14.webp', alt: 'Resort view 14' },
    { src: '/slider15.webp', alt: 'Resort view 15' },
    { src: '/slider16.webp', alt: 'Resort view 16' },
    { src: '/slider17.webp', alt: 'Resort view 17' },
    { src: '/slider18.webp', alt: 'Resort view 18' },
    { src: '/slider19.webp', alt: 'Resort view 19' },
    { src: '/slider20.webp', alt: 'Resort view 20' },
    { src: '/slider21.webp', alt: 'Resort view 21' },
    { src: '/slider22.webp', alt: 'Resort view 22' },
    { src: '/slider23.webp', alt: 'Resort view 23' },
    { src: '/slider24.webp', alt: 'Resort view 24' },
    { src: '/slider25.webp', alt: 'Resort view 25' },
    { src: '/slider26.webp', alt: 'Resort view 26' },
    

  ];

  // Calculate dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setTotalWidth(containerRef.current.scrollWidth);
        setViewportWidth(window.innerWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Recalculate after images load
    const timer = setTimeout(updateDimensions, 500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Auto-scroll with pause-drag effect
  useEffect(() => {
    if (totalWidth === 0 || viewportWidth === 0) return;

    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        const maxScroll = totalWidth - viewportWidth;
        const scrollAmount = 400; // Move by 400px each time
        const nextPosition = prev + scrollAmount;
        
        // Only loop back when we've actually reached the end
        if (nextPosition >= maxScroll) {
          return 0; // Loop back to start
        }
        return nextPosition;
      });
    }, 3000); // 3 second pause

    return () => clearInterval(interval);
  }, [totalWidth, viewportWidth]);

  const handlePrevious = () => {
    setCurrentPosition(prev => Math.max(0, prev - 400));
  };

  const handleNext = () => {
    const maxScroll = totalWidth - viewportWidth;
    setCurrentPosition(prev => {
      const nextPos = prev + 400;
      return nextPos >= maxScroll ? maxScroll : nextPos;
    });
  };

  return (
    <div className="relative w-full bg-[#f5f3ed] py-16">
      {/* Text Content */}
      <div className="max-w-4xl text-gray-700 mx-auto px-8 mb-12 text-center">
        <h4>LONAVALA</h4>
        <h2 className="text-2xl text-gray-700 mb-4">The Arboreal Resort</h2>
        <p className="text-gray-700 leading-relaxed">
          Nestled within the pristine Amanoi National Park and UNESCO Biosphere Reserve, Amanoi is a natural paradise overlooking Vinh Hy Bay. From its secluded location - a rich and diverse mosaic of ecosystems – the resort's clifftop restaurants and pool, lakeside Aman Spa and private golden sand beach, offer limitless opportunities for outdoor exploration, cultural immersion and serene time out.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next images"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Images Wrapper */}
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-8 px-8 transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentPosition}px)`
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-[500px] w-auto object-cover rounded-lg shadow-xl"
                  onLoad={() => {
                    // Recalculate dimensions when images load
                    if (containerRef.current) {
                      setTotalWidth(containerRef.current.scrollWidth);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(images.length / 2) }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentPosition / 400) === index
                ? 'w-8 bg-gray-800'
                : 'w-2 bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;