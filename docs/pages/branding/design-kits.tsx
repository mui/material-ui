import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import DesignKitHero from 'docs/src/components/productDesignKit/DesignKitHero';
import DesignKitValues from 'docs/src/components/productDesignKit/DesignKitValues';
import DesignKitDemo from 'docs/src/components/productDesignKit/DesignKitDemo';
import DesignKitFAQ from 'docs/src/components/productDesignKit/DesignKitFAQ';
import Testimonials from 'docs/src/components/home/Testimonials';
import HeroEnd from 'docs/src/components/home/HeroEnd';

export default function Home() {
  return (
    <ThemeProvider>
      <Head
        title="MUI in your favorite design tool."
        description="For the designers out there, pick your favorite design tool to enjoy our components. Get the consistency right when working with developers."
      />
      <CssBaseline />
      <AppHeader />
      <main>
        <DesignKitHero />
        <DesignKitValues />
        <DesignKitDemo />
        <DesignKitFAQ />
        <Testimonials mode="dark" />
        <HeroEnd />
      </main>
      <AppFooter />
    </ThemeProvider>
  );
}
