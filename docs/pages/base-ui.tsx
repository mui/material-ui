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

export default function BaseUI() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Base UI: Unstyled React components and low-level hooks"
        description={`Base UI is a library of headless ("unstyled") React components and low-level hooks. You gain complete control over your app's CSS and accessibility features.`}
        card="/static/social-previews/baseui-preview.jpg"
      >
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/base-ui" />
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
