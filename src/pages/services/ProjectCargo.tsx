import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Package, Truck, Shield, Globe, Settings, CheckCircle, Route, Eye, DollarSign, Users, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useQuery } from '@tanstack/react-query';
import { fetchPageContent } from '@/lib/content';

const iconMap: { [key: string]: React.ReactNode } = {
  Package: <Package className="h-8 w-8 text-brand-gold mr-3" />,
  Truck: <Truck className="h-8 w-8 text-brand-gold mr-3" />,
  Shield: <Shield className="h-8 w-8 text-brand-gold mr-3" />,
  Globe: <Globe className="h-6 w-6" />,
  Settings: <Settings className="h-8 w-8 text-brand-gold mr-3" />,
  CheckCircle: <CheckCircle className="h-6 w-6" />,
  Route: <Route className="h-6 w-6" />,
  Eye: <Eye className="h-6 w-6" />,
  DollarSign: <DollarSign className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

const getIcon = (iconName: string, className?: string) => {
  if (!iconName) return iconMap.Package;
  if (iconMap[iconName]) return iconMap[iconName];
  const key = Object.keys(iconMap).find(k => k.toLowerCase() === iconName.toLowerCase());
  return key ? iconMap[key] : iconMap.Package;
};

const ProjectCargo = () => {
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ["page-content", "/services/project-cargo"],
    queryFn: () => fetchPageContent("/services/project-cargo"),
  });

  const getContent = (sectionKey: string) => {
    const record = pageContent?.find(r => r.section_key.toLowerCase() === sectionKey.toLowerCase());
    if (!record?.content) return null;
    let content = record.content;
    if (typeof content === 'string') {
      try { content = JSON.parse(content); } catch (e) { console.error("Error parsing content", e); }
    }
    return { content, images: record.images };
  };

  const heroRecord = getContent('hero');
  const characteristicsRecord = getContent('characteristics');
  const whyChooseRecord = getContent('why_choose');
  const benefitsRecord = getContent('benefits');

  const characteristics = (characteristicsRecord?.content?.items && Array.isArray(characteristicsRecord.content.items)) ? characteristicsRecord.content.items : [];
  const whyChoose = (whyChooseRecord?.content?.items && Array.isArray(whyChooseRecord.content.items)) ? whyChooseRecord.content.items : [];
  const benefits = (benefitsRecord?.content?.items && Array.isArray(benefitsRecord.content.items)) ? benefitsRecord.content.items : [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Page SEO */}
      <SEO
        title="Project Cargo Services – GGL Australia | Heavy & Oversized Freight Solutions"
        description="GGL Australia specializes in project cargo logistics—heavy, oversized, and high-value equipment. We handle route surveys, lifting plans, permits, and end-to-end project management for safe, on-time delivery."
        keywords="GGL Australia, project cargo services, heavy freight logistics, oversized cargo transport, lifting plans, route surveys, end-to-end project management, specialized freight solutions, industrial equipment transport"
        url="https://www.gglaustralia.com/services/project-cargo"
        canonical="https://www.gglaustralia.com/services/project-cargo"
        image="https://www.gglaustralia.com/projectcargo3.png"
      />

      <Header />
      
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        </div>
      ) : (
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                >
                  {heroRecord?.content?.title || "Project Cargo Services"}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-700 mb-6"
                >
                  {heroRecord?.content?.subtitle || "At GGL, we specialize in managing project cargo—the transportation of large, heavy, high-value, or complex pieces of equipment and materials essential to major infrastructure, engineering, or industrial projects. Our expertise ensures that these shipments receive the customized handling, multimodal transport solutions, and precise coordination needed to meet strict timelines and safety standards."}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link to="/contact" className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all">
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  <img alt="Project Cargo Service" className="w-full h-auto object-cover" src={heroRecord?.images?.background || "/projectcargo3.png"} />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12"></div>
            
            {/* Key Characteristics Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                {characteristicsRecord?.content?.title || "Key Characteristics of Project Cargo"}
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(characteristics.length > 0 ? characteristics : [
                  { icon: "Package", title: "Oversized & Heavy Lift", description: "We handle cargo that exceeds standard shipping dimensions, such as turbines, generators, construction machinery, oil rigs, and windmill components." },
                  { icon: "Settings", title: "Customized Handling", description: "Our services include specialized equipment like cranes, flat racks, heavy-duty trailers, and rigging systems to ensure safe and efficient transport." },
                  { icon: "Truck", title: "Multimodal Transport", description: "We coordinate multiple modes of transport—sea, air, road, and rail—to move cargo from the origin to often remote or underdeveloped project sites." },
                  { icon: "Shield", title: "Regulatory Complexity", description: "GGL manages permits, route surveys, customs clearance, and coordination with local authorities to navigate the complexities of international logistics." }
                ]).map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    {typeof item.icon === 'string' ? getIcon(item.icon) : item.icon}
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-justify">{item.description}</p>
                </motion.div>
                ))}
              </div>
            </div>
            
            {/* Why Choose GGL Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                {whyChooseRecord?.content?.title || "Why Choose GGL for Your Project Cargo Needs?"}
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <p className="text-gray-700 mb-8 text-justify">
                {whyChooseRecord?.content?.subtitle || "Managing project cargo requires experience, precision, and global coordination. As a seasoned freight forwarder and global logistics company, GGL provides:"}
              </p>
              
              <div className="space-y-6">
                {(whyChoose.length > 0 ? whyChoose : [
                  { icon: <Route className="h-6 w-6" />, title: "Route Planning and Feasibility Studies", description: "We assess the most efficient and cost-effective routes for your cargo." },
                  { icon: <Shield className="h-6 w-6" />, title: "Secure Loading and Lashing", description: "Our team ensures that all cargo is securely loaded and lashed to prevent damage during transit." },
                  { icon: <Eye className="h-6 w-6" />, title: "Real-Time Shipment Tracking", description: "Stay informed with our tracking services, providing updates throughout the journey." },
                  { icon: <Users className="h-6 w-6" />, title: "Coordination with Ports, Customs, and Local Transport Agencies", description: "We handle all logistics aspects, ensuring smooth operations from start to finish." },
                  { icon: <DollarSign className="h-6 w-6" />, title: "Cost-Effective Ocean Freight, Sea Freight, or Air Freight Solutions", description: "GGL offers tailored solutions to meet your specific needs and budget." }
                ]).map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-brand-gold text-brand-navy p-2 rounded-full flex-shrink-0">
                      {typeof item.icon === 'string' ? getIcon(item.icon) : item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                {benefitsRecord?.content?.title || "Benefits of Professional Project Cargo Services"}
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(benefits.length > 0 ? benefits : [
                  { icon: <CheckCircle className="h-6 w-6" />, title: "Minimized Risk of Damage or Delay", description: "Our experienced team ensures that your cargo is handled with the utmost care, reducing the risk of damage or delays." },
                  { icon: <Shield className="h-6 w-6" />, title: "Compliance with Safety and Legal Standards", description: "GGL adheres to all safety and legal regulations, ensuring that your shipments are compliant with international standards." },
                  { icon: <DollarSign className="h-6 w-6" />, title: "Cost Efficiency Through Optimized Planning", description: "We plan every aspect of the transport process to minimize costs and maximize efficiency." },
                  { icon: <Globe className="h-6 w-6" />, title: "Seamless International Logistics Support", description: "With our global network and expertise, we provide comprehensive support for your international shipments." }
                ]).map((benefit: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-6 shadow-md border-l-4 border-brand-gold"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 text-green-600 p-2 rounded-full mr-3">
                        {typeof benefit.icon === 'string' ? getIcon(benefit.icon) : benefit.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-brand-navy to-brand-navy rounded-xl text-white p-8 text-center"
            >
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
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectCargo;
