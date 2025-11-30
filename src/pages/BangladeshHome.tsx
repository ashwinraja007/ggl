import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";

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
      <Header navPaths={bangladeshNavPaths} />

      <main className="flex-grow pt-16">
        <Hero
          sliderImages={["/oceanf.png", "/hom3.png"]}
          badgeText="Bangladesh Logistics Hub"
          headline={
            'Delivering Excellence for <span class="text-yellow-500">Bangladesh</span> Supply Chains'
          }
          subheadline="GGL Bangladesh connects Dhaka with global trade lanes through air, ocean, and land freight expertise backed by local service."
          contactPath="/bangladesh/contact"
        />

        <BAboutUs
          learnMorePath="/bangladesh/about"
          imageSrc="/lovable-uploads/1c085df7-9363-40dc-a724-ff004b473cac.png"
        />

        <BServices
          servicesPath="/bangladesh/services"
          cardLinkPrefix="/bangladesh/services"
          singleDestination
        />

        <BGlobalPresence linkPath="/bangladesh/global-presence" />

        <BQuickEnquiry />
      </main>

      <Footer />
    </div>
  );
};

export default BangladeshHome;
