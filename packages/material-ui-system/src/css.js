import PropTypes from 'prop-types';
import merge from './merge';

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

function handleCss(styleFunction, theme) {
  const apply = styles => {
    const cssStyles = omit(styles, styleFunction.filterProps)
    const output = {
      ...styleFunction({ theme, ...styles }),
      ...cssStyles,
    };

    Object.keys(cssStyles).forEach(key => {
      if (typeof cssStyles[key] === 'object') {
        output[key] = apply(cssStyles[key]);
      }
    });

    return output;
  };

  return apply;
}

function css(styleFunction) {
  const newStyleFunction = props => {
    const output = styleFunction(props) || {};

    if (props.css) {
      return merge(output, handleCss(styleFunction, props.theme)(props.css));
    }

    return output;
  };

  newStyleFunction.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          ...styleFunction.propTypes,
          css: PropTypes.object,
        }
      : {};

  newStyleFunction.filterProps = ['css', ...styleFunction.filterProps];

  return newStyleFunction;
}

export default css;
