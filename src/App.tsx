import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
    <Routes>
      {/* Static routes that are always present */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Render routes from the database */}
      {pages?.map(({ path, component_key }) => {
        const Component = componentMap[component_key];
        if (!Component) {
          console.warn(`Component for key "${component_key}" not found.`);
          return null;
        }
        return <Route key={path} path={path} element={<Component />} />;
      })}

      {/* Fallback 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
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
