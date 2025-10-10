import Button from '@mui/material/Button';
import { createTheme, type Theme } from '../src/stylesOptimized';

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
