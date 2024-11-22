import { createTheme } from '@mui/material/styles';

// Test presence of keys in Grid2Classes in theme
createTheme({
  components: {
    MuiGrid2: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
        container: {
          backgroundColor: 'blue',
        },
      },
    },
  },
});
