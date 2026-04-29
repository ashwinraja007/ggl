import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
  Box,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroProps {
  badgeText?: string;
  headline?: string;
  subheadline?: string;
  sliderImages?: string[];
  consolamateLink?: string;
  contactPath?: string;
}

export const Hero = ({
  badgeText,
  headline,
  subheadline,
  sliderImages,
  consolamateLink,
  contactPath = "/contact",
}: HeroProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen)
        setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // ✅ UPDATED LINKS
  const portalLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Customer Portal",
      url: "https://consolmate.com/auth/login/14",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: "Partner Portal",
      url: "https://pp.onlinetracking.co/auth/login/14",
    },
    {
      icon: <SearchCode className="w-5 h-5" />,
      title: "Tracking",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:280",
    },
    {
      icon: <Ship className="w-5 h-5" />,
      title: "Sailing Schedule",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:280",
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Online Quote",
      url: contactPath,
    },
  ];

  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] overflow-hidden pt-8 md:pt-16">
      
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="rounded-md border border-white/20 bg-brand-navy/70 text-white px-3 py-2"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Background */}
      <motion.div className="absolute inset-0">
        <img
          src={
            sliderImages && sliderImages.length > 0
              ? sliderImages[0]
              : "homeimage.jpg"
          }
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/70 to-brand-navy/90" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl text-white space-y-5">
            <div className="flex items-center gap-3">
              <Globe className="text-yellow-400 w-8 h-8" />
              <span className="bg-yellow-400/20 px-4 py-1 rounded-full text-sm">
                {badgeText || "Beyond Logistics, a Complete Solution"}
              </span>
            </div>

            <h1
              className="text-5xl font-bold"
              dangerouslySetInnerHTML={{
                __html:
                  headline ||
                  'Delivering Excellence in <span class="text-yellow-400">Global Logistics</span>',
              }}
            />

            <p className="text-lg text-white/80">
              {subheadline ||
                "GGL brings over 25 years of expertise in international logistics."}
            </p>

            <div className="flex gap-4">
              <Link to={contactPath}>
                <Button>Get A Quote</Button>
              </Link>

              <a
                href="https://consolmate.com/auth/login/14"
                target="_blank"
              >
                <Button>Customer Portal</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ BOTTOM 5 BUTTONS */}
      <div className="hidden md:flex absolute bottom-10 left-0 w-full justify-center z-20">
        <div className="flex gap-4 bg-white/10 backdrop-blur-lg p-3 rounded-xl border border-white/20 shadow-lg">
          {portalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 bg-white rounded-lg shadow hover:shadow-xl transition"
            >
              <span className="text-yellow-500">{link.icon}</span>
              <span className="text-sm font-medium text-gray-800">
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
