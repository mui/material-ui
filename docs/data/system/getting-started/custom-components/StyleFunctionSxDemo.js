import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const Div = styled('div')(unstable_styleFunctionSx);

export default function StyleFunctionSxDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component with the sx prop</Div>
    </ThemeProvider>
  );
}
