# Routes Overview

This project uses filesystem routing from `app/routes.js`:

- `flatRoutes()` scans files inside `app/routes/`
- each file name maps to a URL path
- dot segments become nested URL segments

## Main layout route

- `app/routes/app.jsx` -> `/app`
  - provides the shared app shell:
    - Shopify `AppProvider`
    - `Header`
    - app navigation (`s-app-nav`)
    - `Footer`
  - renders child routes via `Outlet`

## Child pages under `/app`

- `app/routes/app._index/route.jsx` -> `/app`
- `app/routes/app.databases/route.jsx` -> `/app/databases`
- `app/routes/app.tenmsme/route.jsx` -> `/app/tenmsme`
- `app/routes/app.investor/route.jsx` -> `/app/investor`
- `app/routes/app.about/route.jsx` -> `/app/about`
- `app/routes/app.contact/route.jsx` -> `/app/contact`
- `app/routes/app.privacy/route.jsx` -> `/app/privacy`
- `app/routes/app.terms/route.jsx` -> `/app/terms`

## Alias routes

- `app/routes/databases.jsx` redirects to `/app/databases`
- `app/routes/contact.jsx` redirects to `/app/contact`

These aliases exist only for convenience and still route users into the embedded `/app` flow.
