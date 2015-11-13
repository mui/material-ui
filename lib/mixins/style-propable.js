'use strict';

var React = require('react');
var ImmutabilityHelper = require('../utils/immutability-helper');
var Styles = require('../utils/styles');

// This mixin isn't necessary and will be removed in v0.11

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  propTypes: {
    style: React.PropTypes.object
  },

  //Moved this function to ImmutabilityHelper.merge
  mergeStyles: function mergeStyles() {
    return ImmutabilityHelper.merge.apply(this, arguments);
  },

  //Moved this function to /utils/styles.js
  mergeAndPrefix: function mergeAndPrefix() {
    return Styles.mergeAndPrefix.apply(this, arguments);
  },

  // prepareStyles is used to merge multiple styles, make sure they are flipped to rtl
  // if needed, and then autoprefix them. It should probably always be used instead of
  // mergeAndPrefix.
  //
  // Never call this on the same style object twice. As a rule of thumb,
  //   only call it when passing style attribute to html elements.
  // If you call it twice you'll get a warning anyway.
  prepareStyles: function prepareStyles() {
    return Styles.prepareStyles.apply(Styles, [this.state && this.state.muiTheme || this.context.muiTheme].concat([].slice.apply(arguments)));
  }
};