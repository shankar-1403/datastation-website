/** Curated dataset catalog — links use PUBLIC_STOREFRONT_URL when set. */
export const DATA_PRODUCTS = [
  {
    id: "msme-10k",
    title: "10,000 MSME Database",
    category: "MSME Data",
    /** Must match Admin → Search engine listing URL handle (e.g. …/products/10-000-msme-database) */
    handle: "10-000-msme-database",
    appPath: "/app/tenmsme",
    carouselImage: "/10k.webp",
  },
  {
    id: "msme-20k",
    title: "20,000 MSME Database",
    category: "MSME Data",
    handle: "20-000-msme-database",
    appPath: "/app/twentymsme",
    carouselImage: "/20k.webp",
  },
  {
    id: "msme-30k",
    title: "30,000 MSME Database",
    category: "MSME Data",
    handle: "30-000-msme-database",
    appPath: "/app/thirtymsme",
    carouselImage: "/30k.webp",
  },
  {
    id: "msme-40k",
    title: "40,000 MSME Database",
    category: "MSME Data",
    handle: "40-000-msme-database",
    appPath: "/app/fortymsme",
    carouselImage: "/40k.webp",
  },
  {
    id: "angels-500",
    title: "Top 500 Angel Investor Data",
    category: "Investor Data",
    handle: "top-500-angel-investor-data-india-usa-uae",
    appPath: "/app/angel_investor",
    carouselImage: "/500_angel.webp",
  },
  {
    id: "vc-250",
    title: "Top 250+ VC & Angel Investors (India)",
    category: "Investor Data",
    handle: "top-250-vc-angels-investor-india",
    appPath: "/app/vc_angel_investor",
    carouselImage: "/250_plus.webp",
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
