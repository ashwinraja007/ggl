import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase"; // Assuming you have this
import { Loader2 } from "lucide-react";

import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { componentMap } from "./componentMap";

const queryClient = new QueryClient();

type Page = {
  id: number;
  path: string;
  component_key: keyof typeof componentMap;
};

const fetchPages = async (): Promise<Page[]> => {
  const { data, error } = await supabase.from("pages").select("id, path, component_key");
  if (error) {
    console.error("Error fetching dynamic pages:", error);
    return []; // Return empty array on error to prevent crash
  }
  return data || [];
};

const DynamicRoutes = () => {
  const { data: pages, isLoading, isError } = useQuery({
    queryKey: ['dynamic-pages'],
    queryFn: fetchPages,
  });

  useEffect(() => {
    if (pages) {
      console.log("Dynamic Router Loaded Pages:", pages);
    }
  }, [pages]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (isError) {
    // You might want a more robust error page here
    return <p>Error loading page configuration.</p>;
  }

  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>}>
      <Routes>
        {/* Static routes that are always present */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Core Static Pages */}
        <Route path="/" element={<componentMap.Home />} />
        <Route path="/about" element={<componentMap.About />} />
        <Route path="/services" element={<componentMap.Services />} />
        <Route path="/global-presence" element={<componentMap.GlobalPresence />} />
        <Route path="/contact" element={<componentMap.Contact />} />
        <Route path="/privacy-policy" element={<componentMap.PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<componentMap.TermsAndConditions />} />

        {/* Legacy Service Pages */}
        <Route path="/services/air-freight" element={<componentMap.AirFreight />} />
        <Route path="/services/ocean-freight" element={<componentMap.OceanFreight />} />
        <Route path="/services/customs-clearance" element={<componentMap.CustomsClearance />} />
        <Route path="/services/liquid-transportation" element={<componentMap.LiquidTransportation />} />
        <Route path="/services/project-cargo" element={<componentMap.ProjectCargo />} />

        {/* Render routes from the database */}
        {pages?.map(({ path, component_key }) => {
          const Component = componentMap[component_key] as React.ComponentType | undefined;
          if (!Component) {
            console.warn(`Component for key "${component_key}" not found.`);
            return null;
          }

          // Skip if path is already defined statically to prevent conflicts
          const staticPaths = [
            '/', '/about', '/services', '/global-presence', '/contact', '/privacy-policy', '/terms-and-conditions',
            '/services/air-freight', '/services/ocean-freight', '/services/customs-clearance', '/services/liquid-transportation', '/services/project-cargo'
          ];
          if (staticPaths.includes(path)) return null;

          return <Route key={path} path={path} element={<Component />} />;
        })}

        {/* Fallback 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <DynamicRoutes />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
