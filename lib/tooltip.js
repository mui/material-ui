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

var Tooltip = React.createClass({
  displayName: 'Tooltip',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.node.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool,
    verticalPosition: React.PropTypes.oneOf(['top', 'bottom']),
    horizontalPosition: React.PropTypes.oneOf(['left', 'right', 'center']),
    style: React.PropTypes.object
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

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
    this._setTooltipPosition();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    this._setTooltipPosition();

    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentDidUpdate: function componentDidUpdate() {
    this._setRippleSize();
  },

  getInitialState: function getInitialState() {
    return {
      offsetWidth: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  getStyles: function getStyles() {
    var verticalPosition = this.props.verticalPosition;
    var horizontalPosition = this.props.horizontalPosition;
    var touchMarginOffset = this.props.touch ? 10 : 0;
    var touchOffsetTop = this.props.touch ? -20 : -10;
    var offset = verticalPosition === 'bottom' ? 14 + touchMarginOffset : -14 - touchMarginOffset;

    var styles = {
      root: {
        position: 'absolute',
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        color: Colors.white,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        right: horizontalPosition === 'left' ? 12 : null,
        left: horizontalPosition === 'center' ? (this.state.offsetWidth - 48) / 2 * -1 : null,
        transition: Transitions.easeOut('0ms', 'top', '450ms') + ',' + Transitions.easeOut('450ms', 'transform', '0ms') + ',' + Transitions.easeOut('450ms', 'opacity', '0ms')
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      ripple: {
        position: 'absolute',
        left: horizontalPosition === 'center' ? '50%' : horizontalPosition === 'left' ? '100%' : '0%',
        top: verticalPosition === 'bottom' ? 0 : '100%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition: Transitions.easeOut('0ms', 'width', '450ms') + ',' + Transitions.easeOut('0ms', 'height', '450ms') + ',' + Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: verticalPosition === 'top' ? touchOffsetTop : 36,
        opacity: 0.9,
        transform: 'translate3d(0px, ' + offset + 'px, 0px)',
        transition: Transitions.easeOut('0ms', 'top', '0ms') + ',' + Transitions.easeOut('450ms', 'transform', '0ms') + ',' + Transitions.easeOut('450ms', 'opacity', '0ms')
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '32px',
        padding: '0 16px'
      },
      rippleWhenShown: {
        backgroundColor: Colors.grey700,
        transition: Transitions.easeOut('450ms', 'width', '0ms') + ',' + Transitions.easeOut('450ms', 'height', '0ms') + ',' + Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;

    var other = _objectWithoutProperties(_props, ['label']);

    var styles = this.getStyles();
    return React.createElement(
      'div',
      _extends({}, other, {
        style: this.prepareStyles(styles.root, this.props.show && styles.rootWhenShown, this.props.touch && styles.rootWhenTouched, this.props.style) }),
      React.createElement('div', {
        ref: 'ripple',
        style: this.prepareStyles(styles.ripple, this.props.show && styles.rippleWhenShown) }),
      React.createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.label
      )
    );
  },

  _setRippleSize: function _setRippleSize() {
    var ripple = ReactDOM.findDOMNode(this.refs.ripple);
    var tooltip = window.getComputedStyle(ReactDOM.findDOMNode(this));
    var tooltipWidth = parseInt(tooltip.getPropertyValue("width"), 10) / (this.props.horizontalPosition === 'center' ? 2 : 1);
    var tooltipHeight = parseInt(tooltip.getPropertyValue("height"), 10);

    var rippleDiameter = Math.ceil(Math.sqrt(Math.pow(tooltipHeight, 2) + Math.pow(tooltipWidth, 2)) * 2);
    if (this.props.show) {
      ripple.style.height = rippleDiameter + 'px';
      ripple.style.width = rippleDiameter + 'px';
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  },

  _setTooltipPosition: function _setTooltipPosition() {
    var tooltip = ReactDOM.findDOMNode(this);
    this.setState({ offsetWidth: tooltip.offsetWidth });
  }

});

module.exports = Tooltip;