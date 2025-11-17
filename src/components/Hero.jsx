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
        
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="hhttps://res.cloudinary.com/dsrlnbc5k/video/upload/final_sasphm.mp4" type="video/mp4" />
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

        
      </div>
    </div>
  );
};

export default Hero;
