import { createTheme, type Components, type Theme } from '@mui/material/styles';

// `MuiButton` type safety is selectively re-enabled at the callsite, so the
// bad value below must be rejected. If the satisfies check silently stops
// working, the unused directive fails the build.
export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        // @ts-expect-error -- 'nope' is not a Button variant
        variant: 'nope',
      },
    },
  } satisfies Components<Theme>,
});
