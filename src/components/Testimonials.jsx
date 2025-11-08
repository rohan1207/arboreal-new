import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "This resort offers an escape into pure bliss! Everything. The rooms were so spacious, and it was really better our stunning stay! The amenities were top-notch from start to finish! The service was impeccable, the food at the resort was great! I felt at home. I'd happily be returning vacation, I didn't really want the last place to be. The adventure now was really great.",
      rating: 5,
      image: "/slider1.jpg",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      text: "An absolutely breathtaking experience! The forest views from our room were stunning, and the staff went above and beyond to make our stay special. The private bathtub experience was unforgettable. Every detail was carefully thought out, from the welcome drinks to the personalized service. We celebrated our anniversary here and couldn't have chosen a better place.",
      rating: 5,
      image: "/slider2.jpg",
    },
    {
      id: 3,
      name: "Anjali Patel",
      text: "A hidden gem in the heart of nature! The luxury sunroom exceeded all our expectations. Waking up to birds chirping and sunlight streaming through panoramic windows was magical. The spa treatments were divine, and the restaurant served the most delicious local cuisine. Perfect for couples seeking romance and relaxation.",
      rating: 5,
      image: "/slider3.jpg",
    },
    {
      id: 4,
      name: "Vikram Reddy",
      text: "Outstanding hospitality and pristine facilities! Our family had an amazing time at this resort. The kids loved the pool, and we enjoyed the peaceful forest walks. The rooms were spotlessly clean and beautifully decorated. The staff remembered our names and preferences throughout our stay. Highly recommend for family vacations!",
      rating: 5,
      image: "/slider4.jpg",
    },
    {
      id: 5,
      name: "Neha Kapoor",
      text: "Pure luxury meets natural beauty! This was our dream honeymoon destination. The private pool room was spectacular, offering complete privacy and romance. The sunset views from our deck were breathtaking. Every meal was a culinary masterpiece. The resort perfectly balances modern amenities with rustic charm. We're already planning our next visit!",
      rating: 5,
      image: "/slider5.jpg",
    },
  ];

  const currentTestimonial = testimonials[currentIndex];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const textVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentTestimonial.image}
            alt="Resort Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-light">
            Testimonials
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-8"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-tight">
              Guest Said About Our Hotel
            </h3>
          </motion.div>

          {/* Right Side - Testimonial Content */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="space-y-4"
              >
                {/* Author Name with Signature Style */}
                <div className="mb-4">
                  <p className="font-serif italic text-white text-xl md:text-2xl">
                    {currentTestimonial.name}
                  </p>
                </div>

                {/* Testimonial Text */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {currentTestimonial.text}
                </p>

                {/* Star Rating */}
                <div className="flex gap-1 pt-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
