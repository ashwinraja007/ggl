import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";

// If these components exist, import them normally (no lazy for now)
// Once everything works, you can convert them back to lazy if you want.
import BAboutUs from "@/components/home/BAboutUs";
import BServices from "@/components/home/BServices";
import BGlobalPresence from "@/components/home/BGlobalPresence";
import BQuickEnquiry from "@/components/home/BQuickEnquiry";

const bangladeshNavPaths = {
  home: "/bangladesh",
  about: "/bangladesh/about",
  services: "/bangladesh/services",
  careers: "/bangladesh/careers",
  contact: "/bangladesh/contact",
  globalPresence: "/bangladesh/global-presence",
};

const BangladeshHome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Bangladesh-specific header with BD nav paths */}
      <Header navPaths={bangladeshNavPaths} />

      <main className="flex-grow pt-16">
        {/* Bangladesh Hero */}
        <Hero
          sliderImages={["/oceanf.png", "/hom3.png"]}
          badgeText="Bangladesh Logistics Hub"
          // keep as plain string so it matches a `string` prop type
          headline={
            'Delivering Excellence for <span class="text-yellow-500">Bangladesh</span> Supply Chains'
          }
          subheadline="GGL Bangladesh connects Dhaka with global trade lanes through air, ocean, and land freight expertise backed by local service."
          contactPath="/bangladesh/contact"
        />

        {/* About Bangladesh section */}
        <BAboutUs
          learnMorePath="/bangladesh/about"
          imageSrc="/lovable-uploads/1c085df7-9363-40dc-a724-ff004b473cac.png"
        />

        {/* Bangladesh services */}
        <BServices
          servicesPath="/bangladesh/services"
          cardLinkPrefix="/bangladesh/services"
          singleDestination
        />

        {/* Bangladesh global presence block */}
        <BGlobalPresence linkPath="/bangladesh/global-presence" />

        {/* Common enquiry form (BD variant) */}
        <BQuickEnquiry />
      </main>

      <Footer />
    </div>
  );
};

export default BangladeshHome;
