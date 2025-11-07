import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RoomShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Each room is a separate entity
  const rooms = [
    {
      id: 1,
      title: "The Classic sunroom",
      image: "/slider1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "The Tree-House Resort",
      image: "/slider2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "The Amazing Nature",
      image: "/slider3.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "The Mountain View Suite",
      image: "/slider4.jpg",
      link: "#",
    },
  ];

  // Get 3 rooms to display: left, center (main), right
  const getVisibleRooms = () => {
    const leftIndex = (currentIndex - 1 + rooms.length) % rooms.length;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % rooms.length;
    
    return [
      { ...rooms[leftIndex], position: 'left' },
      { ...rooms[centerIndex], position: 'center' },
      { ...rooms[rightIndex], position: 'right' },
    ];
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % rooms.length);
    }, 4000);

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

  const visibleRooms = getVisibleRooms();
  const centerRoom = visibleRooms[1];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-16 md:py-20 bg-[#f5f3ed]">
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

        {/* Images Grid with Navigation Arrows */}
        <div className="relative flex items-center justify-center mb-10">
          {/* Left Arrow */}
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/80 hover:bg-white shadow-lg transition-all duration-300"
            aria-label="Previous room"
          >
            <FiChevronLeft className="text-xl md:text-2xl text-gray-800" />
          </motion.button>

          {/* Carousel Container with Overflow Hidden */}
          <div className="relative w-full max-w-6xl mx-12 md:mx-16 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="flex items-center justify-center gap-3 md:gap-4"
              >
                {/* Left Room - Narrow & Vertically Centered */}
                <a
                  href={visibleRooms[0].link}
                  className="relative w-[15%] md:w-[18%] h-[250px] md:h-[350px] overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  <img
                    src={visibleRooms[0].image}
                    alt={visibleRooms[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                </a>

                {/* Center Room - Main Focus */}
                <a
                  href={visibleRooms[1].link}
                  className="relative w-[50%] md:w-[46%] h-[320px] md:h-[450px] overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  <img
                    src={visibleRooms[1].image}
                    alt={visibleRooms[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </a>

                {/* Right Room - Narrow & Vertically Centered */}
                <a
                  href={visibleRooms[2].link}
                  className="relative w-[15%] md:w-[18%] h-[250px] md:h-[350px] overflow-hidden group cursor-pointer flex-shrink-0"
                >
                  <img
                    src={visibleRooms[2].image}
                    alt={visibleRooms[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/80 hover:bg-white shadow-lg transition-all duration-300"
            aria-label="Next room"
          >
            <FiChevronRight className="text-xl md:text-2xl text-gray-800" />
          </motion.button>
        </div>

        {/* Center Room Title - Clickable */}
        <motion.div
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <a
            href={centerRoom.link}
            className="inline-block group"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
              {centerRoom.title}
            </h3>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomShowcase;