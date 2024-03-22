// theme for MUI System (emotion)
'use client';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
