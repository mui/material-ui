import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import CoreHero from 'docs/src/components/productCore/CoreHero';
import CoreComponents from 'docs/src/components/productCore/CoreComponents';
import CoreTheming from 'docs/src/components/productCore/CoreTheming';
import CoreStyling from 'docs/src/components/productCore/CoreStyling';
import CoreHeroEnd from 'docs/src/components/productCore/CoreHeroEnd';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

export default function Home() {
  return (
    <BrandingProvider>
      <Head
        title="MUI Core: Ready to use components, free forever"
        description="Get a growing list of components, ready-to-use, free forever and with accessibility always in mind."
        card="/static/social-previews/core-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <CoreHero />
        <References companies={CORE_CUSTOMERS} />
        <CoreComponents />
        <CoreTheming />
        <CoreStyling />
        <CoreHeroEnd />
      </main>
      <AppFooter />
    </BrandingProvider>
  );
}
