import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string;
  extraMeta?: Record<string, string>;
  canonical?: string;
  image?: string;
}

type SeoDatabase = Record<string, MetaConfig>;

function applyMeta(config?: MetaConfig) {
  if (!config) return;

  if (config.title) {
    document.title = config.title;
  }

  const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  if (config.description) {
    setMeta("name", "description", config.description);
    setMeta("property", "og:description", config.description);
  }

  if (config.keywords) {
    setMeta("name", "keywords", config.keywords);
  }

  if (config.extraMeta) {
    Object.entries(config.extraMeta).forEach(([name, content]) => {
      if (typeof content === "string") {
        setMeta("name", name, content);
      }
    });
  }
}

export function useSEO() {
  const location = useLocation();
  const [seoDb, setSeoDb] = useState<SeoDatabase | null>(null);

  useEffect(() => {
    // In a real app, this would be fetched once and stored in a context
    // to avoid re-fetching on every navigation.
    fetch('/content/seo.json')
      .then(res => res.json())
      .then(data => setSeoDb(data))
      .catch(err => console.error("Failed to load SEO database", err));
  }, [location.pathname]);

  useEffect(() => {
    if (!seoDb) return;

    const path = location.pathname;
    const pageSeo = seoDb[path];
    const fallbackSeo = seoDb["/"]; // Default fallback

    if (pageSeo) {
      applyMeta({
        ...fallbackSeo,
        ...pageSeo,
        extraMeta: { ...fallbackSeo?.extraMeta, ...pageSeo?.extraMeta },
      });
    } else {
      applyMeta(fallbackSeo);
    }
  }, [location.pathname, seoDb]);
}
