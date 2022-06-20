import * as React from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  styled,
  useTheme,
} from '@mui/material/styles';
import type { Overlays } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      opacity: {
        inputPlaceholder: 0.1,
        inputUnderline: 0.1,
      },
      overlays: Array(25).fill('') as Overlays,
      palette: {
        AppBar: {
          darkBg: '',
          darkColor: '',
          defaultBg: '',
        },
        // @ts-expect-error
        mode: '',
      },
    },
  },
});

const TestStyled = styled('div')(({ theme }) => ({
  color: theme.vars.palette.primary.main,
  [theme.getColorSchemeSelector('dark')]: {
    color: theme.vars.palette.common.onBackground,
  },
}));

const TestUseTheme = () => {
  const theme = useTheme();
  return <div style={{ background: theme.vars.palette.common.background }}>test</div>;
};

<CssVarsProvider theme={theme}>
  <TestStyled
    sx={(theme) => ({
      [theme.getColorSchemeSelector('dark')]: {
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
      },
    })}
  />
</CssVarsProvider>;
