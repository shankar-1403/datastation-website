import { Link, useLocation } from "react-router";

export function Footer() {
  const datastation = "/datastation.webp";
  const location = useLocation();
  const withSearch = (to) => ({ pathname: to, search: location.search });
  const links = 
    [
      {
        h: "Pages",
        links: [
          { label: "Home", to: "/app" },
          { label: "Databases", to: "/app/databases" },
          { label: "About", to: "/app/about" },
          { label: "Contact", to: "/app/contact" },
        ],
      },
      {
        h: "Legal",
        links: [
          { label: "Privacy Policy", to: "/app/privacy" },
          { label: "Terms & Conditions", to: "/app/terms" },
        ],
      },
    ]
  return (
    <footer className="mx-auto max-w-7xl border-t border-[#ed501f]/20 bg-ds-m-bg px-4 pb-8 pt-8 sm:px-6 lg:px-8 min-[1100px]:px-13 min-[1100px]:pt-12">
      <div className="mx-auto flex max-w-325 flex-col gap-10 border-b border-[#ed501f]/20 pb-11 lg:flex-row lg:justify-between lg:gap-12">
        <div className="min-w-0 shrink-0 lg:max-w-sm">
          <div className="mb-3 flex items-center gap-2.5 font-ds-display text-[17px] font-extrabold text-ds-m-t1">
            <Link to={withSearch("/app")}>
              <img
                data-ds-footer-logo
                src={datastation}
                alt="Datastation Logo"
                width={200}
                height={52}
                decoding="async"
                loading="lazy"
              />
            </Link>
          </div>
          <p className="mb-4 max-w-xs text-sm leading-[1.8] text-[#5c5c5c] sm:text-[13px] sm:text-justify">
            Data Station is a centralized platform designed to make structured and accessible data available to professionals, businesses, and researchers.
          </p>
          <a href="mailto:support@datastation.in" className="text-sm text-[#ed501f] no-underline transition-opacity hover:opacity-70 sm:text-[13px]">
            support@datastation.in
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-12 md:gap-16 lg:gap-20">
          {links.map((col) => (
            <div key={col.h} className="min-w-0">
              <div className="mb-3 font-ds-display text-[11px] font-bold uppercase tracking-[1.4px] text-ds-m-t1 sm:mb-4 sm:text-[11.5px]">
                {col.h}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={withSearch(l.to)}
                      className="text-sm text-[#5c5c5c] no-underline transition-colors hover:text-[#ed501f] sm:text-[13px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          
        </div>
      </div>
      <div className="mx-auto flex max-w-325 flex-wrap items-center justify-between gap-3 pt-4">
        <span className="text-[11px] text-[#5c5c5c] sm:text-xs">
          © 2026 Data Station. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

// Backward-compatible named export used by existing route files.
export const DsFooter = Footer;
