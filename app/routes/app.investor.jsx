import { useOutletContext } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DsFooter } from "../components/DsFooter.jsx";
import { DsProductCard } from "../components/DsProductCard.jsx";
import { DATA_PRODUCTS, productUrl } from "../lib/catalog.js";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function InvestorDatabases() {
  const { storefrontBaseUrl } = useOutletContext();
  const items = DATA_PRODUCTS.filter((p) => p.category === "Investor Data");

  return (
    <s-page heading="Investor Database">
      <div className="font-sans text-ds-grey-dark antialiased">
        <div className="mb-8 max-w-3xl space-y-4 text-sm leading-relaxed text-ds-grey-accent">
          <p>
            <strong className="text-ds-grey-dark">Top 500 Angel Investor Data</strong>{" "}
            (India · USA · UAE): curated active angels for founders, venture
            professionals, and consultants exploring funding.
          </p>
          <p>
            <strong className="text-ds-grey-dark">
              Top 250+ VC &amp; Angel Investors (India)
            </strong>
            : VC firms and angels across India&apos;s major startup hubs — Excel
            format for filtering and analysis.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((p) => (
            <DsProductCard
              key={p.id}
              title={p.title}
              category={p.category}
              blurb={p.blurb}
              href={productUrl(storefrontBaseUrl, p.handle)}
            />
          ))}
        </div>
        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
