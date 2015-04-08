var React = require('react');
var ColorManipulator = require('./utils/color-manipulator');
var Colors = require('./styles/colors');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var DomIdable = require('./mixins/dom-idable');
var EnhancedTextarea = require('./enhanced-textarea');

var TextField = React.createClass({

  mixins: [StylePropable, DomIdable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },

  getInitialState: function() {
    return {
      errorText: this.props.errorText,
      hasValue: this.props.value || this.props.defaultValue ||
        (this.props.valueLink && this.props.valueLink.value)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var hasErrorProp = nextProps.hasOwnProperty('errorText');
    var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    var hasValueProp = nextProps.hasOwnProperty('value');
    var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
    var newState = {};

    if (hasValueProp) {
      newState.hasValue = nextProps.value;
    } else if (hasValueLinkProp) {
      newState.hasValue = nextProps.valueLink.value;
    } else if (hasNewDefaultValue) {
      newState.hasValue = nextProps.defaultValue;
    }

    if (hasErrorProp) newState.errorText = nextProps.errorText;
    if (newState) this.setState(newState);
  },

  /** Styles */
  errorColor: Colors.red500,

  _getDisabledTextColor: function() {
    return ColorManipulator.fade(this.context.theme.textColor, 0.3);
  },

  _main: function() {
    return this.mergeAndPrefix({
      fontSize: '16px',
      lineHeight: '24px',
      width: (64 * 4),
      height: (this.props.floatingLabelText) ? 72 : 48,
      display: 'inline-block',
      position: 'relative',
      fontFamily: CustomVariables.contentFontFamily,
      transition: Transitions.easeOut('200ms', 'height'),
    });
  },

  _error: function() {
    return {
      position: 'absolute',
      bottom: -10,
      fontSize: '12px',
      lineHeight: '12px',
      color: this.errorColor,
      transition: Transitions.easeOut(),
    };
  },

  _floatingLabel: function() {
    var style = this.mergeAndPrefix(this._hint(), {
      top: 24,
      opacity: 1,
      transform: 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top',
   });

    if (this.state.isFocused) style.color = this.context.theme.primary1Color;
    if (this.state.hasValue) style.color = ColorManipulator.fade(this.context.theme.textColor, 0.5);
    if (this.state.isFocused || this.state.hasValue) style.transform = 'scale(0.75) translate3d(0, -18px, 0)';
    if (this.props.errorText && this.state.isFocused) style.color = this.errorColor;

    return style;
  },

  _hint: function() {
    var style = {
      position: 'absolute',
      lineHeight: '48px',
      opacity: 1,
      color: this._getDisabledTextColor(),
      transition: Transitions.easeOut(),
    };

    if (this.props.disabled) style.color = this._getDisabledTextColor();
    if (this.state.hasValue) style.opacity = 0;
    if (this.props.floatingLabelText) {
      style.top = 24;
      style.opacity = 0;
      if (this.state.isFocused && !this.state.hasValue) style.opacity = 1;
    }

    return style;
  },

  _input: function() {
    var style = {
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      position: 'relative',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: this.context.theme.textColor,
      font: 'inherit',
    };

    if (this.props.disabled) style.color = this._getDisabledTextColor();
    if (this.props.floatingLabelText) style.boxSizing = 'border-box';
    if (this.props.floatingLabelText && !this.props.multiLine) style.paddingTop = 26;

    return style;
  },

  _textarea: function() {
    return this.mergeAndPrefix(this._input(), {
      paddingTop: this.props.floatingLabelText ? 36 : 12,
      boxSizing: 'border-box',
      font: 'inherit',
    });

  },

  _underline: function() {
    return {
      border: 'none',
      borderBottom: 'solid 1px ' + CustomVariables.borderColor,
      position: 'absolute',
      width: '100%',
      bottom: 8,
      margin: 0,
      MozBoxSizing: 'content-box',
      boxSizing: 'content-box',
      height: 0,
    };
  },

  //hack because border style dotted just doesn't look right
  //border-bottom-style: dotted;
  _underlineAfter: function() {
    return this.mergeAndPrefix({
      position: 'absolute',
      userSelect: 'none',
      cursor: 'default',
      bottom: 0,
      color: this._getDisabledTextColor(),
    }, null);
  },

  _focusUnderline: function() {
    var style = this.mergeAndPrefix(this._underline(), {
      borderBottom: 'solid 2px ' + this.context.theme.primary1Color,
      transform: 'scaleX(0)',
      transition: Transitions.easeOut(),
    });

    if (this.props.errorText) style.borderColor = this.errorColor;
    if (this.props.errorText || this.state.isFocused) style.transform = 'scaleX(1)';
    
    return style;
  },

  render: function() {
    var {
      className,
      errorText,
      floatingLabelText,
      hintText,
      id,
      multiLine,
      onBlur,
      onChange,
      onFocus,
      type,
      ...other
    } = this.props;

    var inputId = this.props.id || this.getDomId();

    var errorTextElement = this.state.errorText ? (
      <div style={this._error()}>{this.state.errorText}</div>
    ) : null;

    var hintTextElement = this.props.hintText ? (
      <div style={this._hint()}>{this.props.hintText}</div>
    ) : null;

    var floatingLabelTextElement = this.props.floatingLabelText ? (
      <label
        style={this._floatingLabel()}
        htmlFor={inputId}>
        {this.props.floatingLabelText}
      </label>
    ) : null;

    var inputProps;
    var inputElement;

    inputProps = {
      id: inputId,
      ref: 'input',
      style: this._input(),
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      onKeyDown: this._handleInputKeyDown
    };

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }

    inputElement = this.props.multiLine ? (
      <EnhancedTextarea
        {...other}
        {...inputProps}
        onHeightChange={this._handleTextAreaHeightChange}
        textareaStyle={this._textarea()} />
    ) : (
      <input
        {...other}
        {...inputProps}
        type={this.props.type} />
    );

    var underlineElement = this.props.disabled ? (
      <div style={this._underlineAfter()}>
        .............................................................
      </div>
    ) : (
      <hr style={this._underline()}/>
    );
    var focusUnderlineElement = <hr style={this._focusUnderline()} />;


    var rootStyle = this._main();

    return (
      <div className={this.props.className} style={rootStyle}>
        {floatingLabelTextElement}
        {hintTextElement}
        {inputElement}
        {underlineElement}
        {focusUnderlineElement}
        {errorTextElement}
      </div>
    );
  },

  blur: function() {
    if (this.isMounted()) this._getInputNode().blur();
  },

  clearValue: function() {
    this.setValue('');
  },

  focus: function() {
    if (this.isMounted()) this._getInputNode().focus();
  },

  getValue: function() {
    return this.isMounted() ? this._getInputNode().value : undefined;
  },

  setErrorText: function(newErrorText) {
    if (process.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
      console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
    } else if (this.isMounted()) {
      this.setState({errorText: newErrorText});
    }
  },

  setValue: function(newValue) {
    if (process.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
    } else if (this.isMounted()) {
      this._getInputNode().value = newValue;
      this.setState({hasValue: newValue});
    }
  },

  _getInputNode: function() {
    return this.props.multiLine ? 
      this.refs.input.getInputNode() : this.refs.input.getDOMNode();
  },

  _handleInputBlur: function(e) {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputChange: function(e) {
    this.setState({hasValue: e.target.value});
    if (this.props.onChange) this.props.onChange(e);
  },

  _handleInputFocus: function(e) {
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputKeyDown: function(e) {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) this.props.onEnterKeyDown(e);
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  },

  _handleTextAreaHeightChange: function(e, height) {
    var newHeight = height + 24;
    if (this.props.floatingLabelText) newHeight += 24;
    this.getDOMNode().style.height = newHeight + 'px';
  },

  _isControlled: function() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  }

});

module.exports = TextField;
