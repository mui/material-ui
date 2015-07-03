'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({
  displayName: 'Dialog',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node,
    contentInnerStyle: React.PropTypes.object
  },

  getStyles: function getStyles() {
    var spacing = this.context.muiTheme.spacing;
    var gutter = spacing.desktopGutter + 'px ';
    var styles = {
      title: {
        margin: 0,
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.muiTheme.palette.textColor,
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '400'
      },
      content: {
        padding: spacing.desktopGutter
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var contentInnerStyle = _props.contentInnerStyle;

    var other = _objectWithoutProperties(_props, ['className', 'contentInnerStyle']);

    var styles = this.getStyles();

    var title = undefined;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ? React.createElement(
        'h3',
        { style: styles.title },
        this.props.title
      ) : this.props.title;
    }

    return React.createElement(
      DialogWindow,
      _extends({}, other, {
        ref: 'dialogWindow',
        className: className,
        style: this.props.style }),
      title,
      React.createElement(
        'div',
        { ref: 'dialogContent', style: this.mergeAndPrefix(styles.content, contentInnerStyle) },
        this.props.children
      )
    );
  },

  dismiss: function dismiss() {
    this.refs.dialogWindow.dismiss();
  },

  show: function show() {
    this.refs.dialogWindow.show();
  }

});

module.exports = Dialog;