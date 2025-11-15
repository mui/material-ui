import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { CssVarsProvider } from "@mui/joy";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CssVarsProvider>
          {children}
        </CssVarsProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
