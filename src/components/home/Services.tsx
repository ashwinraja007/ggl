import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Package, Anchor, Droplets } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const EnhancedServiceCard = ({ image, title, description, icon, link }: {
  image: string;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}) => {
  const getServiceImage = () => {
    switch (title) {
      case "Air Freight":
        return "/airfreight2.jpg";
      case "Ocean Freight":
        return "/lovable-uploads/oceanfrieght.jpg";
      case "Customs Clearance":
        return "/lovable-uploads/cc.jpg";
      case "Liquid Transportation":
        return "/lovable-uploads/liquid.jpg";
      default:
        return image;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 h-full"
    >
      <Link to={link} className="block h-full" onClick={() => window.scrollTo(0, 0)}>
        <div className="h-44 sm:h-48 md:h-40 overflow-hidden">
          <AspectRatio ratio={16 / 9} className="h-full">
            <img
              src={getServiceImage()}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </AspectRatio>
        </div>
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-navy bg-[#f6b100]">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
              {description}
            </p>
          </div>
          <div className="inline-flex items-center text-brand-gold font-medium text-sm group mt-auto">
            Learn More
            <motion.span
              className="ml-1"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Services = () => {
  const services = [
    {
      image: "/lovable-uploads/airfreight.jpg",
      title: "Air Freight",
      description: "Tailored Air Freight Solutions to Meet Your Unique Requirements. We offer flexible air freight solutions for time-sensitive documents or large-scale cargo.",
      icon: <Package size={10} />,
      link: "/services/air-freight"
    },
    {
      image: "/lovable-uploads/ocean.jpg",
      title: "Ocean Freight",
      description: "Connecting you globally with comprehensive ocean freight services. We offer both LCL for smaller shipments and FCL for dedicated container needs.",
      icon: <Anchor size={20} />,
      link: "/services/ocean-freight"
    },
    {
      image: "/lovable-uploads/cc.jpg",
      title: "Customs Clearance",
      description: "Expert customs clearance services ensuring your shipments move smoothly across borders with accurate documentation and regulatory compliance.",
      icon: <Truck size={20} />,
      link: "/services/customs-clearance"
    },
    {
      image: "/lovable-uploads/liquid.jpg",
      title: "Liquid Transportation",
      description: "Specialized solutions for transporting liquids safely and efficiently, utilizing ISO tanks, flexitanks, and specialized tankers managed by expert teams.",
      icon: <Droplets size={20} />,
      link: "/services/liquid-transportation"
    },
    {
      image: "/projectcargo3.png",
      title: "Project Cargo",
      description:
        "Project cargo refers to the specialized transportation of large, heavy, high-value, or complex equipment, often associated with large-scale infrastructure or construction projects.",
      icon: <Package />,
      link: "/services/project-cargo"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="py-10 bg-gradient-to-b from-white to-brand-lightGray"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">
            Our Core Services
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Discover our comprehensive range of logistics solutions designed to meet your global shipping needs.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ duration: 0.5, delay: index * 0.1 }} className="h-full">
              <EnhancedServiceCard
                image={service.image}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
            <Button variant="navy" className="group transition-all duration-300 text-sm flex items-center gap-2 navy-glow">
              Explore All Services
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
