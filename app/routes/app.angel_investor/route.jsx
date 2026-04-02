/* eslint-disable no-undef */
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useLoaderData } from "react-router";
import { DATA_PRODUCTS, productUrl } from "../../lib/catalog";
import { authenticate } from "../../shopify.server";
import ProductMediaGallery from "../../components/ui/productMediaGallery";
import { DatabaseCarousel } from "../../components/DatabaseCarousel";
import { openShopifyCheckout } from "../../lib/shopifyCheckout";

const ANGEL_INVESTOR_HANDLE =
  DATA_PRODUCTS.find((p) => p.id === "angels-500")?.handle ?? "top-500-angel-investor-data-india-usa-uae";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const storefrontBase = process.env.PUBLIC_SHOPIFY_CART_BASE_URL || "https://datastation.myshopify.com";
  return {
    shopifyCartBaseUrl: storefrontBase,
    shopifyAngelInvestorVariantId: process.env.PUBLIC_SHOPIFY_ANGEL_INVESTOR_VARIANT_ID || "",
    shopifyProductFallbackUrl:
      process.env.PUBLIC_SHOPIFY_ANGEL_INVESTOR_PRODUCT_URL ||
      productUrl(storefrontBase, ANGEL_INVESTOR_HANDLE),
  };
};

export default function AngelInvestorPage() {
  const { shopifyCartBaseUrl, shopifyAngelInvestorVariantId, shopifyProductFallbackUrl } = useLoaderData();

  const handleBuy = () => {
    if (
      openShopifyCheckout({
        cartBaseUrl: shopifyCartBaseUrl,
        variantId: shopifyAngelInvestorVariantId,
      })
    ) {
      return;
    }
    window.open(shopifyProductFallbackUrl, "_blank", "noopener,noreferrer");
  };

  const mediaData = [
    { type: "image", src: "/500_angel.webp" },
    { type: "image", src: "/all_product.webp" },
    { type: "video", src: "/data_video.mp4" },
  ];

  const getProductPrice = (id) => {
    const item = DATA_PRODUCTS.find((p) => p.id === id) || {};
    return {
      cutPrice: item.cutPrice,
      percentOff: item.percentOff,
      price: item.price,
    };
  };

  const item = getProductPrice("angels-500");

  return (
    <div className="max-w-full overflow-x-hidden bg-white px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-30 min-[1100px]:px-13">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <span className="text-xs font-bold text-[#5c5c5c] sm:text-sm">Overview</span>
        <svg
          viewBox="0 0 1000 30"
          preserveAspectRatio="none"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "30px" }}
        >
          <path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#5c5c5c" strokeWidth="1" />
        </svg>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="min-w-0">
            <ProductMediaGallery media={mediaData} />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-bold leading-[1.1] tracking-tight text-[#ed501f] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Top 500 Angel Investor Data (India, USA, UAE)
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">
              The Top 500 Angel Investor Database provides access to a curated dataset of active angel investors from
              India, the United States, and the United Arab Emirates.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">
              This database is designed for startup founders, venture professionals, and consultants who are looking to
              connect with investors and explore funding opportunities.
            </p>
            <div className="mt-6 max-w-lg rounded-2xl border border-[#ed501f]/30 bg-[#fff8f5] p-5 transition-all duration-300">
              <p className="text-sm leading-relaxed text-[#5c5c5c]">After payment, your Excel file is delivered to the email you enter at checkout.</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">{item.percentOff}% off</p>
                <p className="text-xl text-muted-foreground line-through">₹{item.cutPrice.toLocaleString()}</p>
                <p className="text-xl text-[#ed501f] font-bold">₹{item.price.toLocaleString()}</p>
              </div>
              <button type="button" onClick={handleBuy} className="mt-4 w-full rounded-xl bg-linear-to-r from-[#ed501f] to-[#cf3101] py-3 font-semibold text-white cursor-pointer">Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <DatabaseCarousel excludeProductId="angels-500" />
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
