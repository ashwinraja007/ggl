import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPageContent } from '@/lib/content';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { SeoRecord } from '@/seo';

// A generic component to render a section's content
const GenericSection = ({ section }: { section: any }) => {
  // This is a basic renderer. You can expand this to be more sophisticated.
  return (
    <section className="py-8 md:py-12 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 capitalize">{section.content?.title || section.section_key.replace(/_/g, ' ')}</h2>
        {section.content?.body && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content.body }} />}
        
        {/* For debugging and to show all data, we can render the raw JSON. */}
        <details className="mt-4">
          <summary className="text-xs text-gray-500 cursor-pointer">View Raw Section Data</summary>
          <pre className="bg-gray-100 p-4 rounded-md text-xs mt-2">
            {JSON.stringify(section, null, 2)}
          </pre>
        </details>
      </div>
    </section>
  );
};

const DynamicPage = () => {
  const location = useLocation();
  const { data: pageContent, isLoading } = useQuery({
    queryKey: ["page-content", location.pathname],
    queryFn: () => fetchPageContent(location.pathname),
  });

  const seoRecord = useMemo(() => pageContent?.find(s => s.section_key === 'seo')?.content as SeoRecord | null, [pageContent]);
  const contentSections = useMemo(() => pageContent?.filter(s => s.section_key !== 'seo') || [], [pageContent]);

  useSEO(seoRecord);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {contentSections.length > 0 ? (
          contentSections.map((section, index) => <GenericSection key={index} section={section} />)
        ) : (
          <div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Content Not Found</h1><p className="text-gray-600 mt-2">This page exists, but no content has been added to it yet.</p></div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;