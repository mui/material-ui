var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedTextarea = require('./enhanced-textarea.jsx');

var TextField = React.createClass({

  mixins: [Classable],

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabels: React.PropTypes.bool,
    hintText: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    type: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },

  getInitialState: function() {
    return {
      errorText: this.props.errorText,
      hasValue: this.props.value || this.props.defaultValue
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var hasErrorProp = nextProps.hasOwnProperty('errorText');
    var hasValueProp = nextProps.hasOwnProperty('value');
    var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
    var newState = {};

    if (hasValueProp) {
      newState.hasValue = nextProps.value;
    } else if (hasNewDefaultValue) {
      newState.hasValue = nextProps.defaultValue;
    }

    if (hasErrorProp) newState.errorText = nextProps.errorText;
    if (newState) this.setState(newState);
  },

  render: function() {
    var {
      className,
      errorText,
      floatingLabels,
      hintText,
      multiLine,
      onBlur,
      onChange,
      onFocus,
      type,
      ...other
    } = this.props;

    var classes = this.getClasses('mui-text-field', {
      'mui-has-error': this.props.errorText,
      'mui-has-floating-labels': this.props.floatingLabels,
      'mui-has-value': this.state.hasValue,
      'mui-is-disabled': this.props.disabled,
      'mui-is-focused': this.state.isFocused,
      'mui-is-multiLine': this.props.multiLine
    });

    var errorTextElement;
    var hintTextElement;

    if (this.state.errorText) errorTextElement = (
      <div className="mui-text-field-error">{this.state.errorText}</div>
    );

    if (this.props.hintText) hintTextElement = (
      <div className="mui-text-field-hint">{this.props.hintText}</div>
    );

    var inputElement = this.props.multiLine ? (
      <EnhancedTextarea
        {...other}
        ref="input"
        className="mui-text-field-input"
        onBlur={this._handleInputBlur}
        onChange={this._handleInputChange}
        onHeightChange={this._handleTextAreaHeightChange}
        onFocus={this._handleInputFocus}
        textareaClassName="mui-text-field-textarea" />
    ) : (
      <input
        {...other}
        ref="input"
        className="mui-text-field-input"
        onBlur={this._handleInputBlur}
        onChange={this._handleInputChange}
        onFocus={this._handleInputFocus}
        type={this.props.type} />
    );

    return (
      <div className={classes}>

        {hintTextElement}

        {inputElement}

        <hr className="mui-text-field-underline" />
        <hr className="mui-text-field-focus-underline" />

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
    if (this.props.hasOwnProperty('errorText')) {
      console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
    } else if (this.isMounted()) {
      this.setState({
        errorText: newErrorText
      });
    }
  },

  setValue: function(newValue) {
    if (this.props.hasOwnProperty('value')) {
      console.error('Cannot call TextField.setValue when value is defined as a property.');
    } else if (this.isMounted()) {
      this._getInputNode().value = newValue;
      this.setState({
        hasValue: newValue
      });
    }
  },

  _getInputNode: function() {
    return this.refs.input.getDOMNode();
  },

  _handleInputBlur: function(e) {
    this.setState({
      isFocused: false
    });
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputChange: function(e) {
    if (!this.props.hasOwnProperty('value')) {
      this.setState({
        hasValue: e.target.value
      });
      if (this.props.onChange) this.props.onChange(e);
    }
  },

  _handleInputFocus: function(e) {
    this.setState({
      isFocused: true
    });
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleTextAreaHeightChange: function(e, height) {
    var newHeight = height + 24;
    if (this.props.floatingLabels) newHeight += 24;
    this.getDOMNode().style.height = newHeight + 'px';
  }

});

module.exports = TextField;