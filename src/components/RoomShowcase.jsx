import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RoomShowcase = () => {
  const [centerCardIndex, setCenterCardIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState([0, 0, 0, 0]);
  const [prevImageIndices, setPrevImageIndices] = useState([0, 0, 0, 0]);

  const rooms = [
    {
      id: 1,
      title: "The Classic Sunroom",
      slug: "classic-sunroom",
      images: ["/Classic_Sunroom_1.jpg"],
    },
    {
      id: 2,
      title: "Forest Bathtub Room",
      slug: "forest-bathtub-room",
      images: ["/Forest_Bathtub_07.jpg"],
    },
    {
      id: 3,
      title: "Forest Private Pool Room",
      slug: "forest-private-pool-room",
      images: ["/Forest_Private_Pool_2.jpg"],
    },
    {
      id: 4,
      title: "Luxury Sunroom",
      slug: "luxury-sunroom",
      images: ["/Luxury_Sunroom_Arboreal_01.jpg"],
    },
  ];

  const navigate = useNavigate();

  const sanitizeRoomName = (name) => name.toLowerCase().replace(/ /g, "-");
  const slugifyRoomName = (name) => name.toLowerCase().replace(/ /g, "-");

  const handleRoomNameClick = (roomName, roomSlug) => {
    if (!roomName) return;
    const canonical = sanitizeRoomName(roomName);
    navigate("/rooms", {
      state: {
        selectedRoomName: canonical,
        selectedRoomSlug: roomSlug || slugifyRoomName(canonical),
      },
    });
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevImageIndices((prev) => {
        const updated = [...prev];
        updated[centerCardIndex] = imageIndices[centerCardIndex];
        return updated;
      });

      setImageIndices((prev) => {
        const updated = [...prev];
        updated[centerCardIndex] = 0; 
        return updated;
      });

      setCenterCardIndex((i) => (i + 1) % rooms.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [centerCardIndex, rooms.length, imageIndices]);

  const getVisibleCards = () => {
    const leftIndex = (centerCardIndex - 1 + rooms.length) % rooms.length;
    const rightIndex = (centerCardIndex + 1) % rooms.length;

    return [
      { room: rooms[leftIndex], position: "left", index: leftIndex },
      { room: rooms[centerCardIndex], position: "center", index: centerCardIndex },
      { room: rooms[rightIndex], position: "right", index: rightIndex },
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
        <div className="text-center mb-10">
          <p className="font-serif italic text-gray-600 text-lg">
            Accommodations
          </p>
          <h2 className="text-3xl font-serif text-gray-900">
            Raising Comfort To The Highest Level
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <FiChevronLeft className="text-xl sm:text-2xl text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <FiChevronRight className="text-xl sm:text-2xl text-gray-800" />
          </button>

          {/* Cards Wrapper */}
<div className="flex items-center justify-center gap-3 sm:gap-4 px-2 sm:px-20">
  {visibleCards.map(({ room, position, index }) => {
    const isCenter = position === "center";
    const currentImage = room.images[imageIndices[index]];
    const previousImage = room.images[prevImageIndices[index]];

    return (
      <div
        key={room.id + position}
        onClick={() => handleRoomNameClick(room.title, room.slug)}
        className={`
          relative overflow-hidden rounded-sm transition-all duration-500 cursor-pointer

          /* DESKTOP (unchanged) */
          ${isCenter ? "sm:w-[60%] sm:h-[480px]" : "sm:w-[18%] sm:h-[340px]"} 

          /* MOBILE (new logic so that 3 cards fit properly) */
          ${isCenter ? "w-[55%] h-[260px]" : "w-[22%] h-[200px]"}
        `}
      >
        {/* No-flash slide */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={previousImage}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
          <motion.img
            src={currentImage}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 2 }}
          />
        </div>

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b 
            ${isCenter ? "from-transparent to-black/10" : "from-black/10 to-black/20"}
          `}
        />
      </div>
    );
  })}
</div>

          {/* Room Title */}
          <div className="text-center mt-6 cursor-pointer">
            <h3
              className="text-2xl sm:text-3xl font-serif text-gray-900"
              onClick={() =>
                handleRoomNameClick(
                  rooms[centerCardIndex].title,
                  rooms[centerCardIndex].slug
                )
              }
            >
              {rooms[centerCardIndex].title}
            </h3>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {rooms.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterCardIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === centerCardIndex ? "w-6 sm:w-8 bg-gray-800" : "w-2 bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomShowcase;
