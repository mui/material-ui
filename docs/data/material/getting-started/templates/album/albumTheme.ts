// albumTheme.ts
import { createTheme } from '@mui/material/styles';

const albumTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#00FF6F',
    },
    background: {
      default: '#F7F8FA',
    },
    text: {
      primary: '#000000',
      secondary: '#72767D',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: "#333333",
              color: '#FFFFFF',
              borderRadius: 8,
              boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.2), inset 0px -2px 1px rgba(0, 0, 0, 0.4), 0px 0px 0px 2px rgba(38, 38, 38, 1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#1A1A1A',
                boxShadow: '0px 0px 0px 2px rgba(38, 38, 38, 1)',
              },
            }),
        }),
      },
    },
  },
});

export default albumTheme;
