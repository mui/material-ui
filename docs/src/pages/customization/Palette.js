// @flow weak

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { purple, green, red } from 'material-ui/styles/colors';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
  palette: createPalette({
    primary: purple, // Purple and green play nicely together.
    accent: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  }),
});

function Palette() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Button primary>
          {'Primary'}
        </Button>
        <Button accent>
          {'Accent'}
        </Button>
      </div>
    </MuiThemeProvider>
  );
}

export default Palette;
