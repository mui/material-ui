import * as React from 'react';
import { useCssThemeVars, experimental_extendTheme as extendTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import CoreHero from 'docs/src/components/productCore/CoreHero';
import CoreComponents from 'docs/src/components/productCore/CoreComponents';
import CoreTheming from 'docs/src/components/productCore/CoreTheming';
import CoreStyling from 'docs/src/components/productCore/CoreStyling';
import CoreHeroEnd from 'docs/src/components/productCore/CoreHeroEnd';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

const defaultTheme = extendTheme();

export default function Core() {
  const { theme: scopedTheme, styles } = useCssThemeVars(defaultTheme, {
    selector: {
      root: '.mui-default-theme',
      defaultColorScheme: (key) =>
        `.mui-default-theme, [data-mui-color-scheme="${key}"] .mui-default-theme`,
      scopedColorScheme: (key) => `[data-mui-color-scheme="${key}"] .mui-default-theme`,
    },
  });
  return (
    <BrandingCssVarsProvider>
      <Head
        title="MUI Core: Ready to use components, free forever"
        description="Get a growing list of React components, ready-to-use, free forever and with accessibility always in mind."
        card="/static/social-previews/core-preview.jpg"
      />
      <GlobalStyles styles={styles} />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <CoreHero scopedTheme={scopedTheme} />
        <References companies={CORE_CUSTOMERS} />
        <CoreComponents scopedTheme={scopedTheme} />
        <CoreTheming />
        <CoreStyling />
        <CoreHeroEnd />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
