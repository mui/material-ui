import * as React from 'react';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import TemplateHero from 'docs/src/components/productTemplate/TemplateHero';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import TemplateDemo from 'docs/src/components/productTemplate/TemplateDemo';
import Testimonials from 'docs/src/components/home/Testimonials';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import References, { TEMPLATES_CUSTOMERS } from 'docs/src/components/home/References';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

export default function Templates() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Fully built Material UI templates - MUI"
        description="A collection of 4.5 average rating templates, selected and curated by MUI's team of maintainers to get your projects up and running today."
        card="/static/social-previews/templates-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <TemplateHero />
        <References companies={TEMPLATES_CUSTOMERS} />
        <Divider />
        <ValueProposition />
        <Divider />
        <TemplateDemo />
        <Divider />
        <Testimonials />
        <Divider />
        <HeroEnd />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
