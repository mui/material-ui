import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';
import { createTheme } from '@material-ui/core/styles';

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
