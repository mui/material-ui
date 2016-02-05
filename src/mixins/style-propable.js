import React from 'react';
import {mergeStyles, mergeAndPrefix} from '../utils/styles';

/**
 * This mixin isn't necessary and will be removed soon. DO NOT USE!
 *
 * All internal components that use this mixin should be switched to the
 * `styleUtils` that this mixin now wraps. Notice the method signature of
 * the `prepareStyles()` function of this mixin is different than the method
 * signature of the `prepareStyles()` function in `styleUtils`.
 *
 * See `../utils/styles.js` for more details.
 */
export default {

  propTypes: {
    style: React.PropTypes.object,
  },

  mergeStyles,

  mergeAndPrefix,

  prepareStyles(...args) {
    const {
      prepareStyles = (style) => (style),
    } = (this.state && this.state.muiTheme) || (this.context && this.context.muiTheme) ||
        (this.props && this.props.muiTheme) || {};

    return prepareStyles(mergeStyles({}, ...args));
  },
};
