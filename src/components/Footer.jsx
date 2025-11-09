import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Services", path: "/services" },
  ];

  const exploreLinks = [
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Availability", path: "/availability" },
    { name: "Reservation", path: "/reservation" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative bg-[#f5f3ed] border-t border-gray-200">
      {/* Top Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="space-y-8 sm:space-y-10 mb-8 sm:mb-10 md:mb-12">
          {/* Brand Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4 sm:space-y-5 md:space-y-6 text-center"
          >
            <Link to="/" className="inline-block group">
              <img
                src="/blacklogo.png"
                alt="Arboreal Resort"
                className="h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] w-auto drop-shadow-sm transition-all duration-500 group-hover:scale-105 mx-auto"
              />
            </Link>
            <p className="text-gray-600 font-light text-xs sm:text-sm leading-relaxed max-w-xs mx-auto px-4">
              Escape to tranquility. Experience luxury amidst nature at Arboreal
              Resort, where every moment is a celebration of serenity and
              elegance.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links & Explore - 2 Column Layout */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-md mx-auto">
            {/* Quick Links */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-800 text-center">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-center">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light text-xs sm:text-sm block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Explore */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-800 text-center">
                Explore
              </h3>
              <ul className="space-y-2.5 text-center">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light text-xs sm:text-sm block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="space-y-4 max-w-sm mx-auto"
          >
            <h3 className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-800 text-center">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FiMapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
                    Address
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
                    Arboreal Resort, Nature Valley,
                    <br />
                    Serenity Hills, 123456
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FiPhone className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
                    Call Us
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FiMail className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
                    Email
                  </p>
                  <a
                    href="mailto:info@arborealresort.com"
                    className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
                  >
                    info@arborealresort.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-7 md:pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs text-gray-500 font-light text-center md:text-left">
              © {new Date().getFullYear()} Arboreal Resort. All rights reserved.
              Crafted with love.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs flex-wrap justify-center">
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                Terms & Conditions
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <Link
                to="/sitemap"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
