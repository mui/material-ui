'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var PropTypes = require('../utils/prop-types');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');
var Paper = require('../paper');

var List = React.createClass({
  displayName: 'List',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    insetSubheader: React.PropTypes.bool,
    subheader: React.PropTypes.string,
    subheaderStyle: React.PropTypes.object,
    zDepth: PropTypes.zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      zDepth: 0
    };
  },

  render: function render() {
    var _props = this.props;
    var insetSubheader = _props.insetSubheader;
    var style = _props.style;
    var subheader = _props.subheader;
    var subheaderStyle = _props.subheaderStyle;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['insetSubheader', 'style', 'subheader', 'subheaderStyle', 'zDepth']);

    var styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: subheader ? 0 : 8
      },

      subheader: {
        color: Typography.textLightBlack,
        fontSize: 14,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16
      }
    };

    var mergedRootStyles = this.mergeStyles(styles.root, style);
    var mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);

    var subheaderElement = subheader ? React.createElement(
      'div',
      { style: mergedSubheaderStyles },
      subheader
    ) : null;

    return React.createElement(
      Paper,
      _extends({}, other, {
        style: mergedRootStyles,
        zDepth: zDepth }),
      subheaderElement,
      this.props.children
    );
  }
});

module.exports = List;