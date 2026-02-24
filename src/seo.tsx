import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string;
  extraMeta?: Record<string, string> | null;
  url?: string;
  canonical?: string;
  image?: string;
}

export interface SeoRecord extends Omit<MetaConfig, 'extraMeta' | 'url' | 'canonical' | 'image'> {
  extra_meta?: Record<string, string> | null;
}

export const META_CONFIG: Record<string, MetaConfig> = {
  "/": {
    title: "GGL Australia | Freight Forwarding, Logistics & Supply Chain Experts",
    description:
      "GGL Australia provides reliable freight forwarding, advanced logistics, and smart supply chain solutions. From international shipping to warehousing, we connect businesses with efficient end-to-end logistics services.",
    keywords:
      "GGL Australia, Freight forwarding services, Supply chain solutions, Logistics experts, International freight, Global shipping, Warehousing services, Transportation logistics, 1 Global Enterprises, End-to-end supply chain",
    extraMeta: {
      "google-site-verification": "bbr6J6GzhDAbK0P6IGtWfD0_DDicrjI0Sli8oXqyuYo",
    },
  },
  "/about": {
    title: "About GGL Australia – Expert Freight Forwarding & Logistics",
    description:
      "Discover GGL Australia, a global freight forwarder with over 25 years of experience in international and domestic logistics. We specialize in premium freight forwarding, warehousing, transportation, and end-to-end supply chain solutions—backed by deep industry expertise.",
    keywords:
      "GGL Australia, freight forwarding, logistics solutions, supply chain management, warehousing services, transportation logistics, international logistics, domestic freight, end-to-end logistics",
  },
  "/services": {
    title: "Services — GGL Australia | Freight Forwarding & Supply Chain Solutions",
    description: "Explore GGL Australia’s expert freight forwarding, warehousing, transport, and supply chain services. Tailored logistics solutions for smooth, end-to-end delivery.",
    keywords: "GGL Australia, freight forwarding services, warehousing solutions, transportation logistics, supply chain management, logistics services, end-to-end delivery, international shipping",
    url: "https://www.gglaustralia.com/services",
    canonical: "https://www.gglaustralia.com/services",
    image: "https://www.gglaustralia.com/lovable-uploads/ggl-logo.png",
  },
  "/services/air-freight": {
    title: "Air Freight Services – GGL Australia | Global Logistics Solutions",
    description:
      "GGL Australia offers reliable and efficient air freight solutions tailored to your business needs. From express shipments to specialized cargo, we ensure timely and secure delivery worldwide.",
    keywords:
      "GGL Australia, air freight services, global logistics, express shipments, specialized cargo, international shipping, secure delivery, timely delivery, freight forwarding",
    url: "https://www.gglaustralia.com/services/air-freight",
    canonical: "https://www.gglaustralia.com/services/air-freight",
    image: "https://www.gglaustralia.com/lovable-uploads/ggl-logo.png",
  },
  "/services/ocean-freight": {
    title: "Ocean Freight Services – GGL Australia | Global Shipping Solutions",
    description:
      "GGL Australia offers comprehensive ocean freight services tailored to your shipping needs. Leverage our extensive global network and competitive pricing for reliable and efficient delivery worldwide.",
    keywords:
      "GGL Australia, ocean freight services, global shipping, international shipping, container shipping, freight forwarding, logistics solutions, sea freight, supply chain management",
    url: "https://www.gglaustralia.com/services/ocean-freight",
    canonical: "https://www.gglaustralia.com/services/ocean-freight",
    image: "https://www.gglaustralia.com/lovable-uploads/ggl-logo.png",
  },
  "/services/customs-clearance": {
    title: "Customs Clearance Services – GGL Australia | Smooth Cross-Border Logistics",
    description:
      "GGL Australia offers expert customs clearance services to ensure your shipments move smoothly across borders. We handle all aspects of the process, providing efficient and compliant solutions for your logistics needs.",
    keywords:
      "GGL Australia, customs clearance services, cross-border logistics, import/export compliance, customs brokerage, international shipping, freight forwarding, logistics solutions",
    url: "https://www.gglaustralia.com/services/customs-clearance",
    canonical: "https://www.gglaustralia.com/services/customs-clearance",
    image: "https://www.gglaustralia.com/lovable-uploads/ggl-logo.png",
  },
  "/services/liquid-transportation": {
    title: "Liquid Transportation Services – GGL Australia | Safe & Compliant Delivery",
    description:
      "GGL Australia offers specialized liquid transportation solutions, ensuring safe, compliant, and efficient delivery of hazardous and non-hazardous liquids. Our end-to-end logistics services include pre-shipment planning, route optimization, and temperature-controlled transport.",
    keywords:
      "GGL Australia, liquid transportation services, hazardous liquid transport, non-hazardous liquid transport, temperature-controlled logistics, end-to-end logistics, route optimization, pre-shipment planning, compliance logistics",
  },
  "/services/project-cargo": {
    title: "Project Cargo Services – GGL Australia | Heavy & Oversized Freight Solutions",
    description:
      "GGL Australia specializes in project cargo logistics—heavy, oversized, and high-value equipment. We handle route surveys, lifting plans, permits, and end-to-end project management for safe, on-time delivery.",
    keywords:
      "GGL Australia, project cargo services, heavy freight logistics, oversized cargo transport, lifting plans, route surveys, end-to-end project management, specialized freight solutions, industrial equipment transport",
    url: "https://www.gglaustralia.com/services/project-cargo",
    canonical: "https://www.gglaustralia.com/services/project-cargo",
    image: "https://www.gglaustralia.com/projectcargo3.png",
  },
  "/global-presence": {
    title: "Global Presence – GGL Australia | Worldwide Logistics Network",
    description:
      "Explore GGL Australia's extensive global network of offices and partners. Our worldwide presence ensures seamless logistics solutions tailored to your business needs, wherever you are.",
    keywords:
      "GGL Australia, global logistics network, worldwide presence, international shipping, logistics solutions, freight forwarding, global partners, supply chain management",
  },
  "/contact": {
    title: "Contact GGL Australia | Freight & Logistics Solutions",
    description:
      "Get in touch with GGL Australia for all your freight and logistics needs. Reach out via our contact form, email, or phone to discuss tailored solutions for your business.",
    keywords:
      "GGL Australia, contact GGL Australia, freight solutions, logistics services, supply chain management, customer support, logistics consultation, freight forwarding, international shipping",
  },
  "/privacy-policy": {
    title: "Privacy Policy – GGL Australia | Data Protection & User Privacy",
    description:
      "Learn how GGL Australia collects, uses, and protects your personal information. Our privacy policy outlines our data practices and your rights regarding your data.",
    keywords: "GGL Australia, privacy policy, data protection, user privacy, data collection, cookies, personal information, GDPR, security",
    url: "https://www.gglaustralia.com/privacy-policy",
    canonical: "https://www.gglaustralia.com/privacy-policy",
    image: "https://www.gglaustralia.com/lovable-uploads/ggl-logo.png",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions – GGL Australia | Freight & Logistics Services",
    description:
      "Review the terms and conditions governing the use of GGL Australia's freight and logistics services. Understand our policies on services, liabilities, and user responsibilities.",
  },
};

function applyMeta(config?: MetaConfig) {
  if (!config) return;
  if (config.title) {
    document.title = config.title;
  }

  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
    let element = document.querySelector(selector) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement("meta");
      if (isProperty) {
        element.setAttribute("property", name);
      } else {
        element.setAttribute("name", name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const setLink = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", rel);
      document.head.appendChild(element);
    }
    element.setAttribute("href", href);
  };

  if (config.description) {
    setMeta("description", config.description);
    setMeta("og:description", config.description, true);
  }

  if (config.keywords) {
    setMeta("keywords", config.keywords);
  }

  if (config.title) {
    setMeta("og:title", config.title, true);
  }

  if (config.url) {
    setMeta("og:url", config.url, true);
  }

  if (config.image) {
    setMeta("og:image", config.image, true);
  }

  if (config.canonical) {
    setLink("canonical", config.canonical);
  }

  if (config.extraMeta) {
    Object.entries(config.extraMeta).forEach(([name, content]) => {
      if (typeof content === "string") {
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          setMeta(name, content, true);
        } else {
          setMeta(name, content);
        }
      }
    });
  }
}

export function useSEO(dynamicRecord?: SeoRecord | null) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const fallbackConfig = META_CONFIG[path];

    applyMeta(fallbackConfig);

    if (dynamicRecord) {
      const mergedExtraMeta = {
        ...(fallbackConfig?.extraMeta ?? {}),
        ...(dynamicRecord.extra_meta ?? {}),
      };

      const dynamicConfig: MetaConfig = {
        title: dynamicRecord.title ?? fallbackConfig?.title,
        description: dynamicRecord.description ?? fallbackConfig?.description,
        keywords: dynamicRecord.keywords ?? fallbackConfig?.keywords,
        extraMeta: Object.keys(mergedExtraMeta).length > 0 ? mergedExtraMeta : null,
      };
      applyMeta(dynamicConfig);
    }
  }, [location.pathname, dynamicRecord]);
}
