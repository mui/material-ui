'use client';
import Divider from '@mui/material/Divider';
import NoSsr from '@mui/material/NoSsr';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import DesignSystemComponents from 'docs/src/components/home/DesignSystemComponents';
import Hero from 'docs/src/components/home/Hero';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import NewsletterToast from 'docs/src/components/home/NewsletterToast';
import ProductSuite from 'docs/src/components/home/ProductSuite';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import Sponsors from 'docs/src/components/home/Sponsors';
import Testimonials from 'docs/src/components/home/Testimonials';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeader from 'docs/src/layouts/AppHeader';
import Head from 'docs/src/modules/components/HeadApp';

export default function Home() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="MUI: The React component library you always wanted"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design."
        card="/static/social-previews/home-preview.jpg"
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MUI',
              url: 'https://mui.com/',
              logo: 'https://mui.com/static/logo.png',
              sameAs: [
                'https://x.com/MUI_hq',
                'https://github.com/mui/',
                'https://opencollective.com/mui-org',
              ],
            }),
          }}
        />
      </Head>
      <NoSsr>
        <NewsletterToast />
      </NoSsr>
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <Hero />
        <References companies={CORE_CUSTOMERS} />
        <Divider />
        <ProductSuite />
        <Divider />
        <ValueProposition />
        <Divider />
        <DesignSystemComponents />
        <Divider />
        <Testimonials />
        <Divider />
        <Sponsors />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
