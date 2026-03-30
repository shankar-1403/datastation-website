import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
/* Inlined processed CSS — first paint has full styles (no wait for separate .css request). */
import tailwindCss from "./tailwind.css?inline";

/** Preload logo only. Main styles ship inside <style> in <head> (see tailwindCss). */
export function links() {
  return [{ rel: "preload", href: "/datastation.webp", as: "image" }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Tiny first paint — parsed before the large Tailwind block; avoids white flash while CSS parses */}
        <style>
          {`html,body{background-color:#f5f5f5;color:#171717;margin:0}`}
        </style>
        {/* eslint-disable-next-line react/no-danger -- SSR: full Tailwind bundle */}
        <style dangerouslySetInnerHTML={{ __html: tailwindCss }} />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
