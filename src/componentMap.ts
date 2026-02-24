import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LiquidTransportation from "./pages/services/LiquidTransportation";
import ProjectCargo from "./pages/services/ProjectCargo";
import AirFreight from "./pages/services/AirFreight";
import OceanFreight from "./pages/services/OceanFreight";
import CustomsClearance from "./pages/services/CustomsClearance";
import GlobalPresence from "./pages/GlobalPresence";

export const componentMap = {
  Index,
  Contact,
  About,
  Services,
  TermsOfUse,
  PrivacyPolicy,
  LiquidTransportation,
  ProjectCargo,
  AirFreight,
  OceanFreight,
  CustomsClearance,
  GlobalPresence,
};

export const componentKeys = Object.keys(componentMap) as (keyof typeof componentMap)[];