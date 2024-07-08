import responsivePropType from '../responsivePropType';
import { handleBreakpoints } from '../breakpoints';
import { getPath } from '../style';
import merge from '../merge';
import memoize from '../memoize';

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

const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize((prop) => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});

export const marginKeys = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
];

export const paddingKeys = [
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
];

const spacingKeys = [...marginKeys, ...paddingKeys];

export function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;

  if (typeof themeSpacing === 'number' || typeof themeSpacing === 'string') {
    return (val) => {
      if (typeof val === 'string') {
        return val;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof val !== 'number') {
          console.error(
            `MUI: Expected ${propName} argument to be a number or a string, got ${val}.`,
          );
        }
      }

      if (typeof themeSpacing === 'string') {
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return (val) => {
      if (typeof val === 'string') {
        return val;
      }
      const abs = Math.abs(val);

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error(
            [
              `MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` +
                `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`,
            ].join('\n'),
          );
        } else if (abs > themeSpacing.length - 1) {
          console.error(
            [
              `MUI: The value provided (${abs}) overflows.`,
              `The supported values are: ${JSON.stringify(themeSpacing)}.`,
              `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`,
            ].join('\n'),
          );
        }
      }

      const transformed = themeSpacing[abs];

      if (val >= 0) {
        return transformed;
      }

      if (typeof transformed === 'number') {
        return -transformed;
      }

      return `-${transformed}`;
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        `MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`,
        'It should be a number, an array or a function.',
      ].join('\n'),
    );
  }

  return () => undefined;
}

export function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}

export function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  return transformer(propValue);
}

export function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) =>
    cssProperties.reduce((acc, cssProperty) => {
      acc[cssProperty] = getValue(transformer, propValue);
      return acc;
    }, {});
}

function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (!keys.includes(prop)) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);

  return Object.keys(props)
    .map((prop) => resolveCssProperty(props, keys, prop, transformer))
    .reduce(merge, {});
}

export function margin(props) {
  return style(props, marginKeys);
}

margin.propTypes =
  process.env.NODE_ENV !== 'production'
    ? marginKeys.reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

margin.filterProps = marginKeys;

export function padding(props) {
  return style(props, paddingKeys);
}

padding.propTypes =
  process.env.NODE_ENV !== 'production'
    ? paddingKeys.reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

padding.filterProps = paddingKeys;

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes =
  process.env.NODE_ENV !== 'production'
    ? spacingKeys.reduce((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};

spacing.filterProps = spacingKeys;

export default spacing;
