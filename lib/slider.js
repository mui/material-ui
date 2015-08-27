'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Draggable = require('react-draggable2');
var Transitions = require('./styles/transitions');
var FocusRipple = require('./ripples/focus-ripple');

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
    value: valueInRangePropType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: 0,
      disabled: false,
      max: 1,
      min: 0,
      required: true,
      step: 0.01
    };
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    if (value === undefined) {
      value = this.props.defaultValue;
    }
    var percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;

    return {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      percent: percent,
      value: value
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setValue(nextProps.value);
    }
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.slider;
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
        top: (this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2 + 'px',
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
    var sliderStyles = this.mergeAndPrefix(styles.root, this.props.style);
    var handleStyles = percent === 0 ? this.mergeAndPrefix(styles.handle, styles.handleWhenPercentZero, this.state.active && styles.handleWhenActive, this.state.focused && { outline: 'none' }, (this.state.hovered || this.state.focused) && !this.props.disabled && styles.handleWhenPercentZeroAndFocused, this.props.disabled && styles.handleWhenPercentZeroAndDisabled) : this.mergeAndPrefix(styles.handle, this.state.active && styles.handleWhenActive, this.state.focused && { outline: 'none' }, this.props.disabled && styles.handleWhenDisabled);
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
    return React.createElement(
      'div',
      _extends({}, others, { style: this.props.style }),
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
          { ref: 'track', style: styles.track },
          React.createElement('div', { style: styles.filled }),
          React.createElement('div', { style: remainingStyles }),
          React.createElement(
            Draggable,
            { axis: 'x', bound: 'point',
              cancel: this.props.disabled ? '*' : null,
              start: { x: percent * 100 + '%' },
              constrain: this._constrain(),
              onStart: this._onDragStart,
              onStop: this._onDragStop,
              onDrag: this._onDragUpdate,
              onMouseDown: this._onMouseDownKnob },
            React.createElement(
              'div',
              { style: handleStyles, tabIndex: 0 },
              focusRipple
            )
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

  setPercent: function setPercent(percent) {
    var value = this._alignValue(this._percentToValue(percent));
    this.setState({ value: value, percent: percent });
  },

  clearValue: function clearValue() {
    this.setValue(this.props.min);
  },

  _alignValue: function _alignValue(val) {
    var _props = this.props;
    var step = _props.step;
    var min = _props.min;

    var valModStep = (val - min) % step;
    var alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += valModStep > 0 ? step : -step;
    }

    return parseFloat(alignValue.toFixed(5));
  },

  _constrain: function _constrain() {
    var _this = this;

    var _props2 = this.props;
    var min = _props2.min;
    var max = _props2.max;
    var step = _props2.step;

    return function (pos) {
      var pixelMax = React.findDOMNode(_this.refs.track).clientWidth;
      var pixelStep = pixelMax / ((max - min) / step);

      var cursor = min;
      var i = undefined;
      for (i = 0; i < (max - min) / step; i++) {
        var distance = pos.left - cursor;
        var nextDistance = cursor + pixelStep - pos.left;
        if (Math.abs(distance) > Math.abs(nextDistance)) {
          cursor += pixelStep;
        } else {
          break;
        }
      }

      return {
        left: cursor
      };
    };
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

  _onMouseUp: function _onMouseUp(e) {
    if (!this.props.disabled) this.setState({ active: false });
    if (!this.state.dragging && Math.abs(this._pos - e.clientX) < 5) {
      var pos = e.clientX - React.findDOMNode(this).getBoundingClientRect().left;
      this._dragX(e, pos);
    }

    this._pos = undefined;
  },

  _onMouseDownKnob: function _onMouseDownKnob() {
    if (!this.props.disabled) this.setState({ active: true });
  },

  _onDragStart: function _onDragStart(e, ui) {
    this.setState({
      dragging: true,
      active: true
    });
    if (this.props.onDragStart) this.props.onDragStart(e, ui);
  },

  _onDragStop: function _onDragStop(e, ui) {
    this.setState({
      dragging: false,
      active: false
    });
    if (this.props.onDragStop) this.props.onDragStop(e, ui);
  },

  _onDragUpdate: function _onDragUpdate(e, ui) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, ui.position.left);
  },

  _dragX: function _dragX(e, pos) {
    var max = React.findDOMNode(this.refs.track).clientWidth;
    if (pos < 0) pos = 0;else if (pos > max) pos = max;
    if (pos === this.props.min) {
      return this._updateWithChangeEvent(e, 0);
    }
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent: function _updateWithChangeEvent(e, percent) {
    if (this.state.percent === percent) return;
    this.setPercent(percent);
    var value = this._alignValue(this._percentToValue(percent));
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _percentToValue: function _percentToValue(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  }

});

module.exports = Slider;