import * as React from 'react';
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

export default function Core() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Material UI: An open-source React component library that implements Google's Material Design"
        description="A comprehensive collection of prebuilt components that are ready for use in production right out of the box."
        card="/static/social-previews/core-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <CoreHero />
        <References companies={CORE_CUSTOMERS} />
        <CoreComponents />
        <CoreTheming />
        <CoreStyling />
        <CoreHeroEnd />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
