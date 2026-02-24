import { Suspense, lazy } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import SEO from '@/components/SEO';
import { useQuery } from '@tanstack/react-query';
import { fetchPageContent } from '@/lib/content';

// Lazy load components
const Hero = lazy(() => import("@/components/home/Hero"));
const AboutUs = lazy(() => import("@/components/home/AboutUs"));
// const Memberships = lazy(() => import("@/components/home/Memberships"));
const Services = lazy(() => import("@/components/home/Services"));
const GlobalPresence = lazy(() => import("@/components/home/GlobalPresence"));
const QuickEnquiry = lazy(() => import("@/components/home/QuickEnquiry"));

// Loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[100px]">
    <Loader2 className="h-6 w-6 animate-spin text-brand-gold" />
  </div>
);

const Index = () => {
  const { data: pageContent } = useQuery({
    queryKey: ["page-content", "/"],
    queryFn: () => fetchPageContent("/"),
  });

  // Helper to safely get content
  const getContent = (sectionKey: string) => {
    const record = pageContent?.find(r => r.section_key.toLowerCase() === sectionKey.toLowerCase());
    if (!record?.content) return null;
    let content = record.content;
    if (typeof content === 'string') {
      try { content = JSON.parse(content); } catch (e) { console.error("Error parsing content", e); }
    }
    return { content, images: record.images };
  };

  const heroData = getContent('hero');
  const aboutData = getContent('about_us');
  const servicesData = getContent('services');
  const globalData = getContent('global_presence');
  const enquiryData = getContent('quick_enquiry');

  const homeData = {
    badgeText: heroData?.content?.badge || "Beyond Logistics, a Complete Solution",
    headline: heroData?.content?.title || "Delivering Excellence in Global Logistics Solutions",
    subheadline: heroData?.content?.subtitle || "GGL brings over 25 years of expertise in international logistics, offering comprehensive solutions tailored to your business needs.",
    sliderImages: heroData?.images?.slider || ["/lovable-uploads/ocean.jpg", "/lovable-uploads/airfreight.jpg"],
    consolamateLink: heroData?.content?.consolamate_link || "https://consolamate.com.au"
  };

  const aboutProps = {
    title: aboutData?.content?.title || "About Us",
    subtitle: aboutData?.content?.subtitle || "",
    content: aboutData?.content?.body || "GGL is a proud subsidiary of 1 Global Enterprises, a dynamic investment company with a diverse portfolio in freight forwarding, supply chain management, and logistics technology.",
    image: aboutData?.images?.main || "/lovable-uploads/gp.jpg"
  };

  const servicesProps = {
    title: servicesData?.content?.title || "Our Core Services",
    subtitle: servicesData?.content?.subtitle || "Discover our comprehensive range of logistics solutions designed to meet your global shipping needs.",
    items: servicesData?.content?.items
  };

  const globalProps = {
    title: globalData?.content?.title || "Global Presence",
    subtitle: globalData?.content?.subtitle || "Our logistics network spans across continents, enabling seamless global shipping solutions."
  };

  const enquiryProps = {
    title: enquiryData?.content?.title || "Quick Enquiry",
    subtitle: enquiryData?.content?.subtitle || "Have a question? Fill out the form below and we'll get back to you shortly."
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ✅ Add SEO component here */}
      <SEO 
        title="GGL Australia | Freight Forwarding, Logistics & Supply Chain Experts"
        description="GGL Australia provides reliable freight forwarding, advanced logistics, and smart supply chain solutions. From international shipping to warehousing, we connect businesses with efficient end-to-end logistics services."
        keywords="GGL Australia, Freight forwarding services, Supply chain solutions, Logistics experts, International freight, Global shipping, Warehousing services, Transportation logistics, 1 Global Enterprises, End-to-end supply chain"
        url="https://www.gglaustralia.com/"
        image="https://www.gglaustralia.com/lovable-uploads/ggl-logo.png"
      />

      <Header />
      <main className="flex-grow pt-16">
        <Suspense fallback={<LoadingComponent />}>
          <Hero 
            badgeText={homeData.badgeText}
            headline={homeData.headline}
            subheadline={homeData.subheadline}
            sliderImages={homeData.sliderImages}
            consolamateLink={homeData.consolamateLink}
          />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <AboutUs {...aboutProps} />
        </Suspense>

        {/* Memberships is hidden
        <Suspense fallback={<LoadingComponent />}>
          <Memberships />
        </Suspense>
        */}

        <Suspense fallback={<LoadingComponent />}>
          <Services {...servicesProps} />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <GlobalPresence {...globalProps} />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <QuickEnquiry {...enquiryProps} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
