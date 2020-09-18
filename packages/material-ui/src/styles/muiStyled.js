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

const shouldForwardProp = (prop) => prop !== 'state' && prop !== 'theme';

const muiStyled = (tag, options, muiOptions) => {
  const defaultStyledResolver = styled(tag, { shouldForwardProp, ...options });
  const muiStyledResolver = (...styles) => {
    const name = muiOptions.muiName;

    if (muiOptions.overridesResolver) {
      styles.push((props) => {
        const theme = props.theme || defaultTheme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    if (muiOptions.variantsResolver) {
      styles.push((props) => {
        const theme = props.theme || defaultTheme;
        return muiOptions.variantsResolver(props, getVariantStyles(name, theme), theme, name);
      });
    }

    return defaultStyledResolver(...styles);
  };
  return muiStyledResolver;
};

export default muiStyled;
