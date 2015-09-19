const React = require('react');
const ImmutabilityHelper = require('../utils/immutability-helper');
const Styles = require('../utils/styles');

// This mixin isn't necessary and will be removed in v0.11

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  propTypes: {
    style: React.PropTypes.object,
  },

  //Moved this function to ImmutabilityHelper.merge
  mergeStyles() {
    return ImmutabilityHelper.merge.apply(this, arguments);
  },

  //Moved this function to /utils/styles.js
  mergeAndPrefix() {
    return Styles.mergeAndPrefix.apply(this, arguments);
  },
};
