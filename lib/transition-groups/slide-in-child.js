'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var SlideInChild = React.createClass({
  displayName: 'SlideInChild',

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
    enterDelay: React.PropTypes.number,
    //This callback is needed bacause
    //the direction could change when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0
    };
  },

  componentWillEnter: function componentWillEnter(callback) {
    var _this = this;

    var style = ReactDOM.findDOMNode(this).style;
    var x = this.props.direction === 'left' ? '100%' : this.props.direction === 'right' ? '-100%' : '0';
    var y = this.props.direction === 'up' ? '100%' : this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(function () {
      if (_this.isMounted()) callback();
    }, this.props.enterDelay);
  },

  componentDidEnter: function componentDidEnter() {
    var style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this2 = this;

    var style = ReactDOM.findDOMNode(this).style;
    var direction = this.props.getLeaveDirection();
    var x = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0';
    var y = direction === 'up' ? '-100%' : direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(function () {
      if (_this2.isMounted()) callback();
    }, 450);
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var enterDelay = _props.enterDelay;
    var getLeaveDirection = _props.getLeaveDirection;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'getLeaveDirection', 'style']);

    var mergedRootStyles = this.prepareStyles({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity'])
    }, style);

    return React.createElement(
      'div',
      _extends({}, other, { style: mergedRootStyles }),
      children
    );
  }

});

module.exports = SlideInChild;