import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider, { sliderClasses } from '@mui/material/Slider';

const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
            fontWeight: 700,
            padding: 0,
            left: '3rem',
          }),
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'none',
            top: 'initial',
          },
        }),
      },
    },
  },
});

function valuetext(value: number) {
  return `${value}°C`;
}

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={finalTheme}>
      <Box sx={{ height: 180, display: 'inline-block' }}>
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
    </ThemeProvider>
  );
}
