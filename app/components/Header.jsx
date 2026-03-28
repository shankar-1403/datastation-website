import { Link, useLocation } from "react-router";

const NAV_LINKS = [
  { label: "Home", to: "/app" },
  { label: "Databases", to: "/app/databases" },
  { label: "About", to: "/app/about" },
  { label: "Contact", to: "/app/contact" },
];


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
        </div>
      </div>
    </nav>
  );
}
