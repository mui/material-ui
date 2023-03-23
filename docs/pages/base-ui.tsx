import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import BaseUIHero from 'docs/src/components/productBaseUI/BaseUIHero';
import BaseUISummary from 'docs/src/components/productBaseUI/BaseUISummary';

export default function Core() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Base UI: Ship accessible & sleek components"
        description='MUI Base gives you a set of foundational \"headless\" components that you can build with using any styling solution you choose—no need to override any default style engine or theme.'
        card="/static/blog/introducing-mui-base/card.png"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <BaseUIHero />
        <BaseUISummary />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
