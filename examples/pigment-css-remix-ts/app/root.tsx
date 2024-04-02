import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { css } from '@pigment-css/react';
import '@pigment-css/react/styles.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <Meta />
        <Links />
      </head>
      <body
        className={css`
          padding: 0;
          margin: 0;
        `}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
