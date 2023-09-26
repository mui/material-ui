import * as React from 'react';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import BaseUIHero from 'docs/src/components/productBaseUI/BaseUIHero';
import BaseUISummary from 'docs/src/components/productBaseUI/BaseUISummary';
import BaseUIComponents from 'docs/src/components/productBaseUI/BaseUIComponents';
import BaseUICustomization from 'docs/src/components/productBaseUI/BaseUICustomization';
import BaseUIEnd from 'docs/src/components/productBaseUI/BaseUIEnd';
import BaseUITestimonial from 'docs/src/components/productBaseUI/BaseUITestimonial';

export default function Core() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Base UI: Ship accessible & sleek components"
        description={`Base UI is a library of headless ("unstyled") React UI components and low-level hooks.
        You can style them with any CSS solutions like PostCSS or Tailwind CSS.`}
        card="/static/blog/introducing-base-ui/card.png"
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <BaseUIHero />
        <BaseUISummary />
        <Divider />
        <BaseUIComponents />
        <Divider />
        <BaseUICustomization />
        <Divider />
        <BaseUITestimonial />
        <Divider />
        <BaseUIEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
