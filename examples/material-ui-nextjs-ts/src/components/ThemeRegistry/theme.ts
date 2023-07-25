import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  // Use the `components` key for simple, theme-level customizations
  // Bear in mind the theme isn't tree-shakable!
  // https://mui.com/material-ui/customization/theme-components/
  //
  // components: {
  //
  // },
});

export default theme;
