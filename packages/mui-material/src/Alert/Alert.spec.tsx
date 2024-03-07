import * as React from 'react';
import { createTheme, SvgIcon } from '@mui/material';

function MyIcon() {
  return <SvgIcon />;
}

createTheme({
  components: {
    MuiAlert: {
      defaultProps: {
        slots: {
          closeIcon: MyIcon,
        },
      },
    },
  },
});
