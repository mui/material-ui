import AutoPrefix from './auto-prefix';
import * as Colors from './colors';
import Spacing from './spacing';
import ThemeManager from './theme-manager';
import Transitions from './transitions';
import Typography from './typography';
import lightBaseTheme from './baseThemes/lightBaseTheme';
import darkBaseTheme from './baseThemes/darkBaseTheme';
import ThemeDecorator from './theme-decorator';
import getMuiTheme from './getMuiTheme';
import ZIndex from './zIndex';

const LightRawTheme = lightBaseTheme;
const DarkRawTheme = darkBaseTheme;

export {AutoPrefix};
export {Colors};
export {Spacing};
export {ThemeManager};
export {Transitions};
export {Typography};
export {lightBaseTheme};
export {LightRawTheme};
export {DarkRawTheme};
export {ThemeDecorator};
export {getMuiTheme};
export {ZIndex};

export default {
  AutoPrefix,
  Colors,
  Spacing,
  ThemeManager,
  Transitions,
  Typography,
  lightBaseTheme,
  LightRawTheme,
  darkBaseTheme,
  DarkRawTheme,
  ThemeDecorator,
  getMuiTheme,
  ZIndex,
};
