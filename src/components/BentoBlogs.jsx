import React from "react";
import { motion } from "framer-motion";

const BentoBlogs = () => {
  const blogs = [
    {
      id: 1,
      category: "ARBOREAL IDEAS",
      title: "Extend Your Stay",
      description:
        "Unwind and relax with days of late nights at cozy, daily breakfast and warm airport transfers from Cam Ranh Airport.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      link: "#",
      size: "small",
    },
    {
      id: 2,
      category: "DINING",
      title: "Fragrant flavours",
      description:
        "Discover delicious menus & recipes celebrating the fragrant flavours of Vietnamese cuisine, making the most of seasonal market produce and the daily catch.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      link: "#",
      size: "small",
    },
    {
      id: 3,
      category: "EXPERIENCES",
      title: "What's on at Arboreal",
      description:
        "Celebrate the year-round resort on Vietnam's favorite coastline with Arboreal's cast of programmes of ever-changing events and experiences.",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      link: "#",
      size: "small",
    },
    {
      id: 4,
      category: "EXPERIENCE",
      title: "Wellness Pool Villa Experience",
      description:
        "Nestled amidst the hillsides lies the retreat designed for those who seek to dedicate their stay on wellness. Enjoy treatments, therapies and movement classes to recontexture privacy without leaving the waterside Lake Wellness Pool Villa or the secluded Forest Wellness Pool Villa.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
      link: "#",
      size: "large",
    },
    {
      id: 5,
      category: "CELEBRATIONS",
      title: "Host the perfect event",
      description:
        "Embraced by a seasonably beautiful wilderness as a canvas of idyllic calm, Arboreal offers a palette of settings both indoors and out for the most exclusive weddings and celebrations in Lonavala.",
      image: "slider5.jpg",
      link: "#",
      size: "medium",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#f5f3ed]">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid */}
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
              className="group relative overflow-hidden bg-white"
            >
              {/* Image */}
              <a href={blog.link} className="block relative overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
              </a>

              {/* Content */}
              <div className="p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] text-gray-600 font-light uppercase mb-3">
                  {blog.category}
                </p>
                <a
                  href={blog.link}
                  className="group/title inline-block mb-3"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover/title:text-gray-600 transition-colors duration-300 leading-tight">
                    {blog.title}
                  </h3>
                </a>
                <p className="text-gray-600 leading-relaxed font-light text-sm mb-4">
                  {blog.description}
                </p>
                <a
                  href={blog.link}
                  className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
                >
                  <span className="relative z-10">Discover more</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
                </a>
              </div>
            </motion.article>
          ))}

          {/* Second Row - 1 Large Card + 1 Medium Card */}
          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden bg-white md:col-span-2"
          >
            {/* Image */}
            <a href={blogs[3].link} className="block relative overflow-hidden">
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <motion.img
                  src={blogs[3].image}
                  alt={blogs[3].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
            </a>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-xs tracking-[0.2em] text-gray-600 font-light uppercase mb-3">
                {blogs[3].category}
              </p>
              <a
                href={blogs[3].link}
                className="group/title inline-block mb-3"
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 group-hover/title:text-gray-600 transition-colors duration-300 leading-tight">
                  {blogs[3].title}
                </h3>
              </a>
              <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base mb-4 max-w-3xl">
                {blogs[3].description}
              </p>
              <a
                href={blogs[3].link}
                className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
              >
                <span className="relative z-10">Discover more</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
              </a>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden bg-white"
          >
            {/* Image */}
            <a href={blogs[4].link} className="block relative overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={blogs[4].image}
                  alt={blogs[4].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
            </a>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-xs tracking-[0.2em] text-gray-600 font-light uppercase mb-3">
                {blogs[4].category}
              </p>
              <a
                href={blogs[4].link}
                className="group/title inline-block mb-3"
              >
                <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover/title:text-gray-600 transition-colors duration-300 leading-tight">
                  {blogs[4].title}
                </h3>
              </a>
              <p className="text-gray-600 leading-relaxed font-light text-sm mb-4">
                {blogs[4].description}
              </p>
              <a
                href={blogs[4].link}
                className="inline-flex items-center text-sm tracking-[0.15em] text-gray-900 font-light uppercase group/link relative pb-1"
              >
                <span className="relative z-10">Discover more</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-900"></div>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-600 group-hover/link:w-full transition-all duration-500"></div>
              </a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoBlogs;
