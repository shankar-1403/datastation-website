import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { Link } from "react-router";
import ProductMediaGallery from "../../components/ui/productMediaGallery";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function VcAngelInvestorPage() {
  const mediaData = [
    { type: "image", src: "/250_plus.webp" },
    { type: "image", src: "/all_product.png" },
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
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl text-[#ed501f]">Top 250+ VC & Angel Investors in India</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">The Top 250+ VC & Angel Investors in India Database provides a curated list of active venture capital firms and angel investors across India.</p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">This dataset is designed for startup founders, consultants, and professionals who want to understand the Indian investment ecosystem and identify potential investors.</p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">The database includes key information about venture capital firms and angel investors operating in India’s major startup hubs.</p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">The dataset is organized and delivered in Excel format, making it easy to filter, analyze, and explore investor profiles.</p>
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