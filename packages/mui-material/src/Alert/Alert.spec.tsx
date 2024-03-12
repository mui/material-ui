import CloseRounded from '@mui/icons-material/CloseRounded';
import { createTheme } from '@mui/material';

createTheme({
  components: {
    MuiAlert: {
      defaultProps: {
        slots: {
          closeIcon: CloseRounded,
        },
      },
    },
  },
});
