import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

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
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="relative bg-[#f5f3ed] border-t border-gray-200">
      {/* Top Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6 lg:col-span-1"
          >
            <Link to="/" className="inline-block group">
              <img
                src="/blacklogo.png"
                alt="Arboreal Resort"
                className="h-[200px] w-auto drop-shadow-sm transition-all duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-600 font-light text-sm leading-relaxed max-w-xs">
              Escape to tranquility. Experience luxury amidst nature at Arboreal Resort, 
              where every moment is a celebration of serenity and elegance.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-300"></span>
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
            className="space-y-6"
          >
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-800">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gray-900 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-800">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FiMapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Address</p>
                  <p className="text-sm text-gray-700 font-light leading-relaxed">
                    Arboreal Resort, Nature Valley,<br />Serenity Hills, 123456
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FiPhone className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Call Us</p>
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FiMail className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Email</p>
                  <a
                    href="mailto:info@arborealresort.com"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 font-light break-all"
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
          className="pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 font-light text-center md:text-left">
              © {new Date().getFullYear()} Arboreal Resort. All rights reserved. Crafted with love.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
              >
                Terms & Conditions
              </Link>
              <span className="text-gray-300">|</span>
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
