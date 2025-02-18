import * as React from 'react';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_createCssVarsTheme as createCssVarsTheme,
} from '@mui/system';

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  theme: createCssVarsTheme({
    colorSchemes: {
      // test that styles order injection does not matter (dark comes before light).
      dark: {
        background: {
          default: '#000',
        },
      },
      light: {
        background: {
          default: '#e5e5e5',
        },
      },
    },
  }),
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

function DarkMode() {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode('dark');
  }, [setMode]);
  return null;
}

export default function DarkModeSpecificity() {
  return (
    <CssVarsProvider>
      <DarkMode />
      <div style={{ background: 'var(--background-default)', color: '#888', padding: '1rem' }}>
        Background should be #000.
      </div>
    </CssVarsProvider>
  );
}
