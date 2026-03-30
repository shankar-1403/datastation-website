import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { IconInfoCircle, IconTargetArrow, IconSparkles } from "@tabler/icons-react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AboutPage() {
  return (
    <div className="px-4 pb-20 pt-30 sm:px-6 lg:px-8 min-[1100px]:px-13">
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-[#fff7f4] via-white to-[#fff3ec] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-9">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#ed501f]/10 blur-2xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ed501f]/25 bg-[#ed501f]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#ed501f]">
            <IconInfoCircle size={14} stroke={2} />
            About Data Station
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[#5c5c5c] sm:text-3xl md:text-4xl">Your Destination for Smarter Data</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5c5c5c] sm:text-base">Data Station is a centralized platform designed to make structured and accessible data available to professionals, businesses, and researchers.</p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-foreground to-foreground/80 p-10 shadow-sm transition-all hover:shadow-lg">
          <div className="absolute inset-0 opacity-[0.1]" style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
          <div className="absolute -left-1 top-0 h-120 w-120 rounded-full bg-[#ed501f]/10 blur-[120px]" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#ed501f]">
              <IconSparkles size={16} stroke={2} />
              What We Do
            </div>
            <p className="text-sm leading-relaxed text-white md:text-base">Our platform serves as a hub where users can explore a wide range of databases covering businesses, industries, startups, investors, and other professional networks.</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-foreground to-foreground/80 p-10 shadow-sm transition-all hover:shadow-lg">
          <div className="absolute inset-0 opacity-[0.1]" style={{
            backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
          <div className="absolute -left-1 top-0 h-120 w-120 rounded-full bg-[#ed501f]/10 blur-[120px]" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#ed501f]">
              <IconTargetArrow size={16} stroke={2} aria-hidden />
              Why It Matters
            </div>
            <p className="text-sm leading-relaxed text-white md:text-base">In a world where information is scattered across multiple sources, collecting reliable data can often be time-consuming and inefficient. Data Station simplifies this process by bringing together curated datasets in one place, making it easier to discover, access, and use valuable information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
