import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiCard: {
      defaultProps: {
        raised: true,
      },
    },
  },
});
