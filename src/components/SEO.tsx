import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { fetchSeoRecordByPath } from "@/lib/seo";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  canonical?: string;
  image?: string;
  extraMeta?: Record<string, string>;
  path?: string;
}

function setMetaTag(name: string, content: string) {
  if (!content) return;
  let element = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setPropertyMeta(property: string, content: string) {
  if (!content) return;
  let element = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonicalLink(href: string) {
  if (!href) return;
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const SEO = ({
  title,
  description,
  keywords,
  url,
  canonical,
  image,
  extraMeta,
  path,
}: SEOProps) => {
  const location = useLocation();
  const serializedExtraMeta = useMemo(
    () => (extraMeta ? JSON.stringify(extraMeta) : ""),
    [extraMeta],
  );
  const fallbackExtraMeta = useMemo(() => {
    if (!serializedExtraMeta) return undefined;
    try {
      const parsed = JSON.parse(serializedExtraMeta) as Record<string, string>;
      return Object.keys(parsed).length > 0 ? parsed : undefined;
    } catch {
      return undefined;
    }
  }, [serializedExtraMeta]);

  useEffect(() => {
    const currentPath = path ?? location.pathname;
    const canonicalHref = canonical ?? url;
    let isActive = true;

    const applyMeta = (
      meta: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        extraMeta?: Record<string, string> | null;
      },
    ) => {
      if (meta.title) {
        document.title = meta.title;
        setPropertyMeta("og:title", meta.title);
        setMetaTag("twitter:title", meta.title);
      }

      if (meta.description) {
        setMetaTag("description", meta.description);
        setPropertyMeta("og:description", meta.description);
        setMetaTag("twitter:description", meta.description);
      }

      if (meta.keywords) {
        setMetaTag("keywords", meta.keywords);
      }

      if (meta.extraMeta) {
        Object.entries(meta.extraMeta).forEach(([key, value]) => {
          if (typeof value === "string" && value.trim()) {
            setMetaTag(key, value);
          }
        });
      }

      if (canonicalHref) {
        setCanonicalLink(canonicalHref);
      }

      if (url) {
        setPropertyMeta("og:url", url);
        setMetaTag("twitter:url", url);
      }

      if (image) {
        setPropertyMeta("og:image", image);
        setMetaTag("twitter:image", image);
      }

      setPropertyMeta("og:type", "website");
    };

    applyMeta({
      title,
      description,
      keywords,
      extraMeta: fallbackExtraMeta ?? null,
    });

    const loadSupabaseMeta = async () => {
      try {
        const record = await fetchSeoRecordByPath(currentPath);
        if (!isActive || !record) return;

        const mergedExtraMeta = {
          ...(fallbackExtraMeta ?? {}),
          ...(record.extra_meta ?? {}),
        };

        applyMeta({
          title: record.title ?? title ?? null,
          description: record.description ?? description ?? null,
          keywords: record.keywords ?? keywords ?? null,
          extraMeta:
            Object.keys(mergedExtraMeta).length > 0 ? mergedExtraMeta : null,
        });
      } catch (error) {
        console.error("Failed to load dynamic SEO metadata", error);
      }
    };

    loadSupabaseMeta();

    return () => {
      isActive = false;
    };
  }, [
    title,
    description,
    keywords,
    url,
    canonical,
    image,
    fallbackExtraMeta,
    path,
    location.pathname,
  ]);

  return null;
};

export default SEO;
