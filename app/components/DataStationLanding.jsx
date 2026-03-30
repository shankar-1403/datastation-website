/* eslint-disable react/prop-types -- presentational marketing page */
import { Link } from "react-router";
import {IconArrowRight,IconBolt,IconUserFilled,IconBooks,IconCheck,IconCircleCheck,IconDatabase,IconFileTypeXls,IconDownload,IconFileSpreadsheet,IconFlag,IconHeartHandshake,IconLock,IconRocket,IconSearch,IconSparkles,IconSpeakerphone,IconTarget,IconTelescope,IconShieldCheck,IconWorld} from "@tabler/icons-react";
import { motion } from "motion/react";

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

const WHY = [
  { title: "Organized and structured for easy use", desc: "Every dataset is professionally formatted - no data cleaning required before use." },
  { title: "Designed for practical business applications", desc: "Delivered in Excel (.xlsx) so you can filter, sort, pivot, and analyze instantly." },
  { title: "Accessible in simple and widely used formats", desc: "From MSMEs to investors, our library spans multiple sectors and categories." },
  { title: "Continuously expanding across multiple data categories", desc: "We regularly add and refresh datasets to keep data accurate and up to date." },
];

const PREVIEW = [
  { name: "Mehta & Sons Pvt Ltd", tag: "Textiles · Surat" },
  { name: "BrightTech Solutions", tag: "IT Services · Pune" },
  { name: "AgroFresh India", tag: "Agriculture · Nagpur" },
  { name: "Sundaram Enterprises", tag: "Manufacturing · Chennai" },
  { name: "UrbanBuild Infra", tag: "Construction · Mumbai" },
];

export function DataStationLanding() {
  const GUARANTEES = [
    { icon: IconDownload, text: "Instant Excel Download" },
    { icon: IconShieldCheck, text: "Verified Business Records" },
    { icon: IconWorld, text: "India · USA · UAE" },
  ];

  const STATS = [
    { value: "80K+", label: "Records" },
    { value: "6", label: "Databases" },
    { value: "3", label: "Countries" },
  ];

  const heroImg = "/hero-data.jpg";

  const COMPACT = [
    { title: "10,000 MSME Database", size: "10K", records: "10,000 records",img:"/10k.webp", link: "/app/tenmsme" },
    { title: "20,000 MSME Database", size: "20K", records: "20,000 records",img:"/20k.webp", link: "/app/twentymsme" },
    { title: "30,000 MSME Database", size: "30K", records: "30,000 records",img:"/30k.webp", link: "/app/thirtymsme" },
  ];

  const VALUES = [
    { label: "Accessibility", desc: "Making data available to everyone" },
    { label: "Accuracy", desc: "Verified, up-to-date records" },
    { label: "Simplicity", desc: "Ready-to-use formats" },
  ];

  const USERS = [
    {
      Icon: IconTarget,
      title: "Sales teams building targeted outreach lists",
      stat: "10x",
      statLabel: "Faster prospecting",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
    {
      Icon: IconSpeakerphone,
      title: "Marketing agencies running lead generation campaigns",
      stat: "40K+",
      statLabel: "Leads available",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
    {
      Icon: IconRocket,
      title: "Startup founders exploring networks and partnerships",
      stat: "750+",
      statLabel: "Investor profiles",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
    {
      Icon: IconSearch,
      title: "Consultants conducting industry research",
      stat: "100%",
      statLabel: "Structured data",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
    {
      Icon: IconHeartHandshake,
      title: "Recruiters identifying companies and opportunities",
      stat: "3",
      statLabel: "Countries covered",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
    {
      Icon: IconBooks,
      title: "Researchers analyzing business ecosystems",
      stat: ".xlsx",
      statLabel: "Ready to analyze",
      gradient: "from-[hsl(16,92%,53%)] to-[hsl(8,85%,48%)]",
      iconBg: "bg-[hsl(16,92%,53%)/0.12]",
      iconColor: "text-[#ed501f]",
      borderHover: "hover:border-[#ed501f]/30",
    },
  ];

  const PILLS = [
    { Icon: IconBolt, label: "Instant Download" },
    { Icon: IconFileSpreadsheet, label: "Excel Format" },
    { Icon: IconCircleCheck, label: "Verified Data" },
    { Icon: IconFlag, label: "India Coverage" },
    { Icon: IconFlag, label: "USA Coverage" },
    { Icon: IconFlag, label: "Global Coverage" },
    { Icon: IconLock, label: "Secure Checkout" },
  ];
  return (
    <div className="relative min-h-screen overflow-x-hidden font-ds-body text-ds-m-t1 antialiased">

      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:pb-28 md:pt-38 min-[1100px]:px-13">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ed501f]/30 bg-[#ed501f]/10 px-4 py-1.5 text-sm font-medium text-[#ed501f]">
              <IconDatabase size={16} />
              <span>Curated Business Databases</span>
            </div>

            <h1 className="font-heading text-[1.75rem] font-bold leading-[1.12] tracking-tight text-background sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your Destination for{" "}
              <span className="bg-linear-to-r from-[#ed501f] to-[#d13202] bg-clip-text text-transparent">Smarter Data</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-background/50 sm:mt-6 sm:text-lg">Data Station is a centralized platform designed to make structured and accessible data available to professionals, businesses, and researchers.</p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/app/databases" className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-5 py-3 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
                Browse Databases
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/app/about" className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-background/20 px-5 py-3 font-heading text-sm font-medium text-background/80 transition-all duration-200 hover:border-background/40 hover:text-background sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="flex h-11 items-center overflow-hidden border-y border-zinc-200 bg-ds-m-bg2 py-0">
        <div className="inline-flex animate-ds-m-tick whitespace-nowrap hover:paused">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-7 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-[#5c5c5c]"
            >
              {t === TICK_SEP ? (
                <IconDatabase size={16} stroke={1.5} className="text-[#ed501f]" aria-hidden />
              ) : (
                t
              )}
            </span>
          ))}
        </div>
      </div>

      <section id="databases" className="bg-background py-28">
        <div className="mx-auto max-w-7xl min-[1100px]:px-13 px-6">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ed501f]/20 bg-[#ed501f]/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-[#ed501f]">
              <IconDatabase size={14} />
              Our Databases
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-foreground md:text-5xl">What We Offer</h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">Data Station provides curated databases designed to support various professional needs including research, outreach, networking, and market analysis.</p>
          </motion.div>

          {/* Compact MSME tiers */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {COMPACT.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Background size watermark */}
                <div className="absolute -bottom-3 -right-2 font-heading text-7xl font-black text-muted/50 transition-colors group-hover:text-[#ed501f]/10">
                  {item.size}
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <img src={item.img} alt={item.title} className="aspect-4/3 w-full object-cover"/>
                  </div>
                  <span className="rounded-lg px-3 py-1 font-heading text-xs font-semibold text-[#ed501f] bg-[#ed501f]/10">
                    MSME Data
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <IconDownload size={14} className="text-[#ed501f]" />
                    {item.records} · Instant download
                  </div>

                  <Link to={item.link} className="mt-2 group/btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-4 py-2 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/35 sm:w-auto sm:min-h-0">
                    Buy <IconArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div>
              <Link to="/app/databases" className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-5 py-3 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">
                Explore All Databases
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-border bg-black/90 py-10">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Glow accents */}
        <div className="absolute left-1/4 top-0 h-100 w-100 rounded-full bg-[#ed501f]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl min-[1100px]:px-13 px-6 text-center">
          <p className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by professionals
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PILLS.map((p, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-background/6 bg-background/4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-background/[0.07] px-4 py-2 text-sm font-medium text-white shadow-sm"
              >
                <p.Icon size={16} className="text-[#ed501f]" />
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-background py-28">
      {/* Subtle background accent */}
        <div className="absolute -right-40 top-0 h-125 w-125 rounded-full bg-[#ed501f]/3 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-100 w-100 rounded-full bg-[#ed501f]/2 blur-3xl" />

        <div className="relative mx-auto max-w-7xl min-[1100px]:px-13 px-6">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ed501f]/20 bg-[#ed501f]/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-[#ed501f]">
              Why We Exist
            </span>
            <h4 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">Mission & Vision</h4>
            <p className="mx-auto mt-4 max-w-lg text-base text-[#5c5c5c]">We believe data should empower - not overwhelm. <br/>Here&apos;s what drives us.</p>
          </motion.div>

          <div className="mt-16 grid gap-6 lg:grid-cols-5">
            {/* Mission - larger card */}
            <motion.div
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative lg:col-span-3 overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br from-[#ed501f]/10 to-[#ed501f]/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-3 rounded-2xl bg-linear-to-br from-[#ed501f]/10 to-accent p-4">
                  <IconSparkles size={28} className="text-[#ed501f]" />
                </div>
                <h5 className="font-heading text-2xl font-bold text-foreground">Our Mission</h5>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[#5c5c5c]">Our mission is to make high-quality data more accessible, organized, and practical for professionals who rely on data to make decisions, build connections, and discover opportunities.</p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-[#5c5c5c]">By providing structured datasets in simple formats, we help individuals and organizations save time on research and focus on what truly matters: growth, insights, and meaningful connections.</p>

                {/* Core values */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {VALUES.map((v) => (
                    <div key={v.label} className="rounded-xl border border-[#ed501f] bg-[#ed501f]/10 px-4 py-3">
                      <div className="text-sm font-bold text-foreground">{v.label}</div>
                      <div className="mt-0.5 text-xs text-foreground">{v.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="group relative lg:col-span-2 overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-foreground to-foreground/80 p-10 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#ed501f]/10 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-3 rounded-2xl bg-[#ed501f]/15 p-4">
                  <IconTelescope size={28} className="text-[#ed501f]" />
                </div>
                <h5 className="font-heading text-2xl font-bold text-background">Our Vision</h5>
                <p className="mt-4 text-base leading-relaxed text-white">Our vision is to build a comprehensive data hub where professionals can discover and access valuable datasets across industries and sectors.</p>
                <p className="mt-3 text-base leading-relaxed text-white">As the platform grows, Data Station aims to become a trusted destination for individuals and businesses looking for smarter ways to access and use data.</p>

                {/* Visual element */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-foreground bg-linear-to-br from-[#ed501f]/60 to-[#ed501f]"
                        style={{ opacity: 0.5 + i * 0.15 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#ed501f]">
                    Trusted by 500+ professionals
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black/90 py-28">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Glow accents */}
        <div className="absolute left-1/4 top-0 h-120 w-120 rounded-full bg-[#ed501f]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-75 w-75 rounded-full bg-[#ed501f]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl min-[1100px]:px-13 px-6">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ed501f]/20 bg-[#ed501f]/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-[#ed501f]">Our Users</span>
            <h5 className="mt-5 font-heading text-3xl font-bold text-background md:text-5xl">Who Uses{" "}
              <span className="text-[#ed501f]">Data Station</span>
            </h5>
            <p className="mx-auto mt-4 max-w-md text-base text-white">Data Station is built for professionals and organizations that rely on reliable data.</p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USERS.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl border border-background/6 bg-background/4 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-background/[0.07] ${u.borderHover}`}
              >
                {/* Gradient stripe top */}
                <div className={`absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r ${u.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Hover glow */}
                <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-linear-to-br ${u.gradient} opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-[0.08]`} />

                <div className="relative flex h-full flex-col">
                  {/* Header row */}
                  <div className="mb-5 flex items-start justify-between">
                    <div className={`rounded-xl ${u.Icon} p-3 transition-transform duration-300 group-hover:scale-110`}>
                      <u.Icon size={22} className={u.iconColor} />
                    </div>
                    {/* Stat badge */}
                    <div className="text-right">
                      <div className={`bg-linear-to-r ${u.gradient} bg-clip-text font-heading text-2xl font-black text-transparent`}>
                        {u.stat}
                      </div>
                      <div className="text-[10px] font-medium uppercase tracking-wider text-background/30">
                        {u.statLabel}
                      </div>
                    </div>
                  </div>
                  <h5 className="font-heading text-lg font-bold text-background">{u.title}</h5>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl min-[1100px]:px-13 px-6">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ed501f]/20 bg-[#ed501f]/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-[#ed501f]">Why Choose Us</span>
            <h5 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">Why Data Station</h5>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#5c5c5c]">Access to structured data can significantly improve the way professionals conduct research, build connections, and identify opportunities.</p>
          </motion.div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Reasons */}
            <div className="space-y-8">
              {WHY.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 1, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ed501f]/10 font-heading text-sm font-bold text-[#ed501f]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h5 className="font-heading text-base font-bold text-foreground">{w.title}</h5>
                    <p className="mt-1 text-sm leading-relaxed text-[#5c5c5c]">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live preview card */}
            <motion.div
              initial={{ opacity: 1, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-foreground">Live Dataset Preview</span>
                <span className="rounded-md bg-[#ed501f]/10 px-2.5 py-1 text-[11px] font-medium text-[#ed501f]">
                  .xlsx
                </span>
              </div>
              <div className="space-y-2">
                {PREVIEW.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                    <IconCheck size={16} className="shrink-0 text-[#ed501f]" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#ed501f]/20 bg-[#ed501f]/10 px-4 py-3">
                <IconDownload size={18} className="text-[#ed501f]" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Instant Download</div>
                  <div className="text-xs text-muted-foreground">Available immediately after purchase</div>
                </div>
              </div>
              <Link to="/app/databases" className="mt-5 group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-5 py-3 text-center font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40 sm:px-7 sm:py-3.5 sm:text-base">
                Browse All Databases <IconArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black/90 py-28">
        {/* Mesh gradient blobs */}
        <div className="absolute -left-32 -top-32 h-125 w-125 rounded-full bg-[#ed501f]/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-100 w-100 rounded-full bg-[#ed501f]/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ed501f]/10 blur-[80px]" />
        <div className="dot-pattern absolute inset-0 opacity-[0.06]" />

        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] hidden rounded-2xl bg-[#ed501f]/5 p-3 backdrop-blur-sm lg:block"
        >
          <IconUserFilled size={24} className="text-white/80" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[30%] hidden rounded-2xl bg-[#ed501f]/5 p-3 backdrop-blur-sm lg:block"
        >
          <IconFileTypeXls size={24} className="text-white/80" />
        </motion.div>

        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ed501f]/30 bg-[#ed501f]/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#ed501f] backdrop-blur-sm">
              <IconDatabase size={14} />
              Get Started Today
            </span>

            <h5 className="mt-6 font-heading text-4xl font-bold text-background md:text-5xl lg:text-6xl">
              Ready for{" "}
              <span className="relative bg-linear-to-r from-[#ed501f] to-[#d13202] bg-clip-text text-transparent">
                Smarter Data
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-[#ed501f]/50"
                  />
                </svg>
              </span>
              ?
            </h5>
            <p className="mx-auto mt-5 max-w-2xl text-base text-background/60 sm:text-lg">Our platform serves as a hub where users can explore a wide range of databases covering businesses, industries, startups, investors, and other professional networks.</p>

            {/* Stats row */}
            <div className="mx-auto mt-10 flex max-w-sm justify-center divide-x divide-background/10">
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 1, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 px-6 py-2 text-center"
                >
                  <div className="font-heading text-3xl font-black text-background">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-background/40">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link to="/app/databases" className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-5 py-3 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base">Browse Databases
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link to="/app/contact" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-background/20 px-5 py-3 font-heading text-sm font-semibold text-background/80 transition-all duration-300 hover:border-background/40 hover:bg-background/5 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
                Contact Us
              </Link>
            </div>

            {/* Guarantees */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {GUARANTEES.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-sm font-medium text-background/50">
                  <Icon size={16} className="text-primary/70"/>
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
