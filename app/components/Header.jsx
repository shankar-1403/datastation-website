import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { IconMenu2, IconX } from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Home", to: "/app" },
  { label: "Products", to: "/app/products" },
  { label: "About", to: "/app/about" },
  { label: "Contact", to: "/app/contact" },
];

const SHELL_PX =
  "px-4 sm:px-6 lg:px-8 xl:px-10 min-[1100px]:px-13";

export function Header() {
  const datastation = "/datastation.webp";
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const withSearch = (to) => ({ pathname: to, search: location.search });

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const linkClassName =
    "relative block py-3 text-[15px] font-medium text-black no-underline transition-colors duration-200 md:inline md:py-0 md:text-sm lg:text-base after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#ed501f] after:transition-[width] after:duration-300 hover:text-ds-m-t1 hover:after:w-full md:after:absolute";

  return (
    <header className="fixed left-0 right-0 top-0 z-500 w-full border-b-2 border-gray/60 bg-white font-ds-body shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <nav className="relative" aria-label="Main">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between py-2 ${SHELL_PX}`}
        >
          <Link
            to={withSearch("/app")}
            className="shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <img
              data-ds-header-logo
              src={datastation}
              alt="Datastation Logo"
              width={200}
              height={52}
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <ul className="m-0 hidden list-none items-center gap-5 p-0 md:flex lg:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={withSearch(l.to)} className={linkClassName}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#5c5c5c] transition-colors hover:bg-black/5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <IconX size={26} stroke={1.75} /> : <IconMenu2 size={26} stroke={1.75} />}
          </button>
        </div>

        <div
          id="mobile-nav-panel"
          className={`border-t border-gray/40 bg-white md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <ul className={`m-0 flex list-none flex-col gap-0.5 py-3 pb-4 ${SHELL_PX}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={withSearch(l.to)}
                  className={`${linkClassName} rounded-lg px-2 py-2.5 after:hidden hover:bg-[#ed501f]/8`}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
