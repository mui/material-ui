/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, useTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';

import Header from './Header';
import Navigation, { NavigationView } from './Navigation';
import ColorSystem from './ColorSystem';
import TypographySystem from './TypographySystem';
import iosTheme from './theme';
import IPhone from './IPhone';

function SystemMaterials() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridAutoRows: '240px',
        gap: 2,
      }}
    >
      {(Object.keys(theme.materials) as Array<keyof typeof theme.materials>).map(
        (material) => (
          <Box key={material} sx={{ p: 5 }}>
            <Box
              sx={{
                borderRadius: 'sm',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                material,
              }}
            >
              {material}
            </Box>
          </Box>
        ),
      )}
    </Box>
  );
}

export default function IosExample() {
  // const [disableTheme, setDisableTheme] = React.useState(false);
  const [view, setView] = React.useState<NavigationView>('iphone');
  return (
    <CssVarsProvider
      defaultMode="system"
      disableTransitionOnChange
      // theme={disableTheme ? undefined : iosTheme}
      theme={iosTheme}
    >
      <CssBaseline />
      <Box
        sx={{
          '--header-height': '44px',
          minHeight:
            'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'var(--header-height) 1fr',
          gridTemplateAreas: '"header header" "nav main"',
        }}
      >
        <Header />
        <Navigation value={view} onItemClick={(value) => setView(value)} />
        <Box
          component="main"
          sx={{
            p: '0.5rem',
            gridArea: 'main',
            pr: 'calc(0.5rem + env(safe-area-inset-right))',
            pb: 'calc(2rem + env(safe-area-inset-bottom))',
          }}
        >
          {view === 'iphone' && <IPhone />}
          {view === 'color' && <ColorSystem />}
          {view === 'text' && <TypographySystem />}
          {view === 'material' && <SystemMaterials />}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
