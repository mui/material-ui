import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { compose, spacing, palette, styleFunctionSx } from '@material-ui/system';

const styleFunction = styleFunctionSx(compose(spacing, palette));

const Box = styled.div(styleFunction);

const theme = createMuiTheme();

export default function CssProp() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box color="white" sx={{ bgcolor: 'palevioletred', p: 1, textTransform: 'uppercase' }}>
          CssProp
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
}
