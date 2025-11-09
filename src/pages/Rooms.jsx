import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import roomsData from "../Data/roomsdata.json";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { BiExpand } from "react-icons/bi";

const Rooms = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [originalRoomTab, setOriginalRoomTab] = useState(null); // Track the room from Availability

  // Get data passed from Availability page
  const { room: backendRoom, searchData } = location.state || {};

  const rooms = roomsData.ResortRooms;

  // Parse image arrays properly (handle comma-separated strings)
  const parseImages = (imageData) => {
    if (Array.isArray(imageData)) {
      return imageData.flatMap((img) =>
        typeof img === "string" ? img.split(",").map((i) => i.trim()) : img
      );
    }
    return [];
  };

  const currentRoom = rooms[activeTab];
  const images = parseImages(currentRoom.image);

  // Map backend room name to static room tab
  useEffect(() => {
    if (backendRoom && backendRoom.Room_Name) {
      const roomName = backendRoom.Room_Name.toLowerCase();
      const tabIndex = rooms.findIndex((r) =>
        roomName.includes(r.name.toLowerCase().replace(" room", ""))
      );
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
        setOriginalRoomTab(tabIndex); // Save the original room tab index
      }
    }
  }, [backendRoom]);

  // Reset image index when tab changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeTab]);

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Get price based on room type - use backend data if available
  const getRoomPrice = () => {
    if (backendRoom && backendRoom.room_rates_info) {
      return `${
        backendRoom.currency_sign
      }${backendRoom.room_rates_info.avg_per_night_after_discount?.toLocaleString()}`;
    }
    // Fallback to static prices
    const roomName = currentRoom.name;
    if (roomName.includes("Luxury")) return "$35,4400";
    if (roomName.includes("Classic")) return "$544,850/-";
    if (roomName.includes("Forest Bathtub")) return "$35,4400";
    if (roomName.includes("Forest Private Pool")) return "$35,4400";
    return "$544,950/-";
  };

  // Handle booking - redirect to booking page with backend data
  const handleBookNow = () => {
    // Check if current tab is the original room from Availability
    const isOriginalRoom =
      originalRoomTab !== null && activeTab === originalRoomTab;

    if (backendRoom && searchData && isOriginalRoom) {
      // User is on the correct room tab - book it
      navigate("/booking/calendar", {
        state: {
          room: backendRoom,
          searchData: searchData,
        },
      });
    } else if (backendRoom && searchData) {
      // User is exploring other rooms but came from Availability - go back to Availability
      navigate("/availability", {
        state: {
          searchData: searchData,
        },
      });
    } else {
      // User came directly - redirect to home to search first
      navigate("/", {
        state: {
          suggestedRoom: currentRoom.name, // Suggest this room in search
        },
      });
    }
  };

  // Check if current tab is the available room from backend
  const isCurrentRoomAvailable = () => {
    return originalRoomTab !== null && activeTab === originalRoomTab;
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] pt-16 sm:pt-18 md:pt-20">
      {/* Header Section */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          {/* Back button if came from Availability */}
          {backendRoom && searchData && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-xs sm:text-sm">Back to Available Rooms</span>
            </button>
          )}
          <p className="text-center text-xs sm:text-sm text-gray-600 mb-1 italic">
            The Arboreal Resort
          </p>
          <h1 className="text-center text-sm sm:text-base md:text-lg text-gray-800 mb-2 sm:mb-4 px-2">
            {searchData
              ? `${searchData.checkIn} | ${searchData.checkOut}`
              : "Experience Luxury and Nature Combined"}
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Room Type Tabs */}
        <div className="flex justify-start sm:justify-center gap-0 mb-4 sm:mb-6 md:mb-8 overflow-x-auto scrollbar-hide pb-2">
          {rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-4 rounded-full flex-shrink-0
                ${
                  activeTab === index
                    ? "border-gray-800 text-gray-900 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              {room.name}
              {/* Green dot indicator for available room */}
              {originalRoomTab === index && (
                <span className="absolute top-0.5 sm:top-1 -right-0.5 sm:-right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Room Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className=""
          >
            {/* Availability Notice Banner */}
            {backendRoom && !isCurrentRoomAvailable() && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 sm:mb-4 bg-gray-50 border-l-4 border-gray-500 p-3 sm:p-4 rounded-r-lg"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      Exploring other rooms
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      This room's availability hasn't been checked yet. Click
                      "Check Availability" to see current pricing and book.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Large Hero Image with Navigation */}
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={`/${images[currentImageIndex]}`}
                  alt={`${currentRoom.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevImage}
                className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Image Progress Indicators */}
            <div className="flex justify-center gap-1.5 sm:gap-2 py-3 sm:py-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 transition-all duration-300 rounded-md ${
                    currentImageIndex === index
                      ? "w-[80px] sm:w-[120px] md:w-[150px] bg-gray-800"
                      : "w-[50px] sm:w-[80px] md:w-[100px] bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Room Title */}
            <div className="text-center py-4 sm:py-5 md:py-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 px-4">
                The {currentRoom.name.toLowerCase()}
              </h2>
            </div>

            {/* Room Description */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8 text-center border-b border-gray-200">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {currentRoom.description}
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg">
              {/* Room Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8 border-b border-gray-200">
                {/* Adults */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <BsPersonFill className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Adults:</p>
                    <p className="text-sm font-medium text-gray-900">2</p>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <BsPerson className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Children:</p>
                    <p className="text-sm font-medium text-gray-900">1</p>
                  </div>
                </div>

                {/* Bed Type */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <IoBedOutline className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Bed Type:</p>
                    <p className="text-sm font-medium text-gray-900">
                      Double Bed
                    </p>
                  </div>
                </div>

                {/* Size */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <BiExpand className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Size:</p>
                    <p className="text-sm font-medium text-gray-900">
                      {currentRoom.details.area.split("(")[0].trim()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8 border-b border-gray-200">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                  Amenities:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {currentRoom.room_exclusive_features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                  {currentRoom.all_stays_include.map((item, index) => (
                    <div
                      key={`stay-${index}`}
                      className="flex items-start gap-2"
                    >
                      <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                  {currentRoom.bath_and_wellness &&
                    currentRoom.bath_and_wellness.map((item, index) => (
                      <div
                        key={`bath-${index}`}
                        className="flex items-start gap-2"
                      >
                        <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Pricing and Book Now Section */}
              <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="text-center md:text-left">
                    {/* Only show pricing if it's the available room from backend */}
                    {isCurrentRoomAvailable() &&
                      backendRoom &&
                      backendRoom.room_rates_info && (
                        <>
                          <p className="text-xs text-gray-600 mb-1">
                            {searchData ? "Per night" : "Total at"}
                          </p>
                          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                            {getRoomPrice()}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            (including taxes & fees)
                          </p>
                        </>
                      )}
                    {/* Message for rooms being explored */}
                    {!isCurrentRoomAvailable() && backendRoom && (
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        Check availability for current pricing
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleBookNow}
                    className={`w-full md:w-auto px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 transition-all duration-300 text-xs sm:text-sm font-medium rounded-full ${
                      isCurrentRoomAvailable()
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-600 text-white hover:bg-gray-700"
                    }`}
                  >
                    {isCurrentRoomAvailable()
                      ? "Book This Room"
                      : "Check Availability"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Add Another Room Button */}
        <div className="mt-6 sm:mt-8 text-center sm:text-right px-2">
          <button className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline transition-colors duration-300">
            Add Another Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
