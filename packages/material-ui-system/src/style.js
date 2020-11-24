import responsivePropType from './responsivePropType';
import { handleBreakpoints } from './breakpoints';

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

function style(inputOptions) {
  let config;

  if (inputOptions.prop) {
    config = {
      [inputOptions.prop]: inputOptions,
    };
  } else {
    config = inputOptions;
  }

  const fn = (props) => {
    const result = {};

    Object.keys(config).forEach((key) => {
      const options = config[key];
      const { prop, cssProperty = options.prop, themeKey, transform } = options;

      if (props[prop] == null) {
        return null;
      }

      const propValue = props[prop];
      const theme = props.theme;
      const themeMapping = getPath(theme, themeKey) || {};
      const styleFromPropValue = (propValueFinal) => {
        let value;

        if (typeof themeMapping === 'function') {
          value = themeMapping(propValueFinal);
        } else if (Array.isArray(themeMapping)) {
          value = themeMapping[propValueFinal] || propValueFinal;
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

      const res =
        typeof propValue === 'object' || Array.isArray(propValue)
          ? handleBreakpoints(props, propValue, styleFromPropValue)
          : styleFromPropValue(propValue);

      if (res) {
        Object.keys(res).forEach((k) => {
          result[k] = res[k];
        });
      }

      return null;
    });

    return result;
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? Object.keys(config).reduce((acc, o) => { acc[o] = responsivePropType; return acc; }, {})
      : {};

  fn.filterProps = Object.keys(config);
  fn.config = config;

  return fn;
}

export default style;
