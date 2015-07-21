'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var Toolbar = React.createClass({
  displayName: 'Toolbar',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  getStyles: function getStyles() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: this.props.noGutter ? 0 : '0px ' + this.context.muiTheme.spacing.desktopGutter + 'px'
    }, this.props.style);
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: this.props.className, style: this.getStyles() },
      this.props.children
    );
  }

});

module.exports = Toolbar;