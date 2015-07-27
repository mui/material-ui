'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var PropTypes = require('./utils/prop-types');
var Transitions = require('./styles/transitions');

var Paper = React.createClass({
  displayName: 'Paper',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool,
    zDepth: PropTypes.zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      circle: false,
      rounded: true,
      transitionEnabled: true,
      zDepth: 1
    };
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        backgroundColor: this.context.muiTheme.component.paper.backgroundColor,
        transition: this.props.transitionEnabled && Transitions.easeOut(),
        boxSizing: 'border-box',
        fontFamily: this.context.muiTheme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        boxShadow: this._getZDepthShadows(this.props.zDepth),
        borderRadius: this.props.circle ? '50%' : this.props.rounded ? '2px' : '0px'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var circle = _props.circle;
    var rounded = _props.rounded;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['style', 'circle', 'rounded', 'zDepth']);

    var styles = this.getStyles();

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root, this.props.style) }),
      this.props.children
    );
  },

  _getZDepthShadows: function _getZDepthShadows(zDepth) {
    var shadows = [null, '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)', '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)', '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)', '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)', '0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)'];

    return shadows[zDepth];
  }

});

module.exports = Paper;