import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

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
const primaryDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  800: '#001E3C',
  900: '#0A1929',
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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ThemeSlider() {
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
        shape: { borderRadius: 10 },
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(
            ',',
          ),
        },
        components: {
          MuiSlider: {
            styleOverrides: {
              root: {
                color: primary[500],
              },
              rail: {
                opacity: 1,
                backgroundColor: mode === 'dark' ? primaryDark[900] : grey[200],
              },
              track: {
                border: 'none',
              },
              thumb: {
                width: 8,
                height: 8,
                '&:before': {
                  boxShadow: 'none',
                },
              },
              vertical: {
                '& .MuiSlider-mark[data-index="0"]': {
                  bottom: '2px !important',
                },
                '& .MuiSlider-mark[data-index="4"]': {
                  bottom: 'unset !important',
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: 'transparent',
                  color: mode === 'dark' ? grey[50] : grey[500],
                  fontWeight: 700,
                  padding: 0,
                  left: '1rem',
                  '&.MuiSlider-valueLabelOpen': {
                    transform: 'none',
                    top: 'initial',
                  },
                },
              },
              mark: {
                color: grey[500],
              },
            },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: mode === 'dark' ? primaryDark[800] : '#fff',
          border: '1px solid',
          borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
          borderRadius: 1,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            height: 180,
            padding: '0.75rem 0',
            borderRadius: 4,
            bgcolor: mode === 'dark' ? primaryDark[700] : '#fff',
          }}
        >
          <Slider
            getAriaLabel={() => 'Temperature'}
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={[25, 50]}
            marks={[
              { value: 0 },
              { value: 25 },
              { value: 50 },
              { value: 75 },
              { value: 100 },
            ]}
            valueLabelFormat={valuetext}
            valueLabelDisplay="on"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
