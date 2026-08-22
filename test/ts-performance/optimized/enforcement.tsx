import { createTheme } from '@mui/material/styles';

// `MuiButton` type safety is selectively re-enabled in mui-type-features.d.ts,
// so the bad value below must be rejected. If the selective augmentation
// silently stops working, the unused directive fails the build.
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
