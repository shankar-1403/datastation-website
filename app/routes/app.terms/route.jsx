import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function TermsPage() {
  return (
    <div className="w-full px-4 pb-10 pt-30 sm:px-6 lg:px-8 min-[1100px]:px-13">
      <article className="rounded-xl border border-black/5 bg-ds-white p-6 shadow-sm md:p-8">
        <h1 className="font-heading text-2xl font-bold text-[#ed501f] mb-2">1. Acceptance of Terms</h1>
        <p className="text-[#5c5c5c] text-base">By accessing or purchasing from Data Station, you agree to these Terms & Conditions.</p>
        <p className="text-[#5c5c5c] text-base">If you do not agree, please do not use the website.</p>
        <h2 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">2. Services</h2>
        <p className="text-[#5c5c5c] text-base">Data Station provides curated business datasets, including but not limited to:</p>
        <ul className="list-disc pl-5">
          <li>MSME data</li>
          <li>Investor databases</li>
          <li>Market datasets</li>
        </ul>
        <p className="text-[#5c5c5c] mt-2">All products are delivered in digital format (e.g., Excel files).</p>
        <h3 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">3. Use of Data</h3>
        <p className="text-[#5c5c5c] text-base">By purchasing our datasets, you agree:</p>
        <ul className="list-disc pl-5">
          <li>Data is for internal business use only</li>
          <li>You will not resell, redistribute, or share the data</li>
          <li>You will not use data for illegal or unethical purposes</li>
          <li>You will comply with applicable data protection laws</li>
        </ul>
        <h4 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">4. No Guarantee of Accuracy</h4>
        <p className="text-[#5c5c5c] text-base">While we strive to provide high-quality data:</p>
        <ul className="list-disc pl-5">
          <li>We do not guarantee 100% accuracy or completeness</li>
          <li>Data may change over time</li>
          <li>Users are responsible for verifying information before use</li>
        </ul>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">5. Payments</h5>
        <p className="text-[#5c5c5c] text-base">All payments must be made in full before access is granted</p>
        <p className="text-[#5c5c5c] text-base">Payments are processed through secure third-party providers</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">6. Refund Policy</h5>
        <p className="text-[#5c5c5c] text-base">Due to the nature of digital products:</p>
        <ul className="list-disc pl-5">
          <li>All sales are final and non-refundable</li>
          <li>No refunds will be issued once data is delivered</li>
        </ul>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">7. Intellectual Property</h5>
        <p className="text-[#5c5c5c] text-base">All datasets, content, and materials are the property of Data Station.</p>
        <p className="text-[#5c5c5c] text-base">Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">8. Limitation of Liability</h5>
        <p className="text-[#5c5c5c] text-base">Data Station shall not be liable for:</p>
        <ul className="list-disc pl-5">
          <li>Any business losses</li>
          <li>Loss of data or profits</li>
          <li>Decisions made based on purchased datasets</li>
        </ul>
        <p className="text-[#5c5c5c] text-base">Use of data is at your own risk.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">9. Termination</h5>
        <p className="text-[#5c5c5c] text-base">We reserve the right to:</p>
        <ul className="list-disc pl-5">
          <li>Suspend or terminate access</li>
          <li>Restrict usage if terms are violated</li>
        </ul>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">10. Changes to Terms</h5>
        <p className="text-[#5c5c5c] text-base">We may update these Terms at any time. Continued use of the website means acceptance of the updated terms.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">11. Governing Law</h5>
        <p className="text-[#5c5c5c] text-base">These terms are governed by the laws of India.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">11. Contact</h5>
        <p className="text-[#5c5c5c] text-base">Email: <a href="mailto:support@datastation.in" className="text-[#ed501f]">support@datastation.in</a></p>
        <p className="text-[#5c5c5c] text-base">Website: datastation.in</p>
      </article>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
