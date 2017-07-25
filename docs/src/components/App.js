// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/utils/prism';
import AppRouter from 'docs/src/components/AppRouter';

function App(props) {
  const { dark } = props;

  const theme = createMuiTheme({
    palette: createPalette({
      primary: blue,
      accent: pink,
      type: dark ? 'dark' : 'light',
    }),
  });

  if (dark) {
    setPrismTheme(darkTheme);
  } else {
    setPrismTheme(lightTheme);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default connect(state => ({ dark: state.dark }))(App);
