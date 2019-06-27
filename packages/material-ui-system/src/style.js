import responsivePropType from './responsivePropType';
import { handleBreakpoints } from './breakpoints';
import convertStyleToFunction from './convertStyleToFunction';

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

function style(options) {
  const { prop, cssProperty, themeKey, transform } = options;

  const fn = (propValue, theme) => {
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = propValueFinal => {
      let value;

      if (typeof themeMapping === 'function') {
        value = themeMapping(propValueFinal);
      } else if (Array.isArray(themeMapping)) {
        value = themeMapping[propValueFinal];
      } else {
        value = getPath(themeMapping, propValueFinal) || propValueFinal;

        if (transform) {
          value = transform(value);
        }
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(theme, propValue, styleFromPropValue);
  };

  fn.styleFunction =  convertStyleToFunction(prop, fn);
  
  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          [prop]: responsivePropType,
        }
      : {};

  return fn;
}

export default style;
