import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: [
        "The Arboreal, Pvt. Road,",
        "Gevhande Apati, Lonavala,",
        "Maharashtra 412108"
      ],
      link: "https://maps.app.goo.gl/2EL8NXUZgh4An2NL8"
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Call Us",
      details: [
        "+91 777 50 23535",
        "+91 976 78 55988"
      ],
      link: "tel:+917775023535"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Us",
      details: [
        "reservations@thearborealresort.com"
      ],
      link: "mailto:reservations@thearborealresort.com"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Working Hours",
      details: [
        "24/7 Reception",
        "Always Available"
      ],
      link: null
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-[#f5f3ed]">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <motion.p
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/90 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're here to help you create unforgettable moments. Reach out to us for inquiries, reservations, and any assistance you may need.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Information Cards */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-serif text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600 font-light">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.link && (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs uppercase tracking-wider text-gray-900 hover:text-gray-600 transition-colors duration-300 font-medium"
                  >
                    {info.title === "Visit Us" ? "Get Directions →" : 
                     info.title === "Call Us" ? "Call Now →" : 
                     info.title === "Email Us" ? "Send Email →" : ""}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-3">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-700 mb-2 font-medium">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-sm font-light"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-700 mb-2 font-medium">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-sm font-light"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-700 mb-2 font-medium">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210" 
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-sm font-light"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gray-700 mb-2 font-medium">
                  Subject *
                </label>
                <input 
                  type="text" 
                  name="subject" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Reservation Inquiry" 
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-sm font-light"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-700 mb-2 font-medium">
                  Message *
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..." 
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-sm font-light resize-none"
                ></textarea>
              </div>
              <div>
                <motion.button 
                  type="submit" 
                  className="w-full bg-gray-900 text-white font-light py-4 px-8 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-wider shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend className="w-4 h-4" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg overflow-hidden"
          >
            <div className="h-full min-h-[500px] lg:min-h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.6740519416508!2d73.42024677496694!3d18.67861708244583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be803df3ec90e3b%3A0xf96fb840dcac5cce!2sThe%20Arboreal!5e0!3m2!1sen!2sin!4v1762453871538!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Arboreal Resort Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Ready to Experience Paradise?
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Book your stay at The Arboreal Resort and immerse yourself in luxury amidst nature's tranquility.
            </p>
            <a
              href="/availability"
              className="inline-block px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 font-light text-sm uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              Check Availability
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

