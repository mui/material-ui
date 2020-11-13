import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  compose,
  spacing,
  palette,
  styleFunctionSx,
  SpacingProps,
  PaletteProps,
} from '@material-ui/system';
import { CSSProperties } from '@material-ui/styles';

const styleFunction = styleFunctionSx(compose(spacing, palette));

type StyleFunctionProps = SpacingProps & PaletteProps & CSSProperties;

type BoxProps = StyleFunctionProps & {
  sx?: StyleFunctionProps;
  // TODO: this should be removed once the css prop is dropped
  css?: StyleFunctionProps;
};

const Box = styled.div<BoxProps>(styleFunction);

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
