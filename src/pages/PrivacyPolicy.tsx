import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Helmet } from "react-helmet";
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
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Simulate page loading effect
    setIsLoaded(true);
  }, []);
  const sections: Section[] = [{
    title: "Introduction",
    content: "Welcome to GGL (India) Ltd [“GGL (India)”, “we”, “our”, “us”]. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.We urge you to carefully read the following to comprehend how we collect, utilize, and safeguard your personal information. The policy also outlines your options concerning the use, accessibility, and correction of your personal information."
  }, {
    title: "Our Commitment to Privacy",
    subsections: [{
      title: "Limited Data Collection",
      content: "At GGL (India), we adhere to strict privacy principles by collecting only the essential information necessary for efficient communication. This streamlined approach simplifies user interactions and minimizes the exposure of personal details. Our commitment to minimal data collection reflects our dedication to user privacy and ensures robust security measures."
    }, {
      title: "Voluntary Disclosure",
      content: "Users at GGL (India) have full control over the information they choose to share. Our policy emphasizes voluntary data submission, empowering users to determine the extent of their engagement. We respect individual privacy preferences, acknowledging that each user may have distinct comfort levels regarding information disclosure."
    }, {
      title: "Purposeful Communication",
      content: "The information we collect serves a specific and essential purpose—facilitating effective communication. Whether responding to inquiries, providing relevant updates, or maintaining ongoing connections, user data is used exclusively for communication-related activities. This targeted approach ensures that personal information remains dedicated to its intended use, reinforcing our commitment to transparent and purpose-driven data management."
    }, {
      title: "User Empowerment",
      content: "At GGL (India), we prioritize user control over their personal information. Beyond allowing users to choose what information to share, we empower them to manage their privacy settings and preferences. This approach enables individuals to tailor their interactions with GGL (India) according to their preferences, fostering trust and transparency in digital interactions."
    }]
  }, {
    title: "What Constitutes Personal Information?",
    subsections: [{
      title: "Personal Information",
      content: 'At GGL (India), "Personal Information" refers to any data related to an identified or identifiable natural person. This includes details that can directly or indirectly identify an individual, such as their name, address, contact information (telephone number, mobile number, email address), identification numbers, location data, online identifiers, and specific characteristics related to their physical, physiological, genetic, mental, economic, cultural, or social identity. Additionally, this encompasses any information collected through our services, such as user preferences and behavioural data, that can be linked to an individual.'
    }, {
      title: "Other Information",
      content: 'In contrast, "Other Information" encompasses data that does not fall within the scope of Personal Information. This includes anonymized or aggregated data that cannot be used to identify an individual and publicly available information that has not been combined with Personal Information. Examples of Other Information include statistical data on website usage, product performance metrics, and general market trends, which are used to improve our services without compromising individual privacy.'
    }]
  }, {
    title: "What Data Do We Gather and When?",
    content: "At GGL (India), we prioritize minimal data collection to optimize user interactions and facilitate effective communication. The information we collect includes:",
    subsections: [{
      title: "Name",
      content: "Users can voluntarily provide their names when they contact us through our website's contact form or other communication channels. This helps us personalize interactions, address individuals by their preferred titles, and enhance the quality of communication for a more customized user experience."
    }, {
      title: "Email Address",
      content: "Users provide their email addresses when they contact us or subscribe to our services. We use email addresses to establish efficient communication, allowing us to respond to inquiries promptly, provide updates, and share relevant information about our services. This also facilitates the delivery of subscription-related details."
    }, {
      title: "Phone Number",
      content: "Users have the option to provide their phone numbers to enable direct communication or to receive service-related updates via SMS or voice calls. This allows us to enhance customer support and provide timely assistance. Phone numbers are kept confidential and are only used for communication purposes related to our services."
    }, {
      title: "Location",
      content: "Users may provide location information, such as their address or geographic location, when interacting with our services. This information helps us offer location-specific services, tailor our offerings, and improve the user experience by providing relevant updates and support based on the user’s geographic location."
    }]
  }, {
    title: "User Choice and Control",
    subsections: [{
      title: "Opt-In Engagement:",
      content: "At GGL (India), we emphasize user consent through active opt-in processes, where users provide their names and email addresses. This ensures that all interactions with us are consensual and align with user preferences."
    }, {
      title: "Communication Preferences:",
      content: "Users at GGL (India) have complete control over their communication preferences. They can manage the frequency and type of messages they receive, allowing them to tailor their interactions according to their needs and preferences."
    }, {
      title: "Data Collection Practices:",
      content: "GGL (India) is committed to respecting user privacy while enabling effective communication. We implement strict security measures to protect the limited information we collect, ensuring a secure and positive user experience."
    }]
  }, {
    title: "Other Information Collection",
    content: "When using our services, GGL (India) collects various types of Other Information about user activities and usage patterns, including",
    subsections: [{
      title: "Logs:",
      content: "We track user interactions within our services, capturing details such as visited pages, features used, activity timestamps, URLs of previous and subsequent websites visited, device attributes, browser type and version, and approximate geographic location derived from IP addresses. This information, when combined with Personal Information, is treated confidentially and helps us enhance the user experience."
    }, {
      title: "Cookies:",
      content: "GGL (India) uses cookies to identify users' login status and recognize repeat visitors. These cookies are essential for improving service quality. We utilize session cookies (which expire when the browser is closed) and persistent cookies (which remain until deleted). Users can manage or disable cookies through their browser settings, although this may affect certain service functionalities"
    }, {
      title: "Web Beacons:",
      content: "In our services and emails, we may employ web beacons (clear gifs or pixel tags) to track user engagement, such as email open rates, and to deliver personalized content. These electronic files help us understand user behavior and optimize service delivery."
    }, {
      title: "Local Storage:",
      content: "GGL (India) may store information locally on user devices, including Personal Information, using mechanisms like browser web storage and application data caches. This enhances the user experience by storing preferences and settings locally."
    }]
  }, {
    title: "How We Utilize the Collected Information",
    content: "At GGL (India), we are committed to ensuring that the information we collect is used responsibly and transparently. The collected information is utilized in the following ways:",
    subsections: [{
      title: "Personalizing User Experience",
      content: "We use the information to personalize interactions and tailor our services to meet individual user preferences. This includes addressing users by name and providing customized content and recommendations based on their interests and past interactions."
    }, {
      title: "Enhancing Communication",
      content: "User contact information, such as email addresses and phone numbers, is used to establish efficient communication channels. This allows us to respond promptly to inquiries, provide updates on our services, and deliver relevant information that users have opted to receive."
    }, {
      title: "Improving Our Services",
      content: "Data about user activities, preferences, and usage patterns helps us analyze and enhance the functionality and performance of our services. This includes identifying popular features, areas for improvement, and opportunities for developing new features to enhance the user experience."
    }, {
      title: "Facilitating Transactions",
      content: "Information such as user location, preferences, and contact details is used to process orders and transactions efficiently. This ensures accurate and timely delivery of our products and services."
    }, {
      title: "Ensuring Security",
      content: "We monitor and enhance the security of our website and services using the collected data. This involves detecting and preventing fraudulent activities, unauthorized access, and other potential security threats."
    }, {
      title: "Marketing and Promotions",
      content: "With user consent, we may use contact information to send promotional materials, newsletters, and marketing communications about our products and services. Users can manage their communication preferences and opt out at any time."
    }, {
      title: "Compliance with Legal Obligations",
      content: "We may use or disclose user information when required to comply with legal obligations, such as responding to lawful requests from public authorities or adhering to applicable laws and regulations."
    }, {
      title: "Aggregated Data Analysis",
      content: "Anonymized and aggregated data may be used for internal analysis, research, and reporting. This helps us understand trends, evaluate service effectiveness, and make informed business decisions—without identifying individual users."
    }]
  }, {
    title: "How We Share Information with Third Parties",
    content: "We may share your information with third parties under specific circumstances and with appropriate safeguards to protect your privacy:",
    subsections: [{
      title: "Service Providers",
      content: "We may share your information with trusted third-party service providers who perform functions on our behalf. These services include:\n\n• Payment Processing: Managing transactions and payment-related activities.\n• Shipping and Delivery: Facilitating the shipment and delivery of products.\n• Marketing Services: Conducting marketing campaigns and communications.\n• Customer Support: Providing customer service and support.\n• IT and Security Services: Ensuring the security and maintenance of our systems.\n\nThese providers are contractually obligated to use the information only for the purpose of providing services to GGL (India) and are required to maintain the confidentiality and security of your information."
    }, {
      title: "Business Partners",
      content: "We may share information with our business partners to offer co-branded products, services, or promotions. These partners are required to adhere to privacy and data protection standards that are at least as stringent as our own."
    }, {
      title: "Legal Compliance",
      content: "We may disclose your information to third parties if we believe such action is necessary to:\n\n• Comply with applicable laws, regulations, legal processes, or governmental requests.\n• Enforce our Terms of Use or other agreements and policies.\n• Protect the rights, property, or safety of GGL (India), our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction."
    }, {
      title: "Corporate Transactions",
      content: "In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, your information may be transferred as part of the transaction. We will ensure the acquiring entity follows this Privacy Policy or provides notice of any material changes."
    }, {
      title: "Consent",
      content: "We may share your information with third parties when you provide your explicit consent. This includes situations where you agree to share your information with a third-party application or service."
    }, {
      title: "Aggregated and Anonymized Data",
      content: "We may share aggregated and anonymized data that cannot be used to identify you with third parties for research, analytics, and other purposes. This helps us understand usage patterns, improve our services, and contribute to industry knowledge without compromising your privacy."
    }, {
      title: "Social Media and Online Platforms",
      content: "If you interact with us on social media or other online platforms, information you share may be viewable by other users of these platforms and may be shared according to their privacy policies."
    }, {
      title: "Third-Party Advertising",
      content: "We may share information with third-party advertising partners to deliver targeted advertisements. These partners may use cookies, web beacons, and similar technologies to collect information about your activities on our website and other websites to provide you with personalized advertising. You can manage your advertising preferences through your browser settings or other available tools."
    }, {
      title: "Research and Development",
      content: "We may share information with research institutions or other entities for the purpose of research and development, provided that such sharing is done in a manner that protects your privacy and data security."
    }]
  }, {
    title: "What Steps Do We Take to Protect Your Information?",
    content: "At GGL (India), the security and confidentiality of your information are our highest priorities. We implement comprehensive measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. Here are the steps we take to safeguard your information:",
    subsections: [{
      title: "Data Encryption",
      content: "We use advanced encryption technologies to protect your data during transmission and storage. This ensures that your information is secure and confidential both when it is being sent to our servers and when it is stored on our systems."
    }, {
      title: "Secure Access Controls",
      content: "We implement strict access controls to ensure that only authorized personnel have access to your personal information. This includes using multi-factor authentication, role-based access controls, and regular access reviews to prevent unauthorized access."
    }, {
      title: "Regular Security Audits",
      content: "We conduct regular security audits and assessments to identify and address potential vulnerabilities in our systems. These audits are performed by internal and external experts to ensure the highest level of security standards."
    }, {
      title: "Firewall and Intrusion Detection Systems",
      content: "Our systems are protected by robust firewall and intrusion detection systems that monitor and block unauthorized access attempts. These systems are continually updated to respond to new threats."
    }, {
      title: "Data Anonymization and Minimization",
      content: "Where possible, we anonymize or pseudonymize personal data to reduce the risk of exposure. We also follow the principle of data minimization, collecting only the information necessary for specific purposes."
    }, {
      title: "Regular Software Updates",
      content: "We ensure that all our software and systems are up-to-date with the latest security patches and updates. This helps protect against known vulnerabilities and emerging threats."
    }, {
      title: "Employee Training and Awareness",
      content: "Our employees receive regular training on data protection and privacy best practices. This includes training on recognizing phishing attempts, securing sensitive information, and responding to potential data breaches."
    }, {
      title: "Physical Security Measures",
      content: "We implement physical security measures to protect our data centers and offices, including access controls, surveillance, and secure storage for sensitive documents."
    }, {
      title: "Incident Response Plan",
      content: "We have a comprehensive incident response plan in place to quickly address and mitigate any data breaches or security incidents. This plan includes procedures for identifying, containing, and resolving incidents, as well as notifying affected users and relevant authorities as required by law."
    }, {
      title: "Vendor and Partner Security",
      content: "We carefully vet and select third-party vendors and partners to ensure they meet our stringent security standards. We require them to implement appropriate security measures to protect any information we share with them."
    }, {
      title: "User Controls and Preferences",
      content: "We provide users with tools to manage their privacy settings and control how their information is used and shared. This includes options to opt-out of certain data collection practices and communications."
    }, {
      title: "Continuous Monitoring and Improvement",
      content: "We continuously monitor our security practices and implement improvements as needed to adapt to evolving threats and best practices in data protection."
    }]
  }, {
    title: "What Choices Do You Have Regarding the Use of Your Information?",
    content: "We believe in giving you control over your personal information. You have various choices and rights regarding how your information is collected, used, and shared:",
    subsections: [{
      title: "Managing Communication Preferences",
      content: "Opt-In/Opt-Out: You have the choice to opt-in or opt-out of receiving communications from us. You can manage your preferences through your account settings or by following the instructions provided in our communications.\n\nEmail Subscriptions: You can subscribe or unsubscribe from our marketing emails, newsletters, and other promotional communications at any time. Each email we send includes an unsubscribe link for your convenience."
    }, {
      title: "Accessing and Updating Your Information",
      content: "Account Information: You can access, review, and update your account information, such as your name, email address, and contact details, by logging into your account on our website.\n\nCorrection Requests: If you believe any information we hold about you is inaccurate or incomplete, you have the right to request corrections. Please contact our support team to make such requests."
    }, {
      title: "Data Portability",
      content: "Exporting Data: You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format. This allows you to transfer your data to another service provider if you choose."
    }, {
      title: "Deleting Your Information",
      content: "Account Deletion: You can request the deletion of your account and associated personal information. Please note that certain information may be retained for legal or legitimate business purposes.\n\nService-Specific Deletions: For specific services or features, you may have the option to delete individual pieces of information without affecting your entire account."
    }, {
      title: "Cookie Preferences",
      content: "Managing Cookies: You can manage your cookie preferences through your browser settings. This includes accepting, rejecting, or deleting cookies. Please note that disabling cookies may affect the functionality of our services.\n\nOpting Out of Tracking: Some browsers and third-party services offer tools to disable tracking technologies. You can use these tools to control how your information is collected and used."
    }, {
      title: "Interest-Based Advertising",
      content: "Ad Preferences: You can manage your preferences for interest-based advertising through your account settings or by using the opt-out mechanisms provided by advertising networks. This includes adjusting your preferences for targeted ads.\n\nDo Not Track: Some browsers offer a \"Do Not Track\" feature that lets you signal to websites that you do not want your online activities tracked. While we honour such signals, not all tracking technologies may be fully controlled by this feature."
    }, {
      title: "Third-Party Data Sharing",
      content: "Consent-Based Sharing: We will only share your information with third parties for purposes other than those outlined in our policy with your explicit consent. You have the right to withdraw this consent at any time.\n\nReview and Consent: For any new or significant changes to our data sharing practices, we will provide you with notice and obtain your consent as required."
    }, {
      title: "Restricting Processing",
      content: "Processing Requests: You have the right to request that we restrict the processing of your personal data under certain circumstances, such as when you contest the accuracy of the data or object to its processing.\n\nRight to Object: You can object to the processing of your personal data for direct marketing purposes or other uses based on legitimate interests. We will comply with your request unless there are compelling legitimate grounds for the processing."
    }, {
      title: "Withdrawal of Consent",
      content: "Changing Your Mind: If you have previously given consent for any specific use of your personal data, you can withdraw that consent at any time. This will not affect the lawfulness of processing based on consent before its withdrawal."
    }, {
      title: "Exercising Your Rights",
      content: "Contacting Us: To exercise any of your rights, please contact our privacy team using the contact details provided in this policy. We will respond to your requests within the timeframes required by applicable law.\n\nVerification: For security reasons, we may need to verify your identity before processing your requests. This helps us protect your information from unauthorized access."
    }]
  }];
  return <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              We are committed to protecting your privacy and ensuring transparent data practices.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => <div key={index} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>

                {section.content && <p className="text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>}

                {section.subsections && <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => <div key={subIndex} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-medium text-gray-900 mb-4">
                          {subsection.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>)}
                  </div>}
              </div>)}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Questions About This Privacy Policy?
            </h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <Link to="/contact" className="inline-block bg-brand-navy text-white px-6 py-3 rounded-lg font-medium  transition-colors">
                Get a Quote
              </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center">
            Last updated: June 20, 2025
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default PrivacyPolicyPage;
