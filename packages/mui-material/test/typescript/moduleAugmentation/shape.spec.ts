import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Shape {
    borderRadius: number;
    borderRadiusSecondary: number; // custom prop
  }
}

createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadiusSecondary,
          '&:hover': {
            borderRadius: theme.vars.shape.borderRadiusSecondary,
          },
        }),
      },
    },
  },
});
