
import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Ship, Package, Box, Globe, FileCheck, Anchor, Container, MapPin, Timer, Gauge } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OceanFreight = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Ocean Freight Solutions
                </motion.h1>
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} className="text-lg text-gray-700 mb-6">
                  Connecting you globally with comprehensive ocean freight services
                </motion.p>
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }}>
                  <Link to="/contact" className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all">
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.5
              }} className="rounded-xl overflow-hidden shadow-xl">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src="/lovable-uploads/oceanfrieght.jpg" 
                      alt="Ocean Freight Service" 
                      className="w-full h-full object-cover" 
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Comprehensive Ocean Freight Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              <p className="text-gray-700 mb-6 text-justify">
                We provide comprehensive ocean freight services designed to meet your diverse shipping needs. Leveraging our extensive global network and offering competitive rates, we ensure your cargo moves efficiently and reliably.
              </p>
            </div>
            
            {/* LCL and FCL Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} viewport={{
              once: true
            }} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src="/lovable-uploads/lcl.png" 
                      alt="LCL Shipping" 
                      className="w-full h-full object-cover" 
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Less than Container Load (LCL)</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-6 w-6 text-brand-gold" />
                    <h4 className="text-lg font-semibold">Cost-effective Solution</h4>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify">
                    For shipments that don't require a full container, our LCL service offers a flexible and cost-effective solution. We consolidate your goods with other shipments, allowing you to ship smaller volumes without the expense of a dedicated container.
                  </p>
                  <p className="text-gray-600 text-justify">Our LCL service connects you to destinations worldwide through our robust network. We manage every aspect of your shipment, from detailed documentation and seamless customs clearance to reliable tracking, ensuring a smooth and efficient shipping experience.</p>
                </div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} viewport={{
              once: true
            }} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src="/lovable-uploads/fcl.jpg" 
                      alt="FCL Shipping" 
                      className="w-full h-full object-cover" 
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-6">Full Container Load (FCL)</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Box className="h-6 w-6 text-brand-gold" />
                    <h4 className="text-lg font-semibold">Dedicated Container Solution</h4>
                  </div>
                  <p className="text-gray-600 mb-4 text-justify">
                    When your cargo volume requires a dedicated container, our FCL service provides a direct and efficient shipping solution. We offer a wide range of container types to accommodate various cargo sizes and specialized requirements.
                  </p>
                  <p className="text-gray-600 text-justify">Our team expertly manages all facets of your shipment, including booking, documentation, customs clearance, and precise tracking, ensuring your cargo arrives on time. Benefit from our competitive rates for full container shipments, making your logistics cost-effective.</p>
                </div>
              </motion.div>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[{
              title: "Global Network",
              description: "Access to major shipping routes and ports worldwide",
              icon: <Globe className="h-5 w-5 text-brand-gold" />
            }, {
              title: "Container Options",
              description: "Various container types to suit different cargo needs",
              icon: <Container className="h-5 w-5 text-brand-gold" />
            }, {
              title: "Documentation",
              description: "Expert handling of all shipping documentation",
              icon: <FileCheck className="h-5 w-5 text-brand-gold" />
            }, {
              title: "Customs Clearance",
              description: "Seamless processing at international borders",
              icon: <Anchor className="h-5 w-5 text-brand-gold" />
            }, {
              title: "Cargo Tracking",
              description: "Real-time visibility of your shipment status",
              icon: <MapPin className="h-5 w-5 text-brand-gold" />
            }, {
              title: "Specialized Cargo",
              description: "Solutions for oversized and project cargo",
              icon: <Gauge className="h-5 w-5 text-brand-gold" />
            }].map((feature, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="mb-3 bg-blue-50 p-2 rounded-full inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>)}
            </div>
            
            {/* CTA Section */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className="bg-gradient-to-r from-brand-navy to-brand-navy rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Ship Your Cargo?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored ocean freight solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default OceanFreight;

