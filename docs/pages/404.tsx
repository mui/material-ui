import * as React from 'react';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import NotFoundHero from 'docs/src/components/NotFoundHero';

export default function Custom404() {
  return (
    <BrandingCssVarsProvider>
      <Head title="404: This page could not be found - MUI" description="" />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <NotFoundHero />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
