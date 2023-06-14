import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import MaterialHero from 'docs/src/components/productMaterial/MaterialHero';
import MaterialComponents from 'docs/src/components/productMaterial/MaterialComponents';
import MaterialTheming from 'docs/src/components/productMaterial/MaterialTheming';
import MaterialStyling from 'docs/src/components/productMaterial/MaterialStyling';
import MaterialHeroEnd from 'docs/src/components/productMaterial/MaterialHeroEnd';
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
        <MaterialHero />
        <References companies={CORE_CUSTOMERS} />
        <MaterialComponents />
        <MaterialTheming />
        <MaterialStyling />
        <MaterialHeroEnd />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
