import merge from 'lodash/merge';
import getMuiTheme from '../styles/getMuiTheme';
import warning from 'warning';

export default
  {
    getMuiTheme(baseTheme, muiTheme) {
      warning(false, `ThemeManager is deprecated. please import getMuiTheme
        directly from "material-ui/styles/getMuiTheme".
        It will be removed with v0.16.0.`);
      return getMuiTheme(baseTheme, muiTheme);
    },
    modifyRawThemeSpacing(muiTheme, spacing) {
      warning(false, `modifyRawThemeSpacing is deprecated. please use getMuiTheme
        to modify your theme directly. http://www.material-ui.com/#/customization/themes.
        It will be removed with v0.16.0.`);
      return getMuiTheme(merge({}, muiTheme.baseTheme, {spacing}));
    },
    modifyRawThemePalette(muiTheme, palette) {
      warning(false, `modifyRawThemePalette is deprecated. please use getMuiTheme
        to modify your theme directly. http://www.material-ui.com/#/customization/themes.
        It will be removed with v0.16.0.`);
      return getMuiTheme(merge({}, muiTheme.baseTheme, {baseTheme: {palette}}));
    },
    modifyRawThemeFontFamily(muiTheme, fontFamily) {
      warning(false, `modifyRawThemeFontFamily is deprecated. please use getMuiTheme
        to modify your theme directly. http://www.material-ui.com/#/customization/themes.
        It will be removed with v0.16.0.`);
      return getMuiTheme(merge({}, muiTheme.baseTheme, {fontFamily}));
    },
  };
