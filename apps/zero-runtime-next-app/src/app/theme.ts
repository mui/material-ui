'use client';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiBadge: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
});
