# Minimum TypeScript version test

This test checks the built Material UI declarations with TypeScript 5.0.4.
It covers root and subpath imports of `createTheme`, `Button`, and `Menu` with `node`, `node16`, and `bundler` module resolution.
The Node.js 16 check includes CommonJS and ESM consumers.
Workspace links resolve to the package build folders. The test has no source aliases and checks library declarations.

Run these commands from the repository root:

```bash
pnpm release:build
pnpm -F @mui-internal/test-typescript-minimum test
```

Keep the TypeScript version pinned to the latest patch of the supported minimum minor version. The development compilers are separate.
