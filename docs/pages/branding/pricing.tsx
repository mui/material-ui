import * as React from 'react';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AppHeader from 'docs/src/layouts/AppHeader';
import HeroPricing from 'docs/src/components/pricing/HeroPricing';
import PricingTable from 'docs/src/components/pricing/PricingTable';
import PricingList from 'docs/src/components/pricing/PricingList';
import EarlyBird from 'docs/src/components/pricing/EarlyBird';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';

export default function Pricing() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppHeader />
      <HeroPricing />
      <PricingList /> {/* Mobile, Tablet */}
      <PricingTable /> {/* Laptop */}
      <EarlyBird />
      <HeroEnd />
      <Divider />
      <AppFooter />
    </ThemeProvider>
  );
}
