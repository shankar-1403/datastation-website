import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { Link } from "react-router";
import ProductMediaGallery from "../../components/ui/productMediaGallery";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function ThirtyKMsmePage() {
  const mediaData = [
    { type: "image", src: "/30k.webp" },
    { type: "image", src: "/all_product.webp" },
    { type: "video", src: "/data_video.mp4" },
  ];
  return (
    <div className="pt-30 pb-20 min-[1100px]:px-13 bg-white">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <span className="text-[#5c5c5c] font-bold">Overview</span>
        <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="w-full " xmlns="http://www.w3.org/2000/svg" style={{height:"30px"}}><path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#5c5c5c" strokeWidth="1"></path></svg>
        <div className="flex gap-10">
          <div className="w-[50%]">
            <ProductMediaGallery media={mediaData}/>
          </div>
          <div className="w-[50%]">
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl text-[#ed501f]">30,000 MSME Database</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              The 30,000 MSME Database provides access to a structured dataset of MSME companies across India.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              This dataset is designed for professionals who want to connect with businesses for sales, partnerships, research, or outreach campaigns.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              The data is organized and delivered in Excel format so it can be easily filtered, sorted, and used.
            </p>
            <div>
              <Link to="/" className="mt-8 group inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40">Buy Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);