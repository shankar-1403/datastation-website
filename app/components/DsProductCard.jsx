export function DsProductCard({ title, category, blurb, href }) {
  const isPlaceholder = !href || href === "#";
  return (
    <article className="flex flex-col rounded-xl border border-black/5 bg-ds-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition hover:border-ds-orange/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-ds-orange">
        {category}
      </p>
      <h3 className="font-heading mt-2 text-lg font-semibold text-ds-grey-dark">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ds-grey-accent">
        {blurb}
      </p>
      <a
        href={href}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-ds-orange px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-ds-grey-dark"
        {...(isPlaceholder
          ? {
              onClick: (e) => e.preventDefault(),
              title: "Set PUBLIC_STOREFRONT_URL in .env to link to your Shopify storefront",
            }
          : { target: "_blank", rel: "noreferrer" })}
      >
        {isPlaceholder ? "Buy now (add store URL)" : "Buy now"}
      </a>
    </article>
  );
}
