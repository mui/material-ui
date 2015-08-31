'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarTitle = React.createClass({
  displayName: 'ToolbarTitle',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    text: React.PropTypes.string
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.toolbar;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var text = _props.text;

    var other = _objectWithoutProperties(_props, ['style', 'text']);

    var styles = this.mergeAndPrefix({
      paddingRight: this.context.muiTheme.spacing.desktopGutterLess,
      lineHeight: this.getTheme().height + 'px',
      fontSize: this.getTheme().titleFontSize + 'px',
      display: 'inline-block',
      position: 'relative'
    }, style);

    return React.createElement(
      'span',
      _extends({ style: styles }, other),
      text
    );
  }

});

module.exports = ToolbarTitle;