import * as React from 'react';
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
