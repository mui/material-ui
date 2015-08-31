'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarSeparator = React.createClass({
  displayName: 'ToolbarSeparator',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  render: function render() {
    var styles = this.mergeAndPrefix({
      backgroundColor: this.getTheme().separatorColor,
      display: 'inline-block',
      height: this.getSpacing().desktopGutterMore,
      marginLeft: this.getSpacing().desktopGutter,
      position: 'relative',
      top: (this.getTheme().height - this.getSpacing().desktopGutterMore) / 2,
      width: 1
    }, this.props.style);

    return React.createElement('span', { className: this.props.className, style: styles });
  }

});

module.exports = ToolbarSeparator;