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

function createEmptyBreakpointObject(breakpoints) {
  const breakpointsInOrder = breakpoints.keys.reduce((acc, key) => {
    const breakpointStyleKey = breakpoints.up(key);
    return {
      ...acc,
      [breakpointStyleKey]: {},
    };
  }, {});
  return breakpointsInOrder;
}

function removeUnusedBreakpoints(breakpointKeys, output) {
  return breakpointKeys.reduce(
    (acc, key) => {
      const breakpointOutput = acc[key];
      const isBreakpointUnused =
        Object.keys(breakpointOutput).length === 0 && breakpointOutput.constructor === Object;
      if (isBreakpointUnused) {
        delete acc[key];
      }
      return acc;
    },
    { ...output },
  );
}

const mergeBreakpointsInOrder = (breakpoints, output) => {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpoints);
  const mergedOutput = [emptyBreakpoints, ...output].reduce((prev, next) => merge(prev, next), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
};

function css(styleFunction) {
  const newStyleFunction = props => {
    const output = styleFunction(props);
    if (props.css) {
      const styleWithCss = styleFunction({ theme: props.theme, ...props.css });
      const mergedStyleWithCss = mergeBreakpointsInOrder(props.theme.breakpoints, [
        output,
        styleWithCss,
      ]);
      return {
        ...mergedStyleWithCss,
        ...omit(props.css, [styleFunction.filterProps]),
      };
    }
    return mergeBreakpointsInOrder(props.theme.breakpoints, [output]);
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
