/** Curated dataset catalog — links use PUBLIC_STOREFRONT_URL when set. */
export const DATA_PRODUCTS = [
  {
    id: "msme-10k",
    title: "10,000 MSME Database",
    category: "MSME Data",
    handle: "10000-msme-database",
    blurb: "Structured MSME companies across India — Excel delivery.",
  },
  {
    id: "msme-20k",
    title: "20,000 MSME Database",
    category: "MSME Data",
    handle: "20000-msme-database",
    blurb: "Expanded MSME coverage for outreach and research.",
  },
  {
    id: "msme-30k",
    title: "30,000 MSME Database",
    category: "MSME Data",
    handle: "30000-msme-database",
    blurb: "Large-scale MSME directory in filterable Excel format.",
  },
  {
    id: "msme-40k",
    title: "40,000 MSME Database",
    category: "MSME Data",
    handle: "40000-msme-database",
    blurb: "Maximum MSME reach for campaigns and analysis.",
  },
  {
    id: "angels-500",
    title: "Top 500 Angel Investor Data",
    category: "Investor Data",
    handle: "top-500-angel-investor-data",
    blurb: "India · USA · UAE — active angel investors.",
  },
  {
    id: "vc-250",
    title: "Top 250+ VC & Angel Investors (India)",
    category: "Investor Data",
    handle: "top-250-vc-angel-investors-india",
    blurb: "Indian VC firms and angels — major startup hubs.",
  },
];

export function productUrl(storefrontBaseUrl, handle) {
  const base = (storefrontBaseUrl || "").replace(/\/$/, "");
  if (!base) return "#";
  return `${base}/products/${handle}`;
}
