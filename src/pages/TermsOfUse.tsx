import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use Agreement for the Website</h1>

        <p>
          Welcome to the <strong>GGL (Australia) Pte Ltd.</strong> website (hereinafter referred to as the <strong>"Website"</strong>).
          Please review these terms of use carefully before engaging with the Website. Your access and utilization of the
          Website are governed by these terms of use (hereinafter referred to as the <strong>"Terms of Use"</strong>). By accessing or using
          the Website, you agree to be legally bound by these Terms of Use, representing both yourself and the entity you
          are authorized to act on behalf of (hereinafter referred to as <strong>"you"</strong> or <strong>"your"</strong>). If you do not accept all the Terms
          of Use, refrain from accessing or utilizing the Website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">User Eligibility</h2>
        <p>
          GGL (Australia) provides the Website exclusively to entities and individuals who have reached the legal age of majority
          and have the legal capacity to enter into binding agreements under the applicable law in Australia. If you do not meet these criteria, you are not authorized to use the Website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Scope of Terms of Use</h2>
        <p>
          These Terms of Use govern your use of the Website and all related applications, software, and services, collectively referred to as "Services," except where a separate agreement applies. Specific terms or agreements, known as "Service Agreements," may apply to certain Services or items provided through the Website. These Service Agreements will either accompany the relevant Services or be accessible via an associated hyperlink.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Modifications</h2>
        <p>
          GGL (Australia) reserves the right to modify these Terms of Use at any time. Your continued use of the Website after any changes signifies your acceptance of such modifications. GGL (Australia) may alter, supplement, delete, or update any aspect of the Website without notice and may adjust or introduce fees for products and services at its sole discretion. General practices and restrictions regarding other GGL (Australia) products and services may also be established or modified at any time, based on GGL (Australia)'s sole discretion.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">GGL (Australia) Privacy Notice</h2>
        <p>
          By providing any individual's personal information to GGL (Australia), you affirm that you have obtained all necessary consents for the processing of such personal information as required by the Services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">License and Ownership</h2>
        <p>
          All intellectual property rights ("Intellectual Property") related to the Website and its contents (the "Content") are the exclusive property of GGL (Australia), its affiliates, or third parties, and are protected by intellectual property laws in Australia and globally. Various elements of the Website are also protected by trade name, trade secret, unfair competition, and other laws, prohibiting any copying or imitation. All custom graphics, icons, and other items on the Website, referred to as trademarks, service marks, or trade names ("Marks"), are the property of GGL (Australia), its affiliates, or entities granting GGL (Australia) the right to use these Marks. Unauthorized use or interference with these Marks is strictly prohibited without express written consent from GGL (Australia). Unless expressly authorized by these Terms of Use, you may not copy, reproduce, modify, lease, loan, sell, create derivative works from, upload, transmit, or distribute GGL (Australia)'s Intellectual Property without prior written permission from GGL (Australia) or the appropriate third party.
        </p>
        
        <p>
          GGL (Australia) grants you a limited, personal, non-transferable, non-sublicensable, and revocable license to access and use the Website, Content, and Services ("GGL (Australia) Systems") as presented by GGL (Australia) and only as expressly permitted. Apart from this limited license, GGL (Australia) does not transfer any interest in the GGL (Australia) Systems, information or data available via the GGL (Australia) Systems (the "Information"), Content, Services, Website, or any other GGL (Australia) property by allowing access to the Website. Except where required by law or as expressly provided herein, none of the Content or Information may be reverse-engineered, modified, reproduced, republished, translated, retransmitted, resold, or redistributed without prior written consent from GGL (Australia). Unauthorized actions such as making, selling, offering for sale, modifying, reproducing, displaying, publicly performing, importing, distributing, retransmitting, or otherwise using the Content are strictly prohibited unless expressly permitted by GGL (Australia).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Restrictions on Website Use</h2>
        <p>In addition to the limitations outlined in these Terms of Use, you agree to the following:</p>
        <p>
        <ul className="list-disc ml-6 mt-2">
          <li>You must not conceal the origin of information transmitted through the Website.</li>
          <li>You shall refrain from placing false or misleading information on the Website.</li>
          <li>Usage or access of any service, information, application, or software available via the Website is restricted to methods expressly permitted by GGL (Australia).</li>
          <li>Uploading information to the Website containing viruses, Trojan horses, worms, time bombs, or other computer programming routines intended to damage, interfere with, intercept, or expropriate any system, the Website, or Information, or that infringes on the Intellectual Property rights of others, is strictly prohibited.</li>
          <li>Specific sections of the Website are exclusive to GGL (Australia) customers.</li>
          <li>Using or accessing the Website, GGL (Australia) Systems, or Services in a manner that, in GGL (Australia)'s judgment, adversely affects performance or function, or interferes with authorized parties' access to the GGL (Australia) Systems, Services, or the Website, is not allowed.</li>
          <li>Framing or employing framing techniques to enclose any portion or aspect of the Content or Information without the express written consent of GGL (Australia) is prohibited.</li>
        </ul>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Outbound Links</h2>
        <p>
          The Website may contain links to third-party websites and resources ("Linked Sites"). These links are provided for your convenience and do not signify GGL (Australia)'s endorsement of their content. GGL (Australia) does not guarantee the accuracy, reliability, performance, or quality of any content, software, service, or application found on Linked Sites. GGL (Australia) is not responsible for the availability of Linked Sites or their content and activities. Access to Linked Sites is at your own risk and is governed by the terms, conditions, and privacy policies of those sites.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Inbound Links</h2>
        <p>Linking to any page of the Website other than the homepage through a plain text link is strictly prohibited without a separate linkage agreement with GGL (Australia). Websites or other entities linking to the homepage or any of its pages are prohibited from:</p>
        <p>
        <ul className="list-disc ml-6 mt-2">
          <li>Duplicating Content.</li>
          <li>Using a frame or border around the Content.</li>
          <li>Implying endorsement by GGL (Australia) or its affiliates.</li>
          <li>Misrepresenting any facts about the relationship with GGL (Australia) or its affiliates.</li>
          <li>Providing false information about GGL (Australia) products or services.</li>
          <li>Using any logo or mark of GGL (Australia) or its affiliates without express written permission from GGL (Australia).</li>
        </ul>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
        <p>
          GGL (Australia) reserves the right to terminate or suspend your use of the Website, GGL (Australia) Systems, Information, Services, and Content at its sole discretion, without prior notice or reason. Even if access remains available to others, GGL (Australia) may suspend or terminate your access at any time. Upon termination or suspension, you must:
        </p>
        <p>
        <ul className="list-disc ml-6 mt-2">
          <li>Immediately cease using the Website.</li>
          <li>Destroy any copies of the Content you have made.</li>
        </ul>
        </p>
        <p className="mt-2">
          Continuing to access the Website, GGL (Australia) Systems, Information, or Services after termination, suspension, or discontinuation will be considered trespassing.
        </p>
        <p>
          GGL (Australia) is not liable to you or any third party for terminating or suspending your access to the Website, GGL (Australia) Systems, Information, and/or Services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer of Warranties</h2>
        <p>
          GGL (Australia) makes no guarantees regarding the results you may achieve by using the Website, GGL (Australia) Systems, Services, Information, or Content. You use these elements at your own risk, and they are provided "as is." To the fullest extent permitted by law, GGL (Australia), along with its licensors and suppliers, disclaims all warranties, whether express, implied, statutory, or otherwise. This includes, but is not limited to, warranties of merchantability, non-infringement, and fitness for a particular purpose. GGL (Australia) and its affiliates, licensors, and suppliers do not guarantee the accuracy, completeness, security, or timeliness of the Content, Information, or Services provided on the Website or GGL (Australia) Systems. No information obtained from the Website creates any warranty that is not expressly stated in these Terms of Use.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
        <p>
          To the extent permitted by law, GGL (Australia), its affiliates, licensors, suppliers, or any third parties mentioned on the Website are not liable for any incidental, direct, indirect, exemplary, punitive, and/or consequential damages, lost profits, or damages resulting from lost data or business interruption caused by the use or inability to use the Website, GGL (Australia) Systems, Information, Services, or Content. This limitation applies regardless of the legal theory on which the claim is based, whether warranty, contract, tort, delict, or any other, and even if GGL (Australia) has been advised of the possibility of such damages. To the extent allowed by law, the remedies provided to you in these Terms of Use are exclusive and limited to those expressly stated herein.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Compliance with Laws, Including Export Control</h2>
        <p>
          You agree to use the GGL (Australia) Website in full compliance with all applicable laws, regulations, and rules. Your actions should not, as determined solely by GGL (Australia), harm GGL (Australia)'s goodwill or reputation. Additionally, you must not engage in any activities that could cause GGL (Australia) to violate any relevant laws, rules, or regulations applicable to GGL (Australia).
        </p>
        <p>
          GGL (Australia) operates from Australia and manages the export of products and information. You agree to comply with all applicable restrictions and refrain from exporting or re-exporting any Content (including software or Services) to countries or individuals prohibited under Australia or other relevant export control laws or regulations. By accessing and downloading any Content (including software or Services) or Information, you confirm that you are not located in a country where such export is prohibited and are not a person or entity to whom such export is restricted. You are solely responsible for complying with the laws of your local jurisdiction and any other applicable laws concerning the import, export, or re-export of the Content (including software or Services).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Governing Law and Jurisdiction</h2>
        <p>
          To the maximum extent permitted by law, these Terms of Use are governed by the internal laws of Australia, and the courts in Australia shall have sole and exclusive jurisdiction over any disputes arising from or related to these Terms of Use.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">General</h2>
        <p>
          You may not transfer these Terms of Use or any of your rights, interests, or obligations under these Terms of Use. If any provision of these Terms of Use is found invalid by a court of competent jurisdiction, the invalidity of that provision shall not affect the validity of the remaining provisions, which shall remain in full force and effect. No waiver of any of these Terms of Use shall be considered a continuing waiver of that term or condition or any other term or condition. You may retain a written copy of these Terms of Use by printing them for your records, waiving any other requirement for these Terms of Use to be evidenced by a written document.
        </p>

        <p className="mt-6">
          We strive to respond to all inquiries promptly and provide you with the assistance you need. Thank you for choosing <strong>GGL (Australia) Pte Ltd</strong>.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
