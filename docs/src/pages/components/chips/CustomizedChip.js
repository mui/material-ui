import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const primary = {
  100: '#C2E0FF',
  200: '#80BFFF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};
const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

export default function ThemeChip() {
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode work in MUI's documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more details about toggling modes, go to: https://mui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: primary[500],
          },
        },
        typography: {
          fontFamily: [
            'IBM Plex Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
          fontWeightRegular: 500,
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiChip: {
            styleOverrides: {
              label: {
                marginBottom: '1px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                fontWeight: 500,
              },
              filled: {
                color: mode === 'dark' ? '#fff' : grey[800],
                backgroundColor: mode === 'dark' ? grey[800] : grey[300],
                '&.MuiChip-colorPrimary': {
                  backgroundColor: mode === 'dark' ? primary[900] : primary[100],
                  color: mode === 'dark' ? primary[100] : primary[600],
                },
              },
              deleteIcon: {
                color: mode === 'dark' ? grey[500] : grey[800],
                '&:hover': {
                  color: mode === 'dark' ? grey[600] : grey[900],
                },
              },
              deleteIconColorPrimary: {
                color: mode === 'dark' ? primary[100] : primary[600],
                '&:hover': {
                  color: mode === 'dark' ? primary[200] : primary[700],
                },
              },
            },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Chip label="React" color="primary" onDelete={() => {}} />
        <Chip label="Javascript" onDelete={() => {}} />
      </Stack>
    </ThemeProvider>
  );
}
