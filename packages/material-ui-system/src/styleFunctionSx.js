import PropTypes from 'prop-types';
import { chainPropTypes } from '@material-ui/utils';
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

let warnedOnce = false;

function styleFunctionSx(styleFunction) {
  const newStyleFunction = (props) => {
    const output = styleFunction(props);

    if (props.css) {
      return {
        ...merge(output, styleFunction({ theme: props.theme, ...props.css })),
        ...omit(props.css, [styleFunction.filterProps]),
      };
    }

    if (props.sx) {
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
          css: chainPropTypes(PropTypes.object, (props) => {
            if (!warnedOnce && props.css !== undefined) {
              warnedOnce = true;
              return new Error(
                'Material-UI: The `css` prop is deprecated, please use the `sx` prop instead.',
              );
            }
            return null;
          }),
          sx: PropTypes.object,
        }
      : {};

  newStyleFunction.filterProps = ['css', 'sx', ...styleFunction.filterProps];

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
