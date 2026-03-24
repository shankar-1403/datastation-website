import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import tailwindStylesheetUrl from "./tailwind.css?url";

/** Render-blocking stylesheet so embedded Shopify iframe gets CSS before paint (avoids FOUC). */
export function links() {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;500;600&display=optional"
          rel="stylesheet"
        />
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
