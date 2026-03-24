import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DsFooter } from "../components/DsFooter.jsx";
import { IconInfoCircle, IconTargetArrow, IconSparkles } from "@tabler/icons-react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AboutPage() {
  return (
    <s-page heading="About">
      <div className="font-sans text-ds-grey-dark antialiased">
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-[#fff7f4] via-white to-[#fff3ec] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-9">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-ds-orange/10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ds-orange/25 bg-ds-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ds-orange">
              <IconInfoCircle size={14} stroke={2} aria-hidden />
              About Data Station
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ds-grey-dark md:text-4xl">
              Built for Smarter Data Decisions
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ds-grey-accent md:text-base">
              A focused data platform where professionals access structured, practical
              datasets for outreach, research, growth, and market discovery.
            </p>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:p-8">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-ds-orange">
              <IconSparkles size={16} stroke={2} aria-hidden />
              What We Do
            </div>
            <p className="text-sm leading-relaxed text-ds-grey-accent md:text-base">
              <strong className="text-ds-grey-dark">Data Station</strong> is a
              centralized platform where professionals can access curated and
              structured datasets across industries. From business directories and
              startup lists to investor contacts and industry databases, Data
              Station provides ready-to-use data designed to support research,
              outreach, and growth.
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:p-8">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-ds-orange">
              <IconTargetArrow size={16} stroke={2} aria-hidden />
              Why It Matters
            </div>
            <p className="text-sm leading-relaxed text-ds-grey-accent md:text-base">
              This embedded experience mirrors your public website structure so
              teams can browse offerings and jump to the storefront for purchase
              and download.
            </p>
            <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed text-ds-grey-accent">
              SEO focus: business database india, msme database download, company
              database excel, b2b leads india, startup investor database, email
              database india, investor contacts india, lead generation database.
            </p>
          </article>
        </div>
        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
