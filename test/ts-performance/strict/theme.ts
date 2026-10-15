import { createTheme } from '@mui/material/styles';

// This project does not enable the `optimizedTheme` type feature:
// `theme.components` must keep the strict types by default.
export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        // @ts-expect-error -- 'nope' is not a Button variant
        variant: 'nope',
      },
    },
  },
});
