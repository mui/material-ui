import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

const secondTheme = extendTheme({
  cssVarPrefix: 'mui2',
});

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Button variant="outlined" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
}

/**
 * - Both of the Providers shared the same storage key, meaning they always initially appear with the same color scheme.
 * - Each provider does not affect the other provider in the same tab.
 */
export default function MultiCssVarsProvider() {
  const [app1, setApp1] = React.useState<Element | undefined>(undefined);
  const [app2, setApp2] = React.useState<Element | undefined>(undefined);
  React.useEffect(() => {
    setApp1(document.querySelector('#app1')!);
    setApp2(document.querySelector('#app2')!);
  }, []);
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <CssVarsProvider
        colorSchemeSelector="#app1"
        colorSchemeNode={app1}
        modeStorageKey="ind-mui-mode"
        colorSchemeStorageKey="ind-mui-color-scheme"
      >
        <ScopedCssBaseline id="app1" enableColorScheme sx={{ p: 2 }}>
          <ModeSwitcher />
        </ScopedCssBaseline>
      </CssVarsProvider>
      <CssVarsProvider
        theme={secondTheme}
        colorSchemeSelector="#app2"
        colorSchemeNode={app2}
        modeStorageKey="ind-mui-mode2"
        colorSchemeStorageKey="ind-mui-color-scheme2"
      >
        <ScopedCssBaseline id="app2" enableColorScheme sx={{ p: 2 }}>
          <ModeSwitcher />
        </ScopedCssBaseline>
      </CssVarsProvider>
    </Box>
  );
}
