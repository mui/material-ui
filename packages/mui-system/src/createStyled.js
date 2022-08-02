/* eslint-disable no-underscore-dangle */
import styledEngineStyled from '@mui/styled-engine';
import { getDisplayName } from '@mui/utils';
import createTheme from './createTheme';
import propsToClassKey from './propsToClassKey';
import defaultStyleFunctionSx from './styleFunctionSx';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
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

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
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
    styleFunctionSx = defaultStyleFunctionSx,
  } = input;
  return (tag, inputOptions = {}) => {
    if (tag.__mui_real === tag && tag.__skipSx) {
      tag.__skipSx();
    }
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver,
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : (componentSlot && componentSlot !== 'Root') || false;

    let skipSx = inputSkipSx || false;

    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    if (componentSlot === 'Root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options,
    });
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions
        ? expressions.map((stylesArg) => {
            // On the server Emotion doesn't use React.forwardRef for creating components, so the created
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
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] =
                typeof slotStyle === 'function' ? slotStyle({ ...props, theme }) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
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
          if (skipSx) {
            return null;
          }
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
      } else if (
        typeof styleArg === 'function' &&
        // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        // eslint-disable-next-line no-underscore-dangle
        styleArg.__emotion_real !== styleArg
      ) {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = ({ theme: themeInput, ...other }) =>
          styleArg({ theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...other });
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      Component.__mui_real = Component;
      Component.__skipSx = () => {
        skipSx = true;
      };

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

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}
