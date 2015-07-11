'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');

var Overlay = React.createClass({
  displayName: 'Overlay',

  _originalBodyOverflow: '',

  mixins: [StylePropable],

  propTypes: {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true
    };
  },

  componentDidMount: function componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.autoLockScrolling) this.props.show ? this._preventScrolling() : this._allowScrolling();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity: function setOpacity(opacity) {
    var overlay = React.findDOMNode(this);
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

    var styles = this.mergeAndPrefix(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

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