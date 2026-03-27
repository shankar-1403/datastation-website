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
    <footer className="border-t border-zinc-200 bg-ds-m-bg mx-auto max-w-7xl pb-8 pt-4 min-[1100px]:px-13 min-[1100px]:pb-8 min-[1100px]:pt-12">
      <div className="mx-auto flex justify-between max-w-325 gap-11 border-b border-zinc-200 pb-11 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[2.2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2.5 font-ds-display text-[17px] font-extrabold text-ds-m-t1">
            <Link to={withSearch("/app")}>
              <img src={datastation} alt="Datastation Logo" className="h-16"/>
            </Link>
          </div>
          <p className="mb-4 max-w-xs text-[13px] leading-[1.8] text-justify text-[#5c5c5c]">Data Station is a centralized platform designed to make structured and accessible data available to professionals, businesses, and researchers.</p>
          <a href="mailto:support@datastation.in" className="text-[13px] text-[#ed501f] no-underline transition-opacity hover:opacity-70">support@datastation.in</a>
        </div>
        <div className="flex gap-20">
          {links.map((col) => (
            <div key={col.h}>
              <div className="mb-4 font-ds-display text-[11.5px] font-bold uppercase tracking-[1.4px] text-ds-m-t1">
                {col.h}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={withSearch(l.to)}
                      className="text-[13px] text-[#5c5c5c] no-underline transition-colors hover:text-[#ed501f]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-325 flex-wrap items-center justify-between gap-3 pt-8">
        <span className="text-xs text-[#5c5c5c]">
          © 2026 Data Station. All rights reserved.
        </span>
        <div className="flex gap-5">
          <Link
            to={withSearch("/app/privacy")}
            className="text-xs text-[#5c5c5c] no-underline transition-colors hover:text-ds-m-muted"
          >
            Privacy Policy
          </Link>
          <Link
            to={withSearch("/app/terms")}
            className="text-xs text-[#5c5c5c] no-underline transition-colors hover:text-ds-m-muted"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Backward-compatible named export used by existing route files.
export const DsFooter = Footer;
