import styled from '@material-ui/styled-engine';
import { propsToClassKey } from '@material-ui/styles';
import { unstable_styleFunctionSx as styleFunctionSx } from '@material-ui/system';
import defaultTheme from './defaultTheme';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  let styleOverrides = {};

  if (
    theme &&
    theme.components &&
    theme.components[name] &&
    theme.components[name].styleOverrides
  ) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  return styleOverrides;
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
  const { styleProps = {} } = props;
  let variantsStyles = {};
  const themeVariants = theme?.components?.[name]?.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles = { ...variantsStyles, ...styles[propsToClassKey(themeVariant.props)] };
      }
    });
  }

  return variantsStyles;
};

const shouldForwardProp = (prop) => prop !== 'styleProps' && prop !== 'theme' && prop !== 'sx';

const experimentalStyled = (tag, options, muiOptions = {}) => {
  const name = muiOptions.muiName;
  const skipSx = muiOptions.skipSx || false;
  const defaultStyledResolver = styled(tag, { shouldForwardProp, label: name, ...options });
  const muiStyledResolver = (styleArg, ...expressions) => {
    const expressionsWithDefaultTheme = expressions
      ? expressions.map((stylesArg) => {
          return typeof stylesArg === 'function'
            ? ({ theme: themeInput, ...rest }) => {
                return stylesArg({
                  theme: isEmpty(themeInput) ? defaultTheme : themeInput,
                  ...rest,
                });
              }
            : stylesArg;
        })
      : [];

    let transformedStyleArg = styleArg;

    if (name && muiOptions.overridesResolver) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    if (name) {
      expressionsWithDefaultTheme.push((props) => {
        const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        return variantsResolver(props, getVariantStyles(name, theme), theme, name);
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
      // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles
      transformedStyleArg = [...styleArg, ...placeholders];
      transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
    } else if (typeof styleArg === 'function') {
      // If the type is function, we need to define the default theme
      transformedStyleArg = ({ theme: themeInput, ...other }) =>
        styleArg({ theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...other });
    }

    return defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
  };
  return muiStyledResolver;
};

export default experimentalStyled;
