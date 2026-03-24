import { Link } from "react-router";

export function DsFooter() {
  const linkClass =
    "text-ds-grey-dark underline-offset-2 transition hover:text-ds-orange hover:underline";
  return (
    <footer className="mt-12 border-t border-black/10 bg-ds-white px-4 py-8 text-center text-sm text-ds-grey-accent">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link to="/app/privacy" className={linkClass}>
          Privacy Policy
        </Link>
        <Link to="/app/terms" className={linkClass}>
          Terms &amp; Conditions
        </Link>
        <Link to="/app/contact" className={linkClass}>
          Contact
        </Link>
        <Link to="/app/demo" className={linkClass}>
          Admin demo
        </Link>
      </div>
      <p className="mt-4 text-xs">
        © {new Date().getFullYear()} Data Station. All rights reserved.
      </p>
    </footer>
  );
}
