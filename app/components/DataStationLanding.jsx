/* eslint-disable react/prop-types -- presentational marketing page */
import { useState, useEffect, useId } from "react";
import { Link } from "react-router";
import {IconArrowRight,IconBolt,IconBooks,IconCheck,IconCircleCheck,IconDatabase,IconDownload,IconFileSpreadsheet,IconFlag,IconHeartHandshake,IconLock,IconMapPin,IconRocket,IconSearch,IconSparkles,IconSpeakerphone,IconTarget,IconTelescope,} from "@tabler/icons-react";
import { productUrl } from "../lib/catalog.js";

function VerifiedCell({ children, className = "" }) {
  return (
    <div
      className={`flex items-center gap-1 text-[10.5px] font-semibold text-ds-m-live ${className}`}
    >
      <IconCheck size={12} stroke={2.5} className="shrink-0" aria-hidden />
      {children}
    </div>
  );
}

function Ring({ pct, label }) {
  const r = 25;
  const c = 2 * Math.PI * r;
  const gid = useId().replace(/:/g, "");
  return (
    <div className="relative h-[66px] w-[66px] shrink-0">
      <svg
        width="66"
        height="66"
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx="33"
          cy="33"
          r={r}
          fill="none"
          stroke="rgb(0 0 0 / 0.08)"
          strokeWidth="4"
        />
        <circle
          cx="33"
          cy="33"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F04A1D" />
            <stop offset="100%" stopColor="#FF6B3D" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-ds-display text-xs font-bold text-ds-m-orange">
        {label}
      </div>
    </div>
  );
}

function StorefrontOrDatabasesLink({ handle, storefrontBaseUrl, className, children }) {
  const url = productUrl(storefrontBaseUrl, handle);
  if (url === "#") {
    return (
      <Link to="/app/databases" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

const TICK_SEP = "__TICK__";

const TICKER = [
  "10,000 MSME Records",
  TICK_SEP,
  "Instant Excel Download",
  TICK_SEP,
  "Angel Investor Data",
  TICK_SEP,
  "VC Database India",
  TICK_SEP,
  "B2B Lead Generation",
  TICK_SEP,
  "Startup Ecosystem",
  TICK_SEP,
  "Verified Business Contacts",
  TICK_SEP,
  "India USA UAE",
  TICK_SEP,
];

const USERS = [
  {
    Icon: IconTarget,
    title: "Sales Teams",
    desc: "Build targeted outreach lists and accelerate pipeline generation with verified contacts.",
    n: "01",
  },
  {
    Icon: IconSpeakerphone,
    title: "Marketing Agencies",
    desc: "Run data-driven lead generation campaigns with structured, verified data.",
    n: "02",
  },
  {
    Icon: IconRocket,
    title: "Startup Founders",
    desc: "Explore investor networks and identify the right funding opportunities.",
    n: "03",
  },
  {
    Icon: IconSearch,
    title: "Consultants",
    desc: "Conduct deep industry research with organized, structured datasets.",
    n: "04",
  },
  {
    Icon: IconHeartHandshake,
    title: "Recruiters",
    desc: "Identify target companies and map out competitive landscapes quickly.",
    n: "05",
  },
  {
    Icon: IconBooks,
    title: "Researchers",
    desc: "Analyze business ecosystems with clean, downloadable data in Excel.",
    n: "06",
  },
];

const WHY = [
  {
    title: "Organized & Structured",
    desc: "Every dataset is professionally formatted — no data cleaning required before use.",
  },
  {
    title: "Business-Ready Formats",
    desc: "Delivered in Excel (.xlsx) so you can filter, sort, pivot, and analyze instantly.",
  },
  {
    title: "Broad Industry Coverage",
    desc: "From MSMEs to investors, our library spans multiple sectors and categories.",
  },
  {
    title: "Continuously Expanding",
    desc: "We regularly add and refresh datasets to keep data accurate and up to date.",
  },
];

const PREV = [
  { name: "Mehta & Sons Pvt Ltd", tag: "Textiles · Surat" },
  { name: "BrightTech Solutions", tag: "IT Services · Pune" },
  { name: "AgroFresh India", tag: "Agriculture · Nagpur" },
  { name: "Sundaram Enterprises", tag: "Manufacturing · Chennai" },
  { name: "UrbanBuild Infra", tag: "Construction · Mumbai" },
];

const TRUST_PILLS = [
  { Icon: IconBolt, label: "Instant Download" },
  { Icon: IconFileSpreadsheet, label: "Excel Format" },
  { Icon: IconCircleCheck, label: "Verified Data" },
  { Icon: IconFlag, label: "India Coverage" },
  { Icon: IconFlag, label: "USA Coverage" },
  { Icon: IconFlag, label: "UAE Coverage" },
  { Icon: IconLock, label: "Secure Checkout" },
];

const HANDLE = {
  msme10k: "10000-msme-database",
  angels: "top-500-angel-investor-data",
  msme20k: "20000-msme-database",
  msme30k: "30000-msme-database",
  msme40k: "40000-msme-database",
  vc: "top-250-vc-angel-investors-india",
};

const mvCornerStyle = {
  backgroundImage:
    "radial-gradient(circle, rgb(0 0 0 / 0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
  WebkitMaskImage: "radial-gradient(circle at top right, black, transparent 75%)",
  maskImage: "radial-gradient(circle at top right, black, transparent 75%)",
};

const ctaDotsStyle = {
  backgroundImage:
    "radial-gradient(circle, rgb(0 0 0 / 0.05) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
  maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
};

function BCard({ style, children, className = "" }) {
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };
  return (
    <div
      className={`group relative cursor-default overflow-hidden rounded-[22px] border border-zinc-200 bg-linear-to-b from-white to-ds-m-bg3 p-7 shadow-[0_8px_24px_rgb(0_0_0/0.05)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.008] hover:border-zinc-300 hover:shadow-[0_16px_40px_rgb(0_0_0/0.08)] ${className}`}
      style={style}
      onMouseMove={onMouseMove}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ds-m-orange/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-ds-m-orange/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgb(240 74 29 / 0.06), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

/**
 * Marketing landing — utilities on elements; @theme + keyframes only in tailwind.css.
 */
export function DataStationLanding({ storefrontBaseUrl = "" }) {
  const [barW, setBarW] = useState(0);
  const banner = "/main_banner.mp4";

  useEffect(() => {
    const t = setTimeout(() => setBarW(78), 1000);
    return () => clearTimeout(t);
  }, []);

  const sampleBtnClass =
    "inline-flex items-center gap-2 rounded-[11px] border border-zinc-300 bg-white px-[26px] py-[13px] font-ds-body text-[14.5px] font-medium text-ds-m-muted shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ds-m-orange/35 hover:bg-zinc-50 hover:text-ds-m-t1";

  const btnOrClass =
    "relative inline-flex items-center gap-2 overflow-hidden rounded-[11px] border-0 bg-gradient-to-br from-ds-m-orange to-ds-m-orange2 px-[26px] py-[13px] font-ds-body text-[14.5px] font-semibold text-white shadow-[0_0_0_1px_rgb(240_74_29/0.4),0_6px_24px_rgb(240_74_29/0.32)] transition-all duration-300 before:absolute before:inset-0 before:bg-white/0 before:transition-colors before:duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(240_74_29/0.6),0_10px_36px_rgb(240_74_29/0.45)] hover:before:bg-white/[0.07]";

  const buyBtnClass =
    "inline-flex items-center gap-1.5 rounded-lg border-0 bg-gradient-to-br from-ds-m-orange to-ds-m-orange2 px-[18px] py-2 font-ds-body text-[12.5px] font-semibold text-white shadow-[0_0_0_1px_rgb(240_74_29/0.35),0_4px_16px_rgb(240_74_29/0.28)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_0_1px_rgb(240_74_29/0.5),0_6px_24px_rgb(240_74_29/0.4)]";

  return (
    <div className="relative min-h-screen overflow-x-hidden font-ds-body text-ds-m-t1 antialiased">

      <section className="relative grid min-h-120 items-center overflow-hidden">
        <div className="relative h-full min-h-105 w-full overflow-hidden">
          <video
            src={banner}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        
      </section>

      <div className="flex h-11 items-center overflow-hidden border-y border-zinc-200 bg-ds-m-bg2 py-0">
        <div className="inline-flex animate-ds-m-tick whitespace-nowrap hover:[animation-play-state:paused]">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-7 text-[11.5px] font-semibold uppercase tracking-[1.2px] text-ds-m-soft"
            >
              {t === TICK_SEP ? (
                <IconSparkles size={16} stroke={1.5} className="text-ds-m-orange" aria-hidden />
              ) : (
                t
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 min-[1100px]:py-25">
        <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ds-m-orange before:inline-block before:h-[1.5px] before:w-5 before:bg-ds-m-orange">
          Our Databases
        </div>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-ds-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.18] tracking-[-0.3px] text-ds-m-t1">
            What We Offer
          </h2>
          <p className="mb-0 max-w-130 text-[15.5px] leading-[1.8] text-ds-m-muted">
            Curated datasets delivered in Excel for immediate use.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3.5 min-[1100px]:grid-cols-12 min-[1100px]:grid-rows-[auto]">
          <BCard
            className="col-span-12 flex min-h-0 flex-col min-[1100px]:col-span-7 min-[1100px]:row-span-3"
          >
            <div className="flex items-start justify-between">
              <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-ds-m-orange/20 bg-ds-m-orange-dim px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ds-m-orange">
                MSME Data
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-ds-m-live/20 bg-ds-m-live/10 px-2.5 py-1 text-[11.5px] font-semibold text-ds-m-live">
                <IconDownload size={12} stroke={1.75} className="shrink-0" aria-hidden /> Excel .xlsx
              </div>
            </div>
            <div className="mb-2 mt-2 font-ds-display text-[26px] font-semibold leading-snug text-ds-m-t1">
              10,000 MSME Database
            </div>
            <p className="text-[13px] leading-[1.7] text-ds-m-muted">
              Structured dataset of 10,000 MSME companies across India — ready for sales,
              partnerships, research, and targeted outreach campaigns.
            </p>
            <div className="mt-[18px]">
              <div className="mb-1 grid grid-cols-[2fr_1.4fr_1fr_0.9fr] gap-2.5 rounded-md bg-ds-m-orange/10 px-3 py-2 text-[10.5px] font-bold uppercase tracking-[0.5px] text-ds-m-orange">
                {["Company", "Industry", "City", "Verified"].map((h) => (
                  <div key={h}>{h}</div>
                ))}
              </div>
              {[
                ["Mehta & Sons Pvt", "Textiles", "Surat"],
                ["BrightTech Pvt Ltd", "IT Services", "Pune"],
                ["AgroFresh India", "Agriculture", "Nagpur"],
                ["Sundaram Entr.", "Manufacturing", "Chennai"],
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2fr_1.4fr_1fr_0.9fr] gap-2.5 rounded-md px-3 py-2 text-[11.5px] transition-all duration-200 hover:bg-zinc-100 hover:shadow-[inset_0_0_0_1px_rgb(240_74_29/0.15)]"
                >
                  <div className="font-medium text-ds-m-t1">{row[0]}</div>
                  <div className="text-ds-m-muted">{row[1]}</div>
                  <div className="text-ds-m-muted">{row[2]}</div>
                  <VerifiedCell>Verified</VerifiedCell>
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-transparent pt-5">
              <div className="flex flex-wrap gap-1.5">
                {["Name", "Address", "Phone", "Email", "Website"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10.5px] text-ds-m-soft shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <StorefrontOrDatabasesLink
                handle={HANDLE.msme10k}
                storefrontBaseUrl={storefrontBaseUrl}
                className={buyBtnClass}
              >
                Buy Now <IconArrowRight size={13} stroke={1.75} className="shrink-0" aria-hidden />
              </StorefrontOrDatabasesLink>
            </div>
          </BCard>

          <BCard className="relative col-span-12 min-h-[320px] min-[1100px]:col-span-5 min-[1100px]:row-span-3">
            <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-ds-m-orange/20 bg-ds-m-orange-dim px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ds-m-orange">
              Investor Data
            </div>
            <div className="mb-2 flex items-start justify-between">
              <div className="font-ds-display text-[19px] font-semibold leading-snug text-ds-m-t1">
                Top 500 Angel Investors
              </div>
              <Ring pct={barW} label="500" />
            </div>
            <p className="mb-4 text-[13px] leading-[1.7] text-ds-m-muted">
              Active angel investors from India, USA & UAE for startup fundraising and
              partnerships.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Name", "Firm", "Location", "Email", "Website", "Focus"].map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10.5px] text-ds-m-soft shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-[18px] rounded-xl border border-zinc-200 bg-linear-to-b from-white to-zinc-100 px-3.5 py-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.9)]">
              {[
                ["India", "280 investors"],
                ["USA", "140 investors"],
                ["UAE", "80 investors"],
              ].map(([c, n], i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-zinc-100 py-2 last:border-b-0"
                >
                  <span className="flex items-center gap-1.5 text-[12.5px] text-ds-m-muted">
                    <IconMapPin size={14} stroke={1.75} className="shrink-0 text-ds-m-orange" aria-hidden />
                    {c}
                  </span>
                  <span className="text-[11.5px] font-semibold text-ds-m-orange">{n}</span>
                </div>
              ))}
            </div>
            <StorefrontOrDatabasesLink
              handle={HANDLE.angels}
              storefrontBaseUrl={storefrontBaseUrl}
              className={`${buyBtnClass} absolute bottom-6 right-6`}
            >
              Buy Now <IconArrowRight size={13} stroke={1.75} className="shrink-0" aria-hidden />
            </StorefrontOrDatabasesLink>
          </BCard>

          {[
            ["20,000", "20K", HANDLE.msme20k],
            ["30,000", "30K", HANDLE.msme30k],
            ["40,000", "40K", HANDLE.msme40k],
          ].map(([full, short, handle], i) => (
            <BCard
              key={i}
              className="relative col-span-12 min-h-[200px] min-[1100px]:col-span-4 min-[1100px]:row-span-2"
            >
              <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-ds-m-orange/20 bg-ds-m-orange-dim px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ds-m-orange">
                MSME Data
              </div>
              <div className="font-ds-display text-base font-semibold leading-snug text-ds-m-t1">
                {full} MSME Database
              </div>
              <p className="mt-1 text-[12.5px] leading-[1.7] text-ds-m-muted">
                Expanded MSME coverage across multiple industries in India.
              </p>
              <div className="pointer-events-none absolute bottom-[18px] left-6 select-none font-ds-display text-[56px] font-extrabold leading-none tracking-[-3px] text-ds-m-orange/15">
                {short}
              </div>
              <StorefrontOrDatabasesLink
                handle={handle}
                storefrontBaseUrl={storefrontBaseUrl}
                className={`${buyBtnClass} absolute bottom-[22px] right-[22px] px-[15px] py-1.5 text-xs`}
              >
                Buy <IconArrowRight size={12} stroke={1.75} className="shrink-0" aria-hidden />
              </StorefrontOrDatabasesLink>
            </BCard>
          ))}

          <BCard className="col-span-12 flex flex-wrap items-center gap-12 min-[1100px]:row-span-2">
            <div className="min-w-[240px] flex-1">
              <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-ds-m-orange/20 bg-ds-m-orange-dim px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ds-m-orange">
                Investor Data
              </div>
              <div className="mb-2 font-ds-display text-[22px] font-semibold leading-snug text-ds-m-t1">
                Top 250+ VC & Angel Investors in India
              </div>
              <p className="text-[13px] leading-[1.7] text-ds-m-muted">
                Comprehensive database of venture capital firms and angel investors across
                India&apos;s major startup hubs — Bengaluru, Mumbai, Delhi NCR & Hyderabad.
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {["Name", "Firm", "Stage", "Sector", "Website", "City"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10.5px] text-ds-m-soft shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-ds-m-live/20 bg-ds-m-live/10 px-2.5 py-1 text-[11.5px] font-semibold text-ds-m-live">
                <IconDownload size={12} stroke={1.75} className="shrink-0" aria-hidden /> Excel .xlsx · Instant
              </div>
              <StorefrontOrDatabasesLink
                handle={HANDLE.vc}
                storefrontBaseUrl={storefrontBaseUrl}
                className={btnOrClass}
              >
                Buy Now <IconArrowRight size={15} stroke={1.75} className="shrink-0" aria-hidden />
              </StorefrontOrDatabasesLink>
            </div>
          </BCard>
        </div>
      </div>

      <div className="border-y border-zinc-200 bg-ds-m-bg2 px-5 py-14 text-center min-[1100px]:px-[52px]">
        <div className="mb-9 text-xs font-semibold uppercase tracking-[2px] text-ds-m-soft">
          Trusted by professionals for
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {TRUST_PILLS.map((p, i) => {
            const PillIcon = p.Icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-ds-m-bg3 px-5 py-2.5 text-[13px] font-medium text-ds-m-muted transition-all duration-200 hover:border-ds-m-orange/30 hover:text-ds-m-t1"
              >
                <PillIcon size={18} stroke={1.75} className="shrink-0 text-ds-m-orange" aria-hidden />
                {p.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-5 py-24 min-[1100px]:px-[52px] min-[1100px]:py-[100px]">
        <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ds-m-orange before:inline-block before:h-[1.5px] before:w-5 before:bg-ds-m-orange">
          Why We Exist
        </div>
        <h2 className="mb-14 font-ds-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.18] tracking-[-0.3px] text-ds-m-t1">
          Mission & Vision
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-3.5 min-[1100px]:grid-cols-2">
          <div className="relative overflow-hidden rounded-[32px] border-0 bg-gradient-to-br from-ds-m-orange to-[#c73b14] p-12 transition-transform duration-300 hover:-translate-y-1 min-[1100px]:px-12 min-[1100px]:py-[52px] before:pointer-events-none before:absolute before:-bottom-[60px] before:-right-[60px] before:h-[200px] before:w-[200px] before:rounded-full before:bg-white/[0.08] after:pointer-events-none after:absolute after:right-[30px] after:top-[30px] after:h-[100px] after:w-[100px] after:rounded-full after:bg-white/[0.05]">
            <div
              className="absolute right-0 top-0 h-[180px] w-[180px]"
              style={mvCornerStyle}
              aria-hidden
            />
            <IconTarget size={40} stroke={1.25} className="mb-5 text-white" aria-hidden />
            <div className="mb-3.5 font-ds-display text-[26px] font-bold leading-tight tracking-[-0.2px] text-white">
              Our Mission
            </div>
            <p className="text-[14.5px] leading-[1.82] text-white/[0.82]">
              To make high-quality data more accessible, organized, and practical for
              professionals who rely on data to make decisions, build connections, and
              discover opportunities. We help individuals and organizations save time on
              research and focus on growth, insights, and meaningful connections.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-ds-m-bg3 p-12 transition-transform duration-300 hover:-translate-y-1 min-[1100px]:px-12 min-[1100px]:py-[52px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(ellipse_at_top_left,rgb(240_74_29/0.06),transparent_60%)]">
            <div
              className="absolute right-0 top-0 h-[180px] w-[180px]"
              style={mvCornerStyle}
              aria-hidden
            />
            <IconTelescope size={40} stroke={1.25} className="mb-5 text-ds-m-orange" aria-hidden />
            <div className="mb-3.5 font-ds-display text-[26px] font-bold leading-tight tracking-[-0.2px] text-ds-m-t1">
              Our Vision
            </div>
            <p className="text-[14.5px] leading-[1.82] text-ds-m-muted">
              To build a comprehensive data hub where professionals can discover and access
              valuable datasets across industries and sectors. Data Station aims to become
              the trusted destination for individuals and businesses seeking smarter ways to
              access and use data across India and beyond.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-ds-m-orange/30 to-transparent min-[1100px]:mx-[52px]" />

      <div className="mx-auto max-w-[1300px] px-5 py-24 min-[1100px]:px-[52px] min-[1100px]:py-[100px]">
        <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ds-m-orange before:inline-block before:h-[1.5px] before:w-5 before:bg-ds-m-orange">
          Our Users
        </div>
        <h2 className="font-ds-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.18] tracking-[-0.3px] text-ds-m-t1">
          Who Uses Data Station
        </h2>
        <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.8] text-ds-m-muted">
          Built for professionals who rely on reliable, structured data to drive real results.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-3.5 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {USERS.map((u, i) => {
            const UserIcon = u.Icon;
            return (
              <div
                key={i}
                className="group relative cursor-default overflow-hidden rounded-[20px] border border-zinc-200 bg-linear-to-b from-[#fff7f4] to-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ds-m-orange/25 hover:bg-[#fff3ee]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-transparent via-ds-m-orange to-transparent transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-100" />
                <div className="absolute right-5 top-4 font-ds-display text-[32px] font-extrabold leading-none text-ds-m-orange/20">
                  {u.n}
                </div>
                <UserIcon size={28} stroke={1.5} className="mb-4 text-ds-m-orange" aria-hidden />
                <div className="mb-2 font-ds-display text-[15px] font-semibold text-ds-m-t1">{u.title}</div>
                <p className="text-[12.5px] leading-[1.7] text-ds-m-muted">{u.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-ds-m-orange/30 to-transparent min-[1100px]:mx-[52px]" />

      <div className="mx-auto max-w-[1300px] px-5 py-24 min-[1100px]:px-[52px] min-[1100px]:py-[100px]">
        <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[2px] text-ds-m-orange before:inline-block before:h-[1.5px] before:w-5 before:bg-ds-m-orange">
          Why Choose Us
        </div>
        <h2 className="mb-14 font-ds-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.18] tracking-[-0.3px] text-ds-m-t1">
          Why Data Station
        </h2>
        <div className="mt-14 grid grid-cols-1 items-start gap-8 min-[1100px]:grid-cols-[5fr_4fr] min-[1100px]:gap-[60px]">
          <div className="flex flex-col gap-1">
            {WHY.map((w, i) => (
              <div
                key={i}
                className="flex gap-[18px] rounded-[20px] border border-transparent p-5 transition-all duration-300 hover:border-zinc-200 hover:bg-ds-m-bg3"
              >
                <div className="min-w-[26px] pt-1 font-ds-display text-xs font-bold tracking-wide text-ds-m-orange">
                  0{i + 1}
                </div>
                <div>
                  <div className="mb-1 font-ds-display text-base font-semibold text-ds-m-t1">{w.title}</div>
                  <p className="text-[13.5px] leading-[1.7] text-ds-m-muted">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative rounded-[32px] border border-zinc-200 bg-ds-m-bg3 p-7 shadow-[0_20px_48px_rgb(0_0_0/0.08)] min-[1100px]:sticky min-[1100px]:top-[88px] before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:rounded-t-[32px] before:bg-gradient-to-r before:from-transparent before:via-ds-m-orange/50 before:to-transparent">
            <div className="mb-5 flex items-center justify-between">
              <div className="font-ds-display text-sm font-semibold text-ds-m-t1">Live Dataset Preview</div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-ds-m-live/20 bg-ds-m-live/10 px-2.5 py-1 text-[11px] font-semibold text-ds-m-live">
                <IconDownload size={14} stroke={1.75} className="shrink-0" aria-hidden /> .xlsx
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {PREV.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-[10px] border border-transparent bg-ds-m-bg4 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ds-m-orange/20 hover:bg-white hover:shadow-[0_8px_20px_rgb(0_0_0/0.06)]"
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-ds-m-orange shadow-[0_0_8px_rgb(240_74_29/0.4)]" />
                  <div className="flex-1 text-[12.5px] font-medium text-ds-m-t1">{r.name}</div>
                  <div className="whitespace-nowrap rounded-md bg-zinc-100 px-2 py-0.5 text-[10.5px] text-ds-m-soft">
                    {r.tag}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-3 rounded-xl border border-ds-m-orange/20 bg-ds-m-orange/10 px-[18px] py-3.5">
              <IconBolt size={22} stroke={1.75} className="shrink-0 text-ds-m-orange" aria-hidden />
              <div>
                <div className="text-[13px] font-semibold text-ds-m-t1">Instant Download</div>
                <div className="mt-0.5 text-[11.5px] text-ds-m-soft">
                  Available immediately after purchase
                </div>
              </div>
            </div>
            <Link to="/app/databases" className={`${btnOrClass} mt-3.5 w-full justify-center`}>
              Browse All Databases{" "}
              <IconArrowRight size={15} stroke={1.75} className="shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-4 my-20 overflow-hidden rounded-[32px] border border-zinc-200 bg-ds-m-bg3 px-6 py-16 text-center shadow-none min-[1100px]:mx-[52px] min-[1100px]:px-16 min-[1100px]:py-20 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgb(240_74_29/0.18),transparent_60%),radial-gradient(ellipse_30%_40%_at_80%_110%,rgb(240_74_29/0.08),transparent_60%)] after:absolute after:left-0 after:right-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-ds-m-orange/70 after:to-transparent">
        <div
          className="pointer-events-none absolute inset-0"
          style={ctaDotsStyle}
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-[640px]">
          <h2 className="mb-3.5 font-ds-display text-[clamp(30px,4vw,52px)] font-bold leading-[1.18] tracking-[-0.3px] text-ds-m-t1">
            Ready for <em className="not-italic text-ds-m-orange">Smarter Data?</em>
          </h2>
          <p className="mb-9 text-base leading-[1.7] text-ds-m-muted">
            Explore our complete library of curated databases and find the right dataset for
            your needs.
          </p>
          <div className="mb-9 flex flex-wrap justify-center gap-3">
            <Link to="/app/databases" className={`${btnOrClass} px-8 py-3.5 text-[15px]`}>
              Browse Databases{" "}
              <IconArrowRight size={15} stroke={1.75} className="shrink-0" aria-hidden />
            </Link>
            <Link to="/app/contact" className={`${sampleBtnClass} px-8 py-3.5 text-[15px]`}>
              Contact Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-7">
            {["Instant Excel Download", "Verified Business Records", "India · USA · UAE"].map(
              (t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[12.5px] text-ds-m-soft"
                >
                  <IconCheck size={16} stroke={2} className="shrink-0 text-ds-m-orange" aria-hidden />
                  <span>{t}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-200 bg-ds-m-bg px-5 pb-8 pt-16 min-[1100px]:px-[52px] min-[1100px]:pb-8 min-[1100px]:pt-16">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-11 border-b border-zinc-200 pb-11 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[2.2fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2.5 font-ds-display text-[17px] font-extrabold text-ds-m-t1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ds-m-orange shadow-[0_0_12px_rgb(240_74_29/0.4)]">
                <IconDatabase size={16} stroke={1.75} className="text-white" aria-hidden />
              </div>
              DataStation
            </div>
            <p className="mb-4 max-w-[270px] text-[13px] leading-[1.8] text-ds-m-soft">
              Your destination for smarter data. Curated, structured datasets for professionals
              across India and beyond.
            </p>
            <a
              className="text-[13px] text-ds-m-orange no-underline transition-opacity hover:opacity-70"
              href="mailto:support@datastation.in"
            >
              support@datastation.in
            </a>
          </div>
          {[
            {
              h: "Pages",
              links: [
                { label: "Home", to: "/app" },
                { label: "All Databases", to: "/app/databases" },
                { label: "About", to: "/app/about" },
                { label: "Contact", to: "/app/contact" },
              ],
            },
            {
              h: "Databases",
              links: [
                { label: "MSME Data", to: "/app/msme" },
                { label: "Investor Data", to: "/app/investor" },
                { label: "Business Data", to: "/app/databases" },
              ],
            },
            {
              h: "Legal",
              links: [
                { label: "Privacy Policy", to: "/app/privacy" },
                { label: "Terms & Conditions", to: "/app/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <div className="mb-4 font-ds-display text-[11.5px] font-bold uppercase tracking-[1.4px] text-ds-m-t1">
                {col.h}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[13px] text-ds-m-soft no-underline transition-colors hover:text-ds-m-orange"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-3 pt-8">
          <span className="text-xs text-ds-m-faint">
            © 2025 Data Station. All rights reserved. Governed by laws of India.
          </span>
          <div className="flex gap-5">
            <Link
              to="/app/privacy"
              className="text-xs text-ds-m-faint no-underline transition-colors hover:text-ds-m-muted"
            >
              Privacy Policy
            </Link>
            <Link
              to="/app/terms"
              className="text-xs text-ds-m-faint no-underline transition-colors hover:text-ds-m-muted"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
