import { Suspense, lazy } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import SEO from '@/components/SEO';
import { useQuery } from "@tanstack/react-query";

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
  const { data: homeData, isLoading } = useQuery({
    queryKey: ['home-content'],
    queryFn: async () => {
      const response = await fetch('/data/home.json');
      if (!response.ok) {
        throw new Error('Failed to fetch home content');
      }
      return response.json();
    }
  });

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
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <Hero 
              badgeText={homeData?.badgeText}
              headline={homeData?.headline}
              subheadline={homeData?.subheadline}
              sliderImages={homeData?.sliderImages}
            />
          )}
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <AboutUs />
        </Suspense>

        {/* Memberships is hidden
        <Suspense fallback={<LoadingComponent />}>
          <Memberships />
        </Suspense>
        */}

        <Suspense fallback={<LoadingComponent />}>
          <Services />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <GlobalPresence />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <QuickEnquiry />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
