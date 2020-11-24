import PropTypes from 'prop-types';
import merge from './merge';

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach((prop) => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

function css(styleFunction) {
  const newStyleFunction = (props) => {
    const output = styleFunction(props);

    if (props.css) {
      return {
        ...merge(output, styleFunction({ theme: props.theme, ...props.css })),
        ...omit(props.css, [styleFunction.filterProps]),
      };
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
