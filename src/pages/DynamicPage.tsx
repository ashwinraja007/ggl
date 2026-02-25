import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSEO, SeoRecord } from '@/seo';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import NotFound from './NotFound';

// Define the structure of your content and images
interface PageContent {
  id: number;
  page_path: string;
  section_key: string;
  content: any; // Can be object, string, array
  images: any; // Can be object with image URLs
}

// Helper function to fetch page data from Supabase
const fetchPageData = async (path: string): Promise<PageContent[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('page_path', path);

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

// A generic component to render different sections
const SectionRenderer = ({ section }: { section: PageContent }) => {
  const { section_key, content, images } = section;

  // Basic Hero Section
  if (section_key === 'hero') {
    return (
      <div 
        className="relative bg-cover bg-center text-white py-32 px-4 text-center" 
        style={{ backgroundImage: `url(${images?.background || ''})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold">{content?.title}</h1>
          <p className="text-xl mt-4">{content?.subtitle}</p>
        </div>
      </div>
    );
  }

  // Main content section with HTML rendering
  if (section_key === 'main' || section_key === 'post_body') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">{content?.title}</h2>
        <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: content?.body || '' }} />
      </div>
    );
  }

  // Features section
  if (section_key === 'features') {
    return (
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{content?.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.isArray(content?.items) && content.items.map((item: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold">{typeof item === 'string' ? item : item.title}</h3>
                {typeof item === 'object' && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Default renderer for unknown sections - useful for debugging
  return null;
};


const DynamicPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const { data: sections, isLoading, isError } = useQuery({
    queryKey: ['page-content', path],
    queryFn: () => fetchPageData(path),
  });

  const seoSection = sections?.find(s => s.section_key === 'seo');
  const seoRecord: SeoRecord | null = seoSection ? seoSection.content : null;

  useSEO(seoRecord);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (isError || !sections || sections.length === 0) {
    return <NotFound />;
  }

  const renderableSections = sections.filter(s => s.section_key !== 'seo');

  return (
    <div className="bg-white">
      <Header />
      <main>
        {renderableSections.map(section => <SectionRenderer key={section.id} section={section} />)}
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;