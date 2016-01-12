import React from 'react';
import ImmutabilityHelper from '../utils/immutability-helper';
import Styles from '../utils/styles';
import warning from 'warning';

// This mixin isn't necessary and will be removed

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
export default {

  propTypes: {
    style: React.PropTypes.object,
  },

  //Moved this function to ImmutabilityHelper.merge
  mergeStyles() {
    return ImmutabilityHelper.merge.apply(this, arguments);
  },

  //Moved this function to /utils/styles.js
  mergeAndPrefix() {
    warning(false, 'Use of mergeAndPrefix() has been deprecated. ' +
      'Please use mergeStyles() for merging styles, and then prepareStyles() for prefixing and ensuring direction.');
    return Styles.mergeAndPrefix.apply(this, arguments);
  },

  // prepareStyles is used to merge multiple styles, make sure they are flipped to rtl
  // if needed, and then autoprefix them. It should probably always be used instead of
  // mergeAndPrefix.
  //
  // Never call this on the same style object twice. As a rule of thumb,
  // only call it when passing style attribute to html elements.
  // If you call it twice you'll get a warning anyway.
  prepareStyles(...args) {
    return Styles.prepareStyles.apply(Styles,
      [(this.state && this.state.muiTheme) || this.context.muiTheme].concat(args));
  },
};
