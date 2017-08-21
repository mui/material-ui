// @flow weak

import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
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
        <Button color="primary">
          {'Primary'}
        </Button>
        <Button color="accent">
          {'Accent'}
        </Button>
      </div>
    </MuiThemeProvider>
  );
}

export default Palette;
