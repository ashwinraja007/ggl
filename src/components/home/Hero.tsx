import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn Button; safe without custom variants
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
  Box,
  Globe,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

/** Local, dependency-free hook (avoids '@/hooks/use-mobile' import issues) */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export const Hero: React.FC = () => {
  // Mobile quick links panel (bottom), desktop dropdown, mobile side drawer
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Gate entrance animations
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Close drawer when breakpoint changes up
  useEffect(() => {
    if (!isMobile) setIsDrawerOpen(false);
  }, [isMobile]);

  // Lock page scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Click outside / Escape for portals dropdown
  useEffect(() => {
    if (!isPortalOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        setIsPortalOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPortalOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isPortalOpen]);

  const portalLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Consolmate",
      description: "Access shipping dashboard",
      url: "/customer-portal",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: "Partner Portal",
      description: "Manage partnership",
      url: "/partner-portal",
    },
    {
      icon: <SearchCode className="w-5 h-5" />,
      title: "Tracking",
      description: "Track your shipment",
      url: "/tracking",
    },
    {
      icon: <Ship className="w-5 h-5" />,
      title: "Sailing Schedule",
      description: "View schedules",
      url: "/schedule",
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Container Sizes",
      description: "View dimensions",
      url: "/containers",
    },
  ];

  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] overflow-hidden pt-8 md:pt-16">
      {/* Mobile hamburger / close */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          type="button"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsDrawerOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md border border-white/20 bg-black/60 text-white backdrop-blur px-3 py-2 shadow-md hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-yellow-400/60"
        >
          {isDrawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop Portals dropdown */}
      <div className="fixed top-4 right-4 z-50 hidden md:block" ref={portalRef}>
        <button
          type="button"
          onClick={() => setIsPortalOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={isPortalOpen}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/60 text-white backdrop-blur px-4 py-2 text-sm shadow-md hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-yellow-400/60"
        >
          <Globe className="h-5 w-5 text-yellow-400" />
          Portals
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isPortalOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isPortalOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16 }}
              className="mt-2 w-[360px] rounded-lg border border-yellow-400/30 bg-black/80 backdrop-blur shadow-xl overflow-hidden"
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
                    <span className="text-yellow-400 bg-white/10 p-2 rounded-md">
                      {link.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-white truncate">{link.title}</div>
                      <div className="text-xs text-white/70 truncate">{link.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-3 flex gap-2">
                <Link to="/contact" onClick={() => setIsPortalOpen(false)} className="flex-1">
                  <Button className="w-full bg-yellow-400 text-black hover:bg-amber-400">
                    Get A Quote
                  </Button>
                </Link>
                <Link to="/services" onClick={() => setIsPortalOpen(false)} className="flex-1">
                  <Button className="w-full bg-yellow-400 text-black hover:bg-amber-400">
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", damping: 25, stiffness: 300 }
            }
            className="fixed top-0 right-0 w-4/5 h-screen bg-black/85 backdrop-blur-lg z-50 shadow-xl border-l border-yellow-400/30 flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 mt-12 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Global Logistics</h2>
              </div>

              <nav className="space-y-4">
                {portalLinks.map((link, idx) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.06 }}
                    className="border-b border-white/20 pb-3"
                  >
                    <Link
                      to={link.url}
                      className="flex items-center gap-3 text-white"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <span className="text-yellow-400">{link.icon}</span>
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
                  <Link to="/contact" onClick={() => setIsDrawerOpen(false)}>
                    <Button className="w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-yellow-400 text-black hover:bg-amber-400">
                      Get A Quote
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/services" onClick={() => setIsDrawerOpen(false)}>
                    <Button className="w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-yellow-400 text-black hover:bg-amber-400">
                      Our Services
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Background image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* Put your image in /public as /homeimage.jpg (Vite/CRA) */}
        <img
          src="/homeimage.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </motion.div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-4 md:space-y-5 text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 mb-2"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 4, ease: "linear", repeat: Infinity }
                }
                className="text-yellow-400"
              >
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(246,177,0,0.8)]" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
                className="inline-block bg-yellow-400/20 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-yellow-400/30"
              >
                Beyond Logistics, a Complete Solution
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Delivering Excellence in <span className="text-yellow-400">Global Logistics</span> Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-xl"
            >
              GGL brings over 25 years of expertise in international logistics, offering comprehensive
              solutions tailored to your business needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link to="/contact">
                  <Button className="w-full shadow-lg hover:shadow-xl transition-all duration-300 bg-yellow-400 text-black hover:bg-amber-400 py-0 rounded-md my-[3px] font-bold px-[17px] mx-0">
                    Get A Quote
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link to="/services">
                  <Button className="w-full shadow-lg hover:shadow-xl transition-all duration-300 bg-yellow-400 text-black hover:bg-amber-400 py-0 rounded-md my-[3px] font-bold px-[17px] mx-0">
                    Our Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE ONLY: Quick Access (bottom toggler + panel) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 1.1 }}
        className="container mx-auto px-4 sm:px-6 absolute bottom-8 left-0 z-10 md:hidden"
      >
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsQuickOpen((v) => !v)}
            className="rounded-md border border-white/20 bg-black/60 text-white backdrop-blur px-4 py-2 text-sm shadow-md hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-yellow-400/60"
            aria-expanded={isQuickOpen}
            aria-controls="mobile-quick-links"
          >
            {isQuickOpen ? "Hide Quick Links" : "Show Quick Links"}
          </button>
        </div>

        <AnimatePresence>
          {isQuickOpen && (
            <motion.div
              id="mobile-quick-links"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
              className="space-y-2 mt-3 overflow-hidden bg-black/70 backdrop-blur-md rounded-lg border border-yellow-400/30 shadow-lg"
            >
              {portalLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.05 }}
                  className="hover:bg-white/15 transition-colors"
                >
                  <Link
                    to={link.url}
                    className="w-full p-4 flex items-center space-x-4 text-white"
                    onClick={() => setIsQuickOpen(false)}
                  >
                    <span className="text-yellow-400 bg-white/10 p-2 rounded-full">
                      {link.icon}
                    </span>
                    <div className="text-left">
                      <div className="font-medium">{link.title}</div>
                      <div className="text-xs text-white/80">{link.description}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Hero;
