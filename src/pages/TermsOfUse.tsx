import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEO from '@/components/SEO';

interface TermsOfUseData {
  title: string;
  body: string;
}

const TermsOfUsePage: React.FC = () => {
  const [content, setContent] = useState<TermsOfUseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/pages/terms-and-conditions.md')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch terms");
        return res.text();
      })
      .then((text) => {
        // In a real app, you'd use gray-matter here.
        const frontmatter = text.split('---')[1];
        const body = text.split('---').slice(2).join('---');
        const title = frontmatter.match(/title: (.*)/)?.[1] || 'Terms and Conditions';
        setContent({ title, body });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="Terms and Conditions – GGL Australia | Freight & Logistics Services"
        description="Review the terms and conditions governing the use of GGL Australia's freight and logistics services. Understand our policies on services, liabilities, and user responsibilities."
        keywords="GGL Australia, terms and conditions, freight services terms, logistics terms, user responsibilities, liability, service policies"
        url="https://www.gglaustralia.com/terms-and-conditions"
        canonical="https://www.gglaustralia.com/terms-and-conditions"
        image="https://www.gglaustralia.com/lovable-uploads/ggl-logo.png"
      />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {loading ? (
          <p>Loading...</p>
        ) : content ? (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">{content.title}</h1>
            {/* <ReactMarkdown>{content.body}</ReactMarkdown> */}
            <div className="whitespace-pre-wrap text-gray-700">
              {content.body}
            </div>
          </div>
        ) : (
          <p>Could not load content.</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
