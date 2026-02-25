import { lazy } from 'react';

// --- Static Pages ---
// Components that are not driven by the database content model.
const Home = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const GlobalPresence = lazy(() => import('./pages/GlobalPresence'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsOfUse'));

// --- Legacy Service Pages ---
// Kept for existing routes until they are migrated to the dynamic system.
const AirFreight = lazy(() => import('./pages/services/AirFreight'));
const OceanFreight = lazy(() => import('./pages/services/OceanFreight'));
const CustomsClearance = lazy(() => import('./pages/services/CustomsClearance'));
const LiquidTransportation = lazy(() => import('./pages/services/LiquidTransportation'));
const ProjectCargo = lazy(() => import('./pages/services/ProjectCargo'));

// --- The New Dynamic Page Component ---
// This single component renders any page created in the admin panel.
const DynamicPage = lazy(() => import('./pages/DynamicPage'));


// The componentMap is used by the router in App.tsx to resolve a string key to a component.
export const componentMap: Record<string, React.ComponentType> = {
  // Static
  Home,
  About,
  Services,
  GlobalPresence,
  Contact,
  PrivacyPolicy,
  TermsAndConditions,

  // Legacy
  AirFreight,
  OceanFreight,
  CustomsClearance,
  LiquidTransportation,
  ProjectCargo,

  // Dynamic
  DynamicPage,
};

// componentKeys is an array of the keys, used in the admin UI for dropdowns.
export const componentKeys = Object.keys(componentMap);