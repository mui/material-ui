import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import deprecated from '../utils/deprecatedPropType';
import EnhancedTextarea from '../enhanced-textarea';
import getMuiTheme from '../styles/getMuiTheme';
import TextFieldDecorator from './TextFieldDecorator';
import warning from 'warning';

const getStyles = (props, state) => {
  const {
    textField: {
      textColor,
      disabledTextColor,
    },
  } = state.muiTheme;

  const styles = {
    input: {
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      padding: 0,
      position: 'relative',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: props.disabled ? disabledTextColor : textColor,
      font: 'inherit',
    },
    textarea: {
      marginTop: 12,
      marginBottom: -20,
    },
  };

  Object.assign(styles.textarea, styles.input, {
    boxSizing: 'border-box',
    font: 'inherit',
  });

  return styles;
};

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
     * When multiLine is false: define the style of the input element.
     * When multiLine is true: define the style of the container of the textarea.
     */
    inputStyle: React.PropTypes.object,

    /**
     * If true, a textarea element will be rendered.
     * The textarea also grows and shrinks according to the number of lines.
     */
    multiLine: React.PropTypes.bool,

    /**
     * Name applied to the input.
     */
    name: React.PropTypes.string,

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
    onEnterKeyDown: deprecated(React.PropTypes.func,
      'Use onKeyDown and check for keycode instead.'),

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
     * Override the inline-styles of the TextField's textarea element.
     * The TextField use either a textarea or an input,
     * this property has effects only when multiLine is true.
     */
    textareaStyle: React.PropTypes.object,

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
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
    const props = (this.props.children) ? this.props.children.props : this.props;

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

  componentWillMount() {
    const {
      name,
      hintText,
      floatingLabelText,
      id,
    } = this.props;

    warning(name || hintText || floatingLabelText || id, `We don''t have enough information
      to build a robust unique id for the TextField component. Please provide an id or a name.`);

    const uniqueId = `${name}-${hintText}-${floatingLabelText}-${
      Math.floor(Math.random() * 0xFFFF)}`;
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newState = {
      errorText: nextProps.errorText,
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    };

    if (nextProps.children && nextProps.children.props) {
      nextProps = nextProps.children.props;
    }

    const hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    const hasValueProp = nextProps.hasOwnProperty('value');

    if (hasValueLinkProp) {
      newState.hasValue = isValid(nextProps.valueLink.value);
    } else if (hasValueProp) {
      newState.hasValue = isValid(nextProps.value);
    }

    if (newState) this.setState(newState);
  },

  blur() {
    if (this.input) this._getInputNode().blur();
  },

  focus() {
    if (this.input) this._getInputNode().focus();
  },

  getValue() {
    return this.input ? this._getInputNode().value : undefined;
  },

  _getInputNode() {
    return (this.props.children || this.props.multiLine) ?
      this.input.getInputNode() : ReactDOM.findDOMNode(this.input);
  },

  _handleInputBlur(event) {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(event);
  },

  _handleInputChange(event) {
    this.setState({hasValue: isValid(event.target.value)});
    if (this.props.onChange) this.props.onChange(event);
  },

  _handleInputFocus(event) {
    if (this.props.disabled)
      return;
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(event);
  },

  _handleInputKeyDown(event) {
    if (keycode(event) === 'enter' && this.props.onEnterKeyDown) this.props.onEnterKeyDown(event);
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  },

  _handleTextAreaHeightChange(event, height) {
    this.setState({height});
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

  render() {
    const {
      id,
      inputStyle,
      multiLine,
      type,
      rows,
      rowsMax,
      textareaStyle,
      ...other,
    } = this.props;

    const {
      isFocused,
      hasValue,
      height,
      muiTheme,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const inputId = id || this.uniqueId;

    const inputProps = {
      id: inputId,
      ref: (elem) => this.input = elem,
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      disabled: this.props.disabled,
      onKeyDown: this._handleInputKeyDown,
    };

    const inputStyleMerged = Object.assign(styles.input, inputStyle);
    const computedHeight = height || (rows) * 24;   // multiLine stuff really

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }

    let inputElement;
    if (this.props.children) {
      inputElement = React.cloneElement(this.props.children,
        {
          ...inputProps,
          ...this.props.children.props,
          style: Object.assign(inputStyleMerged, this.props.children.props.style),
        });
    } else {
      inputElement = multiLine ? (
        <EnhancedTextarea
          {...other}
          {...inputProps}
          style={inputStyleMerged}
          rows={rows}
          rowsMax={rowsMax}
          onHeightChange={this._handleTextAreaHeightChange}
          textareaStyle={Object.assign(styles.textarea, textareaStyle)}
        />
      ) : (
        <input
          {...other}
          {...inputProps}
          style={prepareStyles(inputStyleMerged)}
          type={type}
        />
      );
    }

    return (
      <TextFieldDecorator
        {...this.props}
        id={inputId}
        isFocused={isFocused}
        height={computedHeight}
        hasValue={hasValue}
        muiTheme={muiTheme}
      >
        {inputElement}
      </TextFieldDecorator>
    );
  },

});

export default TextField;
