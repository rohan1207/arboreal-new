import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RoomShowcase = () => {
  const [centerCardIndex, setCenterCardIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState([0, 0, 0, 0]);
  
 const rooms = [
  {
    id: 1,
    title: "The Classic Sunroom",
    images: [
      "/Classic_Sunroom_1.jpg",
      "/Classic_Sunroom_2.jpg",
      "/Classic_Sunroom_3.jpg",
    ],
  },
  {
    id: 2,
    title: "Forest Bathtub Room",
    images: [
      "/Forest_Bathtub_01.jpg",
      "/Forest_Bathtub_02.jpg",
      "/Forest_Bathtub_03.jpg",
    ],
  },
  {
    id: 3,
    title: "Forest Private Pool Room",
    images: [
      "/Forest_Private_Pool_1.jpg",
      "/Forest_Private_Pool_2.jpg",
      "/Forest_Private_Pool_3.jpg",
    ],
  },
  {
    id: 4,
    title: "Luxury Sunroom",
    images: [
      "/Luxury_Sunroom_Arboreal_01.jpg",
      "/Luxury_Sunroom_Arboreal_02.jpg",
      "/Luxury_Sunroom_Arboreal_03.jpg",
    ],
  },
];


  // Auto-cycle through images for center card
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndices(prev => {
        const newIndices = [...prev];
        const currentImageIndex = newIndices[centerCardIndex];
        
        // If we've shown all 3 images for the center card
        if (currentImageIndex >= 2) {
          // Reset this card's image index
          newIndices[centerCardIndex] = 0;
          // Move to next card
          setCenterCardIndex((centerCardIndex + 1) % rooms.length);
        } else {
          // Just advance to next image for current card
          newIndices[centerCardIndex] = currentImageIndex + 1;
        }
        
        return newIndices;
      });
    }, 3000); // 3 seconds per image

    return () => clearInterval(timer);
  }, [centerCardIndex, rooms.length]);

  const getVisibleCards = () => {
    const leftIndex = (centerCardIndex - 1 + rooms.length) % rooms.length;
    const rightIndex = (centerCardIndex + 1) % rooms.length;
    
    return [
      { room: rooms[leftIndex], position: 'left', index: leftIndex },
      { room: rooms[centerCardIndex], position: 'center', index: centerCardIndex },
      { room: rooms[rightIndex], position: 'right', index: rightIndex },
    ];
  };

  const goToPrevious = () => {
    setCenterCardIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToNext = () => {
    setCenterCardIndex((prev) => (prev + 1) % rooms.length);
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 bg-[#f5f3ed] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-gray-600 text-base sm:text-lg md:text-xl mb-2 sm:mb-3"
          >
            Accommodations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-md sm:text-lg md:text-xl lg:text-3xl font-serif text-gray-900 font-normal"
          >
            Raising Comfort To The Highest Level
          </motion.h2>
        </div>

        {/* Room Carousel - 3 Cards Always Visible */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
            aria-label="Previous room"
          >
            <FiChevronLeft className="text-lg sm:text-xl md:text-2xl text-gray-800" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
            aria-label="Next room"
          >
            <FiChevronRight className="text-lg sm:text-xl md:text-2xl text-gray-800" />
          </motion.button>

          {/* Three Cards Container */}
          <div className="relative w-full overflow-hidden px-8 sm:px-10 md:px-12 lg:px-20">
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              {visibleCards.map(({ room, position, index }) => {
                const isCenter = position === 'center';
                const currentImageIndex = imageIndices[index];
                
                return (
                  <motion.div
                    key={`${room.id}-${position}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative overflow-hidden group cursor-pointer rounded-sm ${
                      isCenter 
                        ? 'w-[45%] sm:w-[48%] md:w-[60%] h-[280px] sm:h-[340px] md:h-[480px] shadow-xl' 
                        : 'w-[22%] sm:w-[20%] md:w-[18%] h-[220px] sm:h-[270px] md:h-[340px]'
                    }`}
                  >
                    <a href={room.link} className="block w-full h-full">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${room.id}-${currentImageIndex}`}
                          src={room.images[currentImageIndex]}
                          alt={`${room.title} - View ${currentImageIndex + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </AnimatePresence>
                      <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-500 ${
                        isCenter 
                          ? 'from-transparent to-black/10 group-hover:to-transparent'
                          : 'from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/20'
                      }`} />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Room Title Below Center Card */}
          <motion.div
            key={`title-${centerCardIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mt-4 sm:mt-5 md:mt-6 lg:mt-8 px-4"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-900">
              {rooms[centerCardIndex].title}
            </h3>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6 sm:mt-7 md:mt-8">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCenterCardIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === centerCardIndex
                  ? "w-6 sm:w-8 bg-gray-800"
                  : "w-1.5 sm:w-2 bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to room ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomShowcase;