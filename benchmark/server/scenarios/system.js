/* eslint-disable no-console */
import Benchmark from 'benchmark';
import { unstable_styleFunctionSx as styleFunctionSx } from '@mui/system';
import styledSystemCss from '@styled-system/css';
import { createTheme } from '@mui/material/styles';
import { css as chakraCss } from '@chakra-ui/system';

const suite = new Benchmark.Suite('system', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const materialSystemTheme = createTheme();

const styledSystemTheme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    primary: materialSystemTheme.palette.primary,
    background: materialSystemTheme.palette.background,
  },
  fontSizes: materialSystemTheme.typography,
  fonts: materialSystemTheme.typography,
};

styledSystemTheme.breakpoints.base = styledSystemTheme.breakpoints[0];
styledSystemTheme.breakpoints.sm = styledSystemTheme.breakpoints[1];
styledSystemTheme.breakpoints.lg = styledSystemTheme.breakpoints[2];

suite
  // ---
  .add('@styled-system/css', () => {
    styledSystemCss({
      color: 'primary.main',
      bg: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    })({ theme: styledSystemTheme });
  })
  // ---
  .add('@chakra-ui/system/css', () => {
    chakraCss({
      color: 'primary.main',
      bg: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    })({ theme: styledSystemTheme });
  })
  // ---
  .add('@mui/system styleFunctionSx', () => {
    styleFunctionSx({
      theme: materialSystemTheme,
      sx: {
        color: 'primary.main',
        bgcolor: 'background.paper',
        fontFamily: 'h6.fontFamily',
        fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
        p: [2, 3, 4],
      },
    });
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
