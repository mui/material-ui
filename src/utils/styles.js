import autoPrefix from '../styles/auto-prefix';
import warning from 'warning';

export const mergeStyles = (...args) => Object.assign({}, ...args);

/**
 * `mergeAndPrefix` is used to merge styles and autoprefix them. It has has been deprecated
 *  and should no longer be used.
 */
export function mergeAndPrefix(...args) {
  warning(false, 'Use of mergeAndPrefix() has been deprecated. ' +
    'Please use mergeStyles() for merging styles, and then prepareStyles() for prefixing and ensuring direction.');
  return autoPrefix.all(mergeStyles(...args));
}

/**
 * `prepareStyles` is used to merge multiple styles, make sure they are flipped
 * to rtl if needed, and then autoprefix them.
 *
 * Never call this on the same style object twice. As a rule of thumb, only
 * call it when passing style attribute to html elements.
 *
 * If this method detects you called it twice on the same style object, it
 * will produce a warning in the console.
 */
export function prepareStyles(muiTheme, style = {}, ...styles) {
  if (styles) {
    //warning(false, 'Providing more than one style argument to prepareStyles has been deprecated. ' +
    //  'Please pass a single style, such as the result from mergeStyles(...styles).');
    style = mergeStyles(style, ...styles);
  }

  return muiTheme.prepareStyles(style);
}

export default {
  mergeStyles,
  mergeAndPrefix,
  prepareStyles,
};
