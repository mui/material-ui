import { unstable_capitalize as capitalize } from '@material-ui/utils';
import responsivePropType from './responsivePropType';
import { handleBreakpoints } from './breakpoints';

export function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

function getValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value);
  }

  return value;
}

function style(options) {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(
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

export default style;
