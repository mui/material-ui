import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AppHeader from 'docs/src/layouts/AppHeader';
import Hero from 'docs/src/components/home/Hero';
import ReferencesCore from 'docs/src/components/home/ReferencesCore';
import ProductSuite from 'docs/src/components/home/ProductSuite';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import DesignSystemComponents from 'docs/src/components/home/DesignSystemComponents';
import Testimonials from 'docs/src/components/home/Testimonials';
import Sponsors from 'docs/src/components/home/Sponsors';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';

export default function Home() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Head
        title="Home - Material-UI"
        description="The ultimate solution for your UI. MUI provides a robust, customizible and accessible library of foundational and
        advanced components, enabling you to build your own design system and develop React
        applications faster."
      />
      <AppHeader />
      <Hero />
      <ReferencesCore />
      <ProductSuite />
      <ValueProposition />
      <DesignSystemComponents />
      <Testimonials />
      <Sponsors />
      <HeroEnd />
      <Divider />
      <AppFooter />
    </ThemeProvider>
  );
}
