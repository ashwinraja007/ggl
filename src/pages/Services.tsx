import React, { useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plane, Ship, FileText, Droplets, Warehouse, Loader2 } from "lucide-react";
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
  Plane: <Plane className="w-5 h-5" />,
  Ship: <Ship className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
};

const getIcon = (iconName: string) => {
  if (!iconName) return iconMap.Plane;
  // Try exact match
  if (iconMap[iconName]) return iconMap[iconName];
  // Try case-insensitive match
  const key = Object.keys(iconMap).find(k => k.toLowerCase() === iconName.toLowerCase());
  return key ? iconMap[key] : iconMap.Plane;
};

// Scroll to Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// Service Card Component
const ServiceCard = ({
  icon,
  title,
  description,
  image,
  link
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
    >
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={866/584} className="w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4">
              <div className="bg-brand-gold text-brand-navy p-2 rounded-full inline-block mb-2">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            </div>
          </div>
        </AspectRatio>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {description}
        </p>
        <Link to={link} className="text-brand-gold font-medium hover:text-amber-500 inline-flex items-center text-sm">
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const location = useLocation();
  const { data: rawPageContent, isLoading } = useQuery({
    queryKey: ["page-content", location.pathname],
    queryFn: () => fetchPageContent(location.pathname),
  });

  const pageData = useMemo(() => processPageContent(rawPageContent), [rawPageContent]);

  const defaultData = {
    hero: {
      title: "Our Comprehensive Services",
      subtitle: "From air and ocean freight to specialized liquid transportation, we offer end-to-end logistics solutions tailored to your unique needs."
    },
    services: [
      {
        icon: "Plane",
        title: "Air Freight",
        image: "/airfreight2.jpg",
        description: "Flexible air freight solutions tailored for your needs.",
        link: "/services/air-freight"
      },
      {
        icon: "Ship",
        title: "Ocean Freight",
        image: "/lovable-uploads/ocean.jpg",
        description: "Comprehensive ocean freight services for seamless global shipping.",
        link: "/services/ocean-freight"
      },
      {
        icon: "FileText",
        title: "Customs Clearance",
        image: "/lovable-uploads/cc.jpg",
        description: "Hassle-free customs clearance for smooth international trade.",
        link: "/services/customs-clearance"
      },
      {
        icon: "Droplets",
        title: "Liquid Transportation",
        image: "/lovable-uploads/liquid.jpg",
        description: "Safe and efficient transport solutions for liquid cargo.",
        link: "/services/liquid-transportation"
      },
      {
        icon: "Warehouse",
        title: "Project Cargo",
        image: "/projectcargo3.png",
        description: "We specialize in delivering end-to-end logistics solutions for complex, heavy, and oversized shipments—commonly known as project cargo.",
        link: "/services/project-cargo"
      }
    ],
    whyChooseUs: {
      title: "Why Choose Our Logistics Services?",
      subtitle: "We combine industry expertise, advanced technology, and personalized care to deliver exceptional logistics solutions.",
      features: [
        { title: "🌍 Global Network", description: "Leverage our extensive worldwide connections for efficient shipping." },
        { title: "🎯 Customized Solutions", description: "Tailored logistics plans designed for your business." },
        { title: "📡 Advanced Technology", description: "Real-time tracking & cutting-edge logistics systems." },
        { title: "👨‍✈️ Expert Team", description: "Industry professionals with years of logistics experience." },
        { title: "✅ Regulatory Compliance", description: "Ensure smooth operations with up-to-date knowledge." },
        { title: "📞 24/7 Support", description: "Get help anytime with round-the-clock customer service." }
      ]
    }
  };

  useSEO(pageData.seo as SeoRecord);

  // Helper to find record with flexible matching
  const findRecord = (key: string) => {
    if (!Array.isArray(rawPageContent)) return undefined;
    return rawPageContent.find(r => r.section_key.toLowerCase() === key.toLowerCase()) ||
           rawPageContent.find(r => r.section_key.toLowerCase().includes(key.toLowerCase()));
  };

  const heroRecord = pageData.hero;
  const servicesRecord = pageData.services;
  const whyChooseUsRecord = pageData['why-choose-us'];

  const getServicesList = () => {
    if (!servicesRecord) return defaultData.services;
    
    let content = servicesRecord.content;
    // Handle case where content might be a string (e.g. double stringified)
    if (typeof content === 'string') {
      try { content = JSON.parse(content); } catch (e) { console.error("Error parsing content", e); }
    }

    if (!content) return defaultData.services;
    if (Array.isArray(content)) return content;
    if ((content as any).items && Array.isArray((content as any).items)) return (content as any).items;
    if ((content as any).services && Array.isArray((content as any).services)) return (content as any).services;
    if ((content as any).cards && Array.isArray((content as any).cards)) return (content as any).cards;

    // Fallback: find first array property
    const firstArray = Object.values(content).find(val => Array.isArray(val));
    if (firstArray) return firstArray as any[];

    return defaultData.services;
  };

  const data = {
    hero: {
      title: heroRecord?.title || defaultData.hero.title,
      subtitle: heroRecord?.subtitle || defaultData.hero.subtitle
    },
    services: getServicesList(),
    whyChooseUs: {
      title: whyChooseUsRecord?.title || defaultData.whyChooseUs.title,
      subtitle: whyChooseUsRecord?.subtitle || defaultData.whyChooseUs.subtitle,
      features: whyChooseUsRecord?.features && Array.isArray((whyChooseUsRecord as any).features) ? (whyChooseUsRecord as any).features : defaultData.whyChooseUs.features
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />

      {isLoading ? (
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        </div>
      ) : (
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-brand-lightGray py-6 md:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-brand-navy">
                {data?.hero?.title}
              </h1>
              <div className="w-20 h-1 bg-brand-gold mx-auto mb-3"></div>
              <p className="text-sm md:text-base text-gray-700">
                {data?.hero?.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {data?.services?.map((service: any, index: number) => (
                <ServiceCard
                  key={service.title || index}
                  {...service}
                  icon={getIcon(service.icon)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6 md:mb-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">{data?.whyChooseUs?.title}</h2>
              <div className="w-20 h-1 bg-brand-gold mx-auto mb-3"></div>
              <p className="text-gray-700 text-sm md:text-base">{data?.whyChooseUs?.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.whyChooseUs?.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-brand-gold"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      )}

      <Footer />
    </div>
  );
};

export default Services;
