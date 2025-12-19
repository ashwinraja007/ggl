import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: Logo & About Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} className="flex flex-col items-start">
            <div className="mb-4">
              <img src="/lovable-uploads/GGL.png" alt="GGL Logo" className="h-14 w-auto object-contain" loading="lazy" />
              <img src="/1GlobalEnterprises.png" alt="1 Global Enterprises Logo" className="h-10 w-auto object-contain mt-2" />
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xs text-justify">
              GGL is a global freight forwarder offering premium logistics services, backed by a team with over 25 years of expertise in international and domestic transportation.
            </p>
            <div className="flex space-x-3 mt-4">
              <motion.a href="https://www.facebook.com/gglusa" target="_blank" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Facebook size={18} />
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/gglus/" target="_blank" className="bg-brand-navy text-white p-2 rounded-full hover:bg-brand-gold transition" whileHover={{
              y: -3,
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.2
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Navigation</h3>
            <div className="flex flex-col gap-2">
              {[{
              name: "Home",
              path: "/"
            }, {
              name: "About",
              path: "/about"
            }, {
              name: "Services",
              path: "/services"
            }, {
              name: "Contact us",
              path: "/contact"
            }, {
              name: "Privacy Policy",
              path: "/privacy-policy"
            }, {
              name: "Terms And Conditions",
              path: "/terms-and-conditions"
            }].map((link, index) => <Link key={index} to={link.path} className="text-gray-600 hover:text-brand-gold transition flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-gold" />
                  {link.name}
                </Link>)}
            </div>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={footerAnimation} transition={{
          delay: 0.4
        }} className="flex flex-col items-start md:items-end lg:items-start lg:pl-10">
            <h3 className="font-bold text-lg text-brand-navy mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-brand-gold mt-1 flex-shrink-0" />
                <p>Suite 5, 7-9 Mallet Road, Tullamarine, Victoria, 3043</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <p>Operations: +61 481 359 416</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <p>Sales: +61 422 843 999</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <p>info@gglaustralia.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-600 mt-10 text-sm">
          &copy; {new Date().getFullYear()} GGL. All Rights Reserved.
        </div>
      </div>
    </footer>;
};
