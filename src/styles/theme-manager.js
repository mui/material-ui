import update from 'react-addons-update';
import merge from 'lodash.merge';
import getMuiTheme from './getMuiTheme';
// import deprecatedExport from '../utils/deprecatedExport';

export default// deprecatedExport(
  {
    getMuiTheme,
    modifyRawThemeSpacing(muiTheme, spacing) {
      return getMuiTheme(update(muiTheme.baseTheme, {spacing: {$set: spacing}}));
    },
    modifyRawThemePalette(muiTheme, palette) {
      const newPalette = merge(muiTheme.baseTheme.palette, palette);
      return getMuiTheme(update(muiTheme.baseTheme, {palette: {$set: newPalette}}));
    },
    modifyRawThemeFontFamily(muiTheme, fontFamily) {
      return getMuiTheme(update(muiTheme.baseTheme, {fontFamily: {$set: fontFamily}}));
    },
  };// ,
//  'material-ui/lib/styles/theme-manager',
//  'material-ui/lib/styles/themeManager'
//);
