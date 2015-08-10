'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors');

var Avatar = React.createClass({
  displayName: 'Avatar',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    icon: React.PropTypes.element,
    backgroundColor: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
    style: React.PropTypes.object
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
    var icon = _props.icon;
    var backgroundColor = _props.backgroundColor;
    var color = _props.color;
    var size = _props.size;
    var src = _props.src;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['icon', 'backgroundColor', 'color', 'size', 'src', 'style']);

    var boxShadow = style && style.boxShadow ? style.boxShadow : '0 0 1px 0 rgba(0, 0, 0, 0.2) inset';
    var borderRadius = style && style.borderRadius ? style.borderRadius : '50%';

    var styles = {
      root: {
        height: size,
        width: size,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        boxShadow: src ? null : boxShadow, // Doesn't apply above an img
        borderRadius: borderRadius,
        display: 'inline-block',

        //Needed for img
        position: 'relative',

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    if (src) {
      var styleImg = {
        height: size,
        width: size,
        borderRadius: borderRadius
      };

      var styleImgShadow = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        boxShadow: boxShadow,
        borderRadius: borderRadius
      };

      return React.createElement(
        'div',
        _extends({}, other, { style: mergedRootStyles }),
        React.createElement('img', { src: src, style: styleImg }),
        React.createElement('div', { style: this.mergeAndPrefix(styleImgShadow) })
      );
    } else {
      var styleIcon = {
        margin: 8
      };

      var iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styleIcon, icon.props.style)
      }) : null;

      return React.createElement(
        'div',
        _extends({}, other, { style: mergedRootStyles }),
        iconElement,
        this.props.children
      );
    }
  }
});

module.exports = Avatar;