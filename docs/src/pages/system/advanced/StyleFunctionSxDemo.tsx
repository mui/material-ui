import * as React from 'react';
import styled, { InterpolationFunction, ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';
import { SxProps } from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';

interface DivProps extends React.HTMLAttributes<'div'> {
  sx?: SxProps;
}

const theme = createMuiTheme();

const Div = styled('div')<DivProps>(
  unstable_styleFunctionSx as InterpolationFunction<DivProps>,
);

export default function Demo() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>
      </ThemeProvider>
    </NoSsr>
  );
}
