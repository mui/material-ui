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
  }
};