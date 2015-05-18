var React = require('react');
var ColorManipulator = require('./utils/color-manipulator');
var Colors = require('./styles/colors');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var EnhancedTextarea = require('./enhanced-textarea');

var TextField = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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

  errorColor: Colors.red500,

  _getDisabledTextColor: function() {
    return this.getTheme().disabledColor;
  },

  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getStyles: function() {
    var styles = {
      root: {
        fontSize: '16px',
        lineHeight: '24px',
        width: (64 * 4),
        height: (this.props.floatingLabelText) ? 72 : 48,
        display: 'inline-block',
        position: 'relative',
        fontFamily: this.context.muiTheme.contentFontFamily,
        transition: Transitions.easeOut('200ms', 'height')
      },
      error: {
        position: 'absolute',
        bottom: -10,
        fontSize: '12px',
        lineHeight: '12px',
        color: this.errorColor,
        transition: Transitions.easeOut(),
      },
      hint: {
        position: 'absolute',
        lineHeight: '48px',
        opacity: 1,
        color: this._getDisabledTextColor(),
        transition: Transitions.easeOut()            
      },
      input: {
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: this.getTheme().textColor,
        font: 'inherit'
      },
      underline: {
        border: 'none',
        borderBottom: 'solid 1px ' + this.getTheme().borderColor,
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
        userSelect: 'none',
        cursor: 'default',
        bottom: 0,
        color: this._getDisabledTextColor()
      }
    };

    styles.floatingLabel = this.mergeAndPrefix(styles.hint, {
      top: 24,
      opacity: 1,
      transform: 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top'
    });

    styles.textarea = this.mergeAndPrefix(styles.input, {
      paddingTop: this.props.floatingLabelText ? 36 : 12,
      boxSizing: 'border-box',
      font: 'inherit'
    });

    styles.focusUnderline= this.mergeAndPrefix(styles.underline, {
      borderBottom: 'solid 2px ' + this.getTheme().primary1Color,
      transform: 'scaleX(0)',
      transition: Transitions.easeOut(),
    });


    if (this.props.disabled) {
      styles.hint.color = this._getDisabledTextColor();
      styles.input.color = this._getDisabledTextColor();
    }

    if (this.state.isFocused) {
      styles.floatingLabel.color = this.getTheme().primary1Color;
      styles.floatingLabel.transform = 'scale(0.75) translate3d(0, -18px, 0)';
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    if (this.state.hasValue) {
      styles.floatingLabel.color = ColorManipulator.fade(this.getTheme().textColor, 0.5);
      styles.floatingLabel.transform = 'scale(0.75) translate3d(0, -18px, 0)';
      styles.hint.opacity = 0;
    }

    if (this.props.floatingLabelText) {
      styles.hint.top = 24;
      styles.hint.opacity = 0;
      styles.input.boxSizing = 'border-box';
      if (this.state.isFocused && !this.state.hasValue) styles.hint.opacity = 1;
    }

    if (this.props.errorText && this.state.isFocused) styles.floatingLabel.color = this.errorColor;
    if (this.props.floatingLabelText && !this.props.multiLine) styles.input.paddingTop = 26;

    if (this.props.errorText) {
      styles.focusUnderline.borderColor = this.errorColor;
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    return styles;
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

    var styles = this.getStyles();

    var inputId = this.props.id || UniqueId.generate();

    var errorTextElement = this.state.errorText ? (
      <div style={this.mergeAndPrefix(styles.error)}>{this.state.errorText}</div>
    ) : null;

    var hintTextElement = this.props.hintText ? (
      <div style={this.mergeAndPrefix(styles.hint)}>{this.props.hintText}</div>
    ) : null;

    var floatingLabelTextElement = this.props.floatingLabelText ? (
      <label
        style={this.mergeAndPrefix(styles.floatingLabel)}
        htmlFor={inputId}>
        {this.props.floatingLabelText}
      </label>
    ) : null;

    var inputProps;
    var inputElement;

    inputProps = {
      id: inputId,
      ref: this._getRef(),
      style: this.mergeAndPrefix(styles.input),
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
        textareaStyle={this.mergeAndPrefix(styles.textarea)} />
    ) : (
      <input
        {...other}
        {...inputProps}
        type={this.props.type} />
    );

    var underlineElement = this.props.disabled ? (
      <div style={this.mergeAndPrefix(styles.underlineAfter)}>
        .............................................................
      </div>
    ) : (
      <hr style={this.mergeAndPrefix(styles.underline)}/>
    );
    var focusUnderlineElement = <hr style={this.mergeAndPrefix(styles.focusUnderline)} />;


    return (
      <div className={this.props.className} style={this.mergeAndPrefix(styles.root, this.props.style)}>
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
    if (process.env.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
      console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
    } else if (this.isMounted()) {
      this.setState({errorText: newErrorText});
    }
  },

  setValue: function(newValue) {
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
    } else if (this.isMounted()) {
      this._getInputNode().value = newValue;
      this.setState({hasValue: newValue});
    }
  },

  _getRef: function() {
    return this.props.ref ? this.props.ref : 'input';
  },

  _getInputNode: function() {
    return this.props.multiLine ?
      this.refs[this._getRef()].getInputNode() : React.findDOMNode(this.refs[this._getRef()]);
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
    React.findDOMNode(this).style.height = newHeight + 'px';
  },

  _isControlled: function() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  }

});

module.exports = TextField;
