'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var FocusRipple = require('./ripples/focus-ripple');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

/**
  * Verifies min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if min >= max otherwise null.
  */
var minMaxPropType = function minMaxPropType(props, propName, componentName) {
  var error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  if (props.min >= props.max) {
    var errorMsg = propName === 'min' ? 'min should be less than max' : 'max should be greater than min';
    return new Error(errorMsg);
  }
};

/**
  * Verifies value is within the min/max range.
  * @param   {Object} props         Properties of the React component.
  * @param   {String} propName      Name of the property to validate.
  * @param   {String} componentName Name of the component whose property is being validated.
  * @returns {Object} Returns an Error if the value is not within the range otherwise null.
  */
var valueInRangePropType = function valueInRangePropType(props, propName, componentName) {
  var error = React.PropTypes.number(props, propName, componentName);
  if (error !== null) return error;

  var value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(propName + ' should be within the range specified by min and max');
  }
};

var Slider = React.createClass({
  displayName: 'Slider',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    defaultValue: valueInRangePropType,
    description: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    max: minMaxPropType,
    min: minMaxPropType,
    required: React.PropTypes.bool,
    step: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    value: valueInRangePropType,
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

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      max: 1,
      min: 0,
      required: true,
      step: 0.01,
      style: {}
    };
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    if (value === undefined) {
      value = this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.min;
    }
    var percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;

    return {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      percent: percent,
      value: value,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (nextProps.value !== undefined && !this.state.dragging) {
      this.setValue(nextProps.value);
    }
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.slider;
  },

  getStyles: function getStyles() {
    var fillGutter = this.getTheme().handleSize / 2;
    var disabledGutter = this.getTheme().trackSize + this.getTheme().handleSizeDisabled / 2;
    var calcDisabledSpacing = this.props.disabled ? ' - ' + disabledGutter + 'px' : '';
    var styles = {
      root: {
        touchCallout: 'none',
        userSelect: 'none',
        cursor: 'default',
        height: this.getTheme().handleSizeActive,
        position: 'relative',
        marginTop: 24,
        marginBottom: 48
      },
      track: {
        position: 'absolute',
        top: (this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2,
        left: 0,
        width: '100%',
        height: this.getTheme().trackSize
      },
      filledAndRemaining: {
        position: 'absolute',
        top: 0,
        height: '100%',
        transition: Transitions.easeOut(null, 'margin')
      },
      handle: {
        boxSizing: 'border-box',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'inherit',
        top: 0,
        left: '0%',
        zIndex: 1,
        margin: this.getTheme().trackSize / 2 + 'px 0 0 0',
        width: this.getTheme().handleSize,
        height: this.getTheme().handleSize,
        backgroundColor: this.getTheme().selectionColor,
        backgroundClip: 'padding-box',
        border: '0px solid transparent',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition: Transitions.easeOut('450ms', 'background') + ',' + Transitions.easeOut('450ms', 'border-color') + ',' + Transitions.easeOut('450ms', 'width') + ',' + Transitions.easeOut('450ms', 'height'),
        overflow: 'visible'
      },
      handleWhenDisabled: {
        boxSizing: 'content-box',
        cursor: 'not-allowed',
        backgroundColor: this.getTheme().trackColor,
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled,
        border: 'none'
      },
      handleWhenPercentZero: {
        border: this.getTheme().trackSize + 'px solid ' + this.getTheme().handleColorZero,
        backgroundColor: this.getTheme().handleFillColor,
        boxShadow: 'none'
      },
      handleWhenPercentZeroAndDisabled: {
        cursor: 'not-allowed',
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled
      },
      handleWhenPercentZeroAndFocused: {
        border: this.getTheme().trackSize + 'px solid ' + this.getTheme().trackColorSelected
      },
      handleWhenActive: {
        width: this.getTheme().handleSizeActive,
        height: this.getTheme().handleSizeActive
      },
      ripple: {
        height: this.getTheme().handleSize,
        width: this.getTheme().handleSize,
        overflow: 'visible'
      },
      rippleWhenPercentZero: {
        top: -this.getTheme().trackSize,
        left: -this.getTheme().trackSize
      },
      rippleInner: {
        height: '300%',
        width: '300%',
        top: -this.getTheme().handleSize,
        left: -this.getTheme().handleSize
      }
    };
    styles.filled = this.mergeAndPrefix(styles.filledAndRemaining, {
      left: 0,
      backgroundColor: this.props.disabled ? this.getTheme().trackColor : this.getTheme().selectionColor,
      marginRight: fillGutter,
      width: 'calc(' + this.state.percent * 100 + '%' + calcDisabledSpacing + ')'
    });
    styles.remaining = this.mergeAndPrefix(styles.filledAndRemaining, {
      right: 0,
      backgroundColor: this.getTheme().trackColor,
      marginLeft: fillGutter,
      width: 'calc(' + (1 - this.state.percent) * 100 + '%' + calcDisabledSpacing + ')'
    });

    return styles;
  },

  render: function render() {
    var others = _objectWithoutProperties(this.props, []);

    var percent = this.state.percent;
    if (percent > 1) percent = 1;else if (percent < 0) percent = 0;

    var styles = this.getStyles();
    var sliderStyles = this.prepareStyles(styles.root, this.props.style);
    var handleStyles = percent === 0 ? this.prepareStyles(styles.handle, styles.handleWhenPercentZero, this.state.active && styles.handleWhenActive, this.state.focused && { outline: 'none' }, (this.state.hovered || this.state.focused) && !this.props.disabled && styles.handleWhenPercentZeroAndFocused, this.props.disabled && styles.handleWhenPercentZeroAndDisabled) : this.prepareStyles(styles.handle, this.state.active && styles.handleWhenActive, this.state.focused && { outline: 'none' }, this.props.disabled && styles.handleWhenDisabled, {
      left: percent * 100 + '%'
    });
    var rippleStyle = this.mergeAndPrefix(styles.ripple, percent === 0 && styles.rippleWhenPercentZero);
    var remainingStyles = styles.remaining;
    if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
      remainingStyles.backgroundColor = this.getTheme().trackColorSelected;
    }

    var rippleShowCondition = (this.state.hovered || this.state.focused) && !this.state.active;
    var rippleColor = this.state.percent === 0 ? this.getTheme().handleColorZero : this.getTheme().rippleColor;
    var focusRipple = undefined;
    if (!this.props.disabled && !this.props.disableFocusRipple) {
      focusRipple = React.createElement(FocusRipple, {
        ref: 'focusRipple',
        key: 'focusRipple',
        style: rippleStyle,
        innerStyle: styles.rippleInner,
        show: rippleShowCondition,
        color: rippleColor });
    }

    var handleDragProps = {};

    if (!this.props.disabled) {
      handleDragProps = {
        onTouchStart: this._onHandleTouchStart,
        onMouseDown: this._onHandleMouseDown
      };
    }

    return React.createElement(
      'div',
      _extends({}, others, { style: this.prepareStyles(this.props.style) }),
      React.createElement('span', { className: 'mui-input-highlight' }),
      React.createElement('span', { className: 'mui-input-bar' }),
      React.createElement(
        'span',
        { className: 'mui-input-description' },
        this.props.description
      ),
      React.createElement(
        'span',
        { className: 'mui-input-error' },
        this.props.error
      ),
      React.createElement(
        'div',
        { style: sliderStyles,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onMouseDown: this._onMouseDown,
          onMouseEnter: this._onMouseEnter,
          onMouseLeave: this._onMouseLeave,
          onMouseUp: this._onMouseUp },
        React.createElement(
          'div',
          { ref: 'track', style: this.prepareStyles(styles.track) },
          React.createElement('div', { style: this.prepareStyles(styles.filled) }),
          React.createElement('div', { style: this.prepareStyles(remainingStyles) }),
          React.createElement(
            'div',
            _extends({ style: handleStyles, tabIndex: 0 }, handleDragProps),
            focusRipple
          )
        )
      ),
      React.createElement('input', { ref: 'input', type: 'hidden',
        name: this.props.name,
        value: this.state.value,
        required: this.props.required,
        min: this.props.min,
        max: this.props.max,
        step: this.props.step })
    );
  },

  _onHandleTouchStart: function _onHandleTouchStart(e) {
    if (document) {
      document.addEventListener('touchmove', this._dragTouchHandler, false);
      document.addEventListener('touchup', this._dragTouchEndHandler, false);
      document.addEventListener('touchend', this._dragTouchEndHandler, false);
      document.addEventListener('touchcancel', this._dragTouchEndHandler, false);
    }
    this._onDragStart(e);
  },

  _onHandleMouseDown: function _onHandleMouseDown(e) {
    if (document) {
      document.addEventListener('mousemove', this._dragHandler, false);
      document.addEventListener('mouseup', this._dragEndHandler, false);
    }
    this._onDragStart(e);
  },

  _dragHandler: function _dragHandler(e) {
    var _this = this;

    if (this._dragRunning) {
      return;
    }
    this._dragRunning = true;
    requestAnimationFrame(function () {
      _this._onDragUpdate(e, e.clientX - _this._getTrackLeft());
      _this._dragRunning = false;
    });
  },

  _dragTouchHandler: function _dragTouchHandler(e) {
    var _this2 = this;

    if (this._dragRunning) {
      return;
    }
    this._dragRunning = true;
    requestAnimationFrame(function () {
      _this2._onDragUpdate(e, e.touches[0].clientX - _this2._getTrackLeft());
      _this2._dragRunning = false;
    });
  },

  _dragEndHandler: function _dragEndHandler(e) {
    if (document) {
      document.removeEventListener('mousemove', this._dragHandler, false);
      document.removeEventListener('mouseup', this._dragEndHandler, false);
    }

    this._onDragStop(e);
  },

  _dragTouchEndHandler: function _dragTouchEndHandler(e) {
    if (document) {
      document.removeEventListener('touchmove', this._dragTouchHandler, false);
      document.removeEventListener('touchup', this._dragTouchEndHandler, false);
      document.removeEventListener('touchend', this._dragTouchEndHandler, false);
      document.removeEventListener('touchcancel', this._dragTouchEndHandler, false);
    }

    this._onDragStop(e);
  },

  getValue: function getValue() {
    return this.state.value;
  },

  setValue: function setValue(i) {
    // calculate percentage
    var percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent
    });
  },

  getPercent: function getPercent() {
    return this.state.percent;
  },

  setPercent: function setPercent(percent, callback) {
    var value = this._alignValue(this._percentToValue(percent));
    var _props = this.props;
    var min = _props.min;
    var max = _props.max;

    var alignedPercent = (value - min) / (max - min);
    if (this.state.value !== value) {
      this.setState({ value: value, percent: alignedPercent }, callback);
    }
  },

  clearValue: function clearValue() {
    this.setValue(this.props.min);
  },

  _alignValue: function _alignValue(val) {
    var _props2 = this.props;
    var step = _props2.step;
    var min = _props2.min;

    var alignValue = Math.round((val - min) / step) * step + min;
    return parseFloat(alignValue.toFixed(5));
  },

  _onFocus: function _onFocus(e) {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _onBlur: function _onBlur(e) {
    this.setState({ focused: false, active: false });
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _onMouseDown: function _onMouseDown(e) {
    if (!this.props.disabled) this._pos = e.clientX;
  },

  _onMouseEnter: function _onMouseEnter() {
    this.setState({ hovered: true });
  },

  _onMouseLeave: function _onMouseLeave() {
    this.setState({ hovered: false });
  },

  _getTrackLeft: function _getTrackLeft() {
    return ReactDOM.findDOMNode(this.refs.track).getBoundingClientRect().left;
  },

  _onMouseUp: function _onMouseUp(e) {
    if (!this.props.disabled) this.setState({ active: false });
    if (!this.state.dragging && Math.abs(this._pos - e.clientX) < 5) {
      var pos = e.clientX - this._getTrackLeft();
      this._dragX(e, pos);
    }

    this._pos = undefined;
  },

  _onDragStart: function _onDragStart(e) {
    this.setState({
      dragging: true,
      active: true
    });
    if (this.props.onDragStart) this.props.onDragStart(e);
  },

  _onDragStop: function _onDragStop(e) {
    this.setState({
      dragging: false,
      active: false
    });
    if (this.props.onDragStop) this.props.onDragStop(e);
  },

  _onDragUpdate: function _onDragUpdate(e, pos) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, pos);
  },

  _dragX: function _dragX(e, pos) {
    var max = ReactDOM.findDOMNode(this.refs.track).clientWidth;
    if (pos < 0) pos = 0;else if (pos > max) pos = max;
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent: function _updateWithChangeEvent(e, percent) {
    var _this3 = this;

    this.setPercent(percent, function () {
      if (_this3.props.onChange) _this3.props.onChange(e, _this3.state.value);
    });
  },

  _percentToValue: function _percentToValue(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  }

});

module.exports = Slider;