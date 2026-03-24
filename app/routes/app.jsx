import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { DsAppNavbar } from "../components/DsAppNavbar.jsx";

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

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">Home</s-link>
        <s-link href="/app/databases">Databases</s-link>
        <s-link href="/app/msme">MSME Data</s-link>
        <s-link href="/app/investor">Investor Data</s-link>
        <s-link href="/app/about">About</s-link>
        <s-link href="/app/contact">Contact</s-link>
      </s-app-nav>
      <DsAppNavbar sampleDownloadUrl={sampleDownloadUrl} />
      <div className="min-h-full bg-ds-grey-bg pt-[66px]">
        <Outlet
          context={{
            storefrontBaseUrl,
            sampleDownloadUrl,
          }}
        />
      </div>
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
