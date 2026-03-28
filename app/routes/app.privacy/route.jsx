import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function PrivacyPage() {
  return (
    <div className="pt-30 pb-10 w-full min-[1100px]:px-13">
      <article className="rounded-xl border border-black/5 bg-ds-white p-6 shadow-sm md:p-8">
        <h1 className="font-heading text-2xl font-bold text-[#ed501f] mb-2">1. Introduction</h1>
        <p className="text-[#5c5c5c] text-base">At Data Station (“we”, “our”, “us”), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
        <p className="text-[#5c5c5c] text-base">By using datastation.in, you agree to the terms of this policy.</p>
        <h2 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">2. Information we collect</h2>
        <p className="text-[#5c5c5c] text-base">We may collect the following types of information:</p>
        <p className="text-[#5c5c5c] mt-2">a. Personal Information</p>
        <ul className="list-disc pl-5">
          <li>Name</li>
          <li>Email</li>
          <li>Phone number</li>
          <li>Company details</li>
        </ul>
        <p className="text-[#5c5c5c] mt-2">b. Transaction information</p>
        <ul className="list-disc pl-5">
          <li>Purchase history</li>
          <li>Payment details (processed via secure third-party gateways)</li>
        </ul>
        <p className="text-[#5c5c5c] mt-2">c. Technical data</p>
        <ul className="list-disc pl-5">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Website usage data</li>
        </ul>
        <h3 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">3. How We Use Your Information</h3>
        <p className="text-[#5c5c5c] text-base">We use your information to:</p>
        <ul className="list-disc pl-5">
          <li>Provide access to purchased datasets</li>
          <li>Process payments and transactions</li>
          <li>Improve our website and services</li>
          <li>Communicate updates, offers, or support</li>
          <li>Prevent fraud and ensure security</li>
        </ul>
        <h4 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">4. Data Sharing</h4>
        <p className="text-[#5c5c5c] text-base">We do not sell your personal information.</p>
        <p className="text-[#5c5c5c] text-base">We may share data with:</p>
        <ul className="list-disc pl-5">
          <li>Payment processors</li>
          <li>Service providers (hosting, analytics)</li>
          <li>Legal authorities (if required by law)</li>
        </ul>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">5. Data Security</h5>
        <p className="text-[#5c5c5c] text-base">We implement appropriate security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">6. Cookies</h5>
        <p className="text-[#5c5c5c] text-base">We may use cookies to enhance user experience and analyze website traffic.</p>
        <p className="text-[#5c5c5c] text-base">You can disable cookies through your browser settings.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">7. Third-Party Links</h5>
        <p className="text-[#5c5c5c] text-base">Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">8. Your Rights</h5>
        <p className="text-[#5c5c5c] text-base">You may:</p>
        <ul className="list-disc pl-5">
          <li>Request access to your data</li>
          <li>Request correction or deletion</li>
          <li>Opt out of marketing communications</li>
        </ul>
        <p className="text-[#5c5c5c] text-base">Contact us at: [your email]</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">9. Updates to Policy</h5>
        <p className="text-[#5c5c5c] text-base">We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
        <h5 className="font-heading mt-6 text-2xl font-bold text-[#ed501f] mb-2">10. Contact</h5>
        <p className="text-[#5c5c5c] text-base">Email: <a href="mailto:support@datastation.in" className="text-[#ed501f]">support@datastation.in</a></p>
        <p className="text-[#5c5c5c] text-base">Website: datastation.in</p>
      </article>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
