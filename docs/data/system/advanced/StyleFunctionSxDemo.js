import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx } from '@mui/system';
import NoSsr from '@mui/base/NoSsr';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const Div = styled('div')(unstable_styleFunctionSx);

export default function StyleFunctionSxDemo() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>
      </ThemeProvider>
    </NoSsr>
  );
}
