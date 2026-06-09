# Material UI - Next.js Node ESM SSR example

This is a minimal Next.js Pages Router app that server-renders an
`@mui/x-date-pickers` date picker.

The Pages Router server build keeps `node_modules` packages external, so at
render time Node's own resolver loads `@mui/x-date-pickers` and, transitively,
`@mui/material`'s published files. On current Node versions that resolution
uses the package's `import` conditions â€” the same module resolution path as the
Next.js reports in https://github.com/mui/material-ui/issues/48636, without the
`transpilePackages` workaround. With `@mui/material@9.1.1` this example fails
to build with `ERR_UNSUPPORTED_DIR_IMPORT`.

Next.js keeps `@mui/material` itself in the built-in
`experimental.optimizePackageImports` list, so direct imports of it are always
bundled and it cannot be listed in `serverExternalPackages`. Node therefore
only resolves `@mui/material` when a server-external package, like
`@mui/x-date-pickers` here, depends on it.

## How to use

From the repository root:

```bash
pnpm -F @mui/types -F @mui/utils -F @mui/private-theming -F @mui/styled-engine -F @mui/system -F @mui/material build
pnpm --dir examples/nextjs-node-esm-ssr install --ignore-workspace
pnpm --dir examples/nextjs-node-esm-ssr build
```

To run the production server:

```bash
pnpm --dir examples/nextjs-node-esm-ssr start
```

Then open http://localhost:3000. The page is rendered on every request, and the
important signal is that the build and the page render complete without
`ERR_UNSUPPORTED_DIR_IMPORT`.

## Why this example uses local package paths

The app depends directly on `@mui/material`, `@mui/x-date-pickers`, React, and
Emotion. `@mui/material` points at `../../packages/mui-material/build` so this
example can test the current checkout before the package is published.

The `pnpm.overrides` entries are all required for local development: the
unpublished `@mui/material` and `@mui/system` builds declare their MUI
dependencies with the `workspace:` protocol, which only resolves inside this
repository. Each override points one of those dependencies at this checkout's
built packages so the standalone install can resolve them.
