import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
// Deep-import the theme directly rather than going through
// `@mui/internal-core-docs/branding`'s barrel. The barrel re-exports a few
// sibling modules whose relative imports lack `.js` extensions — fine under
// the package's own `moduleResolution: 'bundler'`, but the test typecheck
// runs under `nodenext` and would surface those as errors. Importing the
// leaf module (which has no relative imports) sidesteps the chain.
// eslint-disable-next-line import/no-relative-packages
import { brandingLightTheme } from '../../packages-internal/core-docs/src/branding/brandingTheme';

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
