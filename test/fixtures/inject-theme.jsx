// import stubContext from 'react-stub-context';
import stubContext from '../react-stub-context';
import ThemeManager from 'styles/theme-manager';
import DefaultRawTheme from 'styles/raw-themes/light-raw-theme';

function injectTheme(Component, theme) {
  let injectedTheme = theme || ThemeManager.getMuiTheme(DefaultRawTheme);
  return stubContext(Component, {muiTheme: injectedTheme});
}

module.exports = injectTheme;
