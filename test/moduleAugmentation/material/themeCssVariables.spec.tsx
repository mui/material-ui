// testing docs/src/pages/customization/theme-components/theme-components.md
import { styled, createTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    gradient: {
      default: string;
    };
  }

  interface Palette {
    gradient: {
      default: string;
    };
  }
}

const StyledComponent = styled('button')(({ theme }) => ({
  background: theme.vars.palette.gradient.default,
}));

const StyledComponent2 = styled('button')(({ theme }) => ({
  // @ts-expect-error `default2` is not defined
  background: theme.vars.palette.gradient.default2,
}));

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        gradient: {
          default: '',
        },
      },
    },
    dark: {
      palette: {
        gradient: {
          default: '',
        },
      },
    },
  },
});

theme.getCssVar('palette-gradient-default');
