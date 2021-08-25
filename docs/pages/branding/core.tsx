import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingProvider from 'docs/src/BrandingProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import CoreHero from 'docs/src/components/productCore/CoreHero';
import CoreComponents from 'docs/src/components/productCore/CoreComponents';
import CoreTheming from 'docs/src/components/productCore/CoreTheming';
import CoreStyling from 'docs/src/components/productCore/CoreStyling';
import CoreHeroEnd from 'docs/src/components/productCore/CoreHeroEnd';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';

export default function Home() {
  return (
    <BrandingProvider>
      <Head
        title="MUI: A popular React UI framework"
        description="The ultimate solution for your UI. MUI provides a robust, customizible and accessible library of foundational and advanced components, enabling you to build your own design system and develop React applications faster."
      />
      <CssBaseline />
      <AppHeader />
      <main>
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
