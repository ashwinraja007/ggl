import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">TERMS AND CONDITIONS OF TRADE</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-800 leading-relaxed">
                <strong>These contractual conditions apply to the Services provided by GGL AUSTRALIA LOGISTICS PTY LTD.</strong><br/>
                These Trading Conditions contain exclusions of liability and indemnities in favour of GGL AUSTRALIA LOGISTICS PTY LTD. 
                You should read these Trading Conditions carefully.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-4">While you should read the whole document, we draw your attention to the following clauses:</h3>
          <div className="space-y-4 text-red-700 text-sm">
            <div>
              <strong>Subcontracting</strong> – We may subcontract the performance of the services and our subcontractors will have the benefit of these terms and conditions. When subcontracting we will select the liability level that produces the lowest rates.
            </div>
            <div>
              <strong>Liability Exclusions - Carriage of Goods</strong> – In respect of international carriage of goods, under clause 10 liability is limited to the maximum extent permitted under international conventions. It is likely that if goods are damaged, the liability limits will not fully cover the loss. It is strongly recommended that you obtain insurance to cover loss or damage to the goods.
            </div>
            <div>
              <strong>Liability Exclusions – General</strong> – Clause 10 contains a number of clauses that limit our liability more generally in respect of the services.
            </div>
            <div>
              <strong>Time limit for claims</strong> – Clauses 10.11 – 10.12 set out strict time limits on making claims against us. You should notify us immediately if you wish to make a claim against us.
            </div>
            <div>
              <strong>Indemnities</strong> – Clause 11 sets out a number of instances where you are required to pay us for loss or damage that we incur in providing the services. Sometimes these costs will not be your fault, such as if a Government inspection delays the release of the goods and storage charges are incurred.
            </div>
            <div>
              <strong>Lien</strong> – Clause 13 gives us the right to hold your goods and sell them if you do not pay our fees.
            </div>
            <div>
              <strong>Security Interest</strong> – Under clause 14 you grant us a registerable security interest in the goods for payment of all amounts you owe us under this contract.
            </div>
            <div>
              <strong>Fee increases</strong> – Under clause 6 we can increase our fees if the amount charged by subcontractors or other third parties changes and we did not know of, or could not have prevented, that cost increase.
            </div>
            <div>
              <strong>Disposal of goods</strong> – Clause 15 sets out where we can dispose of uncollected goods. In most instances we have to notify you before disposing of any goods.
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Definitions</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>Agreement</strong> means these Terms and Conditions, together with any Authority and Customer credit application.</p>
            <p><strong>Authority</strong> means any authority by which the Customer appointed the Company to act on its behalf.</p>
            <p><strong>Carriage</strong> means carriage by vehicles and conveyances of all kind including acts in furtherance of an act of carriage by another or a specific means, whether by air, sea or land transport, or any combination of such transport modes</p>
            <p><strong>Carrier</strong> means any party involved in the Carriage of Goods whether by airfreight, sea freight or land transport</p>
            <p><strong>Company</strong> means GGL AUSTRALIA LOGISTICS PTY LTD ABN 71 685 761 513 and its nominees, agents and employees.</p>
            <p><strong>Convention</strong> means any applicable international convention, including the national implementation of that convention, that applies to the international transport of goods including without limitation the provisions of the International Convention for the Unification of Certain Rules relating to Bills of Lading signed at Brussels on 25th August, 1924 (and includes the amendments by the Protocols signed at Brussels in 1968 and 1979, but only if the amendments are compulsorily applicable to this agreement and nothing in this agreement shall be construed as contractually applying those amendment), the Convention for the Unification of Certain Rules for International Carriage by Air, done at Montreal on 28 May 1999 and the Convention for the Unification of Certain Rules Relating to International Carriage by Air, signed at Warsaw, 12 October 1929; that Convention as amended at The Hague on 28 September 1955; that Convention as amended at The Hague 1955 and by Montreal Protocol No. 1, 2, or 4 (1975) as the case may be.</p>
            <p><strong>Consequential Loss</strong> means any loss or damage which:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>does not arise naturally or in the usual course of things; or</p></li>
              <li><p>constitutes, or arises from or in connection with, a loss in revenue, profit or opportunity or a loss of goodwill or business reputation, even if such loss or damage arises naturally or in the usual course of things.</p></li>
            </ul>
            <p><strong>Container</strong> means any container, flexitank, trailer, transportable tank, flat, pallet or any equipment used to carry or consolidate goods and any equipment of or connected thereto.</p>
            <p><strong>Customer</strong> means:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>Where there is an Authority, the customer named in the Authority, including its employees, officers, agents and contractors.</p></li>
              <li><p>Where there is no Authority, the entity instructing the Company to provide the Services.</p></li>
            </ul>
            <p><strong>Dangerous Goods</strong> means any Goods which are, or may become, hazardous, volatile, explosive, flammable, radioactive, likely to harbour or encourage vermin or pests, or capable of posing a risk or causing damage to any person or property.</p>
            <p><strong>Fees</strong> means the Company's fees for the Services as set out in any quotation, rates schedule, tariff or as otherwise notified to the Customer, disbursements, taxes and any other amounts payable under these Terms and Conditions.</p>
            <p><strong>Force Majeure Event</strong> means anything outside of the reasonable control of a party including, without limitation, fire, flood, drought, storm (or other adverse weather conditions), lightning, act of God, peril of sea or air, explosion, radioactive or chemical contamination, sabotage, accident, embargo or trade restriction, blockade, labour dispute, strike or shortage, civil commotion, curfew, act of war, actual or threatened act of terrorism, pressure waves caused by aircraft or other devices, meteorites, epidemic, pandemic, the act of an Authority or Law to contain a pandemic or epidemic, plague, quarantine.</p>
            <p><strong>Goods</strong> means the goods, including packaging, pallets or containers, the subject of the Services.</p>
            <p><strong>Government Authority</strong> means any government agency, authority, department or body, exercising jurisdiction in any nation, state, port or airport.</p>
            <p><strong>Heavy Vehicle National Law</strong> means any Commonwealth or State law or regulation relating to chain of responsibility obligations, including laws and regulations relating to driver fatigue, fatigue management, vehicle mass and dimension, vehicle maintenance, loading requirements (including load restraint), speed management, towing and coupling requirements, vehicle permits, transport documentation for goods, container weight declarations and dangerous goods and any other laws regulating the road transport of goods by heavy vehicles.</p>
            <p><strong>Law</strong> means any law, regulation, rule or Convention.</p>
            <p><strong>Loss</strong> means any loss, cost, damage, expense, claim, demand, action, proceeding or liability of any kind, (including legal costs on an indemnity basis).</p>
            <p><strong>Owner</strong> means the owner, importer or exporter of the Goods, or a person authorised to act on behalf of the owner or importer of the Goods.</p>
            <p><strong>Perishable Goods</strong> means any Goods liable to waste, deterioration or spoilage, and includes without limitation fruit, vegetables, dairy products, meat, and animals.</p>
            <p><strong>PPSA</strong> means the Personal Property Securities Act 2009 (Cth).</p>
            <p><strong>Related Company</strong> means a related body corporate within the meaning of section 50 of the Corporations Act 2001.</p>
            <p><strong>Services</strong> means the work performed by the Company in relation to the Goods, whether as agent or principal, including facilitating the import, export, transport, or storage of the Goods; and any ancillary acts for those purposes, including preparing any documentation or providing any information to a Government Authority.</p>
            <p><strong>Subcontractor</strong> means a third party (and their employees, agents and contractors) engaged to provide all or part of the Services.</p>
            <p><strong>Terms and Conditions</strong> means these terms and conditions.</p>
            <p><strong>Transport Document</strong> includes a bill of lading, waybill, consignment note, or similar carriage document.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. General</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>2.1</strong> The Company is not a common carrier. The Company will not be liable as a common carrier.</p>
            <p><strong>2.2</strong> These Terms and Conditions take priority over and will prevail to the extent of any inconsistency with the Authority, any credit application made by the Customer, the Customer's terms and conditions or other document issued by the Customer. Any terms and conditions set out in any Transport Document issued by the Company (including by its agents) take priority over these Terms and Conditions.</p>
            <p><strong>2.3</strong> The Agreement is governed by the laws of Victoria, Australia. The Company and the Customer submit to the jurisdiction of the courts of Victoria and of the Federal Court of Australia.</p>
            <p><strong>2.4</strong> A variation of these Terms and Conditions will only be valid if in writing and signed by each party or signed by a person with the authority to bind each party.</p>
            <p><strong>2.5</strong> Neither Party may assign its rights and obligations under the Agreement without the other Party's consent with such consent not to be unreasonably withheld.</p>
            <p><strong>2.6</strong> Any notices under these Terms and Conditions must be in English and in writing.</p>
            <p><strong>2.7</strong> All rights, indemnities and limitations of liability contained in these Terms and Conditions will have their full force and effect, despite any breach of term or condition of these Terms and Conditions, the Agreement, or any collateral agreement by a Party or the expiry or termination of the Authority.</p>
            <p><strong>2.8</strong> Without limiting the effect of clause 2.7, clauses 2.5, 2.12, 4.3, 6.13, 6.14, 7.3, 10, 11, 13, 14 and 15 of these Terms and Conditions will survive termination.</p>
            <p><strong>2.9</strong> If a condition or part of a condition of this Agreement is unenforceable, it must be severed from and does not affect the rest of the Agreement.</p>
            <p><strong>2.10</strong> A Party is not bound by any waiver, discharge or release of a condition or any agreement which purports to change this Agreement, unless it is in writing and signed by or for that Party.</p>
            <p><strong>2.11</strong> A reference in this Agreement to any law includes any statutory modification, substitution or re-enactment of it.</p>
            <p><strong>2.12</strong> If the Customer is a trustee of a trust, the Customer:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>will provide the Company with a copy of the trust deed and any documents amending that trust deed;</p></li>
              <li><p>will notify the Company of any change in trustee of the trust;</p></li>
              <li><p>agrees that these Terms and Conditions apply to, and all requests for Services placed by the Customer with the Company are placed by, the Customer in its personal capacity and as trustee of the trust.</p></li>
            </ul>
            <p><strong>2.13</strong> Any party that enters this Agreement as a disclosed or undisclosed agent agrees to be joint and severally liable for the debts, liabilities and obligations of the principal under this Agreement.</p>
            <p><strong>2.14</strong> This Agreement constitutes the entire understanding and agreement between the Parties regarding the Services. Each Party agrees that it did not rely on any representation, promise, warranty or condition made by the other Party that is not expressly part of this Agreement or any associated quotation for Services.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Services</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>3.1</strong> Services are provided by the Company subject to these Terms and Conditions.</p>
            <p><strong>3.2</strong> Without limitation to other methods of acceptance, by instructing the Company to provide the Services the Customer agrees to be bound by the Terms and Conditions.</p>
            <p><strong>3.3</strong> The Goods are at the risk of the Customer at all times.</p>
            <p><strong>3.4</strong> The Company may agree or refuse to provide Services at its reasonable discretion.</p>
            <p><strong>3.5</strong> Quoted times and dates for the movement of Goods are always subject to equipment and vessel/aircraft space availability. Availability may be impacted by decisions of Carriers and cannot be controlled by the Company.</p>
            <p><strong>3.6</strong> The Company is authorised by the Customer to choose the method for performance of the Services at the Company's reasonable discretion.</p>
            <p><strong>3.7</strong> The Customer authorises the Company to open any package containing Goods and do any other thing in order to inspect or weigh the Goods as part of performing the Services.</p>
            <p><strong>3.8</strong> The Customer agrees that:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><p>the value of the Goods will not be declared or inserted into a Transport Document or contract for the purpose of extending a Carrier's liability unless the Customer provides express written instructions to the Company to do so, and if required, the Carrier agrees;</p></li>
              <li><p>where a Subcontractor's or Carrier's charges may be determined by the extent of liability assumed by the Subcontractor or Carrier, no declaration of value will be made for the purpose of extending the liability of the Subcontractor or Carrier, and the Goods will be dealt with at the Customer's risk for minimum charges, unless the Customer provides written instructions to the contrary to the Company;</p></li>
              <li><p>the Company reserves the right to not make any declaration or take any action in respect of the Customer's Goods unless the Customer has provided the Company with sufficient notice, written instructions and the documents necessary to take that action in relation to those Goods.</p></li>
            </ul>
            <p><strong>3.9</strong> The Company may deem that certain Goods are Dangerous Goods provided that there are reasonable grounds for doing so.</p>
            <p><strong>3.10</strong> If Dangerous Goods are undeclared, or even if declared, pose a risk to people or property, the Company may in its reasonable discretion unload, store, destroy or otherwise deal with any Goods, without notice or compensation to the Customer. Where reasonably possible the Company will contact the Customer and try to agree on the action to be taken in respect of the Dangerous Goods.</p>
            <p><strong>3.11</strong> The Company's delivery obligations are satisfied if the Company delivers the Goods to the delivery address instructed by the Customer and a person at that address provides a receipt or signs a delivery docket, or if authorised by the Customer, the Goods are left at the delivery address without obtaining a receipt or signed delivery docket. Where applicable, the Company will provide the Customer with notice of the non-delivery.</p>
            <p><strong>3.12</strong> If a person at the delivery address cannot or refuses to take delivery of the Goods, or the Goods cannot be delivered for any other reason, the Customer authorises the Company to deal with the Goods at the Company's reasonable discretion, including storing, disposing of, or returning the Goods. The Company will reasonably attempt to give notice to the Customer before taking any action that may adversely affect the Customer.</p>
            <p><strong>3.13</strong> The Goods may be stored at any place in the reasonable discretion of the Company at the Customers' expense. Where reasonably possible, the Company will provide the Customer with the expected costs of storage and the storage location.</p>
            <p><strong>3.14</strong> If the Company stores the Goods, and no further Services are to be performed, or the Customer has breached the Agreement, the Company may require the Customer to remove the Goods from storage by giving reasonable notice delivered to an address provided by the Customer to the Company.</p>
            <p><strong>3.15</strong> The Customer appoints the Company with the power and authority to take any reasonable action and execute any document in the name of and on behalf of the Customer as required for the Company to provide the Services.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Customer Obligations</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>4.1</strong> The Customer will provide the Company with all reasonable assistance, information and documentation necessary to enable the Company to provide the Services, and punctually comply with any Law or request from a Government Authority. Without limitation, this includes verifying the weight of any packed Containers and providing the verified weight prior to any verified gross mass cut off time / date.</p>
            <p><strong>4.2</strong> The Customer is under a continuing obligation to provide any information which may materially affect the capacity of the Customer or the Company to perform its obligations under the Agreement.</p>
            <p><strong>4.3</strong> The Customer will keep confidential the Company's Fees or charges and any waiver, discount, release or indulgence provided by the Company in relation to the provision of the Services.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Instructions</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>5.1</strong> Any instructions given by the Customer must be in writing in English and be legible.</p>
            <p><strong>5.2</strong> The Company has the discretion to refuse to accept the Customer's instructions. The Company will inform the Customer if it does not accept its instructions.</p>
            <p><strong>5.3</strong> Sufficient notice of instructions must be given by the Customer to the Company to enable the Company to follow those instructions.</p>
            <p><strong>5.4</strong> If the Company accepts the Customer's instructions on one occasion, the Company will not be bound by those instructions when providing Services in the future.</p>
            <p><strong>5.5</strong> If the Company accepts the Customer's instructions to perform the Services in a particular way, it will give priority to that method, but may need to depart from that method due to unexpected event, action or inaction by a third party, unexpected cost or other reasonable reason.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Fees</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>6.1</strong> In respect of the Carriage of Goods, the Company's Fees are earned on the earlier of the commencement of the performance of the Services (or part thereof), or when the Goods are delivered to the Company or its subcontractors. All other Fees are earned as the Service is performed.</p>
            <p><strong>6.2</strong> The Company's Fees may include any disbursements and other amounts that the Company is required to pay third parties in connection with the Services. The Company at its reasonable discretion may vary its Fees if the amount of any such disbursements change and the disbursement change could not have been reasonably known at the time of providing a quote or could not have been avoided. Where reasonably practicable, the Company will provide notice of any material change in the Fees.</p>
            <p><strong>6.3</strong> The Company's Fees must be paid within 7 days of an invoice or as otherwise agreed in writing (the Due Date). Time is of the essence in respect of the Customer's obligations to make any payment to the Company in connection with this Agreement.</p>
            <p><strong>6.4</strong> The Company at its discretion may determine its Fees, including by weight, measurement or value, including by volumetric conversion. On request the Company will inform the Customer of the basis upon which its Fees are determined.</p>
            <p><strong>6.5</strong> The Company may re-weigh, re-measure or re-value the Goods at any time, and amend its Fees at its reasonable discretion if the Fees were based on incorrect information. The Company will provide notice of any change in its Fees.</p>
            <p><strong>6.6</strong> Any information contained in a quotation provided by the Company in relation to the Fees applies to the specific item, weight and volume quoted, designated Services and standard of Services, and is only valid until the earlier of 14 days after being provided, the quote being withdrawn or the quote expiring.</p>
            <p><strong>6.7</strong> A quotation is not an offer and is not binding on the Company. A quotation may change based on changes to freight, insurance, warehousing, fees, and any other charges. Quotations will be confirmed by the Company if the Customer wishes to proceed with the quoted Service.</p>
            <p><strong>6.8</strong> Fees due to the Company are payable in Australian dollars unless otherwise agreed. The Company is entitled to charge a currency conversion fee when it receives payment in a currency other than Australian dollars.</p>
            <p><strong>6.9</strong> Unless otherwise stated, the Company's Fees are exclusive of goods and services tax.</p>
            <p><strong>6.10</strong> The Customer agrees that the Company may receive and retain for its own account remuneration, allowances, brokerages and commissions from shipping and forwarding agents, shipping lines, insurance brokers, airlines and any other persons with whom the Company deals or that are payments of the nature commonly received by freight forwarders and that the Company is not required to disclose the receipt and retention of such amounts to the Customer, even, without limitation, if acting as agent for the Customer.</p>
            <p><strong>6.11</strong> The Customer agrees that the Company may charge its fees and/or recover its administrative costs by way of increasing the amount charged to it by third parties, such as disbursements, when invoicing those amounts to the Customer and that there is no obligation on the Company to separately show this portion of the fee on any invoice.</p>
            <p><strong>6.12</strong> The Customer remains responsible for the payment of Fees:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>even where an arrangement is made for the Fees to be paid by another person;</p></li>
              <li><p>whether or not the Goods are delivered or damaged or the Services performed as instructed. However, the payment of Fees will not be taken as a waiver of any rights of the Customer.</p></li>
            </ul>
            <p><strong>6.13</strong> If the Fees are not paid in full within 7 days of the Due Date then, without limitation to its rights, the Company may charge interest on the late payment at the published business overdraft rate of the Commonwealth Bank of Australia.</p>
            <p><strong>6.14</strong> A Party will not defer, set-off or withhold payment of any amount payable to the other Party by reason of any claim the Party has, or claims it has, against the other Party.</p>
            <p><strong>6.15</strong> Any credit terms provided by the Company may be terminated by the Company with immediate effect if the Customer does not pay the Fees by the Due Date or otherwise materially breaches this agreement.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Subcontractors and agency</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>7.1</strong> The Customer authorises the Company to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>subcontract all or part of the Services to a Subcontractor; and / or</p></li>
              <li><p>as the agent of the Customer, contract with a third party service provider on behalf of the Customer on ordinary commercial terms, including terms that limit or exclude the liability of the third party service provider.</p></li>
            </ul>
            <p><strong>7.2</strong> The Customer authorises a Subcontractor to subcontract all or part of the Services.</p>
            <p><strong>7.3</strong> All exclusions or limitations on the liability of the Company in these Terms and Conditions extend to protect:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><p>all Subcontractors;</p></li>
              <li><p>the agents, employees and servants of any Subcontractor or the Company; and</p></li>
              <li><p>any person engaged to provide all or part of the Services.</p></li>
            </ul>
            <p><strong>7.4</strong> For the purpose of clauses 7.3 the Company acts as trustee on behalf of and for the benefit of any Subcontractor, and to this extent each Subcontractor is deemed to be a party to this Agreement.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Intellectual Property</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>8.1</strong> The Customer agrees that the Company retains all copyright and intellectual property subsisting in all documents and things created by, or for, the Company in connection with the performance of the Services, including copyright and intellectual property that now exists or that later comes into existence.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Warranties</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><strong>9.1</strong> The Customer (on behalf of itself and the Owner) warrants to the Company that:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><p>it is the owner of the Goods, or is the authorised agent of the owner of the Goods and is authorised to complete and sign documentation related to the Goods and the Services;</p></li>
              <li><p>it enters into the Agreement on its own behalf, or in its capacity as the authorised agent of the owner of the Goods;</p></li>
              <li><p>it has complied with all Laws relating to the Goods, including the nature, condition, packaging, handling, storage and Carriage of the Goods;</p></li>
              <li><p>in engaging the Services from the Company, it will not procure the Company to perform any act in breach of any Laws including any trade sanctions;</p></li>
              <li><p>it will observe all Laws and requirements of Government Authorities;</li>
              <li><p>all information and documentation provided by or on behalf of the Customer to the Company is accurate and complete, and it has not omitted to provide any requested or material information;</p></li>
              <li><p>other than where the Company is responsible for packing the Goods, the Goods are packed to endure the ordinary risks of handling, storage and the Services, having regard to the nature of the Goods including without limitation, that in respect of temperature controlled goods, the Container has been properly pre-cooled or pre-heated and the Container's thermostatic controls have been correctly set;</p></li>
              <li><p>the Goods are not Dangerous Goods, unless the Company has agreed in writing to provide the Services in respect of those particular Dangerous Goods, and in which case, warrants that it has made full disclosure of Dangerous Goods and such Goods are distinctly marked; and</p></li>
              <li><p>all Goods are adequately and accurately marked, labelled or branded; and</p></li>
              <li><p>it will ensure, so far as is reasonably practicable, the safety of any road transport performed for or on behalf of the Customer and it will meet its obligations under the Heavy Vehicle National Law where the Customer is the consignor, consignee, packer or loader of the Goods.</p></li>
            </ul>
          </div>
        </section>
 
        <section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Liability</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>10.1</strong> Despite any other clause in these Terms and Conditions, where the Services involve the international Carriage of Goods, the Company limits its liability in respect of loss or damage to Goods, or delay in the delivery of the Goods, to the maximum extent permitted under any Convention (or national enabling legislation) applying to relevant Carriage of the Goods.</p>
    <p><strong>10.2</strong> The Company will exercise due care and skill in the selection of third party Carriers and service providers. However, the Company excludes all liability for loss, damage or delay to the Goods that occurs while the Goods are in the physical custody of a third party, including a Subcontractor, unless such loss or damage was caused by the Company or could have been prevented by the exercise of due care and skill by the Company. Subject to the application of any mandatory legislation, the Company will not be liable in any circumstances (whether in tort, contract, bailment or otherwise) for loss, damage or mis-delivery of the Goods unless it is demonstrated that such loss, damage or misdelivery was due to the negligence, breach or wilful default of the Company.</p>
    <p><strong>10.3</strong> Neither party is liable for Consequential Loss suffered by the other Party unless the Party had actual knowledge that such Consequential Loss would be incurred.</p>
    <p><strong>10.4</strong> The Company excludes from this Agreement all conditions, warranties, terms and consumer guarantees implied by Laws, general law or custom except any the exclusion of which would contravene any Laws or cause this condition to be void (Non-Excludable Condition).</p>
    <p><strong>10.5</strong> To the extent permitted by Law, the Company's liability for any breach of a Non-Excludable Condition is limited, at the Company's option, to supplying the particular Services again, or the cost of supplying the particular Services again.</p>
    <p><strong>10.6</strong> The Company will not be liable for omitting to inspect or take any other action in respect of Goods where Goods have been damaged or pillaged, unless the Customer provides the Company with written instructions to take that action in relation to those Goods and the Company accepts those instructions.</p>
    <p><strong>10.7</strong> Without limiting clause 10.1, where the liability of the Company is not limited or fully excluded by a Convention, the Agreement, Law or otherwise, the liability of the Company is limited to the lesser of:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>The actual loss or damage suffered by the Customer;</p></li>
      <li><p>Australian $200,000,</p></li>
      <li><p>The value of the Goods at the time the Goods were received by the Company.</p></li>
    </ul>
    <p><strong>10.8</strong> The liability limits in clause 10.7 do not apply to the extent that the Loss or damage results from any act or omission which constitutes fraud, wilful misconduct or gross negligence.</p>
    <p><strong>10.9</strong> The Company will not be in breach of any of its obligations to the Customer or liable for any Loss (excluding Loss caused by its negligence) suffered by the Customer arising from or connected with the Company's compliance with any Law, including without limitation disclosing confidential information to a Government Authority.</p>
    <p><strong>10.10</strong> Where a Convention or Law imposes a timeframe on the making of claims against the Company, the Company relies on and does not extend that timeframe.</p>
    <p><strong>10.11</strong> Without limitation to any other clause of the Agreement, a Party will be discharged from all liability in connection with:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li>
        Damage to or non-delivery or late delivery of the Goods unless:
        <ul className="list-disc ml-6 space-y-1">
          <li><p>Notice of any claim is received by the other Party within 7 days of the earlier of the delivery of Goods or the date the Goods should have been delivered; and</p></li>
          <li><p>Suit is brought and written notice is received by the other Party within 9 months of the earlier of the delivery of the Goods or the date the Goods should have been delivered.</p></li>
        </ul>
      </li>
      <li><p>Claims unrelated to damage to, non-delivery of or late delivery of the Goods unless suit is brought and written notice is received by the other Party within 3 years of the event giving rise to the claim.</p></li>
    </ul>
    <p><strong>10.12</strong> Clause 10.11 does not apply where the making of a claim or commencement of a proceeding outside of the stated timeframes does not prejudice the Company in any claim it may have against a third party in respect of, or in determining the cause of, the loss or damage to the Goods or delay in delivering the Goods.</p>
    <p><strong>10.13</strong> A Party will not be liable to the other Party for any delay or failure to perform an obligation under the Agreement or Loss suffered by the other Party to the extent caused by a Force Majeure Event.</p>
    <p><strong>10.14</strong> If a Force Majeure Event prevents or causes a delay in the performance of a Party’s obligation exceeding 28 days, either Party may terminate the provision of the Services by notice to the Other Party.</p>
    <p><strong>10.15</strong> Without limitation to any other clause in this Agreement, for Carriage by air, if the Carriage involves an ultimate destination stop in a county other than the country of departure, the Warsaw Convention or the Montreal Convention may be applicable and the relevant convention governs, and in most cases, limits the liability of air Carriers in respect of loss or damage to cargo.</p>
  </div>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Customer Indemnities</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>11.1</strong> The indemnities in this clause do not apply to the extent that the Loss was caused by a breach of contract or a negligent, unlawful, reckless or wilful act or omission by the Company or its employees, agents and contractors unless the Company was following a specific direction provided by the Customer.</p>
    <p><strong>11.2</strong> When seeking to rely on an indemnity, the Company is under an obligation to act reasonably to minimise the Loss incurred.</p>
    <p><strong>11.3</strong> The Customer indemnifies the Company from and against (and must pay on demand for) all Loss arising directly or indirectly from or in connection with the Goods or the performance of the Services (including Consequential Loss) caused by an act or omission of the Customer or which was beyond the reasonable control of the Company.</p>
    <p><strong>11.4</strong> Without limitation to clause 11.3 the Customer indemnifies the Company from and against (and must pay on demand for) any Loss arising from:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>the Customer's or Owner's failure to return, return by the due date, return within the "free" period and/or return empty, clean, or undamaged any Container or transport equipment involved in the performance of the Services;</p></li>
      <li><p>any claim against the Company by a person who claims to have an interest in the Goods (other than the Customer);</p></li>
      <li><p>breach of this Agreement, including any warranty provided by the Customer;</p></li>
      <li><p>any Loss, cost or liability incurred or suffered by the Company as a result of releasing or delivering the Goods to the Customer or at the direction of the Customer;</p></li>
      <li><p>any claim for general average and will provide any security requested by the Company for the release of any Goods that are the subject of a claim for general average;</p></li>
      <li><p>any inspection of, or treatment of, the Goods by, or directed by, a Government Authority;</p></li>
      <li><p>all duty, GST, and any other fees and taxes incurred in connection with the Goods payable to a Government Authority;</p></li>
      <li><p>any costs or charges incurred as a result of any delay in loading or unloading, or collecting or delivering, the Goods;</p></li>
      <li><p>all costs payable to third parties in relation to the Carriage, storage, treatment or entry of the Goods other than costs that were known by the Company as expenses that would be incurred in respect of the Carriage or Goods at the time the Company provided a quote to the Customer and those costs were either not included in the Quote or were not of a nature which the Customer would have expected to be incurred.</p></li>
    </ul>
    <p><strong>11.5</strong> The indemnities in this clause 11 continue whether or not the Goods are pillaged, stolen, lost or destroyed. However, the payment of any amount by the Customer will not constitute a waiver of any rights held by the Customer.</p>
  </div>
</section>

       <section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Insurance</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>12.1</strong> The Company will not arrange insurance in respect of the Goods. The Customer is responsible for arranging insurance in respect of the Goods. If the Company refers the Customer to an insurance company or broker, the Company makes no warranty or representation in respect of the insurer or broker or the insurance offered.</p>
  </div>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. Lien</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>13.1</strong> The Company has:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li>a particular and general lien on all Goods and documents relating to the Goods; and</li>
      <li>a right to sell those Goods and documents by public auction or private sale (at the Company's discretion) and apply the proceeds of sale;</li>
    </ul>
    <p>in respect of all sums due and owing from the Customer or a Related Company of the Customer.</p>
    <p><strong>13.2</strong> Before selling any Goods or documents the Company will give the Customer at least 14 days’ written notice of its intention to do so. However, lesser, or no, notice may be given where:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>the Goods or documents may materially deteriorate during any notice period; and/or</p></li>
      <li><p>the storage or other costs that will be incurred in respect of the Goods or documents during the notice period will exceed the likely net sale price of the Goods or documents.</p></li>
    </ul>
    <p><strong>13.3</strong> The lien will also cover the Company's costs and expenses relating to the exercise of its lien and right of sale, including the Company's reasonable legal fees.</p>
    <p><strong>13.4</strong> For the purposes of the lien, the Company will retain constructive possession of the Goods and the lien and rights granted by this clause will survive delivery of the Goods or the transfer of the Goods to a Subcontractor. The Company is entitled to retain the proceeds of sale of the Goods in respect of all sums due and owing from the Customer.</p>
  </div>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">14. PPSA</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>14.1</strong> Terms used in clause 14 that are defined in the PPSA have the same meaning as in the PPSA.</p>
    <p><strong>14.2</strong> Without limitation to other rights of the Company, from the time the Goods are in the possession of the Company or a Subcontractor, the Goods are subject to a continuing security interest in favour of the Company for the payment of all amounts due and owing by the Customer under the Agreement.</p>
    <p><strong>14.3</strong> The Customer acknowledges and consents to the Company's registration and perfection of the Company's security interest under the Agreement for the purposes of the PPSA.</p>
    <p><strong>14.4</strong> To the extent permitted by law, the Customer waives any right it may have to receive a verification statement.</p>
    <p><strong>14.5</strong> The Customer will do all things and execute all documents reasonably necessary to give effect to the security interest created under this Agreement or comply with any reasonable request by the Company in connection with the PPSA.</p>
  </div>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">15. Uncollected Goods</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>15.1</strong> The Company may at its reasonable discretion sell or return Goods that cannot be delivered because they are insufficiently or incorrectly addressed, are not identifiable, are uncollected or not accepted after 21 days' notice to the Customer or where the Customer fails to pay any cost or do any action reasonably necessary for the Company to deliver the Goods.</p>
    <p><strong>15.2</strong> The notice period in clause 15.1 does not apply where either:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>the Goods will materially deteriorate or lose value during the notice period; or</p></li>
      <li><p>the costs of storing or maintaining the Goods during the notice period exceeds the likely net proceeds from the sale of the Goods.</p></li>
    </ul>
    <p><strong>15.3</strong> Where the Company sells Goods under clauses 13 or 15:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>it does so as principal, not as agent, and is not the trustee of the power of sale;</p></li>
      <li><p>the Customer must pay all reasonable costs, charges and expenses incurred by the Company in connection with the storage, sale or return of the Goods, which may be deducted from the proceeds of the sale of the Goods;</p></li>
      <li><p>the Company is entitled to recover any deficit from the Customer where the proceeds of sale of the Goods do not satisfy the amounts payable to the Company;</p></li>
      <li><p>any surplus proceeds will be paid to the Customer (provided that the Customer can be identified).</p></li>
    </ul>
  </div>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">16. Modifications for Particular Contracts</h2>
  <div className="space-y-3 text-sm leading-relaxed">
    <p><strong>16.1</strong> This clause 16 applies where any of the following are met:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><p>this agreement is not a Consumer Contract or Small Business contract as defined in section 23 of schedule 1 of the Competition and Consumer Act 2010 (Cth);</p></li>
      <li><p>this agreement is not a Standard Form Agreement; or</p></li>
      <li><p>this agreement is a contract to which Part 2-3 of schedule 1 of the Competition and Consumer Act 2010 (Cth) does not apply.</p></li>
    </ul>
    <p><strong>16.2</strong> Where this clause 16 applies, this agreement is read as follows:</p>
    <ul className="list-disc ml-6 space-y-1">
      <li><strong>Clause 10.7</strong> is replaced with the following wording:<br />
        “10.7 In all cases where liability has not been limited or excluded by mandatory applicable statute, Convention or law, the liability of the Company is limited to, without limiting clause 10.1 above, the lesser of:
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li><p>the actual loss or damage suffered; or</p></li>
          <li><p>$1,000 per loss causing event and in the aggregate of all claims by the Customer against the Company during a calendar year.”</p></li>
        </ul>
      </li>
      <li><strong>Clause 11.1</strong> does not apply.</li>
    </ul>
  </div>
</section>

      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
