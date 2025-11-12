import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
  });
  const [loading, setLoading] = useState(false);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const openDate = (ref) => {
    if (ref?.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
        ref.current.click();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setLoading(true);

    try {
      // Redirect to availability page with search params
      const searchParams = new URLSearchParams({
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        rooms: formData.rooms,
        adults: formData.adults,
        children: formData.children,
        name: formData.name,
      });

      navigate(`/availability?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay - lighter to show more of the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col px-8 md:px-16 lg:px-24 pt-32">
        {/* Text Content - Left Aligned
        <div className="text-white max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-base tracking-wider mb-4 font-light"
          >
            The Arboreal Resort
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight"
          >
            Find You Comfort
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif"
          >
            Rooms
          </motion.h2>
        </div> */}

        {/* Booking Form - Bottom Center */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 max-w-7xl mx-auto w-full px-2 sm:px-4"
        >
          <div className="bg-white backdrop-blur-lg rounded-2xl md:rounded-full shadow-2xl overflow-visible">
            <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Name Field */}
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">
                  <FiUser className="text-[#2a2a2a] text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                    className="w-full text-[#2a2a2a] placeholder-[#2a2a2a]/50 text-sm md:text-base focus:outline-none bg-transparent font-light"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#2a2a2a]/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter Number"
                    className="w-full text-[#2a2a2a] placeholder-[#2a2a2a]/50 text-sm md:text-base focus:outline-none bg-transparent font-light"
                  />
                </div>
              </div>

              {/* Check In */}
              <div
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 md:py-4 min-w-0 cursor-pointer"
                onClick={() => openDate(checkInRef)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0" onClick={() => openDate(checkInRef)}>
                    <FiCalendar className="text-[#2a2a2a]/70 text-lg sm:text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      ref={checkInRef}
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      required
                      placeholder="Check In"
                      className="w-full text-[#2a2a2a] text-sm md:text-base focus:outline-none bg-transparent font-light cursor-pointer placeholder-[#2a2a2a]/50 [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Check Out */}
              <div
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 md:py-4 min-w-0 cursor-pointer"
                onClick={() => openDate(checkOutRef)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0" onClick={() => openDate(checkOutRef)}>
                    <FiCalendar className="text-[#2a2a2a]/70 text-lg sm:text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      ref={checkOutRef}
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      required
                      placeholder="Check Out"
                      className="w-full text-[#2a2a2a] text-sm md:text-base focus:outline-none bg-transparent font-light cursor-pointer placeholder-[#2a2a2a]/50 [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Room Dropdown */}
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 md:py-5 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#2a2a2a]/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="w-full text-[#2a2a2a] text-sm focus:outline-none bg-transparent font-light cursor-pointer appearance-none"
                    >
                      <option value="1" className="bg-[#2a2a2a] text-white">
                        1 Room
                      </option>
                      <option value="2" className="bg-[#2a2a2a] text-white">
                        2 Rooms
                      </option>
                      <option value="3" className="bg-[#2a2a2a] text-white">
                        3 Rooms
                      </option>
                      <option value="4" className="bg-[#2a2a2a] text-white">
                        4 Rooms
                      </option>
                      <option value="5" className="bg-[#2a2a2a] text-white">
                        5+ Rooms
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Adult Dropdown */}
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 md:py-5 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#2a2a2a]/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <select
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      className="w-full text-[#2a2a2a] text-sm focus:outline-none bg-transparent font-light cursor-pointer appearance-none"
                    >
                      <option value="1" className="bg-[#2a2a2a] text-white">
                        1 Adult
                      </option>
                      <option value="2" className="bg-[#2a2a2a] text-white">
                        2 Adults
                      </option>
                      <option value="3" className="bg-[#2a2a2a] text-white">
                        3 Adults
                      </option>
                      <option value="4" className="bg-[#2a2a2a] text-white">
                        4 Adults
                      </option>
                      <option value="5" className="bg-[#2a2a2a] text-white">
                        5+ Adults
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Children Dropdown */}
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 md:py-5 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#2a2a2a]/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <select
                      name="children"
                      value={formData.children}
                      onChange={handleInputChange}
                      className="w-full text-[#2a2a2a] text-sm focus:outline-none bg-transparent font-light cursor-pointer appearance-none"
                    >
                      <option value="0" className="bg-[#2a2a2a] text-white">
                        0 Children
                      </option>
                      <option value="1" className="bg-[#2a2a2a] text-white">
                        1 Child
                      </option>
                      <option value="2" className="bg-[#2a2a2a] text-white">
                        2 Children
                      </option>
                      <option value="3" className="bg-[#2a2a2a] text-white">
                        3 Children
                      </option>
                      <option value="4" className="bg-[#2a2a2a] text-white">
                        4+ Children
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 md:py-3">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#2a2a2a] text-white rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed "
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    "Check"
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Hero;
