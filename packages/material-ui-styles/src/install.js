/* eslint-disable no-underscore-dangle */

import { ponyfillGlobal } from '@material-ui/utils';
import ThemeProvider from './ThemeProvider';
import withTheme from './withTheme';
import withStyles from './withStyles';

export default function install() {
  if (!ponyfillGlobal.__MUI_STYLES__) {
    ponyfillGlobal.__MUI_STYLES__ = {};
  }

  ponyfillGlobal.__MUI_STYLES__.MuiThemeProvider = ThemeProvider;
  ponyfillGlobal.__MUI_STYLES__.withTheme = withTheme;
  ponyfillGlobal.__MUI_STYLES__.withStyles = withStyles;
}
