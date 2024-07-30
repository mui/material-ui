import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider, createBox } from '@mui/system';
import { createCssVarsTheme } from '@mui/system/cssVars';

const Box = createBox();

const { CssVarsProvider } = createCssVarsProvider({
  theme: createCssVarsTheme({
    colorSchemes: {
      light: {
        background: {
          default: '#fff',
        },
      },
    },
  }),
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

export default function ColorSchemeSelector() {
  return (
    <CssVarsProvider>
      <Box
        sx={(theme) => ({
          p: 2,
          color: '#fff',
          [theme.getColorSchemeSelector('light')]: {
            bgcolor: '#000',
          },
        })}
      >
        Background should be #000.
      </Box>
    </CssVarsProvider>
  );
}
