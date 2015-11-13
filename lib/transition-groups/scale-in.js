'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ReactTransitionGroup = require('react-addons-transition-group');
var StylePropable = require('../mixins/style-propable');
var ScaleInChild = require('./scale-in-child');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var ScaleIn = React.createClass({
  displayName: 'ScaleIn',

  mixins: [PureRenderMixin, StylePropable],

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

  propTypes: {
    childStyle: React.PropTypes.object,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var childStyle = _props.childStyle;
    var enterDelay = _props.enterDelay;
    var maxScale = _props.maxScale;
    var minScale = _props.minScale;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'childStyle', 'enterDelay', 'maxScale', 'minScale', 'style']);

    var mergedRootStyles = this.prepareStyles({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, style);

    var newChildren = React.Children.map(children, function (child) {
      return React.createElement(
        ScaleInChild,
        {
          key: child.key,
          enterDelay: enterDelay,
          maxScale: maxScale,
          minScale: minScale,
          style: childStyle },
        child
      );
    });

    return React.createElement(
      ReactTransitionGroup,
      _extends({}, other, {
        style: mergedRootStyles,
        component: 'div' }),
      newChildren
    );
  }

});

module.exports = ScaleIn;