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

const Text = styled.div`
  ${typography}
`;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

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
