import * as React from 'react';
import dynamic from 'next/dynamic';
import { alpha, useColorScheme as useMuiColorScheme } from '@mui/material/styles';
import { CssVarsProvider, THEME_ID, useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import defaultTheme from '@mui/joy/styles/defaultTheme'; // reduce the calculation time
import Box from '@mui/material/Box';
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

function Loading() {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: {
          xs: 892,
          sm: 1025,
          lg: 1080,
        },
        background: `linear-gradient(180deg, #FFF 0%, ${
          (theme.vars || theme).palette.primary[50]
        } 100%)`,
        ...theme.applyDarkStyles({
          background: `linear-gradient(180deg, ${
            (theme.vars || theme).palette.primaryDark[800]
          } 0%, ${alpha(theme.palette.primary[900], 0.2)} 100%)`,
        }),
      })}
    />
  );
}

const JoyUITemplates = dynamic(() => import('../src/components/productJoyUI/JoyUITemplates'), {
  ssr: false,
  loading: Loading,
});

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
        description="Joy UI is for those that appreciate the comprehensiveness and reliability of Material UI, but don't want Material Design. It's design agnostic and built to be tailored to your specific design language."
        // TODO: change to Joy UI card
        // card="/static/blog/introducing-mui-base/card.png"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <CssVarsProvider
        attribute="data-mui-color-scheme"
        modeStorageKey="mui-mode"
        colorSchemeStorageKey="mui-color-scheme"
        theme={{ [THEME_ID]: defaultTheme }}
      >
        <ModeObserver />
        <main id="main-content">
          <JoyUIHero />
          <Divider sx={{ opacity: { xs: 1, sm: 0 } }} />
          <JoyUISummary />
          <Divider />
          <Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <JoyUITemplates />
          </Box>
          <Divider />
          <Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <JoyUIComponents />
          </Box>
          <Divider />
          <Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <JoyUIFeatures />
          </Box>
          <Divider />
          <Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <JoyUITestimonial />
          </Box>
          <Divider />
          <Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
            <JoyUIEnd />
          </Box>
          <Divider />
        </main>
      </CssVarsProvider>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
