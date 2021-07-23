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

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

export default function ThemeSlider() {
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
            '"PlusJakartaSans"',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ].join(','),
        },
        components: {
          MuiSlider: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? primary[300] : primary[500],
              },
              rail: {
                backgroundColor: grey[200],
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
                  color: mode === 'dark' ? grey[50] : grey[800],
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
      <Box sx={{ height: 160 }}>
        <Slider
          getAriaLabel={() => 'Temperature'}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={[25, 50]}
          marks={marks}
          valueLabelFormat={valuetext}
          valueLabelDisplay="on"
        />
      </Box>
    </ThemeProvider>
  );
}
