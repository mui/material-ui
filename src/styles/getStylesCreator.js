// @flow

import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

function getStylesCreator(stylesOrCreator: Object | (Object => Object)) {
  function create(theme: Object, name?: string): Object {
    const styles = typeof stylesOrCreator === 'function' ? stylesOrCreator(theme) : stylesOrCreator;

    if (!theme.overrides || !theme.overrides[name]) {
      return styles;
    }

    const overrides = theme.overrides[name];
    const stylesWithOverrides = { ...styles };

    Object.keys(overrides).forEach(key => {
      warning(stylesWithOverrides[key], 'You are trying to overrides a style that do not exist.');
      stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key], overrides[key]);
    });

    return stylesWithOverrides;
  }

  return {
    create,
    options: {
      index: undefined,
    },
    themingEnabled: typeof stylesOrCreator === 'function',
  };
}

export default getStylesCreator;
