import styled from '@emotion/styled';
import { propsToClassKey } from '@material-ui/styles'

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

const muiStyled = (el, params, muiConfig) => {
  const result = styled(el, params);
  const muiFunc = (...params) => {
    const newParams = params;

    newParams.unshift(props => {
      const theme = props.theme || defaultTheme;
      const name = muiConfig.muiName;
      const variantsResolver = muiConfig.variantsResolver;
      const variantsStylesByKeys = getVariantStyles(name, theme);
      const result = variantsResolver(props, variantsStylesByKeys, theme, name);
      return result;
    });

    newParams.unshift(props => {
      const theme = props.theme || defaultTheme;
      const name = muiConfig.muiName;
      const overridesResolver = muiConfig.overridesResolver;
      const styleOverridesByKeys = getStyleOverrides(name, theme);
      return overridesResolver(props, styleOverridesByKeys, name);
    });

    return result(newParams);
  }
  return muiFunc;
}

export default muiStyled;