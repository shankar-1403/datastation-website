import { Link, useLocation } from "react-router";

const NAV_LINKS = [
  { label: "Home", to: "/app" },
  { label: "Databases", to: "/app/databases" },
  { label: "About", to: "/app/about" },
  { label: "Contact", to: "/app/contact" },
];

const nbtnOrClass = "relative overflow-hidden rounded-lg border-0 bg-gradient-to-br from-[#ed501f] to-[#cf3101] px-5 py-2.5 font-ds-body text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgb(240_74_29/0.4),0_4px_20px_rgb(240_74_29/0.3)] transition-all duration-300 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/[0.15] after:to-transparent after:opacity-0 after:transition-opacity after:duration-200 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(240_74_29/0.6),0_6px_30px_rgb(240_74_29/0.45)] hover:after:opacity-100";

export function Header() {
  const datastation = "/datastation.webp";
  const location = useLocation();
  const withSearch = (to) => ({ pathname: to, search: location.search });

  return (
    <nav className={`fixed left-0 right-0 top-0 z-500 py-2 border-b-2 border-gray/60 bg-white/90 backdrop-blur-xl font-ds-body w-full`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-13">
        <Link to={withSearch("/app")}>
          <img src={datastation} alt="Datastation Logo" className="h-16"/>
        </Link>
        <div className="flex gap-6">
          <ul className="m-0 hidden list-none items-center gap-8 p-0 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={withSearch(l.to)} className="relative text-base font-medium text-black no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#ed501f] after:transition-[width] after:duration-300 hover:text-ds-m-t1 hover:after:w-full"
                >{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5">
          <Link to={withSearch("/app/databases")} className={nbtnOrClass}>Browse Databases</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
