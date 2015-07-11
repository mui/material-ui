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

    var styles = {
      root: {
        height: src ? size - 2 : size,
        width: src ? size - 2 : size,
        userSelect: 'none',
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        border: src ? 'solid 1px' : 'none',
        borderColor: this.context.muiTheme.palette.borderColor,
        display: 'inline-block',

        //Needed for letter avatars
        textAlign: 'center',
        lineHeight: size + 'px',
        fontSize: size / 2 + 4,
        color: color
      },

      iconStyles: {
        margin: 8
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    if (src) {
      return React.createElement('img', _extends({}, other, { src: src, style: mergedRootStyles }));
    } else {
      var iconElement = icon ? React.cloneElement(icon, {
        color: color,
        style: this.mergeStyles(styles.iconStyles, icon.props.style)
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