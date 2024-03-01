import { createTheme } from '@mui/material/styles';
import * as React from 'react';

const CloseIcon = () => <div />;

const theme = createTheme({
  components: {
    MuiAlert: {
      defaultProps: {
        slots: {
          closeIcon: CloseIcon,
        },
      },
    },
  },
});
