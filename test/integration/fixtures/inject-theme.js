import stubContext from './react-stub-context';
import getMuiTheme from 'src/styles/getMuiTheme';

function injectTheme(Component, theme) {
  const injectedTheme = theme || getMuiTheme();
  return stubContext(Component, {muiTheme: injectedTheme});
}

module.exports = injectTheme;
