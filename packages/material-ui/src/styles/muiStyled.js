import styled from '@material-ui/styled-engine';
import { propsToClassKey } from '@material-ui/styles';
import defaultTheme from './defaultTheme';
import {
  borders,
  compose,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  css,
} from '@material-ui/system';

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

const shouldForwardProp = (prop) => prop !== 'styleProps' && prop !== 'theme' && prop !== 'system';

export const systemStyleFunction = css(
  compose(
    borders,
    display,
    flexbox,
    grid,
    positions,
    palette,
    shadows,
    sizing,
    spacing,
    typography,
  ),
);

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

    if (muiOptions && muiOptions.useSystemProps) {
      styles.push(systemStyleFunction);
    }
    
    return defaultStyledResolver(...styles);
  };
  return muiStyledResolver;
};

export default muiStyled;
