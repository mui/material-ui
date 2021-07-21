import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    body3?: TypographyStyleOptions;
  }

  interface Typography {
    body3: TypographyStyleOptions;
  }
}

const blueDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C', // contrast 3.02:1
  800: '#001E3C',
  900: '#0A1929',
};
const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5', // contrast 3.02:1
  800: '#5A6978', // contrast 5.63:1
  900: '#3D4752',
};

const brandingTheme = createTheme({
  palette: {
    primary: {
      50: '#F0F7FF',
      100: '#C2E0FF',
      200: '#80BFFF',
      300: '#66B2FF',
      400: '#3399FF',
      main: '#007FFF', // contrast 3.83:1
      500: '#007FFF',
      600: '#0072E5',
      700: '#0059B2',
      800: '#004C99',
      900: '#003A75',
    },
    common: {
      black: '#1D1D1D',
    },
    text: {
      primary: blueDark[900],
      secondary: grey[800],
    },
    grey,
    error: {
      50: '#FFF0F1',
      100: '#FFDBDE',
      200: '#FFBDC2',
      300: '#FF99A2',
      400: '#FF7A86',
      500: '#FF505F',
      main: '#EB0014', // contrast 4.62:1
      600: '#EB0014',
      700: '#C70011',
      800: '#94000D',
      900: '#570007',
    },
    success: {
      50: '#E9FBF0',
      100: '#C6F6D9',
      200: '#9AEFBC',
      300: '#6AE79C',
      400: '#3EE07F',
      500: '#21CC66',
      600: '#1DB45A',
      main: '#1AA251', // contrast 3.31:1
      700: '#1AA251',
      800: '#178D46',
      900: '#0F5C2E',
    },
    warning: {
      50: '#FFF9EB',
      100: '#FFF4DB',
      200: '#FFF0CC',
      300: '#FFE4A3',
      400: '#FFD980',
      500: '#FFC846',
      600: '#FFBC1F',
      main: '#F5AC00', // does not pass constrast ratio
      700: '#F5AC00',
      800: '#DB9A00',
      900: '#8F6400',
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    fontFamily: [
      '"PlusJakartaSans"',
      // system-font
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'initial',
      fontWeight: 700,
    },
    body1: {
      fontSize: 18,
      lineHeight: '22px',
    },
    body2: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 500,
    },
    body3: {
      fontSize: 14,
      lineHeight: '20px',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
          body3: 'p',
          inherit: 'p',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        sizeLarge: {
          padding: '13px 20px',
        },
      },
    },
  },
});

export default brandingTheme;
