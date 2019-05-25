import warning from 'warning';
import responsivePropType from './responsivePropType';
import { handleBreakpoints } from './breakpoints';

const spacingKeys = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: ['paddingLeft', 'paddingRight'],
  py: ['marginTop', 'marginBottom'],
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
};

function getTransformer(theme) {
  const themeSpacing = theme.spacing || 8;

  if (typeof themeSpacing === 'number') {
    return abs => themeSpacing * abs;
  }

  if (Array.isArray(themeSpacing)) {
    return abs => {
      warning(
        abs <= themeSpacing.length - 1,
        [
          `@material-ui/system: the value provided (${abs}) overflows.`,
          `The supported values are: ${JSON.stringify(themeSpacing)}.`,
          `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`,
        ].join('\n'),
      );

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  warning(
    false,
    [
      `@material-ui/system: the \`theme.spacing\` value (${themeSpacing}) is invalid.`,
      'It should be a number, an array or a function.',
    ].join('\n'),
  );

  return () => undefined;
}

function getValue(propValue, theme) {
  if (typeof propValue === 'string') {
    return propValue;
  }

  const transformer = getTransformer(theme)
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}

const getCssPropertyHandler = (cssProperty) => {
  if (Array.isArray(cssProperty)) {
    return  (value) => {
      return {
        [cssProperty]: getValue(value, theme),
      };
    };
  }
  const [firstProperty, secondProperty] = cssProperty
  return (value) => {
    const finalValue = getValue(value, theme);
    return {
      [firstProperty]: finalValue,
      [secondProperty]: finalValue,
    };
  };
}

const spacing = Object.entries(spacingKeys).reduce((result, [prop, cssProperty]) => {
  const cssPropertyHandler = getCssPropertyHandler(cssProperty);

  const styleFunction = (propValue, theme) => {
    return handleBreakpoints(theme, propValue, cssPropertyHandler)
  }

  styleFunction.propTypes = process.env.NODE_ENV !== 'production' ? {
    [prop]: responsivePropType
  } : {};

  return styleFunction;
}, {});


export default spacing;
