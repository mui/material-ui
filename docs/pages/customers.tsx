import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import CustomersHero from 'docs/src/components/customers/CustomersHero';
import AppHeader from 'docs/src/layouts/AppHeader';
import Head from 'docs/src/modules/components/Head';
import * as React from 'react';
import Box from '@mui/material/Box';
import AppFooter from 'docs/src/layouts/AppFooter';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import Divider from '@mui/material/Divider';
import CustomersSpotlight from 'docs/src/components/customers/CustomersSpotlight';
import { getCaseStudies } from 'docs/lib/sourcing';
import { InferGetStaticPropsType } from 'next';
import CustomersTestimonials from 'docs/src/components/customers/CustomersTestimonials';
import CustomerLogos from 'docs/src/components/customers/CustomerLogos';

export const getStaticProps = () => {
  const customers = getCaseStudies();
  return {
    props: {
      customers,
    },
  };
};

export default function Customers(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BrandingCssVarsProvider>
      <Head title="Customers - MUI" description="Meet the teams powered by MUI" />
      <AppHeaderBanner />
      <AppHeader />
      <Divider />
      <main id="main-content">
        <CustomersHero />
        <Box
          component="ul"
          sx={{
            display: 'grid',
            m: 0,
            p: 0,
            gap: 2,
          }}
        >
          <CustomersSpotlight customers={props.customers} />
        </Box>
        <Divider />
        <CustomerLogos />
        <Divider />
        <CustomersTestimonials />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
