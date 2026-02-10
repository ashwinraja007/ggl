import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SEO from '@/components/SEO';

interface Section {
  title: string;
  content?: string;
  subsections?: Subsection[];
}
interface Subsection {
  title: string;
  content: string;
}

const PrivacyPolicyPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['privacy-policy'],
    queryFn: async () => {
      const response = await fetch('/content/pages/privacy-policy.json');
      if (!response.ok) {
        throw new Error('Failed to fetch privacy policy');
      }
      return response.json();
    }
  });

  const sections: Section[] = data?.sections || [];
  const title = data?.title || "Privacy Policy";

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500`}>
      {/* ✅ Page SEO */}
      <SEO
        title="Privacy Policy – GGL Australia | Data Protection & User Privacy"
        description="Learn how GGL Australia collects, uses, and protects your personal information. Our privacy policy outlines our data practices and your rights regarding your data."
        keywords="GGL Australia, privacy policy, data protection, user privacy, data collection, cookies, personal information, GDPR, security"
        url="https://www.gglaustralia.com/privacy-policy"
        canonical="https://www.gglaustralia.com/privacy-policy"
        image="https://www.gglaustralia.com/lovable-uploads/ggl-logo.png"
      />

      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">
              We are committed to protecting your privacy and ensuring transparent data practices.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading content...</div>
            ) : (
              sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>
                )}

                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-medium text-gray-900 mb-4">
                          {subsection.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{subsection.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
            )}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Questions About This Privacy Policy?
            </h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-brand-navy text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center">
            Last updated: June 20, 2025
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
