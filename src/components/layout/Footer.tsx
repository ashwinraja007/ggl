import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPageContent } from "@/lib/content";

export const Footer = () => {
  const { data: pageContent } = useQuery({
    queryKey: ["page-content", "/common"],
    queryFn: () => fetchPageContent("/common"),
  });

  const footerRecord = pageContent?.find(r => r.section_key === 'footer');
  
  const getContent = () => {
    if (!footerRecord?.content) return null;
    let content = footerRecord.content;
    if (typeof content === 'string') {
      try { content = JSON.parse(content); } catch (e) { console.error("Error parsing footer content", e); }
    }
    return { content, images: footerRecord.images };
  };

  const data = getContent();
  const content = data?.content || {};
  const images = data?.images || {};

  const description = content.company_description || "GGL is a global freight forwarder offering premium logistics services, backed by a team with over 25 years of expertise in international and domestic transportation.";
  const address = content.contact_info?.address || "Suite 5, 7-9 Mallet Road, Tullamarine, Victoria, 3043";
  const phone = content.contact_info?.phone || "+61 481 359 416";
  const email = content.contact_info?.email || "info@gglaustralia.com";
  const logo = images.logo || "/lovable-uploads/GGL.png";
  const copyright = content.copyright_text || `© ${new Date().getFullYear()} GGL. All Rights Reserved.`;

  const quickLinks = content.quick_links || [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Contact us", url: "/contact" },
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms And Conditions", url: "/terms-and-conditions" }
  ];

  const servicesLinks = content.services_links || [];

  const socialLinks = content.social_links || {
    linkedin: "https://www.linkedin.com/company/gglus/",
    facebook: "https://www.facebook.com/gglusa"
  };

  const footerAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  return <footer className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Decorative Line */}
        <div className="h-1 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy rounded-full mb-8"></div>

        {/* Revised Column Layout - Better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: Logo & About Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} className="flex flex-col items-start">
            <div className="mb-4">
              <img src={logo} alt="GGL Logo" className="h-14 w-auto object-contain" loading="lazy" />
              <img src="/1GlobalEnterprises.png" alt="1 Global Enterprises Logo" className="h-10 w-auto object-contain mt-2" />
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xs text-justify">
              {description}
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.facebook && (
              <motion.a href={socialLinks.facebook} target="_blank" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Facebook size={18} />
              </motion.a>
              )}
              {socialLinks.linkedin && (
              <motion.a href={socialLinks.linkedin} target="_blank" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Linkedin size={18} />
              </motion.a>
              )}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.2
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link: any, index: number) => <Link key={index} to={link.url} className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.label || link.name}
                </Link>)}
            </div>
          </motion.div>

          {/* Column 3: Services (New) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.3
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Our Services</h3>
            <div className="flex flex-col gap-2">
              {servicesLinks.length > 0 ? servicesLinks.map((link: any, index: number) => (
                <Link key={index} to={link.url} className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.label}
                </Link>
              )) : (
                <>
                  <Link to="/services/air-freight" className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" />Air Freight</Link>
                  <Link to="/services/ocean-freight" className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" />Ocean Freight</Link>
                  <Link to="/services/customs-clearance" className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" />Customs Clearance</Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.4
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                <p>{address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <p>{phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <p>{email}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-600 mt-10 text-sm">
          {copyright}
        </div>
      </div>
    </footer>;
};
