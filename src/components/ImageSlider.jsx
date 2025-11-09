import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/slider1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg",
    "/slider5.jpg",
    "/slider6.jpg",
    "/slider7.jpg",
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  // Get visible images (3 images on mobile: center + 1 on each side, 5 on desktop: center + 2 on each side)
  const getVisibleImages = () => {
    const visible = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const range = isMobile ? 1 : 2; // Show 3 images on mobile, 5 on desktop
    
    for (let i = -range; i <= range; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visible.push({
        src: images[index],
        position: i,
        index: index,
      });
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  return (
    <section className="relative min-h-screen bg-stone-100 overflow-hidden py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-3 sm:mb-4">
            Lonavala
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-4 sm:mb-5 md:mb-6 tracking-tight px-4">
            The Arboreal Resort.
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4">
            A perfect getaway destination in Lonavala for you and your loved
            ones. Be one with nature and live your best life with us at the
            Arboreal Resort in Lonavala. A beautiful tree house surrounded by
            the vast and deep forest, along with the flowing serenity of
            waterfalls, birds chirping and nature's sounds that gives a perfect
            experience of a rainforest resort. A Morning at our resort is what
            anyone should experience with a view from the balcony such as none
            other, birds chirping, blowing wind, waving trees, that gives you an
            amazing experience you should ever have.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[500px] flex items-center justify-center mt-12 sm:mt-16 md:mt-20">
          <div className="relative w-full h-full">
            {visibleImages.map((image) => {
              const position = image.position;
              const isCentered = position === 0;

              // Calculate positioning and styling
              const getTransform = () => {
                if (position === 0) return "translate(-50%, -50%)";
                if (position === -2) return "translate(-50%, -50%)";
                if (position === -1) return "translate(-50%, -50%)";
                if (position === 1) return "translate(-50%, -50%)";
                if (position === 2) return "translate(-50%, -50%)";
              };

              const getLeft = () => {
                // Mobile positioning (3 images)
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  if (position === 0) return "50%"; // Center
                  if (position === -1) return "15%"; // Left
                  if (position === 1) return "85%"; // Right
                }
                // Desktop positioning (5 images)
                if (position === 0) return "50%"; // Center
                if (position === -2) return "8%"; // Far left
                if (position === -1) return "25%"; // Left
                if (position === 1) return "75%"; // Right
                if (position === 2) return "92%"; // Far right
              };

              const getScale = () => {
                // Mobile scaling
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  if (position === 0) return "scale(1.1)";
                  return "scale(0.65)";
                }
                // Desktop scaling
                if (position === 0) return "scale(1.15)";
                if (position === -1 || position === 1) return "scale(0.75)";
                return "scale(0.55)";
              };

              const getOpacity = () => {
                if (position === 0) return 1;
                if (position === -1 || position === 1) return 1;
                return 1;
              };

              const getZIndex = () => {
                return 10 - Math.abs(position);
              };

              const getTop = () => {
                if (position === 0) return "45%"; // Center elevated
                return "50%"; // Others at middle
              };

              const getSize = () => {
                // Mobile sizes
                if (typeof window !== 'undefined' && window.innerWidth < 640) {
                  return { width: "200px", height: "260px" };
                }
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  return { width: "220px", height: "280px" };
                }
                // Desktop size
                return { width: "280px", height: "360px" };
              };

              return (
                <div
                  key={`${image.index}-${position}`}
                  className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                  style={{
                    left: getLeft(),
                    top: getTop(),
                    transform: `${getTransform()} ${getScale()}`,
                    opacity: getOpacity(),
                    zIndex: getZIndex(),
                    ...getSize(),
                  }}
                  onClick={() => {
                    if (position !== 0) {
                      setCurrentIndex(image.index);
                    }
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${
                      isCentered ? "shadow-2xl" : "shadow-md"
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={`Resort view ${image.index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle overlay on non-center images
                    {!isCentered && (
                      <div className="absolu" />
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-8 sm:mt-10 md:mt-12">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="transition-all duration-300 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-gray-700"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-4 sm:mt-5 md:mt-6">
          <p className="text-gray-400 font-light text-xs tracking-widest">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
