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

function styleFunctionSx(styleFunction) {
  const newStyleFunction = (props) => {
    const output = styleFunction(props);

    if (props.css) {
      return {
        ...merge(output, styleFunction({ theme: props.theme, ...props.css })),
        ...omit(props.css, [styleFunction.filterProps]),
      };
    } else if (props.sx) {
      return {
        ...merge(output, styleFunction({ theme: props.theme, ...props.sx })),
        ...omit(props.sx, [styleFunction.filterProps]),
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

/**
 *
 * @deprecated
 * The css style function is deprecated. Use the `styleFunctionSx` instead.
 */
export function css(styleFunction) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Material-UI: The `css` function is deprecated. Use the `styleFunctionSx` instead.',
    );
  }
  return styleFunctionSx(styleFunction);
}

export default styleFunctionSx;
