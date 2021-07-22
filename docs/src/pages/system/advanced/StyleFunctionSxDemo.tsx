import * as React from 'react';
import styled, { InterpolationFunction, ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx, SxProps } from '@material-ui/system';
import NoSsr from '@material-ui/unstyled/NoSsr';
import { createTheme } from '@material-ui/core/styles';

interface DivProps {
  sx?: SxProps;
}

const theme = createTheme();

const Div = styled('div')<DivProps>(
  unstable_styleFunctionSx as InterpolationFunction<DivProps>,
);

export default function StyleFunctionSxDemo() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>
      </ThemeProvider>
    </NoSsr>
  );
}
