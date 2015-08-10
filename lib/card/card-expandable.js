'use strict';

var React = require('react');
var OpenIcon = require('../svg-icons/hardware/keyboard-arrow-up');
var CloseIcon = require('../svg-icons/hardware/keyboard-arrow-down');
var IconButton = require('../icon-button');

var CardExpandable = React.createClass({
  displayName: 'CardExpandable',

  getStyles: function getStyles() {
    return {
      root: {
        right: 4,
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute'
      }
    };
  },

  propTypes: {
    onExpanding: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool
  },

  _onExpanding: function _onExpanding() {
    if (this.props.expanded === true) this.props.onExpanding(false);else this.props.onExpanding(true);
  },

  render: function render() {
    var styles = this.getStyles();

    var expandable = undefined;
    if (this.props.expanded === true) expandable = React.createElement(OpenIcon, null);else expandable = React.createElement(CloseIcon, null);

    var expandableBtn = React.createElement(
      IconButton,
      {
        style: styles.root,
        onClick: this._onExpanding },
      expandable
    );

    return expandableBtn;
  }
});

module.exports = CardExpandable;