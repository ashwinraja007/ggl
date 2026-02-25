import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import CountrySelector from "../common/CountrySelector";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch active header from Supabase
  const { data: headerData } = useQuery({
    queryKey: ["active-header"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("headers")
        .select("content")
        .eq("is_active", true)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching header:", error);
        return null;
      }
      return data?.content;
    },
  });

  // Function to navigate home & scroll to top
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  // Function to navigate & scroll to top on click
  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  // Default links if none found in DB
  const defaultLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Global Presence", href: "/global-presence" }
  ];

  const links = headerData?.navLinks || defaultLinks;
  const logoSrc = headerData?.logo || "/lovable-uploads/GGL.png";
  const ctaLabel = headerData?.cta?.label || "Contact / Quote";
  const ctaHref = headerData?.cta?.href || "/contact";
  const showCountrySelector = headerData?.showCountrySelector !== false;

  return <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white py-2 shadow-sm' : 'bg-white/95 py-2'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Logo for all views */}
            <img src={logoSrc} alt="GGL Logo" onClick={handleLogoClick} className="h-16 w-auto cursor-pointer transition-all duration-300 object-fill" />
            
            {/* Only show separator and 1Global logo on larger screens */}
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <a
  href="https://1ge.sg"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit 1 Global Enterprises Website"
>
            <img src="/1GlobalEnterprises.png" alt="1 Global Enterprises Logo" className="hidden md:block h-10 w-auto object-contain transition-all duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-md p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {links.map((link: any) => (
              <button 
                key={link.label}
                onClick={() => handleNavClick(link.href)} 
                className={`text-gray-800 hover:text-brand-gold font-medium transition-colors py-1 ${location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href)) ? 'text-brand-gold' : ''}`}
              >
                {link.label}
              </button>
            ))}
            {showCountrySelector && <CountrySelector />}
            <button onClick={() => handleNavClick(ctaHref)} className="px-5 py-2 bg-[#F6B100] text-black rounded-full hover:bg-[#FFCC33] transition font-medium">
              {ctaLabel}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
          <nav className="flex flex-col py-4 gap-4 border-t mt-4 border-gray-100">
            {links.map((link: any) => (
              <button 
                key={link.label}
                onClick={() => handleNavClick(link.href)} 
                className={`text-gray-800 hover:text-brand-gold font-medium ${location.pathname === link.href ? 'text-brand-gold' : ''}`}
              >
                {link.label}
              </button>
            ))}
            {showCountrySelector && <CountrySelector />}
            <button onClick={() => handleNavClick(ctaHref)} className="px-4 py-2 bg-brand-gold text-brand-navy rounded-md hover:bg-amber-500 text-center font-medium w-full">
              {ctaLabel}
            </button>
          </nav>
        </div>
      </div>
    </header>;
};
