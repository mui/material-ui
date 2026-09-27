'use client';
import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function Probe() {
  const matches = useMediaQuery((muiTheme) => muiTheme.breakpoints.up('sm'), {
    ssrMatchMedia: (query) => ({
      matches: query.replace(/\s/g, '').includes('min-width:600px'),
    }),
  });

  return <p id="mq">{String(matches)}</p>;
}

export function QueryProbe() {
  return (
    <ThemeProvider theme={theme}>
      <Probe />
    </ThemeProvider>
  );
}
