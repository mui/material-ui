import { ButtonTheme } from '@mui/material/Button';
import { createTheme } from '../src/styles';

declare module '@mui/material/styles' {
  interface ThemeComponents extends ButtonTheme {}
}

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
