'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ColorManipulator = require('./utils/color-manipulator');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var EnhancedTextarea = require('./enhanced-textarea');

/**
 * Check if a value is valid to be displayed inside an input.
 *
 * @param The value to check.
 * @returns True if the string provided is valid, false otherwise.
 */
function isValid(value) {
  return value || value === 0;
}

var TextField = React.createClass({
  displayName: 'TextField',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.string,
    floatingLabelStyle: React.PropTypes.object,
    floatingLabelText: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    inputStyle: React.PropTypes.object,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    rows: React.PropTypes.number,
    type: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      fullWidth: false,
      type: 'text',
      rows: 1
    };
  },

  getInitialState: function getInitialState() {
    var props = this.props.children ? this.props.children.props : this.props;

    return {
      errorText: this.props.errorText,
      hasValue: isValid(props.value) || isValid(props.defaultValue) || props.valueLink && isValid(props.valueLink.value)
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.textField;
  },

  componentDidMount: function componentDidMount() {
    this._uniqueId = UniqueId.generate();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newState = {};

    newState.errorText = nextProps.errorText;
    if (nextProps.children && nextProps.children.props) {
      nextProps = nextProps.children.props;
    }

    var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    var hasValueProp = nextProps.hasOwnProperty('value');
    var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;

    if (hasValueLinkProp) {
      newState.hasValue = isValid(nextProps.valueLink.value);
    } else if (hasValueProp) {
      newState.hasValue = isValid(nextProps.value);
    } else if (hasNewDefaultValue) {
      newState.hasValue = isValid(nextProps.defaultValue);
    }

    if (newState) this.setState(newState);
  },

  getStyles: function getStyles() {
    var props = this.props;
    var theme = this.getTheme();

    var styles = {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: props.fullWidth ? '100%' : 256,
        height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
        display: 'inline-block',
        position: 'relative',
        fontFamily: this.context.muiTheme.contentFontFamily,
        transition: Transitions.easeOut('200ms', 'height')
      },
      error: {
        position: 'relative',
        bottom: 5,
        fontSize: 12,
        lineHeight: '12px',
        color: theme.errorColor,
        transition: Transitions.easeOut()
      },
      hint: {
        position: 'absolute',
        lineHeight: '22px',
        opacity: 1,
        color: theme.hintColor,
        transition: Transitions.easeOut(),
        bottom: 12
      },
      input: {
        tapHighlightColor: 'rgba(0,0,0,0)',
        padding: 0,
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: theme.backgroundColor,
        color: props.disabled ? theme.disabledTextColor : theme.textColor,
        font: 'inherit'
      },
      underline: {
        border: 'none',
        borderBottom: 'solid 1px ' + theme.borderColor,
        position: 'absolute',
        width: '100%',
        bottom: 8,
        margin: 0,
        MozBoxSizing: 'content-box',
        boxSizing: 'content-box',
        height: 0
      },
      underlineAfter: {
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        userSelect: 'none',
        cursor: 'default',
        bottom: 8,
        borderBottom: 'dotted 2px ' + theme.disabledTextColor
      }
    };

    styles.floatingLabel = this.mergeStyles(styles.hint, {
      lineHeight: '22px',
      top: 38,
      bottom: 'none',
      opacity: 1,
      transform: 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top'
    });

    styles.textarea = this.mergeStyles(styles.input, {
      marginTop: props.floatingLabelText ? 36 : 12,
      marginBottom: props.floatingLabelText ? -36 : -12,
      boxSizing: 'border-box',
      font: 'inherit'
    });

    styles.focusUnderline = this.mergeStyles(styles.underline, {
      borderBottom: 'solid 2px',
      borderColor: theme.focusColor,
      transform: 'scaleX(0)',
      transition: Transitions.easeOut()
    });

    if (this.state.isFocused) {
      styles.floatingLabel.color = theme.focusColor;
      styles.floatingLabel.transform = 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0)';
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    if (this.state.hasValue) {
      styles.floatingLabel.color = ColorManipulator.fade(props.disabled ? theme.disabledTextColor : theme.floatingLabelColor, 0.5);
      styles.floatingLabel.transform = 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0)';
      styles.hint.opacity = 0;
    }

    if (props.floatingLabelText) {
      styles.hint.opacity = 0;
      styles.input.boxSizing = 'border-box';
      if (this.state.isFocused && !this.state.hasValue) styles.hint.opacity = 1;
    }

    if (props.style && props.style.height) {
      styles.hint.lineHeight = props.style.height;
    }

    if (this.state.errorText && this.state.isFocused) styles.floatingLabel.color = theme.errorColor;
    if (props.floatingLabelText && !props.multiLine) styles.input.paddingTop = 26;

    if (this.state.errorText) {
      styles.focusUnderline.borderColor = theme.errorColor;
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var errorStyle = _props.errorStyle;
    var errorText = _props.errorText;
    var floatingLabelText = _props.floatingLabelText;
    var fullWidth = _props.fullWidth;
    var hintText = _props.hintText;
    var id = _props.id;
    var multiLine = _props.multiLine;
    var onBlur = _props.onBlur;
    var onChange = _props.onChange;
    var onFocus = _props.onFocus;
    var type = _props.type;
    var rows = _props.rows;

    var other = _objectWithoutProperties(_props, ['className', 'errorStyle', 'errorText', 'floatingLabelText', 'fullWidth', 'hintText', 'id', 'multiLine', 'onBlur', 'onChange', 'onFocus', 'type', 'rows']);

    var styles = this.getStyles();

    var inputId = id || this._uniqueId;

    var errorTextElement = this.state.errorText ? React.createElement(
      'div',
      { style: this.mergeAndPrefix(styles.error, errorStyle) },
      this.state.errorText
    ) : null;

    var hintTextElement = hintText ? React.createElement(
      'div',
      { style: this.mergeAndPrefix(styles.hint) },
      hintText
    ) : null;

    var floatingLabelTextElement = floatingLabelText ? React.createElement(
      'label',
      {
        style: this.mergeAndPrefix(styles.floatingLabel, this.props.floatingLabelStyle),
        htmlFor: inputId },
      floatingLabelText
    ) : null;

    var inputProps = undefined;
    var inputElement = undefined;

    inputProps = {
      id: inputId,
      ref: this._getRef(),
      style: this.mergeAndPrefix(styles.input, this.props.inputStyle),
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      disabled: this.props.disabled,
      onKeyDown: this._handleInputKeyDown
    };

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }
    if (this.props.children) {
      inputElement = React.cloneElement(this.props.children, _extends({}, inputProps, this.props.children.props));
    } else {
      inputElement = multiLine ? React.createElement(EnhancedTextarea, _extends({}, other, inputProps, {
        rows: rows,
        onHeightChange: this._handleTextAreaHeightChange,
        textareaStyle: this.mergeAndPrefix(styles.textarea) })) : React.createElement('input', _extends({}, other, inputProps, {
        type: type }));
    }

    var underlineElement = this.props.disabled ? React.createElement('div', { style: this.mergeAndPrefix(styles.underlineAfter) }) : React.createElement('hr', { style: this.mergeAndPrefix(styles.underline) });
    var focusUnderlineElement = React.createElement('hr', { style: this.mergeAndPrefix(styles.focusUnderline) });

    return React.createElement(
      'div',
      { className: className, style: this.mergeAndPrefix(styles.root, this.props.style) },
      floatingLabelTextElement,
      hintTextElement,
      inputElement,
      underlineElement,
      focusUnderlineElement,
      errorTextElement
    );
  },

  blur: function blur() {
    if (this.isMounted()) this._getInputNode().blur();
  },

  clearValue: function clearValue() {
    this.setValue('');
  },

  focus: function focus() {
    if (this.isMounted()) this._getInputNode().focus();
  },

  getValue: function getValue() {
    return this.isMounted() ? this._getInputNode().value : undefined;
  },

  setErrorText: function setErrorText(newErrorText) {
    if (process.env.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
      console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
    } else if (this.isMounted()) {
      this.setState({ errorText: newErrorText });
    }
  },

  setValue: function setValue(newValue) {
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
    } else if (this.isMounted()) {
      if (this.props.multiLine) {
        this.refs[this._getRef()].setValue(newValue);
      } else {
        this._getInputNode().value = newValue;
      }

      this.setState({ hasValue: isValid(newValue) });
    }
  },

  _getRef: function _getRef() {
    return this.props.ref ? this.props.ref : 'input';
  },

  _getInputNode: function _getInputNode() {
    return this.props.children || this.props.multiLine ? this.refs[this._getRef()].getInputNode() : React.findDOMNode(this.refs[this._getRef()]);
  },

  _handleInputBlur: function _handleInputBlur(e) {
    this.setState({ isFocused: false });
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputChange: function _handleInputChange(e) {
    this.setState({ hasValue: isValid(e.target.value) });
    if (this.props.onChange) this.props.onChange(e);
  },

  _handleInputFocus: function _handleInputFocus(e) {
    if (this.props.disabled) return;
    this.setState({ isFocused: true });
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputKeyDown: function _handleInputKeyDown(e) {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) this.props.onEnterKeyDown(e);
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  },

  _handleTextAreaHeightChange: function _handleTextAreaHeightChange(e, height) {
    var newHeight = height + 24;
    if (this.props.floatingLabelText) newHeight += 24;
    React.findDOMNode(this).style.height = newHeight + 'px';
  },

  _isControlled: function _isControlled() {
    return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
  }

});

module.exports = TextField;