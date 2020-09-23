import { Theme } from './createMuiTheme';
import { DeprecatedThemeOptions } from './adaptV4Theme';

/**
 * Generate a theme base on the options received.
 * @deprecated Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready to use theme object.
 */
export default function createMuiV4Theme(
  options?: DeprecatedThemeOptions,
  ...args: object[]
): Theme;
