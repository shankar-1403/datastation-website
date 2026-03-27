import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { DsFooter } from "../../components/Footer.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function PrivacyPage() {
  return (
    <s-page heading="Privacy Policy">
      <div className="font-sans text-ds-grey-dark antialiased">
        <article className="prose prose-sm max-w-3xl rounded-xl border border-black/5 bg-ds-white p-6 text-ds-grey-accent shadow-sm md:p-8">
          <p>
            At Data Station (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;),
            we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when you
            use our website and services.
          </p>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            Information collected
          </h2>
          <ul className="list-disc pl-5">
            <li>Name</li>
            <li>Email</li>
            <li>Phone number</li>
            <li>Company details</li>
          </ul>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            Transaction information
          </h2>
          <ul className="list-disc pl-5">
            <li>Purchase history</li>
            <li>Payment details</li>
          </ul>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            Technical data
          </h2>
          <ul className="list-disc pl-5">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
          </ul>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            We use information to
          </h2>
          <ul className="list-disc pl-5">
            <li>Provide access to datasets</li>
            <li>Process payments</li>
            <li>Improve services</li>
            <li>Communicate updates</li>
            <li>Prevent fraud</li>
          </ul>
          <p className="mt-6 font-semibold text-ds-grey-dark">
            We do not sell personal information.
          </p>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            Contact
          </h2>
          <p>
            Email:{" "}
            <a
              href="mailto:support@datastation.in"
              className="text-ds-orange hover:underline"
            >
              support@datastation.in
            </a>
          </p>
        </article>
        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
