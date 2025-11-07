import React from "react";
import { motion } from "framer-motion";
import roomsData from "../Data/roomsdata.json";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import { 
  FiUsers, 
  FiMaximize, 
  FiWifi, 
  FiCoffee, 
  FiSun,
  FiDroplet,
  FiGrid,
  FiAirplay
} from "react-icons/fi";

const Rooms = () => {
  const rooms = roomsData.ResortRooms;

  // Icon mapping for amenities
  const getAmenityIcon = (amenity) => {
    const icons = {
      "Wi-Fi": <FiWifi />,
      "Coffee": <FiCoffee />,
      "AC": <FiSun />,
      "Bath": <FiDroplet />,
      "Balcony": <FiGrid />,
      "TV": <FiAirplay />
    };
    return icons[amenity] || <FiGrid />;
  };

  // Enhanced room data with additional details from image
  const enhancedRooms = rooms.map((room, index) => {
    const enhancements = [
      {
        adults: 2,
        children: 1,
        size: "54 m²",
        bedType: "Double Bed",
        amenities: ["Wi-Fi", "Coffee", "AC", "Bath", "Balcony", "TV"]
      },
      {
        adults: 2,
        children: 1,
        size: "55 m²",
        bedType: "Double Bed",
        amenities: ["Wi-Fi", "Coffee", "AC", "Bath", "Balcony", "TV"]
      },
      {
        adults: 2,
        children: 1,
        size: "35 m²",
        bedType: "Double Bed",
        amenities: ["Wi-Fi", "Coffee", "AC", "Bath", "Balcony", "TV"]
      },
      {
        adults: 2,
        children: 1,
        size: "35 m²",
        bedType: "Double Bed",
        amenities: ["Wi-Fi", "Coffee", "AC", "Bath", "Balcony", "TV"]
      }
    ];

    return {
      ...room,
      ...enhancements[index]
    };
  });

  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      {/* Hero Section */}
      <Hero />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 md:py-16 px-6"
      >
        <p className="font-serif italic text-gray-600 text-base md:text-lg mb-2">
          Accommodations
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 font-normal">
          Raising Comfort To The Highest Level
        </h1>
      </motion.div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {enhancedRooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white shadow-lg overflow-hidden group"
            >
              {/* Room Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </div>

              {/* Room Details */}
              <div className="p-5 md:p-6">
                {/* Room Category & Name */}
                <div className="mb-3">
                  <p className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                    FOREST · BATHTUB
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                </div>

                {/* Room Specifications */}
                <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200 mb-3">
                  {/* Adults */}
                  <div className="flex items-center gap-1.5">
                    <FiUsers className="text-gray-700 text-base" />
                    <span className="text-xs md:text-sm text-gray-700">
                      <strong>Adults:</strong> {room.adults}
                    </span>
                  </div>

                  {/* Children */}
                  <div className="flex items-center gap-1.5">
                    <FiUsers className="text-gray-700 text-base" />
                    <span className="text-xs md:text-sm text-gray-700">
                      <strong>Children:</strong> {room.children}
                    </span>
                  </div>

                  {/* Size */}
                  <div className="flex items-center gap-1.5">
                    <FiMaximize className="text-gray-700 text-base" />
                    <span className="text-xs md:text-sm text-gray-700">
                      <strong>Size:</strong> {room.size}
                    </span>
                  </div>

                  {/* Bed Type */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs md:text-sm text-gray-700">
                      <strong>Bed Type:</strong> {room.bedType}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-xs tracking-[0.15em] text-gray-600 uppercase mb-2">
                    Amenities:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm"
                        title={amenity}
                      >
                        {getAmenityIcon(amenity)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details Button */}
                <a
                  href="#"
                  className="inline-block text-xs tracking-[0.15em] text-gray-900 font-light uppercase border-b border-gray-900 hover:text-gray-600 hover:border-gray-600 transition-all duration-300 pb-0.5"
                >
                  View Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Rooms;
