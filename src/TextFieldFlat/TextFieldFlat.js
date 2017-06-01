import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import shallowEqual from 'recompose/shallowEqual';
import transitions from '../styles/transitions';
import deprecated from '../utils/deprecatedPropType';
import EnhancedTextarea from './EnhancedTextarea';
import TextFieldHint from './TextFieldHint';
import warning from 'warning';

const getStyles = (props, context, state) => {
  const {
    baseTheme,
    textField: {
      disabledTextColor,
      errorColor,
    },
  } = context.muiTheme;


  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: (props.rows - 1) * 24 + 48,
      display: 'inline-block',
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,0)',
      fontFamily: baseTheme.fontFamily,
      transition: transitions.easeOut('200ms', 'height'),
    },
    background: {
      borderRadius: 3,
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'block',
      backgroundColor: state.errorText ? 'rgba(255, 0, 0, .35)' : 'rgba(255,255,255,.25)',
      paddingLeft: 12,
      paddingRight: 12,
      boxSizing: 'border-box',
    },
    error: {
      position: 'relative',
      bottom: 2,
      fontSize: 12,
      paddingTop: 8,
      paddingLeft: 12,
      paddingRight: 12,
      lineHeight: '12px',
      color: errorColor,
      transition: transitions.easeOut(),
    },
    input: {
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style)
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#fff',
      cursor: props.disabled ? 'not-allowed' : 'initial',
      font: 'inherit',
    },
    hint: {
      color: 'rgba(255,255,255,.8)',
      maxWidth: props.multiLine ? 'inherit' : '90%',
      overflow: 'hidden',
      display: 'block',
      'white-space': props.multiLine ? 'inherit' : 'nowrap',
    },
    textarea: {
    },
  };

  Object.assign(styles.error, props.errorStyle);

  if (state.errorText) {
    Object.assign(styles.background, props.backgroundErrorStyle);
  }

  Object.assign(styles.textarea, styles.input, {
    marginTop: 12,
    marginBottom: -12,
    boxSizing: 'border-box',
    font: 'inherit',
  });

  if (props.backgroundType === 'Dark') {
    styles.background.backgroundColor = state.errorText ? 'rgba(255,0,0,.15)' : 'rgba(0,0,0,.15)';
    styles.input.color = props.disabled ? disabledTextColor : '#333';
    styles.hint.color = 'rgba(0,0,0,.5)';
  }

  // Do not assign a height to the textarea as he handles it on his own.
  styles.input.height = '100%';

  return styles;
};

/**
 * Check if a value is valid to be displayed inside an input.
 *
 * @param The value to check.
 * @returns True if the string provided is valid, false otherwise.
 */
function isValid(value) {
  return value !== '' && value !== undefined && value !== null;
}

class TextFieldFlat extends Component {
  static propTypes = {
    /**
     * The style object to use to override the background during an error.
     */
    backgroundErrorStyle: PropTypes.object,
    /**
     * The style object to use to override background styles.
     */
    backgroundStyle: PropTypes.object,
    /**
     * Options for a light background or dark background
     */
    backgroundType: PropTypes.oneOf(['Light', 'Dark']),

    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The text string to use for the default value.
     */
    defaultValue: PropTypes.any,
    /**
     * Disables the text field if set to true.
     */
    disabled: PropTypes.bool,
    /**
     * The style object to use to override error styles.
     */
    errorStyle: PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: PropTypes.node,
    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: PropTypes.bool,
    /**
     * Override the inline-styles of the TextField's hint text element.
     */
    hintStyle: PropTypes.object,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * Override the inline-styles of the TextField's input element.
     * When multiLine is false: define the style of the input element.
     * When multiLine is true: define the style of the container of the textarea.
     */
    inputStyle: PropTypes.object,
    /**
     * If true, a textarea element will be rendered.
     * The textarea also grows and shrinks according to the number of lines.
     */
    multiLine: PropTypes.bool,
    /**
     * Name applied to the input.
     */
    name: PropTypes.string,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function that is fired when the textfield's value changes.
     */
    onChange: PropTypes.func,
    /**
     * The function to call when the user presses the Enter key.
     */
    onEnterKeyDown: deprecated(PropTypes.func,
      'Use onKeyDown and check for keycode instead. It will be removed with v0.16.0.'),
    /** @ignore */
    onFocus: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /**
     * Number of rows to display when multiLine option is set to true.
     */
    rows: PropTypes.number,
    /**
     * Maximum number of rows to display when
     * multiLine option is set to true.
     */
    rowsMax: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of the TextField's textarea element.
     * The TextField use either a textarea or an input,
     * this property has effects only when multiLine is true.
     */
    textareaStyle: PropTypes.object,
    /**
     * Specifies the type of input to display
     * such as "password" or "text".
     */
    type: PropTypes.string,
    /**
     * The value of the text field.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    disabled: false,
    multiLine: false,
    fullWidth: false,
    type: 'text',
    rows: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    isFocused: false,
    errorText: undefined,
    hasValue: false,
    isClean: true,
  };

  componentWillMount() {
    const {
      children,
      name,
      hintText,
      id,
    } = this.props;

    const propsLeaf = children ? children.props : this.props;

    this.setState({
      errorText: this.props.errorText,
      hasValue: isValid(propsLeaf.value) || isValid(propsLeaf.defaultValue),
    });

    warning(name || hintText || id, `We don't have enough information
      to build a robust unique id for the FlatTextField component. Please provide an id or a name.`);

    const uniqueId = `${name}-${hintText}-${
      Math.floor(Math.random() * 0xFFFF)}`;
    this.uniqueId = uniqueId.replace(/[^A-Za-z0-9-]/gi, '');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorText !== this.props.errorText) {
      this.setState({
        errorText: nextProps.errorText,
      });
    }

    if (nextProps.children && nextProps.children.props) {
      nextProps = nextProps.children.props;
    }

    if (nextProps.hasOwnProperty('value')) {
      const hasValue = isValid(nextProps.value) ||
        (this.state.isClean && isValid(nextProps.defaultValue));

      if (hasValue !== this.state.hasValue) {
        this.setState({
          hasValue: hasValue,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  blur() {
    if (this.input) this.getInputNode().blur();
  }

  focus() {
    if (this.input) this.getInputNode().focus();
  }

  select() {
    if (this.input) this.getInputNode().select();
  }

  getValue() {
    return this.input ? this.getInputNode().value : undefined;
  }

  getInputNode() {
    return (this.props.children || this.props.multiLine) ?
      this.input.getInputNode() : ReactDOM.findDOMNode(this.input);
  }

  handleInputBlur = (event) => {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleInputChange = (event) => {
    this.setState({hasValue: isValid(event.target.value), isClean: false});
    if (this.props.onChange) this.props.onChange(event, event.target.value);
  };

  handleInputFocus = (event) => {
    if (this.props.disabled)
      return;
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleInputKeyDown = (event) => {
    if (keycode(event) === 'enter' && this.props.onEnterKeyDown) this.props.onEnterKeyDown(event);
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  };

  handleHeightChange = (event, height) => {
    const newHeight = height + 24;
    ReactDOM.findDOMNode(this).style.height = `${newHeight}px`;
  };

  _isControlled() {
    return this.props.hasOwnProperty('value');
  }

  render() {
    const {
      backgroundStyle,
      backgroundType, // eslint-disable-line no-unused-vars
      children,
      className,
      disabled, // eslint-disable-line no-unused-vars
      errorStyle, // eslint-disable-line no-unused-vars
      backgroundErrorStyle, // eslint-disable-line no-unused-vars
      errorText, // eslint-disable-line no-unused-vars
      fullWidth, // eslint-disable-line no-unused-vars
      hintText,
      hintStyle,
      id,
      inputStyle,
      multiLine,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      style,
      type,
      rows,
      rowsMax,
      textareaStyle,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const inputId = id || this.uniqueId;

    const errorTextElement = this.props.errorText && (
      <div style={prepareStyles(styles.error)}>{this.props.errorText}</div>
    );

    const inputProps = {
      id: inputId,
      ref: (elem) => this.input = elem,
      disabled: this.props.disabled,
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      onKeyDown: this.handleInputKeyDown,
    };

    const inputStyleMerged = Object.assign(styles.input, inputStyle);

    let inputElement;
    if (children) {
      inputElement = React.cloneElement(children,
        {
          ...inputProps,
          ...children.props,
          style: Object.assign(inputStyleMerged, children.props.style),
        });
    } else {
      inputElement = multiLine ? (
        <EnhancedTextarea
          {...other}
          {...inputProps}
          style={inputStyleMerged}
          rows={rows}
          rowsMax={rowsMax}
          onHeightChange={this.handleHeightChange}
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

    let rootProps = {};

    if (children) {
      rootProps = other;
    }

    return (
      <div
        {...rootProps}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
      >
        <div style={Object.assign(styles.background, backgroundStyle)}>
          {hintText ?
            <TextFieldHint
              muiTheme={this.context.muiTheme}
              show={!(this.state.hasValue)}
              style={Object.assign(styles.hint, hintStyle)}
              text={hintText}
            /> :
            null
          }
          {inputElement}
        </div>
        {errorTextElement}
      </div>
    );
  }
}

export default TextFieldFlat;
