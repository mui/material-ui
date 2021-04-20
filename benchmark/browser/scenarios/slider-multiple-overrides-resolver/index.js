import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SliderOption1 as Slider } from '@material-ui/core/Slider';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const theme = createMuiTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#3880ff',
          height: 2,
          padding: '15px 0',
        },
        thumb: {
          height: 28,
          width: 28,
          backgroundColor: '#fff',
          boxShadow: iOSBoxShadow,
          marginTop: -14,
          marginLeft: -14,
          '&:focus, &:hover, &.Mui-active': {
            boxShadow:
              '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              boxShadow: iOSBoxShadow,
            },
          },
        },
        valueLabel: {
          left: 'calc(-50% + 12px)',
          top: -22,
          '& *': {
            background: 'transparent',
            color: '#000',
          },
        },
        track: {
          height: 2,
        },
        rail: {
          height: 2,
          opacity: 0.5,
          backgroundColor: '#bfbfbf',
        },
        mark: {
          backgroundColor: '#bfbfbf',
          height: 8,
          width: 1,
          marginTop: -3,
          '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
          },
        },
      },
    },
  },
});

export default function StyledSC() {
  return (
    <ThemeProvider theme={theme}>
      {new Array(1000).fill().map(() => (
        <Slider defaultValue={30} />
      ))}
    </ThemeProvider>
  );
}
