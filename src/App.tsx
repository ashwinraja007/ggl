
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import LiquidTransportation from "./pages/services/LiquidTransportation";
import ProjectCargo from "./pages/services/ProjectCargo";
import AirFreight from "./pages/services/AirFreight";
import OceanFreight from "./pages/services/OceanFreight";
import CustomsClearance from "./pages/services/CustomsClearance";
import GlobalPresence from "./pages/GlobalPresence";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// App component as a regular function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsOfUse />} />
            <Route path="/global-presence" element={<GlobalPresence />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Service specific pages */}
            <Route path="/services/liquid-transportation" element={<LiquidTransportation />} />
            <Route path="/services/air-freight" element={<AirFreight />} />
            <Route path="/services/project-cargo" element={<ProjectCargo />} />
            <Route path="/services/ocean-freight" element={<OceanFreight />} />
            <Route path="/services/customs-clearance" element={<CustomsClearance />} />
            <Route path="*" element={<Index  />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
