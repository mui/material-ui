import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { compose, spacing, palette, css } from '@material-ui/system';

const Box = styled.div`
  ${css(
    compose(
      spacing,
      palette,
    ),
  )}
`;

const theme = createMuiTheme();

function CssProp() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box color="white" css={{ bgcolor: 'palevioletred', p: 1, textTransform: 'uppercase' }}>
          CssProp
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
}

export default CssProp;
