import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

const stylesCreators = new Map();

function getStylesCreator(stylesOrCreator) {
  // Result is used as a key to the sheet registry, so equality per stylesOrCreator is of utmost
  // importance.  Returning a new object with create function for the same styles
  // causes unexpected sheet growth because while:
  //  - stylesOrCreator === nextStylesOrCreator
  //  - result !== nextResult.
  // Solve this here by only creating one for each unique stylesOrCreator
  let creator = stylesCreators.get(stylesOrCreator);
  if (creator) {
    return creator;
  }

  function create(theme, name) {
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
          `Fix the \`${key}\` key of \`theme.overrides.${name}\`.`,
        ].join('\n'),
      );
      stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key], overrides[key]);
    });

    return stylesWithOverrides;
  }

  creator = {
    create,
    options: {
      index: undefined,
    },
    themingEnabled: typeof stylesOrCreator === 'function',
  };

  stylesCreators.set(stylesOrCreator, creator);
  return creator;
}

export default getStylesCreator;
