'use strict';

var React = require('react');
var Extend = require('../utils/extend');
var OpenIcon = require('../svg-icons/hardware/keyboard-arrow-up');
var CloseIcon = require('../svg-icons/hardware/keyboard-arrow-down');
var IconButton = require('../icon-button');
var StylePropable = require('../mixins/style-propable');

var CardExpandable = React.createClass({
  displayName: 'CardExpandable',

  mixins: [StylePropable],

  getStyles: function getStyles() {
    var contextProps = this.getContextProps();

    var directionStyle = contextProps.isRtl ? {
      left: 4
    } : {
      right: 4
    };

    return {
      root: Extend({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute'
      }, directionStyle)
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onExpanding: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool
  },

  getContextProps: function getContextProps() {
    var theme = this.context.muiTheme;

    return {
      isRtl: theme.isRtl
    };
  },

  _onExpanding: function _onExpanding() {
    if (this.props.expanded === true) this.props.onExpanding(false);else this.props.onExpanding(true);
  },

  render: function render() {
    var styles = this.getStyles();

    var expandable = undefined;
    if (this.props.expanded === true) expandable = React.createElement(OpenIcon, null);else expandable = React.createElement(CloseIcon, null);

    var mergedStyles = this.mergeAndPrefix(styles.root, this.props.style);

    var expandableBtn = React.createElement(
      IconButton,
      {
        style: mergedStyles,
        onClick: this._onExpanding },
      expandable
    );

    return expandableBtn;
  }
});

module.exports = CardExpandable;