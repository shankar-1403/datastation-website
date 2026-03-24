import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DsFooter } from "../components/DsFooter.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function TermsPage() {
  return (
    <s-page heading="Terms & Conditions">
      <div className="font-sans text-ds-grey-dark antialiased">
        <article className="max-w-3xl rounded-xl border border-black/5 bg-ds-white p-6 text-sm text-ds-grey-accent shadow-sm md:p-8 md:text-base">
          <p>
            By purchasing or downloading datasets from Data Station, you agree
            to the following terms.
          </p>
          <h2 className="font-heading mt-6 text-lg font-semibold text-ds-grey-dark">
            Key rules
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Data is for internal business use only.</li>
            <li>Reselling is not allowed.</li>
            <li>No refunds after download.</li>
            <li>No guarantee of 100% accuracy.</li>
            <li>Users are responsible for lawful use of the data.</li>
            <li>All datasets remain the property of Data Station.</li>
            <li>Governed by the laws of India.</li>
          </ul>
          <p className="mt-6">
            Questions:{" "}
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
