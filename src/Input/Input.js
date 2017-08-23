// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Textarea from './Textarea';

/**
 * Supports determination of isControlled().
 * Controlled input accepts its current value as a prop.
 *
 * @see https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param value
 * @returns {boolean} true if string (including '') or number (including zero)
 */
export function hasValue(value: ?(number | string)) {
  return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

/**
 * Determine if field is dirty (a.k.a. filled).
 *
 * Response determines if label is presented above field or as placeholder.
 *
 * @param obj
 * @param SSR
 * @returns {boolean} False when not present or empty string.
 *                    True when any number or string with length.
 */
export function isDirty(obj, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

export const styles = (theme: Object) => {
  const placeholder = {
    color: 'currentColor',
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
  };
  const placeholderForm = {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.ease,
    }),
  };
  const placeholderFormFocus = {
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
  };

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-block',
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
      padding: `${theme.spacing.unit - 1}px 0`,
      border: 0,
      display: 'block',
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0,
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        appearance: 'none',
      },
      // Show and hide the placeholder logic
      'label + $formControl &': {
        '&::-webkit-input-placeholder': placeholderForm,
        '&::-moz-placeholder': placeholderForm, // Firefox 19+
        '&:-ms-input-placeholder': placeholderForm, // IE 11
        '&::-ms-input-placeholder': placeholderForm, // Edge
        '&:focus::-webkit-input-placeholder': placeholderFormFocus,
        '&:focus::-moz-placeholder': placeholderFormFocus, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderFormFocus, // IE 11
        '&:focus::-ms-input-placeholder': placeholderFormFocus, // Edge
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
      paddingBottom: 2,
      '&:before': {
        backgroundColor: theme.palette.input.bottomLine,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('backgroundColor', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease,
        }),
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

type DefaultProps = {
  classes: Object,
  disableUnderline: boolean,
  fullWidth: boolean,
  multiline: boolean,
  type: string,
};

export type Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusion, it's more like an autofill.
   * You can learn about it with that article
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * It's an `input` by default.
   */
  component?: string | Function,
  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue?: string | number,
  /**
   * TODO
   */
  disabled?: boolean,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline?: boolean,
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
  margin?: 'dense',
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline?: boolean,
  /**
   * TODO
   */
  name?: string,
  /**
   * TODO
   */
  onBlur?: Function,
  /**
   * TODO
   */
  onChange?: Function,
  /**
   * TODO
   */
  onClean?: Function,
  /**
   * TODO
   */
  onDirty?: Function,
  /**
   * TODO
   */
  onFocus?: Function,
  /**
   * TODO
   */
  onKeyDown?: Function,
  /**
   * TODO
   */
  onKeyUp?: Function,
  /**
   * TODO
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
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The input value, required for a controlled component.
   */
  value?: string | number,
};

type AllProps = DefaultProps & Props;

type State = {
  focused: boolean,
};

class Input extends React.Component<AllProps, State> {
  props: AllProps;
  static muiName = 'Input';
  static defaultProps = {
    disableUnderline: false,
    fullWidth: false,
    multiline: false,
    type: 'text',
  };
  static contextTypes = {
    muiFormControl: PropTypes.object,
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

  componentWillUpdate(nextProps) {
    if (this.isControlled()) {
      this.checkDirty(nextProps);
    } // else performed in the onChange
  }

  // Holds the input reference
  input = null;

  handleFocus = event => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleChange = event => {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    } // else perform in the willUpdate
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

  handleRefTextarea = node => {
    this.input = node;
    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  };

  /**
   * A controlled input accepts its current value as a prop.
   *
   * @see https://facebook.github.io/react/docs/forms.html#controlled-components
   * @returns {boolean} true if string (including '') or number (including zero)
   */
  isControlled() {
    return hasValue(this.props.value);
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
      component,
      defaultValue,
      disabled: disabledProp,
      disableUnderline,
      error: errorProp,
      fullWidth,
      id,
      inputProps: inputPropsProp,
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
      rows,
      rowsMax,
      type,
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

    const inputClassName = classNames(classes.input, {
      [classes.inputDisabled]: disabled,
      [classes.inputSingleline]: !multiline,
      [classes.inputMultiline]: multiline,
      [classes.inputDense]: margin === 'dense',
    });

    const required = muiFormControl && muiFormControl.required === true;

    let InputComponent = 'input';
    let inputProps = {
      ref: this.handleRefInput,
      ...inputPropsProp,
    };

    if (component) {
      InputComponent = component;
    } else if (multiline) {
      if (rows && !rowsMax) {
        InputComponent = 'textarea';
      } else {
        inputProps = {
          rowsMax,
          textareaRef: this.handleRefTextarea,
          ...inputProps,
          ref: null,
        };
        InputComponent = Textarea;
      }
    }

    return (
      <div className={className} {...other}>
        <InputComponent
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-required={required ? true : undefined}
          value={value}
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          rows={rows}
          {...inputProps}
        />
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiInput' })(Input);
