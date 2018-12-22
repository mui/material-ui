import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { style } from '@material-ui/system';

const typography = style({
  prop: 'variant',
  cssProperty: false,
  themeKey: 'typography',
});

// ⚠ Text is already defined in the global context:
// https://developer.mozilla.org/en-US/docs/Web/API/Text/Text.
const Text = styled.div`
  ${typography}
`;

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const theme = {
  typography: {
    h5: muiTheme.typography.h5,
  },
};

function Variant() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Text variant="h5">variant=h5</Text>
      </ThemeProvider>
    </NoSsr>
  );
}

export default Variant;
