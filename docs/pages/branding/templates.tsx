import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import TemplateHero from 'docs/src/components/productTemplate/TemplateHero';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import TemplateDemo from 'docs/src/components/productTemplate/TemplateDemo';
import Testimonials from 'docs/src/components/home/Testimonials';
import HeroEnd from 'docs/src/components/home/HeroEnd';

export default function Home() {
  return (
    <ThemeProvider>
      <Head
        title="MUI: Fully built templates for your project."
        description="A collection of several 4.5 average rating templates, curated by our Core team to get your projects and application up and running today."
      />
      <CssBaseline />
      <AppHeader />
      <main>
        <TemplateHero />
        <ValueProposition />
        <TemplateDemo />
        <Testimonials mode="dark" />
        <HeroEnd />
      </main>
      <AppFooter />
    </ThemeProvider>
  );
}
