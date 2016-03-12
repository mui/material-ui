import update from 'react-addons-update';
import merge from 'lodash.merge';
import getMuiTheme from './getMuiTheme';
import warning from 'warning';

export default
  {
    getMuiTheme(baseTheme, muiTheme) {
      warning(false, 'ThemeManager is deprecated. please import getMuiTheme' +
        ' directly from "material-ui/lib/styles/getMuiTheme"');
      return getMuiTheme(baseTheme, muiTheme);
    },
    modifyRawThemeSpacing(muiTheme, spacing) {
      warning(false, 'modifyRawThemeSpacing is deprecated. please use getMuiTheme ' +
        ' to modify your theme directly. http://www.material-ui.com/#/customization/themes');
      return getMuiTheme(update(muiTheme.baseTheme, {spacing: {$set: spacing}}));
    },
    modifyRawThemePalette(muiTheme, palette) {
      warning(false, 'modifyRawThemePalette is deprecated. please use getMuiTheme ' +
        ' to modify your theme directly. http://www.material-ui.com/#/customization/themes');
      const newPalette = merge(muiTheme.baseTheme.palette, palette);
      return getMuiTheme(update(muiTheme.baseTheme, {palette: {$set: newPalette}}));
    },
    modifyRawThemeFontFamily(muiTheme, fontFamily) {
      warning(false, 'modifyRawThemeFontFamily is deprecated. please use getMuiTheme ' +
        ' to modify your theme directly. http://www.material-ui.com/#/customization/themes');
      return getMuiTheme(update(muiTheme.baseTheme, {fontFamily: {$set: fontFamily}}));
    },
  };
