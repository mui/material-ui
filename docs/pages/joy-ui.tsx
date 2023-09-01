import * as React from 'react';
import { useColorScheme as useMuiColorScheme } from '@mui/material/styles';
import {
  CssVarsProvider,
  extendTheme,
  THEME_ID,
  useColorScheme as useJoyColorScheme,
} from '@mui/joy/styles';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import JoyUIHero from 'docs/src/components/productJoyUI/JoyUIHero';
import JoyUISummary from 'docs/src/components/productJoyUI/JoyUISummary';
import JoyUIComponents from 'docs/src/components/productJoyUI/JoyUIComponents';
import JoyUIFeatures from 'docs/src/components/productJoyUI/JoyUIFeatures';
import JoyUITestimonial from 'docs/src/components/productJoyUI/JoyUITestimonial';
import JoyUIEnd from 'docs/src/components/productJoyUI/JoyUIEnd';
import JoyUITemplates from 'docs/src/components/productJoyUI/JoyUITemplates';

const theme = extendTheme();

function ModeObserver() {
  const { mode: muiMode, setMode: setMuiMode } = useMuiColorScheme();
  const { mode: joyMode, setMode: setJoyMode } = useJoyColorScheme();
  const modeRef = React.useRef({ muiMode, joyMode });
  modeRef.current.joyMode = joyMode;
  modeRef.current.muiMode = muiMode;
  React.useEffect(() => {
    if (modeRef.current.joyMode !== muiMode) {
      setJoyMode(muiMode || null);
    }
  }, [muiMode, setJoyMode]);
  React.useEffect(() => {
    if (modeRef.current.muiMode !== joyMode) {
      setMuiMode(joyMode || null);
    }
  }, [joyMode, setMuiMode]);
  return null;
}

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
      <CssVarsProvider
        attribute="data-mui-color-scheme"
        modeStorageKey="mui-mode"
        colorSchemeStorageKey="mui-color-scheme"
        theme={{ [THEME_ID]: theme }}
      >
        <ModeObserver />
        <main id="main-content">
          <JoyUIHero />
          <JoyUISummary />
          <Divider />
          <JoyUITemplates />
          <Divider />
          <JoyUIComponents />
          <Divider />
          <JoyUIFeatures />
          <Divider />
          <JoyUITestimonial />
          <Divider />
          <JoyUIEnd />
          <Divider />
        </main>
      </CssVarsProvider>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
