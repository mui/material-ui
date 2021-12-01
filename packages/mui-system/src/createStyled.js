// Both emotion & styled-components is using `@emotion/is-prop-valid`
// emotion: https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L7
// styled-components: https://github.com/styled-components/styled-components/blob/38256f562b244877e146ce5a2fc77a5f54b133d7/packages/styled-components/src/models/StyledComponent.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L1
import isPropValid from '@emotion/is-prop-valid';
import styledEngineStyled from '@mui/styled-engine';
import { getDisplayName } from '@mui/utils';
import createTheme from './createTheme';
import styleFunctionSx from './styleFunctionSx';
import propsToClassKey from './propsToClassKey';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function isStringTag(tag) {
  // https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};

  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });

  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  const { ownerState = {} } = props;
  const variantsStyles = [];
  const themeVariants = theme?.components?.[name]?.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

export function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

export function getShouldForwardProp(input = {}) {
  const {
    tag,
    slot,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    shouldForwardProp: shouldForwardPropOption,
  } = input;
  if (!shouldForwardPropOption) {
    if (slot === 'Root') {
      return isStringTag(tag)
        ? (prop) => isPropValid(prop) && rootShouldForwardProp(prop)
        : rootShouldForwardProp;
    }
    if (slot) {
      return isStringTag(tag)
        ? (prop) => isPropValid(prop) && slotShouldForwardProp(prop)
        : slotShouldForwardProp;
    }
    return isStringTag(tag)
      ? (prop) => isPropValid(prop) && shouldForwardProp(prop)
      : shouldForwardProp;
  }
  return shouldForwardPropOption;
}

export const systemDefaultTheme = createTheme();

const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export default function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver,
      shouldForwardProp: shouldForwardPropOption,
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : (componentSlot && componentSlot !== 'Root') || false;

    const skipSx = inputSkipSx || false;

    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    const finalShouldForwardProp = getShouldForwardProp({
      tag,
      slot: componentSlot,
      rootShouldForwardProp,
      slotShouldForwardProp,
      shouldForwardProp: shouldForwardPropOption,
    });

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: finalShouldForwardProp,
      label,
      ...options,
    });
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions
        ? expressions.map((stylesArg) => {
            // On the server emotion doesn't use React.forwardRef for creating components, so the created
            // component stays as a function. This condition makes sure that we do not interpolate functions
            // which are basically components used as a selectors.
            // eslint-disable-next-line no-underscore-dangle
            return typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg
              ? ({ theme: themeInput, ...other }) => {
                  return stylesArg({
                    theme: isEmpty(themeInput) ? defaultTheme : themeInput,
                    ...other,
                  });
                }
              : stylesArg;
          })
        : [];

      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            return overridesResolver(props, styleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(
            props,
            getVariantStyles(componentName, theme),
            theme,
            componentName,
          );
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return styleFunctionSx({ ...props, theme });
        });
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function') {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = ({ theme: themeInput, ...other }) =>
          styleArg({ theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...other });
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${componentSlot || ''}`;
        }
        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }

      return Component;
    };
    return muiStyledResolver;
  };
}
