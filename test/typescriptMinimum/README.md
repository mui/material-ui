# Minimum TypeScript version test

This test checks the built Material UI declarations with TypeScript 5.0.4.
It covers `createTheme`, `Button`, and `Menu` with `node`, `node16`, and `bundler` module resolution.
Workspace links resolve to the package build folders. The test has no source aliases and checks library declarations.

Run these commands from the repository root:

```bash
pnpm release:build
pnpm -F @mui-internal/test-typescript-minimum test
```

Keep the TypeScript version pinned to the supported minimum. The development compilers are separate.
