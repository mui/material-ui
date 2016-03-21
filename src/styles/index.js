import MuiThemeProvider from './MuiThemeProvider';
import * as colors from './colors';
import darkBaseTheme from './baseThemes/darkBaseTheme';
import getMuiTheme from './getMuiTheme';
import lightBaseTheme from './baseThemes/lightBaseTheme';
import muiThemeable from './muiThemeable';
import spacing from './spacing';
import themeManager from './themeManager';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

const DarkRawTheme = darkBaseTheme;
const LightRawTheme = lightBaseTheme;

export {DarkRawTheme};
export {LightRawTheme};
export {MuiThemeProvider};
export {colors};
export {darkBaseTheme};
export {getMuiTheme};
export {lightBaseTheme};
export {muiThemeable};
export {spacing};
export {themeManager};
export {transitions};
export {typography};
export {zIndex};

export default {
  DarkRawTheme,
  LightRawTheme,
  MuiThemeProvider,
  colors,
  darkBaseTheme,
  getMuiTheme,
  lightBaseTheme,
  muiThemeable,
  spacing,
  themeManager,
  transitions,
  typography,
  zIndex,
};
