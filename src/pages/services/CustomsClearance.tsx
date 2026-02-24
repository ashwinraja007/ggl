import React, { useMemo } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { FileCheck, ShieldCheck, Lightbulb, Globe, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { useSEO, SeoRecord } from '@/seo';
import { useQuery } from '@tanstack/react-query';
import { fetchPageContent } from '@/lib/content';

const processPageContent = (contentArray: any[] | undefined) => {
  if (!Array.isArray(contentArray)) return {};
  const contentObj = contentArray.reduce((acc, record) => {
      let content = record.content;
      if (typeof content === 'string') {
          try {
              content = JSON.parse(content);
          } catch (e) {
              console.error("Error parsing content for section:", record.section_key, e);
          }
      }
      acc[record.section_key.toLowerCase()] = { ...(typeof content === 'object' && content !== null ? content : { raw: content }), images: record.images };
      return acc;
  }, {});
  return contentObj;
};

const iconMap: { [key: string]: React.ReactNode } = {
  FileCheck: <FileCheck className="h-16 w-16 text-white" />,
  ShieldCheck: <ShieldCheck className="h-16 w-16 text-white" />,
  Lightbulb: <Lightbulb className="h-16 w-16 text-white" />,
  Globe: <Globe className="h-5 w-5 text-brand-gold" />,
};

const getIcon = (iconName: string) => {
  if (!iconName) return iconMap.FileCheck;
  if (iconMap[iconName]) return iconMap[iconName];
  const key = Object.keys(iconMap).find(k => k.toLowerCase() === iconName.toLowerCase());
  return key ? iconMap[key] : iconMap.FileCheck;
};

const CustomsClearance = () => {
  const { data: rawPageContent, isLoading } = useQuery({
    queryKey: ["page-content", "/services/customs-clearance"],
    queryFn: () => fetchPageContent("/services/customs-clearance"),
  });

  const pageData = useMemo(() => processPageContent(rawPageContent), [rawPageContent]);

  useSEO(pageData.seo as SeoRecord);

  const heroRecord = pageData.hero || {};
  const mainRecord = pageData.main || {};
  const featuresRecord = pageData.features || {};
  const subServicesRecord = pageData.sub_services || {};

  const features = (featuresRecord?.items && Array.isArray(featuresRecord.items)) ? featuresRecord.items : [];
  const subServices = (subServicesRecord?.items && Array.isArray(subServicesRecord.items)) ? subServicesRecord.items : [];

  return (
    <div className="min-h-screen flex flex-col">
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
                  {heroRecord?.title || "Customs Clearance Services"}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-gray-700 mb-6"
                >
                  {heroRecord?.subtitle || "Expert solutions for seamless border crossings"}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-brand-gold hover:bg-amber-400 text-brand-navy font-medium rounded-md shadow-md transition-all"
                  >
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
                  <img
                    src={heroRecord?.images?.background || "/lovable-uploads/cc.jpg"}
                    alt="Customs Clearance Service"
                    className="w-full h-auto object-cover"
                  />
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
                {mainRecord?.title || "Seamless Customs Clearance Solutions"}
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              <div 
                className="prose max-w-none text-gray-700 text-justify"
                dangerouslySetInnerHTML={{ __html: mainRecord?.body || "<p>Navigating the complexities of global trade is simplified with our expert customs clearance services. We ensure your shipments move smoothly across borders, handling all aspects of the process from accurate documentation and tariff classification to regulatory compliance and specialized cargo handling.</p><p>Our experienced team stays abreast of evolving regulations, leverages advanced technology for expedited clearance, and maintains strong relationships with customs authorities worldwide. We prioritize transparency and open communication, providing real-time updates and peace of mind, allowing you to focus on your core business. Trust us to manage your import and export needs, minimizing delays and ensuring your shipments reach their destinations efficiently and compliantly.</p>" }}
              />
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {(features.length > 0 ? features : [
                { title: "Documentation Expertise", description: "Our team ensures all your customs documentation is accurate, complete, and submitted correctly, preventing delays and ensuring compliance with international regulations.", icon: "FileCheck", color: "blue" },
                { title: "Regulatory Compliance", description: "Stay compliant with constantly evolving international trade regulations. We keep up-to-date with changes to ensure your shipments meet all legal requirements.", icon: "ShieldCheck", color: "green" },
                { title: "Expert Consultation", description: "Our customs experts provide guidance on duty and tax implications, helping you make informed decisions and optimize your international shipping strategy.", icon: "Lightbulb", color: "amber" }
              ]).map((feature: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
              >
                <div className={`h-48 bg-gradient-to-br from-${feature.color || 'blue'}-500 to-${feature.color || 'blue'}-600 flex items-center justify-center`}>
                  {typeof feature.icon === 'string' ? getIcon(feature.icon) : feature.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-justify">{feature.description}</p>
                </div>
              </motion.div>
              ))}
            </div>
            
            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {(subServices.length > 0 ? subServices : [
                { title: "Import Clearance", description: "Our import clearance services streamline the process of bringing goods into the country, ensuring compliance with local regulations and minimizing delays.", list: ["Duty and tax calculation", "Entry preparation and filing", "Tariff classification", "Customs examination support"] },
                { title: "Export Clearance", description: "Our export clearance services ensure your goods leave the country efficiently, with all necessary documentation and compliance requirements met.", list: ["Export documentation preparation", "License and permit management", "Security filing and compliance", "Electronic export information filing"] }
              ]).map((service: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-brand-gold" />
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.list && (
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {service.list.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                )}
              </motion.div>
              ))}
            </div>
            
            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-brand-navy to-brand-navy rounded-xl text-white p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Need Customs Clearance Services?</h3>
              <p className="mb-6 text-blue-50">
                Contact our customs experts today for seamless border crossings.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
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

export default CustomsClearance;
