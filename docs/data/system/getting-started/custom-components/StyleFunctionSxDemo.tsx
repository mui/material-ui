import * as React from 'react';
import styled, { ThemeProvider, StyleFunction } from 'styled-components';
import { unstable_styleFunctionSx, SxProps } from '@mui/system';
import { createTheme } from '@mui/material/styles';

interface DivProps {
  sx?: SxProps;
}

const theme = createTheme();

const Div = styled('div')<DivProps>(
  unstable_styleFunctionSx as StyleFunction<DivProps>,
);

export default function StyleFunctionSxDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component with the sx prop</Div>
    </ThemeProvider>
  );
}
