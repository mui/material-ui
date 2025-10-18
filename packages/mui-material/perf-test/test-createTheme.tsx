import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/stylesOptimized';

<Button />;

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
