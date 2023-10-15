import { unstable_capitalize as capitalize } from '@mui/utils';
import responsivePropType from './responsivePropType';
import { handleBreakpoints } from './breakpoints';

export function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  // Check if CSS variables are used
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`
      .split('.')
      .reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
    if (val != null) {
      return val;
    }
  }
  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}

export function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (value && typeof value === 'object' && isColor(Object.values(value)[0])) {
      console.warn(
        `MUI: The value found in theme for prop: "${propValueFinal}" is an [Object] instead of string or number. Check if you forgot to add the correct dotted notation, e.g., "background.paper" instead of "background".`,
      );
    }
  }

  if (transform) {
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

function style(options) {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(
          themeMapping,
          transform,
          `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
          propValueFinal,
        );
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          [prop]: responsivePropType,
        }
      : {};

  fn.filterProps = [prop];

  return fn;
}

function isColor(str) {
  // Regular expressions to match different color patterns
  const colorPatterns = [
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Hex color
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // RGB color
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0?(\.\d+)?\s*\)$/, // RGBA color
    /^(red|green|blue|yellow|orange|purple|pink|white|black|gray|grey|transparent)$/, // CSS color keyword
    /^\$[a-zA-Z_][a-zA-Z0-9_]*$/, // SCSS variable reference
    /^var\(--[^)]+\)$/, // CSS variable reference (e.g., var(--main-color))
  ];

  return colorPatterns.some((pattern) => pattern.test(str));
}

export default style;
