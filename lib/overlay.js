'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var Overlay = React.createClass({
  displayName: 'Overlay',

  _originalBodyOverflow: '',

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
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true
    };
  },

  componentDidMount: function componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.autoLockScrolling) {
      if (this.props.show) {
        this._preventScrolling();
      } else {
        this._allowScrolling();
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity: function setOpacity(opacity) {
    var overlay = ReactDOM.findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
        top: 0,
        left: '-100%',
        opacity: 0,
        backgroundColor: Colors.lightBlack,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // Two ways to promote overlay to its own render layer
        willChange: 'opacity',
        transform: 'translateZ(0)',

        transition: this.props.transitionEnabled && Transitions.easeOut('0ms', 'left', '400ms') + ',' + Transitions.easeOut('400ms', 'opacity')
      },
      rootWhenShown: {
        left: '0',
        opacity: 1,
        transition: this.props.transitionEnabled && Transitions.easeOut('0ms', 'left') + ',' + Transitions.easeOut('400ms', 'opacity')
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var show = _props.show;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['show', 'style']);

    var styles = this.prepareStyles(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

    return React.createElement('div', _extends({}, other, { style: styles }));
  },

  preventScrolling: function preventScrolling() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },

  allowScrolling: function allowScrolling() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },

  _preventScrolling: function _preventScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },

  _allowScrolling: function _allowScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
  }

});

module.exports = Overlay;