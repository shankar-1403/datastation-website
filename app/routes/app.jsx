/* eslint-disable no-undef */
import { Outlet, useLoaderData, useLocation, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const APP_NAV_LINKS = [
  { label: "Home", to: "/app" },
  { label: "Databases", to: "/app/databases" },
  { label: "10k MSME Database", to: "/app/tenmsme" },
  { label: "20k MSME Database", to: "/app/twentymsme" },
  { label: "30k MSME Database", to: "/app/thirtymsme" },
  { label: "40k MSME Database", to: "/app/fortymsme" },
  { label: "Top 250+ VC & Angels Investor (India)", to: "/app/vc_angel_investor" },
  { label: "Top 500 Angel Investor Database (India, USA, UAE)", to: "/app/angel_investor" },
  { label: "About", to: "/app/about" },
  { label: "Contact", to: "/app/contact" },
];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    storefrontBaseUrl: process.env.PUBLIC_STOREFRONT_URL || "",
    sampleDownloadUrl: process.env.PUBLIC_SAMPLE_DOWNLOAD_URL || "",
  };
};

export default function App() {
  const { apiKey, storefrontBaseUrl, sampleDownloadUrl } = useLoaderData();
  const location = useLocation();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <Header sampleDownloadUrl={sampleDownloadUrl} />
      <s-app-nav>
        {APP_NAV_LINKS.map((item) => (
          <s-link key={item.to} to={`${item.to}${location.search}`}>
            {item.label}
          </s-link>
        ))}
      </s-app-nav>
      <div className="min-h-full bg-ds-grey-bg">
        <Outlet
          context={{
            storefrontBaseUrl,
            sampleDownloadUrl,
          }}
        />
      </div>
      <Footer />
    </AppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
