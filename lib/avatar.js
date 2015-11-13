'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var Avatar = React.createClass({
  displayName: 'Avatar',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  propTypes: {
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.element,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      backgroundColor: Colors.grey400,
      color: Colors.white,
      size: 40
    };
  },

  render: function render() {
    var _props = this.props;
    var backgroundColor = _props.backgroundColor;
    var color = _props.color;
    var icon = _props.icon;
    var size = _props.size;
    var src = _props.src;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['backgroundColor', 'color', 'icon', 'size', 'src', 'style']);

    var styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        borderRadius: '50%',
        display: 'inline-block'
      }
    };

    if (src) {
      var borderColor = this.state.muiTheme.avatar.borderColor;

      if (borderColor) {
        styles.root = this.mergeStyles(styles.root, {
          height: size - 2,
          width: size - 2,
          border: 'solid 1px ' + borderColor
        });
      }

      return React.createElement('img', _extends({}, other, { src: src, style: this.prepareStyles(styles.root, style) }));
    } else {
      styles.root = this.mergeStyles(styles.root, {
        backgroundColor: backgroundColor,
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color
      });

      var styleIcon = {
        margin: 8
      };

      var iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style)
      }) : null;

      return React.createElement(
        'div',
        _extends({}, other, { style: this.prepareStyles(styles.root, style) }),
        iconElement,
        this.props.children
      );
    }
  }
});

module.exports = Avatar;