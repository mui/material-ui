// @flow

import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

function getStylesCreator(stylesOrCreator: Object | (Object => Object)) {
  function create(theme: Object, name?: string): Object {
    const styles = typeof stylesOrCreator === 'function' ? stylesOrCreator(theme) : stylesOrCreator;

    if (!theme.overrides || !name || !theme.overrides[name]) {
      return styles;
    }

    const overrides = theme.overrides[name];
    const stylesWithOverrides = { ...styles };

    Object.keys(overrides).forEach(key => {
      warning(
        stylesWithOverrides[key],
        [
          'Material-UI: you are trying to override a style that does not exist.',
          // $FlowFixMe - flow isn't smart enough
          `Fix the \`${key}\` key of \`theme.overrides.${name}\`.`,
        ].join('\n'),
      );
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
