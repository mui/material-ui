var React = require('react/addons');
var AutoPrefix = require('../styles/auto-prefix');

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