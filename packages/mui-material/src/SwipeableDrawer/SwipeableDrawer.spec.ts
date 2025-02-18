import { createTheme } from '@mui/material';

createTheme({
  components: {
    MuiSwipeableDrawer: {
      defaultProps: {
        disableSwipeToOpen: true,
      },
    },
  },
});
