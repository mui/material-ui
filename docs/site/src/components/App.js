import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme, createPalette} from 'material-ui/styles/theme';
import {blue, pink} from 'material-ui/styles/colors';
import AppRouter from './AppRouter';

function App(props) {
  const {dark, ...other} = props;

  const muiTheme = createMuiTheme(createPalette({
    primary: blue,
    accent: pink,
    dark: dark,
  }));

  // console.log(muiTheme);

  return (
    <MuiThemeProvider theme={muiTheme} {...other}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  dark: PropTypes.bool,
};

export default connect((state) => ({dark: state.dark}))(App);
