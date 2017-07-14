/* eslint-disable flowtype/require-valid-file-annotation */

import warning from 'warning';
import merge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

type GetStyles = Object | ((theme: Object) => Object);

function createStyleSheet(name: string | GetStyles, callback?: GetStyles, options: Object = {}) {
  const getStyles = typeof name === 'string' ? callback : name;

  function createStyles(theme: Object = {}): Object {
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
    name: typeof name === 'string' ? name : false,
    createStyles,
    options,
    themingEnabled: typeof getStyles === 'function',
  };
}

export default createStyleSheet;
