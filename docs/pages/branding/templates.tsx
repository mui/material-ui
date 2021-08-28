import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import Divider from '@material-ui/core/Divider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import TemplateHero from 'docs/src/components/productTemplate/TemplateHero';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import TemplateDemo from 'docs/src/components/productTemplate/TemplateDemo';
import Testimonials from 'docs/src/components/home/Testimonials';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import BrandingProvider from 'docs/src/BrandingProvider';

export default function Templates() {
  return (
    <BrandingProvider>
      <Head
        title="MUI: Fully built templates for your project."
        description="A collection of several 4.5 average rating templates, curated by our Core team to get your projects and application up and running today."
      />
      <AppHeader />
      <main>
        <TemplateHero />
        <ValueProposition />
        <TemplateDemo />
        <Testimonials />
        <HeroEnd />
      </main>
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
