/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { IconDownload } from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Home", to: "/app" },
  { label: "Databases", to: "/app/databases" },
  { label: "About", to: "/app/about" },
  { label: "Contact", to: "/app/contact" },
];

const nbtnOrClass =
  "relative overflow-hidden rounded-lg border-0 bg-gradient-to-br from-ds-m-orange to-ds-m-orange2 px-5 py-2.5 font-ds-body text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgb(240_74_29/0.4),0_4px_20px_rgb(240_74_29/0.3)] transition-all duration-300 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/[0.15] after:to-transparent after:opacity-0 after:transition-opacity after:duration-200 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(240_74_29/0.6),0_6px_30px_rgb(240_74_29/0.45)] hover:after:opacity-100";

/**
 * Fixed top bar for all /app/* routes (matches DataStation landing style).
 */
export function DsAppNavbar({ sampleDownloadUrl = "" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const datastation = "/datastation.webp";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-500 py-2 flex items-center justify-between border-b border-zinc-200 px-5 font-ds-body backdrop-blur-xl backdrop-saturate-200 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-sm" : "bg-white/90"
      }`}
    >
      <Link to="/app">
        <img src={datastation} alt="Datastation Logo" className="h-16"/>
      </Link>
      <div className="flex gap-6">
        <ul className="m-0 hidden list-none items-center gap-8 p-0 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="relative text-base font-medium text-ds-m-muted no-underline transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 after:bg-ds-m-orange after:transition-[width] after:duration-300 hover:text-ds-m-t1 hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5">
          {sampleDownloadUrl ? (
            <a
              href={sampleDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-zinc-200 bg-transparent px-[18px] py-2 font-ds-body text-[13px] font-medium text-ds-m-muted transition-all duration-200 hover:border-ds-m-orange/50 hover:bg-ds-m-orange-dim hover:text-ds-m-t1 sm:inline-flex"
            >
              <IconDownload size={16} stroke={1.75} aria-hidden />
              Download Sample
            </a>
          ) : (
            <span
              className="hidden cursor-not-allowed rounded-lg border border-dashed border-zinc-300 px-[18px] py-2 font-ds-body text-[13px] text-ds-m-soft sm:inline-block"
              title="Set PUBLIC_SAMPLE_DOWNLOAD_URL in .env"
            >
              Download Sample
            </span>
          )}
          <Link to="/app/databases" className={nbtnOrClass}>
            Browse Databases
          </Link>
        </div>
      </div>
    </nav>
  );
}
