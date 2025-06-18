import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Package, Truck, Shield, Globe, Settings, CheckCircle, Route, Eye, DollarSign, Users } from "lucide-react";
import { Link } from 'react-router-dom';
const ProjectCargo = () => {
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
                  Project Cargo Services
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
              }} className="text-lg text-gray-700 mb-6">At GGL, we specialize in managing project cargo—the transportation of large, heavy, high-value, or complex pieces of equipment and materials essential to major infrastructure, engineering, or industrial projects.Our expertise ensures that these shipments receive the customized handling, multimodal transport solutions, and precise coordination needed to meet strict timelines and safety standards.</motion.p>
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
                  <img alt="Project Cargo Service" className="w-full h-auto object-cover" src="/projectcargo3.png" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              
            </div>
            
            {/* Key Characteristics Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Key Characteristics of Project Cargo
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              }} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Package className="h-8 w-8 text-brand-gold mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Oversized & Heavy Lift</h3>
                  </div>
                  <p className="text-gray-600 text-justify">
                    We handle cargo that exceeds standard shipping dimensions, such as turbines, generators, construction machinery, oil rigs, and windmill components.
                  </p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} viewport={{
                once: true
              }} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Settings className="h-8 w-8 text-brand-gold mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Customized Handling</h3>
                  </div>
                  <p className="text-gray-600 text-justify">
                    Our services include specialized equipment like cranes, flat racks, heavy-duty trailers, and rigging systems to ensure safe and efficient transport.
                  </p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }} viewport={{
                once: true
              }} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Truck className="h-8 w-8 text-brand-gold mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Multimodal Transport</h3>
                  </div>
                  <p className="text-gray-600 text-justify">
                    We coordinate multiple modes of transport—sea, air, road, and rail—to move cargo from the origin to often remote or underdeveloped project sites.
                  </p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.3
              }} viewport={{
                once: true
              }} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-brand-gold mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Regulatory Complexity</h3>
                  </div>
                  <p className="text-gray-600 text-justify">
                    GGL manages permits, route surveys, customs clearance, and coordination with local authorities to navigate the complexities of international logistics.
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Why Choose GGL Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Why Choose GGL for Your Project Cargo Needs?
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <p className="text-gray-700 mb-8 text-justify">
                Managing project cargo requires experience, precision, and global coordination. As a seasoned freight forwarder and global logistics company, GGL provides:
              </p>
              
              <div className="space-y-6">
                {[{
                icon: <Route className="h-6 w-6" />,
                title: "Route Planning and Feasibility Studies",
                description: "We assess the most efficient and cost-effective routes for your cargo."
              }, {
                icon: <Shield className="h-6 w-6" />,
                title: "Secure Loading and Lashing",
                description: "Our team ensures that all cargo is securely loaded and lashed to prevent damage during transit."
              }, {
                icon: <Eye className="h-6 w-6" />,
                title: "Real-Time Shipment Tracking",
                description: "Stay informed with our tracking services, providing updates throughout the journey."
              }, {
                icon: <Users className="h-6 w-6" />,
                title: "Coordination with Ports, Customs, and Local Transport Agencies",
                description: "We handle all logistics aspects, ensuring smooth operations from start to finish."
              }, {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Cost-Effective Ocean Freight, Sea Freight, or Air Freight Solutions",
                description: "GGL offers tailored solutions to meet your specific needs and budget."
              }].map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} viewport={{
                once: true
              }} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-brand-gold text-brand-navy p-2 rounded-full flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>)}
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Benefits of Professional Project Cargo Services
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Minimized Risk of Damage or Delay",
                description: "Our experienced team ensures that your cargo is handled with the utmost care, reducing the risk of damage or delays."
              }, {
                icon: <Shield className="h-6 w-6" />,
                title: "Compliance with Safety and Legal Standards",
                description: "GGL adheres to all safety and legal regulations, ensuring that your shipments are compliant with international standards."
              }, {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Cost Efficiency Through Optimized Planning",
                description: "We plan every aspect of the transport process to minimize costs and maximize efficiency."
              }, {
                icon: <Globe className="h-6 w-6" />,
                title: "Seamless International Logistics Support",
                description: "With our global network and expertise, we provide comprehensive support for your international shipments."
              }].map((benefit, index) => <motion.div key={index} initial={{
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
              }} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-brand-gold">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </motion.div>)}
              </div>
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
          }} className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-50">LET GGL MOVE YOUR PROJECT FORWARD</h3>
              <p className="mb-6 text-blue-50 max-w-3xl mx-auto">
                From the first mile to the final lift, GGL is your strategic partner in project cargo and international logistics. Our team of project specialists will work closely with you to plan every detail, ensure compliance, and execute a seamless delivery.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default ProjectCargo;
