import { createTheme, type Components, type Theme } from '@mui/material/styles';

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
  } satisfies Components<Theme>,
});
