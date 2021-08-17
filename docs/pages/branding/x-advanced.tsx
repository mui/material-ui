import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import XHero from 'docs/src/components/productX/XHero';
import XComponents from 'docs/src/components/productX/XComponents';
import XDataGrid from 'docs/src/components/productX/XDataGrid';
import XTheming from 'docs/src/components/productX/XTheming';
import XRoadmap from 'docs/src/components/productX/XRoadmap';
import References, { ADVANCED_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';

export default function Home() {
  return (
    <ThemeProvider>
      <Head
        title="MUI: Performant advanced components."
        description="We are kicking it off with the most powerful Data Grid on the market and there's a lot more to come. Build complex applications with our advanced components."
      />
      <CssBaseline />
      <AppHeader />
      <main>
        <XHero />
        <References companies={ADVANCED_CUSTOMERS} />
        <XComponents />
        <XDataGrid />
        <XTheming />
        <XRoadmap />
      </main>
      <AppFooter />
    </ThemeProvider>
  );
}
