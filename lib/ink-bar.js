'use strict';

var React = require('react');
var Transitions = require('./styles/transitions');
var StylePropable = require('./mixins/style-propable');

var InkBar = React.createClass({
  displayName: 'InkBar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    left: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired
  },

  mixins: [StylePropable],

  render: function render() {
    var palette = this.context.muiTheme.palette;

    var styles = this.mergeAndPrefix({
      left: this.props.left,
      width: this.props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: palette.accent1Color,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left')
    }, this.props.style);

    return React.createElement(
      'div',
      { style: styles },
      ' '
    );
  }

});

module.exports = InkBar;