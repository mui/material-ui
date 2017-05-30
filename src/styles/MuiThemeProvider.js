// @flow weak
import createMuiTheme from './theme';
import muiThemeProviderFactory, {
  MUI_SHEET_ORDER as muiSheetOrder,
} from './muiThemeProviderFactory';

export const MUI_SHEET_ORDER = muiSheetOrder;

export default muiThemeProviderFactory(createMuiTheme());
