var React = require('react/addons');
var AutoPrefix = require('../styles/auto-prefix');
var Extend = require('../utils/extend');

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  mergeStyles: function(styles, props) {
    return React.addons.update(styles, {
      $merge: props || this.props.style || {}
    });
  },

  mergeAndPrefix: function(styles, props) {
    return AutoPrefix.all(this.mergeStyles(styles, props));
  },
  
  /** 
   * m loops through all properties defined in the first argument, so overrides
   * of undefined properties will not take place.
   */
  m: function() {
    var base = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i]) base = Extend(base, arguments[i]);
    }
    return AutoPrefix.all(base);
	}

}
