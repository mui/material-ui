import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
// Go through a local `.d.ts` shim rather than importing the docs branding
// theme directly. The theme source file declares `@mui/material/*` module
// augmentations that resolve fine in the package's own typecheck and in the
// Vite bundle, but fail under `test/tsconfig.json`'s `nodenext` resolution.
// The runtime side is in `brandingThemeShim.js`, excluded from the test
// typecheck.
import { brandingLightTheme } from './brandingThemeShim';

// `docs/src/components/product*/*.tsx` composites are authored to run inside
// the Next.js docs site and read the docs branding theme
// (`palette.primaryDark`, `palette.gradients`, `applyDarkStyles`, ...).
// Supply it so they render in the regression fixture. Inlines the minimal
// light-mode subset of `BrandingProvider` (a thin `ThemeProvider` wrapper);
// composites that read `theme.palette.mode` get `'light'`, which matches
// the live `/material-ui` / `/x` pages' default.
export default function MarketingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={brandingLightTheme}>
      <div style={{ width: '100%' }}>{children}</div>
    </ThemeProvider>
  );
}
