import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Users, UserCircle, SearchCode, Ship, Box, Globe, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);            // mobile quick links (bottom)
  const [isVisible, setIsVisible] = useState(false);              // entrance anim gate
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);// side drawer
  const [isPortalOpen, setIsPortalOpen] = useState(false);        // DESKTOP: portals dropdown
  const portalRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Close mobile drawer on breakpoint up
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Body scroll lock for drawer
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Click outside for desktop portals dropdown
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!portalRef.current) return;
      if (!portalRef.current.contains(e.target as Node)) setIsPortalOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPortalOpen(false);
    };
    if (isPortalOpen) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isPortalOpen]);

  const portalLinks = [
    { icon: <Users className="w-5 h-5" />,       title: "Consolmate",       description: "Access shipping dashboard", url: "/customer-portal" },
    { icon: <UserCircle className="w-5 h-5" />,  title: "Partner Portal",   description: "Manage partnership",        url: "/partner-portal" },
    { icon: <SearchCode className="w-5 h-5" />,  title: "Tracking",         description: "Track your shipment",       url: "/tracking" },
    { icon: <Ship className="w-5 h-5" />,        title: "Sailing Schedule", description: "View schedules",            url: "/schedule" },
    { icon: <Box className="w-5 h-5" />,         title: "Container Sizes",  description: "View dimensions",           url: "/containers" },
  ];

  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] overflow-hidden pt-8 md:pt-16">
      {/* Mobile hamburger / close */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-white/20 bg-brand-navy/70 text-white backdrop-blur px-3 py-2 shadow-md hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-brand-gold/60"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* DESKTOP: Portals dropdown button */}
      <div className="fixed top-4 right-4 z-50 hidden md:block" ref={portalRef}>
        <button
          type="button"
          onClick={() => setIsPortalOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={isPortalOpen}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-brand-navy/70 text-white backdrop-blur px-4 py-2 text-sm shadow-md hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-brand-gold/60"
        >
          <Globe className="h-5 w-5 text-brand-gold" />
          Portals
          <ChevronDown className={`h-4 w-4 transition-transform ${isPortalOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isPortalOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16 }}
              className="mt-2 w-[360px] rounded-lg border border-brand-gold/30 bg-brand-navy/95 backdrop-blur shadow-xl overflow-hidden"
            >
              <div className="p-3 grid grid-cols-1 divide-y divide-white/10">
                {portalLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.url}
                    role="menuitem"
                    onClick={() => setIsPortalOpen(false)}
                    className="group flex items-center gap-3 p-3 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-brand-gold bg-white/10 p-2 rounded-md">{link.icon}</span>
                    <div className="min-w-0">
                      <div className="font-medium text-white truncate">{link.title}</div>
                      <div className="text-xs text-white/70 truncate">{link.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-3 flex gap-2">
                <Link to="/contact" onClick={() => setIsPortalOpen(false)} className="flex-1">
                  <Button variant="gold" className="w-full">Get A Quote</Button>
                </Link>
                <Link to="/services" onClick={() => setIsPortalOpen(false)} className="flex-1">
                  <Button variant="gold" className="w-full text-brand-navy">Our Services</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 w-4/5 h-screen bg-brand-navy/95 backdrop-blur-lg z-50 shadow-xl border-l border-brand-gold/30 flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 mt-12 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-brand-gold" />
                <h2 className="text-xl font-bold text-white">Global Logistics</h2>
              </div>

              <nav className="space-y-4">
                {portalLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.06 }}
                    className="border-b border-white/20 pb-3"
                  >
                    <Link
                      to={link.url}
                      className="flex items-center gap-3 text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-brand-gold">{link.icon}</span>
                      <div>
                        <div className="font-medium">{link.title}</div>
                        <div className="text-xs text-white/70">{link.description}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="gold" size="lg" className="w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gold-glow bg-[#d4af37]">
