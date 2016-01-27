// import stubContext from 'react-stub-context';
import stubContext from '../react-stub-context';
import getMuiTheme from 'styles/getMuiTheme';

function injectTheme(Component, theme) {
  let injectedTheme = theme || getMuiTheme();
  return stubContext(Component, {muiTheme: injectedTheme});
}

module.exports = injectTheme;
