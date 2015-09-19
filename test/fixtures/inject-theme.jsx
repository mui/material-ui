import stubContext from 'react-stub-context';
import ThemeManager from 'styles/theme-manager';

const Manager = new ThemeManager();


function injectTheme(Component, theme) {
  let injectedTheme = theme || Manager.getCurrentTheme();
  return stubContext(Component, {muiTheme: injectedTheme});
}

module.exports = injectTheme;
