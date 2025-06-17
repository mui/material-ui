'use client';
import Divider from '@mui/material/Divider';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import NotFoundHero from 'docs/src/components/NotFoundHero';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeader from 'docs/src/layouts/AppHeader';

export default function Custom404() {
  return (
    <BrandingCssVarsProvider>
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
