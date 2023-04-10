import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import JoyUIHero from 'docs/src/components/productJoyUI/JoyUIHero';
import JoyUISummary from 'docs/src/components/productJoyUI/JoyUISummary';
import JoyUIComponents from 'docs/src/components/productJoyUI/JoyUIComponents';
import JoyUIFeatures from 'docs/src/components/productJoyUI/JoyUIFeatures';
import JoyUIEnd from 'docs/src/components/productJoyUI/JoyUIEnd';
import JoyUITemplates from 'docs/src/components/productJoyUI/JoyUITemplates';

export default function Core() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Joy UI: Craft gorgeous UIs that spark joy"
        description="Joy UI is for those that appreciate the comprehensiveness and reliability of Material UI, but don’t want Material Design. It’s design agnostic and built to be tailored to your specific design language."
        // TODO: change to Joy UI card
        // card="/static/blog/introducing-mui-base/card.png"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <JoyUIHero />
        <JoyUISummary />
        <JoyUIComponents />
        <JoyUIFeatures />
        <JoyUITemplates />
        <JoyUIEnd />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
