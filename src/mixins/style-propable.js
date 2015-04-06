var React = require('react/addons');
var AutoPrefix = require('../styles/auto-prefix');

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
  }
  
}
