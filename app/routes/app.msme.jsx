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

export default function MsmeDatabases() {
  const { storefrontBaseUrl } = useOutletContext();
  const items = DATA_PRODUCTS.filter((p) => p.category === "MSME Data");

  return (
    <s-page heading="MSME Database">
      <div className="font-sans text-ds-grey-dark antialiased">
        <div className="mb-8 max-w-3xl space-y-4 text-sm leading-relaxed text-ds-grey-accent">
          <p>
            MSME datasets provide structured company records across India for
            sales, partnerships, research, and outreach. Each product is
            delivered in{" "}
            <strong className="text-ds-grey-dark">Excel (.xlsx)</strong> with
            fields such as company name, address, phone, email, website, and
            industry.
          </p>
          <p>
            <strong className="text-ds-grey-dark">Delivery:</strong> instant
            download after purchase on your storefront.
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
