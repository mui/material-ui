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

function css(styleFunction) {
  const newStyleFunction = props => {
    const output = styleFunction(props) || {};

    if (props.css) {
      const apply = styles => {
        const cssProps = omit(styles, styleFunction.filterProps);
        const cssOutput = {
          ...styleFunction({ theme: props.theme, ...styles }),
          ...cssProps,
        };

        Object.keys(cssProps).forEach(key => {
          if (cssProps[key] && typeof cssProps[key] === 'object') {
            cssOutput[key] = apply(cssProps[key]);
          }
        });

        return cssOutput;
      };

      return merge(output, apply(props.css));
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
