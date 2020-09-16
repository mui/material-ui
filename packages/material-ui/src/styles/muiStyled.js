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

const muiStyled = (el, styledParams, muiConfig) => {
  const result = styled(el, { shouldForwardProp, ...styledParams });
  const muiFunc = (...params) => {
    const name = muiConfig.muiName;

    if (muiConfig.overridesResolver) {
      params.push((props) => {
        const theme = props.theme || defaultTheme;
        return muiConfig.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    if (muiConfig.variantsResolver) {
      params.push((props) => {
        const theme = props.theme || defaultTheme;
        return muiConfig.variantsResolver(props, getVariantStyles(name, theme), theme, name);
      });
    }

    return result(...params);
  };
  return muiFunc;
};

export default muiStyled;
