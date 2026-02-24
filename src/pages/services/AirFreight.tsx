import React, { useMemo } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Plane, Clock, Globe, Headset, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
  Clock: <Clock className="h-10 w-10 text-brand-gold" />,
  Plane: <Plane className="h-10 w-10 text-brand-gold" />,
  Globe: <Globe className="h-10 w-10 text-brand-gold" />,
  Headset: <Headset className="h-10 w-10 text-brand-gold" />,
};

const getIcon = (iconName: string) => {
  if (!iconName) return iconMap.Plane;
  if (iconMap[iconName]) return iconMap[iconName];
  // Case insensitive lookup
  const key = Object.keys(iconMap).find(k => k.toLowerCase() === iconName.toLowerCase());
  return key ? iconMap[key] : iconMap.Plane;
};

const AirFreight = () => {
  const { data: rawPageContent, isLoading } = useQuery({
    queryKey: ["page-content", "/services/air-freight"],
    queryFn: () => fetchPageContent("/services/air-freight"),
  });

  const pageData = useMemo(() => processPageContent(rawPageContent), [rawPageContent]);

  useSEO(pageData.seo as SeoRecord);

  const data = {
    heroTitle: pageData.hero?.title || "Air Freight Solutions",
    heroSubtitle: pageData.hero?.subtitle || "Tailored air freight solutions to meet your unique requirements",
    heroImage: pageData.hero?.images?.background || "/airfreight2.jpg",
    mainTitle: pageData.main?.title || "Comprehensive Air Freight Services",
    mainBody: pageData.main?.body || `<p class="text-gray-700 mb-6 font-normal text-justify">Tailored air freight solutions to meet your unique requirements. We understand that every shipment is different. That's why we offer flexible air freight solutions designed to meet your specific needs. Whether you're shipping time-sensitive documents or large-scale cargo, we have the expertise and resources to handle it efficiently.</p><p class="text-gray-700 text-justify">Our comprehensive services include air imports, exports, and express deliveries, all with the convenience of door-to-door service. We pride ourselves on our competitive pricing and our unwavering commitment to providing exceptional customer support. Let us optimize your air freight logistics and ensure your shipments reach their destinations seamlessly.</p>`,
    features: (pageData.features?.items && Array.isArray(pageData.features.items)) ? pageData.features.items : [],
    subServices: (pageData.sub_services?.items && Array.isArray(pageData.sub_services.items)) ? pageData.sub_services.items : []
  };

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
                  {data.heroTitle}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }} 
                  className="text-lg text-gray-700 mb-6"
                >
                  {data.heroSubtitle}
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
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={data.heroImage} 
                      alt="Air Freight Service" 
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
                {data.mainTitle}
              </h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.mainBody }}
              />
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {(data.features.length > 0 ? data.features : [
                { icon: <Clock className="h-10 w-10 text-brand-gold" />, title: "Time-sensitive Delivery", description: "Fast and reliable delivery for urgent shipments" },
                { icon: <Plane className="h-10 w-10 text-brand-gold" />, title: "Global Air Network", description: "Extensive network covering all major destinations" },
                { icon: <Globe className="h-10 w-10 text-brand-gold" />, title: "Door-to-Door", description: "Complete service from pickup to final delivery" },
                { icon: <Headset className="h-10 w-10 text-brand-gold" />, title: "24/7 Support", description: "Round-the-clock assistance for your shipments" }
              ]).map((feature: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="mb-4 bg-blue-50 p-3 rounded-full inline-block">
                    {typeof feature.icon === 'string' ? getIcon(feature.icon) : feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {(data.subServices.length > 0 ? data.subServices : [
                { title: "Air Import", description: "Our air import services ensure your international purchases reach you efficiently. We handle all documentation, customs clearance, and final delivery to your doorstep.", image: "/lovable-uploads/warehouse.jpg" },
                { title: "Air Export", description: "When sending your products worldwide, our air export services provide the speed and reliability you need. We manage the entire process from pickup to delivery at the final destination.", image: "/lovable-uploads/airimport.png" }
              ]).map((service: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} 
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }} 
                viewport={{ once: true }} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-48 sm:h-56 relative">
                  <AspectRatio ratio={16/9} className="h-full">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-6">{service.title}</h3>
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-justify">{service.description}</p>
                </div>
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
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Ready to Ship with Us?</h3>
              <p className="mb-6 text-blue-50">
                Contact our team today for tailored air freight solutions.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
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

export default AirFreight;
