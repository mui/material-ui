// @flow weak

import React from 'react';
import type { Node, ComponentType } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { isMuiComponent } from '../utils/reactHelpers';
import Textarea from './Textarea';

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
export function hasValue(value: ?(number | string | Array<*>)) {
  return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is dirty (a.k.a. filled).
//
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
export function isDirty(obj, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
export function isAdornedStart(obj) {
  return obj.startAdornment;
}

export const styles = (theme: Object) => {
  const placeholder = {
    color: 'currentColor',
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.ease,
    }),
  };
  const placeholderHidden = {
    opacity: 0,
  };
  const placeholderVisible = {
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
  };

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      alignItems: 'baseline',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.inputText,
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2,
      },
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)',
      },
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.A400,
        transform: 'scaleX(1)', // error is always underlined in red
      },
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      // slight alteration to spec spacing to match visual spec result
      padding: `${theme.spacing.unit - 1}px 0 ${theme.spacing.unit + 1}px`,
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      display: 'block',
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0,
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none',
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        appearance: 'none',
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden, // IE 11
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
      },
    },
    inputDense: {
      paddingTop: theme.spacing.unit / 2,
    },
    disabled: {
      color: theme.palette.text.disabled,
    },
    focused: {},
    underline: {
      '&:before': {
        backgroundColor: theme.palette.input.bottomLine,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2,
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: `linear-gradient(to right, ${theme.palette.input
          .bottomLine} 33%, transparent 0%)`,
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px',
      },
    },
    multiline: {
      padding: `${theme.spacing.unit - 2}px 0 ${theme.spacing.unit - 1}px`,
    },
    inputDisabled: {
      opacity: 1, // Reset iOS opacity
    },
    inputSingleline: {
      height: '1em',
    },
    inputSearch: {
      appearance: 'textfield', // Improve type search style.
    },
    inputMultiline: {
      resize: 'none',
      padding: 0,
    },
    fullWidth: {
      width: '100%',
    },
  };
};

type ProvidedProps = {
  classes: Object,
  disableUnderline: boolean,
  fullWidth: boolean,
  multiline: boolean,
  type: string,
};

export type Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, it's more like an autofill.
   * You can learn more about it in this article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete?: string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus?: boolean,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * The CSS class name of the wrapper element.
   */
  className?: string,
  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue?: string | number,
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: Node,
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error?: boolean,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean,
  /**
   * The id of the `input` element.
   */
  id?: string,
  /**
   * The component used for the input node.
   * Either a string to use a DOM element or a component.
   * It's an `input` by default.
   */
  inputComponent?: string | ComponentType<*>,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense' | 'none',
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline?: boolean,
  /**
   * Name attribute of the `input` element.
   */
  name?: string,
  /**
   * @ignore
   */
  readOnly?: boolean,
  /**
   * @ignore
   */
  onBlur?: (event: SyntheticFocusEvent<>) => void,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange?: (event: SyntheticInputEvent<>) => void,
  /**
   * TODO
   */
  onClean?: () => void,
  /**
   * TODO
   */
  onDirty?: () => void,
  /**
   * @ignore
   */
  onFocus?: (event: SyntheticFocusEvent<>) => void,
  /**
   * @ignore
   */
  onKeyDown?: (event: SyntheticKeyboardEvent<>) => void,
  /**
   * @ignore
   */
  onKeyUp?: (event: SyntheticKeyboardEvent<>) => void,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number,
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: Node,
  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The input value, required for a controlled component.
   */
  value?: string | number | Array<string | number>,
};

type State = {
  focused: boolean,
};

class Input extends React.Component<ProvidedProps & Props, State> {
  static muiName = 'Input';

  static defaultProps = {
    disableUnderline: false,
    fullWidth: false,
    multiline: false,
    type: 'text',
  };

  state = {
    focused: false,
  };

  componentWillMount() {
    if (this.isControlled()) {
      this.checkDirty(this.props);
    }
  }

  componentDidMount() {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }
  }

  componentWillReceiveProps(nextProps) {
    // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.
    if (!this.props.disabled && nextProps.disabled) {
      this.setState({
        focused: false,
      });
    }
  }

  componentWillUpdate(nextProps) {
    if (this.isControlled(nextProps)) {
      this.checkDirty(nextProps);
    } // else performed in the onChange

    // Book keep the focused state.
    if (!this.props.disabled && nextProps.disabled) {
      const { muiFormControl } = this.context;
      if (muiFormControl && muiFormControl.onBlur) {
        muiFormControl.onBlur();
      }
    }
  }

  // Holds the input reference
  input = null;

  handleFocus = (event: SyntheticFocusEvent<>) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<>) => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }

    // Perform in the willUpdate
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  handleRefInput = node => {
    this.input = node;
    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  };

  // A controlled input accepts its current value as a prop.
  //
  // @see https://facebook.github.io/react/docs/forms.html#controlled-components
  // @returns {boolean} true if string (including '') or number (including zero)
  isControlled(props = this.props) {
    return hasValue(props.value);
  }

  checkDirty(obj) {
    const { muiFormControl } = this.context;

    if (isDirty(obj)) {
      if (muiFormControl && muiFormControl.onDirty) {
        muiFormControl.onDirty();
      }
      if (this.props.onDirty) {
        this.props.onDirty();
      }
      return;
    }

    if (muiFormControl && muiFormControl.onClean) {
      muiFormControl.onClean();
    }
    if (this.props.onClean) {
      this.props.onClean();
    }
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      classes,
      className: classNameProp,
      defaultValue,
      disabled: disabledProp,
      disableUnderline,
      endAdornment,
      error: errorProp,
      fullWidth,
      id,
      inputComponent,
      inputProps: { className: inputPropsClassName, ...inputPropsProp } = {},
      inputRef,
      margin: marginProp,
      multiline,
      onBlur,
      onFocus,
      onChange,
      onClean,
      onDirty,
      onKeyDown,
      onKeyUp,
      placeholder,
      name,
      readOnly,
      rows,
      rowsMax,
      startAdornment,
      type,
      // $FlowFixMe
      value,
      ...other
    } = this.props;

    const { muiFormControl } = this.context;

    let disabled = disabledProp;
    let error = errorProp;
    let margin = marginProp;

    if (muiFormControl) {
      if (typeof disabled === 'undefined') {
        disabled = muiFormControl.disabled;
      }

      if (typeof error === 'undefined') {
        error = muiFormControl.error;
      }

      if (typeof margin === 'undefined') {
        margin = muiFormControl.margin;
      }
    }

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.fullWidth]: fullWidth,
        [classes.focused]: this.state.focused,
        [classes.formControl]: muiFormControl,
        [classes.inkbar]: !disableUnderline,
        [classes.multiline]: multiline,
        [classes.underline]: !disableUnderline,
      },
      classNameProp,
    );

    const inputClassName = classNames(
      classes.input,
      {
        [classes.inputDisabled]: disabled,
        [classes.inputSingleline]: !multiline,
        [classes.inputSearch]: type === 'search',
        [classes.inputMultiline]: multiline,
        [classes.inputDense]: margin === 'dense',
      },
      inputPropsClassName,
    );

    const required = muiFormControl && muiFormControl.required === true;

    let InputComponent = 'input';
    let inputProps = {
      ref: this.handleRefInput,
      ...inputPropsProp,
    };

    if (inputComponent) {
      InputComponent = inputComponent;

      if (isMuiComponent(InputComponent, ['SelectInput'])) {
        inputProps = {
          selectRef: this.handleRefInput,
          ...inputProps,
          ref: null,
        };
      }
    } else if (multiline) {
      if (rows && !rowsMax) {
        InputComponent = 'textarea';
      } else {
        inputProps = {
          rowsMax,
          textareaRef: this.handleRefInput,
          ...inputProps,
          ref: null,
        };
        InputComponent = Textarea;
      }
    }

    return (
      <div onBlur={this.handleBlur} onFocus={this.handleFocus} className={className} {...other}>
        {startAdornment}
        <InputComponent
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          onChange={this.handleChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required ? true : undefined}
          value={value}
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          rows={rows}
          {...inputProps}
        />
        {endAdornment}
      </div>
    );
  }
}

Input.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiInput' })(Input);
