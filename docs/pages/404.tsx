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
      <Head
        title="404: This page could not be found - MUI"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design."
        card="/static/social-previews/home-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <NotFoundHero />
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
