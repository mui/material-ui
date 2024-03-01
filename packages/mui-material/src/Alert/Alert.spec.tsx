import { CloseRounded } from '@mui/icons-material';
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
