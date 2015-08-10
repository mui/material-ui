'use strict';

var React = require('react/addons');
var AutoPrefix = require('../styles/auto-prefix');
var Extend = require('../utils/extend');

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  propTypes: {
    style: React.PropTypes.object
  },

  mergeStyles: function mergeStyles() {
    var args = Array.prototype.slice.call(arguments, 0);
    var base = args[0];
    for (var i = 1; i < args.length; i++) {
      if (args[i]) {
        base = Extend(base, args[i]);
      }
    }

    return base;
  },

  /**
   * loops through all properties defined in the first argument, so overrides
   * of undefined properties will not take place.
   */
  mergeAndPrefix: function mergeAndPrefix() {
    var mergedStyles = this.mergeStyles.apply(this, arguments);
    return AutoPrefix.all(mergedStyles);
  }
};