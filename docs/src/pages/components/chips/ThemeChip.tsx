import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

const primary = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5',
  800: '#5A6978',
  900: '#3D4752',
};

export default function ThemeChip() {
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
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
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
          fontWeightRegular: 500,
        },
        components: {
          MuiChip: {
            styleOverrides: {
              label: {
                marginBottom: '1px',
                fontSize: 14,
                lineHeight: 1.5,
                fontWeight: 600,
              },
              filled: {
                color: mode === 'dark' ? '#fff' : grey[800],
                backgroundColor: mode === 'dark' ? grey[900] : grey[200],
                '&.MuiChip-colorPrimary': {
                  backgroundColor: primary[100],
                  color: primary[500],
                },
              },
              deleteIcon: {
                color: grey[700],
                '&:hover': {
                  color: mode === 'dark' ? grey[500] : grey[800],
                },
              },
              deleteIconColorPrimary: {
                color: primary[500],
                '&:hover': {
                  color: primary[700],
                },
              },
            },
          },
        },
      }),
    [mode],
  );
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Chip label="React" color="primary" onDelete={handleDelete} />
        <Chip label="Javascript" onDelete={handleDelete} />
      </Stack>
    </ThemeProvider>
  );
}
