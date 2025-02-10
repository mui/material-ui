import * as React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import HeroPricing from 'docs/src/components/pricing/HeroPricing';
import PricingTable from 'docs/src/components/pricing/PricingTable';
import PricingList from 'docs/src/components/pricing/PricingList';
import Testimonials from 'docs/src/components/home/Testimonials';
import PricingWhatToExpect from 'docs/src/components/pricing/PricingWhatToExpect';
import PricingFAQ from 'docs/src/components/pricing/PricingFAQ';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import { LicenseModelProvider } from 'docs/src/components/pricing/LicenseModelContext';

export default function Pricing() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Pricing - MUI"
        description="The community edition lets you get going right away. Switch to a commercial plan for more components & technical support."
        card="/static/social-previews/pricing-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <HeroPricing />
        <Divider />
        <LicenseModelProvider>
          {/* Mobile, Tablet */}
          <Container sx={{ display: { xs: 'block', md: 'none' }, pb: 3, mt: '-1px' }}>
            <PricingList />
          </Container>
          {/* Desktop */}
          <Container sx={{ display: { xs: 'none', md: 'block' } }}>
            <PricingTable />
          </Container>
        </LicenseModelProvider>
        <PricingWhatToExpect />
        <Divider />
        <PricingFAQ />
        <Divider />
        <Testimonials />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
