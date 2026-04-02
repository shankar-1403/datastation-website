export const DATA_PRODUCTS = [
  {
    id: "msme-10k",
    title: "10,000 MSME Database",
    category: "MSME Data",
    handle: "10-000-msme-database",
    appPath: "/app/tenmsme",
    carouselImage: "/10k.webp",
    records: "10,000",
    percentOff: 80,
    cutPrice:5000,
    price:999,
  },
  {
    id: "msme-20k",
    title: "20,000 MSME Database",
    category: "MSME Data",
    handle: "20-000-msme-database",
    appPath: "/app/twentymsme",
    carouselImage: "/20k.webp",
    records: "20,000",
    percentOff: 82,
    cutPrice:10000,
    price:1800,
  },
  {
    id: "msme-30k",
    title: "30,000 MSME Database",
    category: "MSME Data",
    handle: "30-000-msme-database",
    appPath: "/app/thirtymsme",
    carouselImage: "/30k.webp",
    records: "30,000",
    percentOff: 82,
    cutPrice:15000,
    price:2700,
  },
  {
    id: "msme-40k",
    title: "40,000 MSME Database",
    category: "MSME Data",
    handle: "40-000-msme-database",
    appPath: "/app/fortymsme",
    carouselImage: "/40k.webp",
    records: "40,000",
    percentOff: 82,
    cutPrice:20000,
    price:3600,
  },
  {
    id: "angels-500",
    title: "Top 500 Angel Investor Data (India, USA, UAE)",
    category: "Investor Data",
    handle: "top-500-angel-investor-data-india-usa-uae",
    appPath: "/app/angel_investor",
    carouselImage: "/500_angel.webp",
    records: "500",
    percentOff: 80,
    cutPrice:5000,
    price:1000,
  },
  {
    id: "vc-250",
    title: "Top 250+ VC & Angel Investors (India)",
    category: "Investor Data",
    handle: "top-250-vc-angels-investor-india",
    appPath: "/app/vc_angel_investor",
    carouselImage: "/250_plus.webp",
    records: "250+",
    percentOff: 80,
    cutPrice:2500,
    price:500,
  },
];

export function productUrl(storefrontBaseUrl, handle) {
  const base = (storefrontBaseUrl || "").replace(/\/$/, "");
  if (!base) return "#";
  return `${base}/products/${handle}`;
}

/** Catalog entries for “other products” carousels (excludes the page you’re on). */
export function otherDatabaseProducts(excludeId) {
  return DATA_PRODUCTS.filter((p) => p.id !== excludeId);
}
