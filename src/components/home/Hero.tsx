import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
  Box,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
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
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Updated links
  const portalLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Customer Portal",
      description: "Access shipping dashboard",
      url: "https://consolmate.com/auth/login/14",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: "Partner Portal",
      description: "Manage partnership",
      url: "https://pp.onlinetracking.co/auth/login/14",
    },
    {
      icon: <SearchCode className="w-5 h-5" />,
      title: "Tracking",
      description: "Track your shipment",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:280",
    },
    {
      icon: <Ship className="w-5 h-5" />,
      title: "Sailing Schedule",
      description: "View schedules",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:280",
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Online Quote",
      description: "Request quotation",
      url: contactPath,
    },
  ];

  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] overflow-hidden pt-8 md:pt-16">
      
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-5"
          >
            <div className="flex items-center gap-3">
              <Globe className="text-brand-gold w-8 h-8" />
              <span className="bg-brand-gold/20 px-4 py-1 rounded-full text-sm border border-brand-gold/30">
                {badgeText || "Beyond Logistics, a Complete Solution"}
              </span>
            </div>

            <h1
              className="text-5xl font-bold text-white"
              dangerouslySetInnerHTML={{
                __html:
                  headline ||
                  'Delivering Excellence in <span class="text-[#f6b100]">Global Logistics</span> Solutions',
              }}
            />

            <p className="text-lg text-white/90">
              {subheadline ||
                "GGL brings over 25 years of expertise in international logistics, offering comprehensive solutions tailored to your business needs."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ✅ Bottom 5 Buttons (hero colors) */}
      <div className="hidden md:flex absolute bottom-10 left-0 w-full justify-center z-20">
        <div className="flex gap-4 bg-brand-navy/80 backdrop-blur-md p-4 rounded-xl border border-brand-gold/30 shadow-lg">
          {portalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-brand-gold">
                {link.icon}
              </span>

              <div className="text-left">
                <div className="text-white font-medium">
                  {link.title}
                </div>

                <div className="text-xs text-white/70">
                  {link.description}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
