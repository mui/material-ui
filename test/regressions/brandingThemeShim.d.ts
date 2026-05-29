import type { Theme } from '@mui/material/styles';

// Declaration-only shim for the docs branding theme.
//
// The runtime export lives in the matching `.js` file (excluded from the
// test typecheck). We declare the shape here so `MarketingWrapper.tsx` can
// consume it without TS transitively pulling in
// `packages-internal/core-docs/src/branding/brandingTheme.ts`. That source
// file declares augmentations to `@mui/material/styles` and friends, which
// resolve fine in the package's own `bundler`-resolution typecheck and in
// the Vite build, but fail under `test/tsconfig.json`'s `nodenext`
// resolution (`@mui/material/themeCssVarsAugmentation` can't be found in
// the test package's node_modules layout).
declare const brandingLightTheme: Theme;
export default brandingLightTheme;
