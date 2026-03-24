import { Link } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DsFooter } from "../components/DsFooter.jsx";
import { IconDatabase, IconArrowRight, IconFileSpreadsheet } from "@tabler/icons-react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const COLLECTIONS = [
  {
    title: "MSME Data",
    desc: "10k–40k MSME company databases across India. Excel format, instant download.",
    to: "/app/msme",
  },
  {
    title: "Investor Data",
    desc: "Angel and VC investor datasets for India, USA, UAE, and India-focused VC lists.",
    to: "/app/investor",
  },
  {
    title: "Business Data",
    desc: "Additional business directories and industry datasets — expand as your catalog grows.",
    to: "/app",
    note: "Create a Business Data collection on your storefront and link it from the theme.",
  },
];

export default function AllDatabases() {
  return (
    <s-page heading="All Databases">
      <div className="font-sans text-ds-grey-dark antialiased">
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-[#fff7f4] via-white to-[#fff3ec] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-9">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-ds-orange/10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ds-orange/25 bg-ds-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ds-orange">
              <IconDatabase size={14} stroke={2} aria-hidden />
              Database Library
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ds-grey-dark md:text-4xl">
              Explore Curated Collections
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ds-grey-accent md:text-base">
              Browse curated collections. Purchases and downloads are fulfilled on
              your Shopify storefront when{" "}
              <code className="rounded bg-ds-grey-bg px-1 font-mono text-xs">
                PUBLIC_STOREFRONT_URL
              </code>{" "}
              is configured.
            </p>
          </div>
        </section>
        <div className="grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-b from-white to-zinc-50 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-ds-orange/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ds-orange/40 to-transparent" />
              <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-ds-orange/20 bg-ds-orange/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-ds-orange">
                <IconFileSpreadsheet size={13} stroke={2} aria-hidden />
                {c.title}
              </div>
              <h2 className="font-heading text-lg font-semibold text-ds-grey-dark">
                {c.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-ds-grey-accent">{c.desc}</p>
              {c.note && (
                <p className="mt-3 rounded-lg border border-zinc-200 bg-white p-2.5 text-xs text-ds-grey-accent">
                  {c.note}
                </p>
              )}
              <Link
                to={c.to}
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-ds-orange px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-ds-grey-dark"
              >
                View <IconArrowRight size={14} stroke={2} aria-hidden />
              </Link>
            </article>
          ))}
        </div>
        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
