import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  extraMeta?: Record<string, string>;
}

export const META_CONFIG: Record<string, MetaConfig> = {
  '/': {
    title: 'GGL Australia | Freight Forwarding, Logistics & Supply Chain Experts',
    description:
      'GGL Australia provides reliable freight forwarding, advanced logistics, and smart supply chain solutions. From international shipping to warehousing, we connect businesses with efficient end-to-end logistics services.',
    keywords:
      'GGL Australia, Freight forwarding services, Supply chain solutions, Logistics experts, International freight, Global shipping, Warehousing services, Transportation logistics, 1 Global Enterprises, End-to-end supply chain',
    extraMeta: {
      'google-site-verification': 'bbr6J6GzhDAbK0P6IGtWfD0_DDicrjI0Sli8oXqyuYo',
    },
  },
  '/about': {
    title: 'About GGL Australia – Expert Freight Forwarding & Logistics',
    description:
      'Discover GGL Australia, a global freight forwarder with over 25 years of experience in international and domestic logistics. We specialize in premium freight forwarding, warehousing, transportation, and end-to-end supply chain solutions—backed by deep industry expertise.',
    keywords:
      'GGL Australia, freight forwarding, logistics solutions, supply chain management, warehousing services, transportation logistics, international logistics, domestic freight, end-to-end logistics',
  },
  '/services': {
    title: 'Services — GGL Australia | Freight Forwarding & Supply Chain Solutions',
    description:
      'Explore GGL Australia’s expert freight forwarding, warehousing, transport, and supply chain services. Tailored logistics solutions for smooth, end-to-end delivery.',
    keywords:
      'GGL Australia, freight forwarding services, warehousing solutions, transportation logistics, supply chain management, logistics services, end-to-end delivery, international shipping',
  },
  '/services/air-freight': {
    title: 'Air Freight Services – GGL Australia | Global Logistics Solutions',
    description:
      'GGL Australia offers reliable and efficient air freight solutions tailored to your business needs. From express shipments to specialized cargo, we ensure timely and secure delivery worldwide.',
    keywords:
      'GGL Australia, air freight services, global logistics, express shipments, specialized cargo, international shipping, secure delivery, timely delivery, freight forwarding',
  },
  '/services/ocean-freight': {
    title: 'Ocean Freight Services – GGL Australia | Global Shipping Solutions',
    description:
      'GGL Australia offers comprehensive ocean freight services tailored to your shipping needs. Leverage our extensive global network and competitive pricing for reliable and efficient delivery worldwide.',
    keywords:
      'GGL Australia, ocean freight services, global shipping, international shipping, container shipping, freight forwarding, logistics solutions, sea freight, supply chain management',
  },
  '/services/customs-clearance': {
    title: 'Customs Clearance Services – GGL Australia | Smooth Cross-Border Logistics',
    description:
      'GGL Australia offers expert customs clearance services to ensure your shipments move smoothly across borders. We handle all aspects of the process, providing efficient and compliant solutions for your logistics needs.',
    keywords:
      'GGL Australia, customs clearance services, cross-border logistics, import/export compliance, customs brokerage, international shipping, freight forwarding, logistics solutions',
  },
  '/services/liquid-transportation': {
    title: 'Liquid Transportation Services – GGL Australia | Safe & Compliant Delivery',
    description:
      'GGL Australia offers specialized liquid transportation solutions, ensuring safe, compliant, and efficient delivery of hazardous and non-hazardous liquids. Our end-to-end logistics services include pre-shipment planning, route optimization, and temperature-controlled transport.',
    keywords:
      'GGL Australia, liquid transportation services, hazardous liquid transport, non-hazardous liquid transport, temperature-controlled logistics, end-to-end logistics, route optimization, pre-shipment planning, compliance logistics',
  },
  '/services/project-cargo': {
    title: 'Project Cargo Services – GGL Australia | Heavy & Oversized Freight Solutions',
    description:
      'GGL Australia specializes in project cargo logistics, providing tailored solutions for the transport of heavy and oversized equipment. Our services include route surveys, lifting plans, and end-to-end project management to ensure safe and efficient delivery.',
    keywords:
      'GGL Australia, project cargo services, heavy freight logistics, oversized cargo transport, lifting plans, route surveys, end-to-end project management, specialized freight solutions, industrial equipment transport',
  },
  '/global-presence': {
    title: 'Global Presence – GGL Australia | Worldwide Logistics Network',
    description:
      "Explore GGL Australia's extensive global network of offices and partners. Our worldwide presence ensures seamless logistics solutions tailored to your business needs, wherever you are.",
    keywords:
      'GGL Australia, global logistics network, worldwide presence, international shipping, logistics solutions, freight forwarding, global partners, supply chain management',
  },
  '/contact': {
    title: 'Contact GGL Australia | Freight & Logistics Solutions',
    description:
      'Get in touch with GGL Australia for all your freight and logistics needs. Reach out via our contact form, email, or phone to discuss tailored solutions for your business.',
    keywords:
      'GGL Australia, contact GGL Australia, freight solutions, logistics services, supply chain management, customer support, logistics consultation, freight forwarding, international shipping',
  },
  '/privacy-policy': {
    title: 'Privacy Policy – GGL Australia | Data Protection & User Privacy',
    description:
      'Learn how GGL Australia collects, uses, and protects your personal information. Our privacy policy outlines our data practices and your rights regarding your data.',
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions – GGL Australia | Freight & Logistics Services',
    description:
      "Review the terms and conditions governing the use of GGL Australia's freight and logistics services. Understand our policies on services, liabilities, and user responsibilities.",
  },
};

export function useSEO() {
  const location = useLocation();

  useEffect(() => {
    const config = META_CONFIG[location.pathname];
    if (!config) return;

    document.title = config.title;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', config.description);
    if (config.keywords) {
      setMeta('keywords', config.keywords);
    }
    if (config.extraMeta) {
      Object.entries(config.extraMeta).forEach(([name, content]) => setMeta(name, content));
    }
  }, [location.pathname]);
}
