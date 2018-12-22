import warning from 'warning';
import resonsivePropType from './resonsivePropType';
import { handleBreakpoints } from './breakpoints';
import merge from './merge';
import memoize from './memoize';

const properties = {
  m: 'margin',
  p: 'padding',
};

const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 3) {
    return [prop];
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});

const spacingKeys = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'margin',
  'marginLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
];

function getTransformer(theme) {
  const themeTransformer =
    theme.spacing && theme.spacing.unit != null ? theme.spacing.unit : theme.spacing || 8;

  if (typeof themeTransformer === 'number') {
    return abs => themeTransformer * abs;
  }

  if (Array.isArray(themeTransformer)) {
    return abs => {
      warning(
        abs <= themeTransformer.length - 1,
        [
          `@material-ui/system: the value provided (${abs}) overflows.`,
          `The supported values are: ${JSON.stringify(themeTransformer)}.`,
          `${abs} > ${themeTransformer.length - 1}, you need to add the missing values.`,
        ].join('\n'),
      );

      return themeTransformer[abs];
    };
  }

  if (typeof themeTransformer === 'function') {
    return themeTransformer;
  }

  warning(
    false,
    [
      `@material-ui/system: the \`theme.spacing\` value (${themeTransformer}) is invalid.`,
      'It should be a number, an array or a function.',
    ].join('\n'),
  );

  return () => undefined;
}

function getValue(transformer, propValue) {
  if (typeof propValue === 'string') {
    return propValue;
  }

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

function getStyleFromPropValue(cssProperties, transformer) {
  return propValue =>
    cssProperties.reduce((acc, cssProperty) => {
      acc[cssProperty] = getValue(transformer, propValue);
      return acc;
    }, {});
}

function spacing(props) {
  const theme = props.theme;
  const transformer = getTransformer(theme);

  return Object.keys(props)
    .map(prop => {
      // Using a hash computation over an array iteration could be faster, but with only 14 items,
      // it's doesn't worth the bundle size.
      if (spacingKeys.indexOf(prop) === -1) {
        return null;
      }

      const cssProperties = getCssProperties(prop);
      const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

      const propValue = props[prop];
      return handleBreakpoints(props, propValue, styleFromPropValue);
    })
    .reduce(merge, {});
}

spacing.propTypes =
  process.env.NODE_ENV !== 'production'
    ? spacingKeys.reduce((obj, key) => {
        obj[key] = resonsivePropType;
        return obj;
      }, {})
    : {};

spacing.filterProps = spacingKeys;

export default spacing;
