import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RoomShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Each room has 3 images: [left, center, right]
  const rooms = [
    {
      id: 1,
      title: "The Classic sunroom",
      images: [
        "/Classic_Sunroom_1.jpg",
        "/Classic_Sunroom_2.jpg",
        "/Classic_Sunroom_3.jpg",
      ],
      link: "#",
    },
    {
      id: 2,
      title: "Forest Bathtub Suite",
      images: [
        "/Forest_Bathtub_01.jpg",
        "/Forest_Bathtub_02.jpg",
        "/Forest_Bathtub_03.jpg",
      ],
      link: "#",
    },
    {
      id: 3,
      title: "Forest Private Pool",
      images: [
        "/Forest_Private_Pool_1.jpg",
        "/Forest_Private_Pool_2.jpg",
        "/Forest_Private_Pool_3.jpg",
      ],
      link: "#",
    },
    {
      id: 4,
      title: "Luxury Sunroom Arboreal",
      images: [
        "/Luxury_Sunroom_Arboreal_01.jpg",
        "/Luxury_Sunroom_Arboreal_02.jpg",
        "/Luxury_Sunroom_Arboreal_03.jpg",
      ],
      link: "#",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % rooms.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [rooms.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % rooms.length);
  };

  const currentRoom = rooms[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-16 md:py-20 bg-[#f5f3ed] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-gray-600 text-lg md:text-xl mb-3"
          >
            Accommodations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 font-normal"
          >
            Raising Comfort To The Highest Level
          </motion.h2>
        </div>

        {/* Room Carousel - Full Row Slides */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
            aria-label="Previous room"
          >
            <FiChevronLeft className="text-xl md:text-2xl text-gray-800" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
            aria-label="Next room"
          >
            <FiChevronRight className="text-xl md:text-2xl text-gray-800" />
          </motion.button>

          {/* Carousel Container */}
          <div className="relative w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 35 },
                  opacity: { duration: 0.3 },
                }}
                className="flex items-center justify-center gap-2 md:gap-4 px-12 md:px-20"
              >
                {/* Left Image - Narrow */}
                <a
                  href={currentRoom.link}
                  className="relative w-[20%] md:w-[22%] h-[280px] md:h-[380px] overflow-hidden group cursor-pointer flex-shrink-0 rounded-sm"
                >
                  <img
                    src={currentRoom.images[0]}
                    alt={`${currentRoom.title} - View 1`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/20 transition-all duration-500" />
                </a>

                {/* Center Image - Large */}
                <a
                  href={currentRoom.link}
                  className="relative w-[50%] md:w-[48%] h-[350px] md:h-[480px] overflow-hidden group cursor-pointer flex-shrink-0 rounded-sm shadow-xl"
                >
                  <img
                    src={currentRoom.images[1]}
                    alt={`${currentRoom.title} - Main View`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:to-transparent transition-all duration-500" />
                </a>

                {/* Right Image - Narrow */}
                <a
                  href={currentRoom.link}
                  className="relative w-[20%] md:w-[22%] h-[280px] md:h-[380px] overflow-hidden group cursor-pointer flex-shrink-0 rounded-sm"
                >
                  <img
                    src={currentRoom.images[2]}
                    alt={`${currentRoom.title} - View 2`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 group-hover:from-black/5 group-hover:to-black/20 transition-all duration-500" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Room Title Below Images */}
          <motion.div
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mt-6 md:mt-8"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900">
              {currentRoom.title}
            </h3>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-gray-800"
                  : "w-2 bg-gray-400 hover:bg-gray-600"
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
