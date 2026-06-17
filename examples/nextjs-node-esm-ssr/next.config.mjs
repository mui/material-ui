// No configuration is needed: the Pages Router server build keeps
// `node_modules` packages external, so at render time Node's own resolver
// loads `@mui/x-date-pickers` and, transitively, `@mui/material`'s published
// files. On current Node versions that resolution uses the package's `import`
// conditions — the exact path that failed with ERR_UNSUPPORTED_DIR_IMPORT in
// https://github.com/mui/material-ui/issues/48636.
//
// Why this example does not externalize `@mui/material` directly: Next.js
// includes it in the built-in `experimental.optimizePackageImports` list, so
// direct imports of it are always bundled, and listing it in
// `serverExternalPackages` is rejected with a `transpilePackages` conflict.
// In the App Router, ESM externals also load without Next.js's React
// require-hook aliasing, so React component libraries cannot be
// server-external there at all. The Pages Router with a server-external
// dependent package, like `@mui/x-date-pickers` here, is the setup that still
// reaches `@mui/material` through Node.

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
