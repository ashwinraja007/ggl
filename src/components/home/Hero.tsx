import React, { useEffect, useMemo, useRef, useState } from "react";
import { Users, UserCircle, SearchCode, Ship, Calendar, Globe } from "lucide-react";

/** Utility: join class names */
function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const sliderImages = useMemo<string[]>(
    () => ["/homeimage.jpg"], // add more images if you like
    []
  );

  // Gate entrance animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), reducedMotion ? 0 : 300);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Background slider (skips interval if only 1 image or reduced motion)
  useEffect(() => {
    if (sliderImages.length <= 1 || reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [sliderImages.length, reducedMotion]);

  // ------ Customer Portal Modal helpers ------
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Open modal: lock scroll + focus management
  useEffect(() => {
    if (isCustomerPortalOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // Focus first focusable in modal
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      // Return focus
      previouslyFocused.current?.focus?.();
      // Pause any playing videos
      const vids = modalRef.current?.querySelectorAll("video");
      vids?.forEach((v) => {
        try {
          (v as HTMLVideoElement).pause();
        } catch {}
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCustomerPortalOpen]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCustomerPortalOpen(false);
    };
    if (isCustomerPortalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isCustomerPortalOpen]);

  // Click outside to close
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsCustomerPortalOpen(false);
  };

  // Very small focus trap
  const onTrapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const root = modalRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  };

  const portalLinks = [
    {
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Consolmate",
      description: "Access shipping dashboard",
      onClick: () => setIsCustomerPortalOpen(true),
    },
  ] as const;

  return (
    <section className="relative min-h-screen overflow-hidden pt-8 md:pt-16">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={cx(
              "absolute inset-0 transition-opacity ease-in-out",
              reducedMotion ? "duration-0" : "duration-1000",
              activeSlide === index ? "opacity-100" : "opacity-0"
            )}
            style={{ zIndex: activeSlide === index ? 1 : 0 }}
          >
            <img
              src={image}
              alt={`Background slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-start z-[2]">
        <div className="container mx-auto h-full flex items-center px-4 md:px-6 lg:px-8">
          <div
            className={cx(
              "max-w-2xl space-y-4 md:space-y-5 text-left transition-all transform",
              reducedMotion ? "duration-0" : "duration-700",
              isVisible ? "opacity-100 -translate-y-[3%]" : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cx(
                  "text-yellow-500",
                  reducedMotion ? "" : "animate-[spin_6s_linear_infinite]"
                )}
                aria-hidden="true"
              >
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(246,177,0,0.8)]" />
              </div>
              <span className="inline-block bg-yellow-500/20 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-yellow-500/30">
                Beyond Logistics, a Complete Solution
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Delivering Excellence in <span className="text-yellow-500">Global Logistics</span> Solutions
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              GGL brings over 25 years of expertise in international logistics,
              offering comprehensive solutions tailored to your business needs.
            </p>

            {/* NEW: Action buttons under the text */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Consolmate (gold) -> opens modal */}
              <button
                type="button"
                onClick={() => setIsCustomerPortalOpen(true)}
                className="inline-flex items-center justify-center font-semibold px-5 py-3 rounded-md bg-[#d4af37] text-black hover:bg-amber-400 transition-colors shadow-md"
                aria-label="Open Consolmate customer portal"
              >
                Consolmate
              </button>

              {/* Get a Quote (gold) -> link to /contact */}
              <a href="/contact" aria-label="Get a Quote" className="inline-flex">
                <button
                  type="button"
                  className="inline-flex items-center justify-center font-semibold px-5 py-3 rounded-md bg-[#d4af37] text-black hover:bg-amber-400 transition-colors shadow-md w-full sm:w-auto"
                >
                  Get a Quote
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Buttons (bottom strip) */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-[10] px-2 sm:px-4">
        <div
          className={cx(
            "max-w-7xl mx-auto",
            reducedMotion ? "transition-none" : "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="bg-transparent p-3 sm:p-4 my-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {portalLinks.map((link, index) => {
                const commonBtn = (
                  <div
                    className={cx(
                      "w-full h-12 sm:h-14 md:h-16 flex flex-col gap-1 items-center justify-center text-xs sm:text-sm",
                      "bg-white/90 hover:bg-white text-gray-800 hover:text-blue-900",
                      "transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-105"
                    )}
                  >
                    {link.icon}
                    <span className="font-medium leading-none">{link.title}</span>
                  </div>
                );

                return (
                  <div key={index} className="flex flex-col items-center">
                    {"onClick" in link && link.onClick ? (
                      <button
                        type="button"
                        onClick={link.onClick}
                        className="w-full"
                        aria-label={link.title}
                      >
                        {commonBtn}
                      </button>
                    ) : link.external ? (
                      <a
                        href={(link as any).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        aria-label={`${link.title} (opens in a new tab)`}
                      >
                        {commonBtn}
                      </a>
                    ) : (
                      <a href={(link as any).url} className="w-full" aria-label={link.title}>
                        {commonBtn}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Portal Modal */}
      {isCustomerPortalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[50] flex items-center justify-center p-4"
          onMouseDown={onBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Customer Portal"
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto outline-none"
            ref={modalRef}
            tabIndex={-1}
            onKeyDown={onTrapFocus}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-900">Customer Portal</h2>
                <button
                  ref={closeBtnRef}
                  onClick={() => setIsCustomerPortalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Tutorial Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { src: "/GGL_demo1.mp4", label: "Getting Started" },
                    { src: "/GGL_promo.mp4", label: "Advanced Features" },
                  ].map((video, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video">
                        <video controls className="w-full h-full object-cover" preload="metadata">
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="p-2 bg-gray-50 text-sm font-medium">{video.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsCustomerPortalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <a
                  href="https://consolmate.com/auth/login/14"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Login
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
