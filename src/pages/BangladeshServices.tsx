import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plane, Ship, Truck, Warehouse } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const bangladeshNavPaths = {
  home: "/bangladesh",
  about: "/bangladesh/about",
  services: "/bangladesh/services",
  careers: "/bangladesh/careers",
  contact: "/bangladesh/contact",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const ServiceCard = ({ icon, title, description, image, link }) => {
  const getServiceImage = () => {
    switch (title) {
      case "Air Freight": return "/aircargo2.png";
      case "Ocean Freight": return "/oceanf.png";
      case "Customs Clearance": return "/lovable-uploads/cc.jpg";
      case "Liquid Transportation": return "/transports.png";
      case "Transportation": return "/CARGO.png";
      case "Warehousing": return "/warhouseh1.png";
      default: return image;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group grid grid-cols-1 md:grid-cols-2"
    >
      <div className="w-full h-48 md:h-64">
        <img
          src={getServiceImage()}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col justify-center">
        <div className="bg-brand-gold text-brand-navy p-2 rounded-full inline-block mb-2 w-fit">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-brand-navy mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-4">{description}</p>
        <Link
          to={link}
          className="text-brand-gold font-medium hover:text-amber-500 inline-flex items-center text-sm"
        >
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const BangladeshServices = () => {
  const isMobile = useIsMobile();
  const services = [
    { id: 1, icon: <Ship className="w-5 h-5" />, title: "Ocean Freight", image: "/oceanf.png", description: "At GGL, our dedicated Ocean Freight Department specializes in comprehensive freight management services for both Less-than-Container Load (LCL) and Full Container Load (FCL) shipments.", link: "/bangladesh/services#ocean-freight" },
    { id: 2, icon: <Warehouse className="w-5 h-5" />, title: "LCL Consolidation", image: "/hom4.png", description: "We collect your goods from your location and prepare them for consolidation. This includes proper labelling, packaging, and documentation to ensure smooth transit.", link: "/bangladesh/services#lcl-consolidation" },
    { id: 3, icon: <Truck className="w-5 h-5" />, title: "Transportation", image: "/CARGO.png", description: "Efficient transportation and distribution are the backbone of a seamless supply chain. Our fleet and infrastructure ensure on-time delivery every time.", link: "/bangladesh/services#transportation" },
    { id: 4, icon: <Warehouse className="w-5 h-5" />, title: "Warehousing", image: "/warhouseh1.png", description: "We offer full-service warehousing and third-party logistics (3PL) to streamline your supply chain with flexible, reliable, and scalable solutions.", link: "/bangladesh/services#warehousing" },
    { id: 5, icon: <Plane className="w-5 h-5" />, title: "Air Freight", image: "/aircargo2.png", description: "Our air freight services provide fast, reliable, and flexible global shipping — including import/export, express, and door-to-door solutions.", link: "/bangladesh/services#air-freight" },
    { id: 6, icon: <Warehouse className="w-5 h-5" />, title: "Project Cargo", image: "/cargoh1.png", description: "We specialize in delivering end-to-end logistics for heavy, oversized, and time-critical shipments, ensuring efficiency and safety.", link: "/bangladesh/services#project-cargo" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header navPaths={bangladeshNavPaths} />
      <main className="flex-grow pt-16 md:pt-20">
        <section className="bg-gradient-to-r from-gray-900 to-brand-navy text-white relative overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img src="/lovable-uploads/gp.jpg" alt="Services" className="w-full h-full object-cover opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-brand-navy opacity-90" />
  </div>

  <div className="container mx-auto px-4 py-8 md:py-12 relative z-10"> {/* reduced padding */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-slate-50">Our Logistics Services</h1> {/* smaller heading, tighter spacing */}
      <div className="w-16 h-1 bg-brand-gold mx-auto mb-4"></div> {/* smaller divider and margin */}
      <p className="text-base md:text-lg text-white/90 mb-4">
        From air and ocean freight to specialized transportation solutions, we offer end-to-end logistics expertise to meet your global shipping needs.
      </p>
    </motion.div>
  </div>
</section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">All Services</h2>
              <div className="w-20 h-1 bg-brand-gold mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of services designed to meet all your logistics requirements.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
              {["Complete logistics coverage", "Dedicated account management", "24/7 support for urgent shipments", "Industry-leading transit times", "Comprehensive service portfolio", "Proven reliability and trust"].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{benefit}</h3>
                  <p className="text-gray-600 text-sm">
                    {index < 3
                      ? "Our team ensures your shipments move smoothly across global routes."
                      : "Experience reliability and expertise that keeps your logistics on track."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BangladeshServices;
