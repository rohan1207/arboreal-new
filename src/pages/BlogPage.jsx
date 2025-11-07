import React from "react";
import { motion } from "framer-motion";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      category: "TRAVEL TIPS",
      title: "Best Time to Visit Lonavala",
      description:
        "Discover the perfect season to experience the magic of Lonavala. From monsoon waterfalls to winter mist, learn when to plan your perfect getaway to The Arboreal Resort.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      date: "October 15, 2024",
      readTime: "5 min read",
      link: "#",
    },
    {
      id: 2,
      category: "WELLNESS",
      title: "Yoga & Meditation in Nature",
      description:
        "Experience tranquility like never before. Our wellness programs combine ancient practices with the serene beauty of our natural surroundings for ultimate relaxation.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      date: "October 12, 2024",
      readTime: "4 min read",
      link: "#",
    },
    {
      id: 3,
      category: "DINING",
      title: "Farm to Table Dining Experience",
      description:
        "Savor the freshest flavors from our organic gardens. Our chefs craft exquisite dishes using locally sourced ingredients, creating a true farm-to-table experience.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      date: "October 8, 2024",
      readTime: "6 min read",
      link: "#",
    },
    {
      id: 4,
      category: "ADVENTURES",
      title: "Exploring the Western Ghats",
      description:
        "Embark on unforgettable trails through the lush Western Ghats. From sunrise treks to hidden waterfalls, discover the natural wonders surrounding The Arboreal Resort. Our guided nature walks offer intimate encounters with local flora and fauna.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
      date: "October 5, 2024",
      readTime: "8 min read",
      link: "#",
    },
    {
      id: 5,
      category: "SUSTAINABILITY",
      title: "Our Eco-Friendly Practices",
      description:
        "Learn about our commitment to sustainable luxury. From rainwater harvesting to solar energy, discover how we preserve nature while offering premium comfort.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      date: "September 28, 2024",
      readTime: "7 min read",
      link: "#",
    },
    {
      id: 6,
      category: "EXPERIENCES",
      title: "Romantic Getaway Ideas",
      description:
        "Create unforgettable memories with your loved one. From candlelit dinners under the stars to couples' spa treatments, discover romantic experiences at our resort.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
      date: "September 22, 2024",
      readTime: "5 min read",
      link: "#",
    },
    {
      id: 7,
      category: "CELEBRATIONS",
      title: "Planning Your Dream Destination Wedding",
      description:
        "Say 'I do' surrounded by nature's beauty. Our expert team helps you create the perfect celebration, from intimate ceremonies to grand celebrations in our stunning venues.",
      image: "slider7.jpg",
      date: "September 18, 2024",
      readTime: "10 min read",
      link: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="bg-[#f5f3ed]">
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('/slider1.jpg')",
        }}
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
            Stories & Insights
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The Arboreal Journal
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover travel tips, wellness insights, and the stories behind our
            sanctuary in the hills of Lonavala.
          </motion.p>
        </div>
      </motion.section>

      {/* Bento Grid Blog Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* First Row - 3 Small Cards */}
            {blogs.slice(0, 3).map((blog) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="block relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs tracking-[0.15em] text-gray-900 font-medium uppercase">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors duration-300 leading-tight mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
                  >
                    <span className="relative z-10">Read More</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
                  </button>
                </div>
              </motion.article>
            ))}

            {/* Second Row - 1 Large Card (spans 2 columns) */}
            <motion.article
              variants={itemVariants}
              className="group relative overflow-hidden bg-white md:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="block relative overflow-hidden">
                <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <motion.img
                    src={blogs[3].image}
                    alt={blogs[3].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs tracking-[0.15em] text-gray-900 font-medium uppercase">
                    {blogs[3].category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{blogs[3].date}</span>
                  <span>•</span>
                  <span>{blogs[3].readTime}</span>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors duration-300 leading-tight mb-3">
                  {blogs[3].title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base mb-4 max-w-3xl">
                  {blogs[3].description}
                </p>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
                >
                  <span className="relative z-10">Read More</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
                </button>
              </div>
            </motion.article>

            {/* Third Row - Remaining 3 Cards */}
            {blogs.slice(4, 7).map((blog) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="block relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs tracking-[0.15em] text-gray-900 font-medium uppercase">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors duration-300 leading-tight mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
                  >
                    <span className="relative z-10">Read More</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Subscribe to Our Journal
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Receive the latest stories, travel tips, and exclusive offers
              directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 font-light text-sm uppercase tracking-wider whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
