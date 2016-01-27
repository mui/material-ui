import React from 'react';
import ReactDOM from 'react-dom';
import ColorManipulator from '../utils/color-manipulator';
import StylePropable from '../mixins/style-propable';
import Transitions from '../styles/transitions';
import UniqueId from '../utils/unique-id';
import EnhancedTextarea from '../enhanced-textarea';
import getMuiTheme from '../styles/getMuiTheme';
import ContextPure from '../mixins/context-pure';
import TextFieldHint from './TextFieldHint';
import TextFieldLabel from './TextFieldLabel';
import TextFieldUnderline from './TextFieldUnderline';
import warning from 'warning';

/**
 * Check if a value is valid to be displayed inside an input.
 *
 * @param The value to check.
 * @returns True if the string provided is valid, false otherwise.
 */
function isValid(value) {
  return Boolean(value || value === 0);
}

const TextField = React.createClass({

  propTypes: {
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The text string to use for the default value.
     */
    defaultValue: React.PropTypes.any,

    /**
     * Disables the text field if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * The style object to use to override error styles.
     */
    errorStyle: React.PropTypes.object,

    /**
     * The error content to display.
     */
    errorText: React.PropTypes.node,

    /**
     * The style object to use to override floating label styles.
     */
    floatingLabelStyle: React.PropTypes.object,

    /**
     * The content to use for the floating label element.
     */
    floatingLabelText: React.PropTypes.node,

    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: React.PropTypes.bool,

    /**
     * Override the inline-styles of the TextField's hint text element.
     */
    hintStyle: React.PropTypes.object,

    /**
     * The hint content to display.
     */
    hintText: React.PropTypes.node,

    /**
     * The id prop for the text field.
     */
    id: React.PropTypes.string,

    /**
     * Override the inline-styles of the TextField's input element.
     */
    inputStyle: React.PropTypes.object,

    /**
     * If true, a textarea element will be rendered.
     * The textarea also grows and shrinks according to the number of lines.
     */
    multiLine: React.PropTypes.bool,

    /**
     * Callback function that is fired when the textfield loses focus.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function that is fired when the textfield's value changes.
     */
    onChange: React.PropTypes.func,

    /**
     * The function to call when the user presses the Enter key.
     */
    onEnterKeyDown: React.PropTypes.func,

    /**
     * Callback function that is fired when the textfield gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function fired when key is pressed down.
     */
    onKeyDown: React.PropTypes.func,

    /**
     * Number of rows to display when multiLine option is set to true.
     */
    rows: React.PropTypes.number,

    /**
     * Maximum number of rows to display when
     * multiLine option is set to true.
     */
    rowsMax: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Specifies the type of input to display
     * such as "password" or "text".
     */
    type: React.PropTypes.string,

    /**
     * Override the inline-styles of the
     * TextField's underline element when disabled.
     */
    underlineDisabledStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the TextField's
     * underline element when focussed.
     */
    underlineFocusStyle: React.PropTypes.object,

    /**
     * If true, shows the underline for the text field.
     */
    underlineShow: React.PropTypes.bool,

    /**
     * Override the inline-styles of the TextField's underline element.
     */
    underlineStyle: React.PropTypes.object,

    /**
     * The value of the text field.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    ContextPure,
    StylePropable,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      const textFieldTheme = muiTheme.textField;

      return {
        floatingLabelColor: textFieldTheme.floatingLabelColor,
        focusColor: textFieldTheme.focusColor,
        textColor: textFieldTheme.textColor,
        disabledTextColor: textFieldTheme.disabledTextColor,
        backgroundColor: textFieldTheme.backgroundColor,
        hintColor: textFieldTheme.hintColor,
        errorColor: textFieldTheme.errorColor,
      };
    },
    getChildrenClasses() {
      return [
        EnhancedTextarea,
      ];
    },
  },

  getDefaultProps() {
    return {
      disabled: false,
      multiLine: false,
      fullWidth: false,
      type: 'text',
      underlineShow: true,
      rows: 1,
    };
  },

  getInitialState() {
    let props = (this.props.children) ? this.props.children.props : this.props;

    return {
      isFocused: false,
      errorText: this.props.errorText,
      hasValue: isValid(props.value) || isValid(props.defaultValue) ||
        (props.valueLink && isValid(props.valueLink.value)),
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._uniqueId = UniqueId.generate();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    newState.muiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    newState.errorText = nextProps.errorText;
    if (nextProps.children && nextProps.children.props) {
      nextProps = nextProps.children.props;
    }

    let hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    let hasValueProp = nextProps.hasOwnProperty('value');
    let hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;

    if (hasValueLinkProp) {
      newState.hasValue = isValid(nextProps.valueLink.value);
    } else if (hasValueProp) {
      newState.hasValue = isValid(nextProps.value);
    } else if (hasNewDefaultValue) {
      newState.hasValue = isValid(nextProps.defaultValue);
    }

    if (newState) this.setState(newState);
  },

  getStyles() {
    const props = this.props;
    const {
      floatingLabelColor,
      focusColor,
      textColor,
      disabledTextColor,
      backgroundColor,
      hintColor,
      errorColor,
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    let styles = {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: props.fullWidth ? '100%' : 256,
        height: (props.rows - 1) * 24 + (props.floatingLabelText ? 72 : 48),
        display: 'inline-block',
        position: 'relative',
        backgroundColor: backgroundColor,
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        transition: Transitions.easeOut('200ms', 'height'),
      },
      error: {
        position: 'relative',
        bottom: 2,
        fontSize: 12,
        lineHeight: '12px',
        color: errorColor,
        transition: Transitions.easeOut(),
      },
      floatingLabel: {
        color: hintColor,
      },
      input: {
        tapHighlightColor: 'rgba(0,0,0,0)',
        padding: 0,
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: props.disabled ? disabledTextColor : textColor,
        font: 'inherit',
      },
    };

    styles.error = this.mergeStyles(styles.error, props.errorStyle);

    styles.textarea = this.mergeStyles(styles.input, {
      marginTop: props.floatingLabelText ? 36 : 12,
      marginBottom: props.floatingLabelText ? -36 : -12,
      boxSizing: 'border-box',
      font: 'inherit',
    });

    if (this.state.isFocused) {
      styles.floatingLabel.color = focusColor;
    }

    if (this.state.hasValue) {
      styles.floatingLabel.color = ColorManipulator.fade(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);
    }

    if (props.floatingLabelText) {
      styles.input.boxSizing = 'border-box';

      if (!props.multiLine) {
        styles.input.marginTop = 14;
      }

      if (this.state.errorText) {
        styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
      }
    }

    if (this.state.errorText) {
      if (this.state.isFocused) {
        styles.floatingLabel.color = styles.error.color;
      }
    }

    return styles;
  },

  blur() {
    if (this.isMounted()) this._getInputNode().blur();
  },

  clearValue() {
    this.setValue('');
  },

  focus() {
    if (this.isMounted()) this._getInputNode().focus();
  },

  getValue() {
    return this.isMounted() ? this._getInputNode().value : undefined;
  },

  setErrorText(newErrorText) {
    warning(false, 'setErrorText() method is deprecated. Use the errorText property instead.');

    if (this.isMounted()) {
      this.setState({errorText: newErrorText});
    }
  },

  setValue(newValue) {
    warning(false,
      `setValue() method is deprecated. Use the defaultValue property instead.
      Or use the TextField as a controlled component with the value property.`);

    if (this.isMounted()) {
      if (this.props.multiLine) {
        this.refs.input.setValue(newValue);
      } else {
        this._getInputNode().value = newValue;
      }

      this.setState({hasValue: isValid(newValue)});
    }
  },

  _getInputNode() {
    return (this.props.children || this.props.multiLine) ?
      this.refs.input.getInputNode() : ReactDOM.findDOMNode(this.refs.input);
  },

  _handleInputBlur(e) {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputChange(e) {
    this.setState({hasValue: isValid(e.target.value)});
    if (this.props.onChange) this.props.onChange(e);
  },

  _handleInputFocus(e) {
    if (this.props.disabled)
      return;
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputKeyDown(e) {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) this.props.onEnterKeyDown(e);
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  },

  _handleTextAreaHeightChange(e, height) {
    let newHeight = height + 24;
    if (this.props.floatingLabelText) newHeight += 24;
    ReactDOM.findDOMNode(this).style.height = newHeight + 'px';
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

  render() {
    let {
      className,
      disabled,
      errorStyle,
      errorText,
      floatingLabelText,
      fullWidth,
      hintText,
      hintStyle,
      id,
      multiLine,
      onBlur,
      onChange,
      onFocus,
      style,
      type,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineShow,
      underlineStyle,
      rows,
      rowsMax,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    let inputId = id || this._uniqueId;

    let errorTextElement = this.state.errorText ? (
      <div style={this.prepareStyles(styles.error)}>{this.state.errorText}</div>
    ) : null;

    let floatingLabelTextElement = floatingLabelText ? (
      <TextFieldLabel
        muiTheme={this.state.muiTheme}
        style={this.mergeStyles(styles.floatingLabel, this.props.floatingLabelStyle)}
        htmlFor={inputId}
        shrink={this.state.hasValue || this.state.isFocused}
        disabled={disabled}
        onTouchTap={this.focus}
      >
        {floatingLabelText}
      </TextFieldLabel>
    ) : null;

    let inputProps;
    let inputElement;

    inputProps = {
      id: inputId,
      ref: 'input',
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      disabled: this.props.disabled,
      onKeyDown: this._handleInputKeyDown,
    };
    const inputStyle = this.mergeStyles(styles.input, this.props.inputStyle);

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }

    if (this.props.children) {
      inputElement = React.cloneElement(this.props.children,
        {
          ...inputProps,
          ...this.props.children.props,
          style: this.mergeStyles(inputStyle, this.props.children.props.style),
        });
    } else {
      inputElement = multiLine ? (
        <EnhancedTextarea
          {...other}
          {...inputProps}
          style={inputStyle}
          rows={rows}
          rowsMax={rowsMax}
          onHeightChange={this._handleTextAreaHeightChange}
          textareaStyle={styles.textarea}
        />
      ) : (
        <input
          {...other}
          {...inputProps}
          style={this.prepareStyles(inputStyle)}
          type={type}
        />
      );
    }

    return (
      <div className={className} style={this.prepareStyles(styles.root, this.props.style)}>
        {floatingLabelTextElement}
        {hintText ?
          <TextFieldHint
            muiTheme={this.state.muiTheme}
            show={!(this.state.hasValue || (floatingLabelText && !this.state.isFocused))}
            style={hintStyle}
            text={hintText}
          /> :
          null
        }
        {inputElement}
        {underlineShow ?
          <TextFieldUnderline
            disabled={disabled}
            disabledStyle={underlineDisabledStyle}
            error={this.state.errorText ? true : false}
            errorStyle={errorStyle}
            focus={this.state.isFocused}
            focusStyle={underlineFocusStyle}
            muiTheme={this.state.muiTheme}
            style={underlineStyle}
          /> :
          null
        }
        {errorTextElement}
      </div>
    );
  },

});

export default TextField;
