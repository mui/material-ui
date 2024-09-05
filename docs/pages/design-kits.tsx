import * as React from 'react';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import DesignKitHero from 'docs/src/components/productDesignKit/DesignKitHero';
import DesignKitValues from 'docs/src/components/productDesignKit/DesignKitValues';
import DesignKitDemo from 'docs/src/components/productDesignKit/DesignKitDemo';
import DesignKitFAQ from 'docs/src/components/productDesignKit/DesignKitFAQ';
import SyncFeatures from 'docs/src/components/productDesignKit/SyncFeatures';
import MaterialEnd from 'docs/src/components/productMaterial/MaterialEnd';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import References, { DESIGNKITS_CUSTOMERS } from 'docs/src/components/home/References';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

export default function DesignKits() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Material UI in your favorite design tool"
        description="Pick your favorite design tool to enjoy and use Material UI components. Boost consistency and facilitate communication when working with developers."
        card="/static/social-previews/designkits-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/mui-design-kits" />
      <main id="main-content">
        <DesignKitHero />
        <References companies={DESIGNKITS_CUSTOMERS} />
        <Divider />
        <DesignKitValues />
        <Divider />
        <DesignKitDemo />
        <Divider />
        <SyncFeatures />
        <Divider />
        <DesignKitFAQ />
        <Divider />
        <MaterialEnd noFaq />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
