import * as React from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  useColorScheme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';

const theme = createTheme({
  colorSchemes: { dark: true },
  cssVariables: { colorSchemeSelector: '.regression-inject-first-%s' },
});

function AutoDark() {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode('dark');
  }, [setMode]);
  return null;
}

export default function InjectFirstWithThemeVars() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme} modeStorageKey="regression-inject-first">
        <AutoDark />
        <Box
          sx={{
            border: 2,
            borderColor: 'divider',
            backgroundColor: 'background.default',
            width: 100,
            height: 100,
            m: 1,
          }}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
