import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions of Trade</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important Notice:</strong> These contractual conditions apply to the Services provided by GGL AUSTRALIA LOGISTICS PTY LTD.
                These Trading Conditions contain exclusions of liability and indemnities in favour of GGL AUSTRALIA LOGISTICS PTY LTD. 
                You should read these Trading Conditions carefully.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-3">Key Provisions - Please Pay Special Attention To:</h3>
          <ul className="space-y-2 text-red-700">
            <li><strong>Subcontracting:</strong> We may subcontract the performance of the services and our subcontractors will have the benefit of these terms and conditions. When subcontracting we will select the liability level that produces the lowest rates.</li>
            <li><strong>Liability Exclusions - Carriage of Goods:</strong> In respect of international carriage of goods, under clause 10 liability is limited to the maximum extent permitted under international conventions. It is likely that if goods are damaged, the liability limits will not fully cover the loss. It is strongly recommended that you obtain insurance to cover loss or damage to the goods.</li>
            <li><strong>Time limit for claims:</strong> Clauses 10.11 – 10.12 set out strict time limits on making claims against us. You should notify us immediately if you wish to make a claim against us.</li>
            <li><strong>Lien:</strong> Clause 13 gives us the right to hold your goods and sell them if you do not pay our fees.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Definitions</h2>
        <div className="space-y-3 text-sm">
          <p><strong>Agreement</strong> means these Terms and Conditions, together with any Authority and Customer credit application.</p>
          <p><strong>Authority</strong> means any authority by which the Customer appointed the Company to act on its behalf.</p>
          <p><strong>Carriage</strong> means carriage by vehicles and conveyances of all kind including acts in furtherance of an act of carriage by another or a specific means, whether by air, sea or land transport, or any combination of such transport modes.</p>
          <p><strong>Company</strong> means GGL AUSTRALIA LOGISTICS PTY LTD ABN 71 685 761 513 and its nominees, agents and employees.</p>
          <p><strong>Customer</strong> means where there is an Authority, the customer named in the Authority, including its employees, officers, agents and contractors, or where there is no Authority, the entity instructing the Company to provide the Services.</p>
          <p><strong>Dangerous Goods</strong> means any Goods which are, or may become, hazardous, volatile, explosive, flammable, radioactive, likely to harbour or encourage vermin or pests, or capable of posing a risk or causing damage to any person or property.</p>
          <p><strong>Services</strong> means the work performed by the Company in relation to the Goods, whether as agent or principal, including facilitating the import, export, transport, or storage of the Goods; and any ancillary acts for those purposes.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. General</h2>
        <div className="space-y-3">
          <p>2.1 The Company is not a common carrier. The Company will not be liable as a common carrier.</p>
          <p>2.2 These Terms and Conditions take priority over and will prevail to the extent of any inconsistency with the Authority, any credit application made by the Customer, the Customer's terms and conditions or other document issued by the Customer.</p>
          <p>2.3 The Agreement is governed by the laws of Victoria, Australia. The Company and the Customer submit to the jurisdiction of the courts of Victoria and of the Federal Court of Australia.</p>
          <p>2.4 A variation of these Terms and Conditions will only be valid if in writing and signed by each party or signed by a person with the authority to bind each party.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Services</h2>
        <div className="space-y-3">
          <p>3.1 Services are provided by the Company subject to these Terms and Conditions.</p>
          <p>3.2 By instructing the Company to provide the Services the Customer agrees to be bound by the Terms and Conditions.</p>
          <p>3.3 The Goods are at the risk of the Customer at all times.</p>
          <p>3.4 The Company may agree or refuse to provide Services at its reasonable discretion.</p>
          <p>3.5 Quoted times and dates for the movement of Goods are always subject to equipment and vessel/aircraft space availability.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Customer Obligations</h2>
        <div className="space-y-3">
          <p>4.1 The Customer will provide the Company with all reasonable assistance, information and documentation necessary to enable the Company to provide the Services, and punctually comply with any Law or request from a Government Authority.</p>
          <p>4.2 The Customer is under a continuing obligation to provide any information which may materially affect the capacity of the Customer or the Company to perform its obligations under the Agreement.</p>
          <p>4.3 The Customer will keep confidential the Company's Fees or charges and any waiver, discount, release or indulgence provided by the Company in relation to the provision of the Services.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Instructions</h2>
        <div className="space-y-3">
          <p>5.1 Any instructions given by the Customer must be in writing in English and be legible.</p>
          <p>5.2 The Company has the discretion to refuse to accept the Customer's instructions.</p>
          <p>5.3 Sufficient notice of instructions must be given by the Customer to the Company to enable the Company to follow those instructions.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Fees</h2>
        <div className="space-y-3">
          <p>6.1 In respect of the Carriage of Goods, the Company's Fees are earned on the earlier of the commencement of the performance of the Services, or when the Goods are delivered to the Company or its subcontractors.</p>
          <p>6.3 The Company's Fees must be paid within 7 days of an invoice or as otherwise agreed in writing. Time is of the essence in respect of the Customer's obligations to make any payment.</p>
          <p>6.13 If the Fees are not paid in full within 7 days of the Due Date then the Company may charge interest on the late payment at the published business overdraft rate of the Commonwealth Bank of Australia.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Liability</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="space-y-3">
            <p>10.1 Despite any other clause in these Terms and Conditions, where the Services involve the international Carriage of Goods, the Company limits its liability in respect of loss or damage to Goods, or delay in the delivery of the Goods, to the maximum extent permitted under any Convention applying to relevant Carriage of the Goods.</p>
            <p>10.3 Neither party is liable for Consequential Loss suffered by the other Party unless the Party had actual knowledge that such Consequential Loss would be incurred.</p>
            <p>10.7 Where the liability of the Company is not limited or fully excluded by a Convention, the Agreement, Law or otherwise, the liability of the Company is limited to the lesser of:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>The actual loss or damage suffered by the Customer;</li>
              <li>Australian $200,000;</li>
              <li>The value of the Goods at the time the Goods were received by the Company.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Time Limits for Claims</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p><strong>10.11</strong> A Party will be discharged from all liability in connection with:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li><strong>Damage to or non-delivery of the Goods:</strong> unless notice of any claim is received within 7 days of delivery (or expected delivery date) and suit is brought within 9 months.</li>
            <li><strong>Other claims:</strong> unless suit is brought within 3 years of the event giving rise to the claim.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Customer Indemnities</h2>
        <div className="space-y-3">
          <p>11.3 The Customer indemnifies the Company from and against all Loss arising directly or indirectly from or in connection with the Goods or the performance of the Services caused by an act or omission of the Customer or which was beyond the reasonable control of the Company.</p>
          <p>11.4 Without limitation, the Customer indemnifies the Company from and against any Loss arising from:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Failure to return Containers or transport equipment</li>
            <li>Any claim by a person who claims to have an interest in the Goods</li>
            <li>Breach of this Agreement</li>
            <li>Government Authority inspections or treatments</li>
            <li>All duty, GST, and other fees and taxes</li>
            <li>Delays in loading, unloading, collecting or delivering Goods</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Insurance</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p><strong>12.1</strong> The Company will not arrange insurance in respect of the Goods. The Customer is responsible for arranging insurance in respect of the Goods.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Lien</h2>
        <div className="space-y-3">
          <p>13.1 The Company has a particular and general lien on all Goods and documents relating to the Goods and a right to sell those Goods and documents by public auction or private sale in respect of all sums due and owing from the Customer.</p>
          <p>13.2 Before selling any Goods the Company will give the Customer at least 14 days' written notice of its intention to do so, except where the Goods may deteriorate or storage costs will exceed the likely sale price.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. PPSA (Personal Property Securities Act)</h2>
        <div className="space-y-3">
          <p>14.2 From the time the Goods are in the possession of the Company or a Subcontractor, the Goods are subject to a continuing security interest in favour of the Company for the payment of all amounts due and owing by the Customer under the Agreement.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">15. Uncollected Goods</h2>
        <div className="space-y-3">
          <p>15.1 The Company may sell or return Goods that cannot be delivered because they are insufficiently or incorrectly addressed, are not identifiable, are uncollected or not accepted after 21 days' notice to the Customer.</p>
        </div>

        <div className="bg-gray-100 border rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
          <p><strong>GGL AUSTRALIA LOGISTICS PTY LTD</strong></p>
          <p>ABN 71 685 761 513</p>
          <p className="mt-3 text-sm text-gray-600">
            These terms and conditions are governed by the laws of Victoria, Australia. 
            For any questions regarding these terms, please contact us directly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
