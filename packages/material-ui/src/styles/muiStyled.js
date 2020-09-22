import styled from '@material-ui/styled-engine';
import { propsToClassKey } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

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
        if (styleProps[key] !== themeVariant.props[key]) {
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

const shouldForwardProp = (prop) => prop !== 'styleProps' && prop !== 'theme';

const muiStyled = (tag, options, muiOptions) => {
  const name = muiOptions.muiName;
  const defaultStyledResolver = styled(tag, { shouldForwardProp, label: name, ...options });
  const muiStyledResolver = (...styles) => {
    if (muiOptions.overridesResolver) {
      styles.push((props) => {
        const theme = props.theme || defaultTheme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    styles.push((props) => {
      const theme = props.theme || defaultTheme;
      return variantsResolver(props, getVariantStyles(name, theme), theme, name);
    });

    return defaultStyledResolver(...styles);
  };
  return muiStyledResolver;
};

export default muiStyled;
