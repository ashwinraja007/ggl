import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ✅ Page SEO */}
      <SEO
        title="About GGL Australia – Expert Freight Forwarding & Logistics"
        description="Discover GGL Australia, a global freight forwarder with 25+ years of experience in international and domestic logistics. We deliver premium freight forwarding, warehousing, transport, and end-to-end supply chain solutions."
        keywords="GGL Australia, freight forwarding, logistics solutions, supply chain management, warehousing services, transportation logistics, international logistics, domestic freight, end-to-end logistics"
        url="https://www.gglaustralia.com/about"
        canonical="https://www.gglaustralia.com/about"
        image="https://www.gglaustralia.com/lovable-uploads/ggl-logo.png"
      />

      <Header />

      <main className="flex-grow mt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[30vh] flex items-center justify-center bg-blue-50 overflow-hidden"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center px-4 relative z-10"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 font-inter">
              Who We Are
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter font-light">
              A global leader in logistics and supply chain solutions
            </p>
          </motion.div>
        </motion.section>

        {/* Main Content Section */}
        <section className="py-0">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Our Story
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    GGL is a proud subsidiary of 1 Global Enterprises, a dynamic investment company with a diverse portfolio in freight forwarding, supply chain management, and logistics technology. As part of this global network, GGL benefits from strategic investments across multiple brands specializing in transportation, warehousing, and supply chain solutions.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Backed by 1 Global Enterprises' industry expertise and innovation-driven approach, GGL leverages synergies across its affiliated companies to provide integrated, technology-driven logistics solutions. This connection ensures operational excellence, financial stability, and access to world-class supply chain infrastructure, positioning GGL as a leader in end-to-end global logistics services.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg h-[400px] w-full">
                    <img
                      src="lovable-uploads/gp.jpg"
                      alt="Global Business Partnership"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Membership Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 bg-inherit"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-800 mb-8"
              >
                Industry Recognition & Partnerships
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl shadow-lg p-8 md:p-12 bg-neutral-50"
              >
                {/* 1 row / 2 column logo layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="w-full flex items-center justify-center">
                    <img
                      src="/ftaLogo.png"
                      alt="Freight & Trade Alliance (FTA)"
                      className="h-20 md:h-24 w-auto object-contain"
                    />
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <img
                      src="/VC-logo.png"
                      alt="Victorian Chamber of Commerce and Industry (VCCI)"
                      className="h-20 md:h-24 w-auto object-contain"
                    />
                  </div>

                  {/* Shared description below both logos */}
                  <p className="md:col-span-2 text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
                    GGL is proud to be associated with leading industry bodies including the
                    Freight &amp; Trade Alliance and the Victorian Chamber of Commerce and
                    Industry. These partnerships reflect our commitment to best practice,
                    compliance, and collaborative growth across the logistics ecosystem.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <section className="bg-brand-navy text-white py-16 my-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-50">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="text-xl text-blue-100 mb-8">Trust GGL for your logistics needs</p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-white text-brand-navy rounded-lg text-lg font-medium"
                >
                  Contact Us Today
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
