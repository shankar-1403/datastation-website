/* eslint-disable no-undef */
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useLoaderData } from "react-router";
import { DATA_PRODUCTS, productUrl } from "../../lib/catalog";
import { authenticate } from "../../shopify.server";
import ProductMediaGallery from "../../components/ui/productMediaGallery";
import { DatabaseCarousel } from "../../components/DatabaseCarousel";
import { openShopifyCheckout } from "../../lib/shopifyCheckout";
import Breadcrumb from "../../components/ui/Breadcrumb";

const PACKAGING_HANDLE = DATA_PRODUCTS.find((p) => p.id === "8800-packaging")?.handle ?? "8800-packaging-companies";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const storefrontBase = process.env.PUBLIC_SHOPIFY_CART_BASE_URL || "https://datastation.myshopify.com";
  return {
    shopifyCartBaseUrl: storefrontBase,
    /** Example: PUBLIC_SHOPIFY_PACKAGING_VARIANT_ID=1234567890 */
    shopifyPackagingVariantId: process.env.PUBLIC_SHOPIFY_PACKAGING_VARIANT_ID || "",
    shopifyProductFallbackUrl:
      process.env.PUBLIC_SHOPIFY_PACKAGING_PRODUCT_URL ||
      productUrl(storefrontBase, PACKAGING_HANDLE),
  };
};

export default function PackagingPage() {
  const { shopifyCartBaseUrl, shopifyPackagingVariantId, shopifyProductFallbackUrl } = useLoaderData();

  const handleBuy = () => {
    if (
      openShopifyCheckout({
        cartBaseUrl: shopifyCartBaseUrl,
        variantId: shopifyPackagingVariantId,
      })
    ) {
      return;
    }
    window.open(shopifyProductFallbackUrl, "_blank", "noopener,noreferrer");
  };

  const mediaData = [
    { type: "image", src: "/8800_packaging.webp" },
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

  const item = getProductPrice("8800-packaging");

  const breadcrumbItems = [
    { label: "Home", href: "/app" },
    { label: "Products", href: "/app/products" },
    { label: "8,800 Packaging Companies" },
  ];
  
  return (
    <div className="max-w-full overflow-x-hidden bg-white px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-30 min-[1100px]:px-13">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="w-full" xmlns="http://www.w3.org/2000/svg" style={{ height: "30px" }}>
            <path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#ed501f" strokeWidth="1" />
          </svg>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="min-w-0">
            <ProductMediaGallery media={mediaData} />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading font-bold leading-[1.1] tracking-tight text-[#ed501f] sm:text-4xl md:text-3xl lg:text-5xl">8,800 Packaging Companies</h1>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">The 8,800 Packaging Industry Database provides access to a structured dataset of packaging companies across India.</p>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">This dataset is designed for professionals who want to connect with packaging manufacturers, suppliers, and converters for sales, sourcing, or outreach.</p>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">The data is organized and delivered in Excel format so it can be easily filtered, sorted, and used.</p>
            
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
      <div className="pt-10">
        <h2 className="font-heading font-bold text-[#ed501f] sm:text-4xl md:text-3xl lg:text-2xl">Other Related Products</h2>
        <DatabaseCarousel excludeProductId="8800-packaging" />
      </div>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);