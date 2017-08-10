/* eslint-disable flowtype/require-valid-file-annotation */

import warning from 'warning';
import merge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

type GetStyles = Object | ((theme: Object) => Object);

function createStyleSheet(getStyles?: GetStyles) {
  function createStyles(theme: Object = {}, name?: String): Object {
    const styles = typeof getStyles === 'function' ? getStyles(theme) : getStyles;

    if (!theme.overrides || !theme.overrides[name]) {
      return styles;
    }

    const overrides = theme.overrides[name];
    const stylesWithOverrides = { ...styles };

    Object.keys(overrides).forEach(key => {
      warning(stylesWithOverrides[key], 'You are trying to overrides a style that do not exist.');
      stylesWithOverrides[key] = merge(stylesWithOverrides[key], overrides[key], { clone: true });
    });

    return stylesWithOverrides;
  }

  return {
    createStyles,
    options: {},
    // Enable the theme if the getStyles is a function (as we provide the theme as first argument)
    // or if the sheets has a name (as we can use the overrides key of the theme).
    themingEnabled: typeof getStyles === 'function',
  };
}

export default createStyleSheet;
