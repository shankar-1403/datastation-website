import { useOutletContext } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DataStationLanding } from "../components/DataStationLanding.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function HomePage() {
  const { storefrontBaseUrl, sampleDownloadUrl } = useOutletContext();

  return (
    <DataStationLanding
      storefrontBaseUrl={storefrontBaseUrl}
      sampleDownloadUrl={sampleDownloadUrl}
    />
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
