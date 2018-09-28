/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { setRef } from '../utils/reactHelpers';
import Textarea from './Textarea';
import { isFilled } from './utils';

export const styles = theme => {
  const light = theme.palette.type === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  };
  const placeholderHidden = {
    opacity: 0,
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5,
  };

  return {
    /* Styles applied to the root element. */
    root: {
      // Mimics the default input display property used by browsers for an input.
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '1.1875em', // Reset (19px), match the native input line-height
      cursor: 'text',
      display: 'inline-flex',
      alignItems: 'center',
      '&$disabled': {
        color: theme.palette.text.disabled,
        cursor: 'default',
      },
    },
    /* Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl: {},
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {},
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {},
    /* Styles applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: `${8 - 2}px 0 ${8 - 1}px`,
    },
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {
      width: '100%',
    },
    /* Styles applied to the `input` element. */
    input: {
      font: 'inherit',
      color: 'currentColor',
      padding: `${8 - 2}px 0 ${8 - 1}px`,
      border: 0,
      boxSizing: 'content-box',
      background: 'none',
      margin: 0, // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%', // Fix IE11 width issue
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
        '-webkit-appearance': 'none',
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
      '&$disabled': {
        opacity: 1, // Reset iOS opacity
      },
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 4 - 1,
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      resize: 'none',
      padding: 0,
    },
    /* Styles applied to the `input` element if `type` is not "text"`. */
    inputType: {
      // type="date" or type="time", etc. have specific styles we need to reset.
      height: '1.1875em', // Reset (19px), match the native input line-height
    },
    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: {
      // Improve type search style.
      '-moz-appearance': 'textfield',
      '-webkit-appearance': 'textfield',
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {},
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {},
  };
};

export function formControlState({ props, states, context }) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (context && context.muiFormControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = context.muiFormControl[state];
      }
    }

    return acc;
  }, {});
}

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
class InputBase extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isControlled = props.value != null;
    if (this.isControlled) {
      this.checkDirty(props);
    }

    const componentWillReceiveProps = (nextProps, nextContext) => {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (
        !formControlState({ props: this.props, context: this.context, states: ['disabled'] })
          .disabled &&
        formControlState({ props: nextProps, context: nextContext, states: ['disabled'] }).disabled
      ) {
        this.setState({
          focused: false,
        });
      }
    };

    const componentWillUpdate = (nextProps, nextState, nextContext) => {
      // Book keep the focused state.
      if (
        !formControlState({ props: this.props, context: this.context, states: ['disabled'] })
          .disabled &&
        formControlState({ props: nextProps, context: nextContext, states: ['disabled'] }).disabled
      ) {
        const { muiFormControl } = this.context;
        if (muiFormControl && muiFormControl.onBlur) {
          muiFormControl.onBlur();
        }
      }
    };

    /* eslint-disable no-underscore-dangle */
    this.componentWillReceiveProps = componentWillReceiveProps;
    this.componentWillReceiveProps.__suppressDeprecationWarning = true;
    this.componentWillUpdate = componentWillUpdate;
    this.componentWillUpdate.__suppressDeprecationWarning = true;
    /* eslint-enable no-underscore-dangle */
  }

  state = {
    focused: false,
  };

  getChildContext() {
    // We are consuming the parent muiFormControl context.
    // We don't want a child to consume it a second time.
    return {
      muiFormControl: null,
    };
  }

  componentDidMount() {
    if (!this.isControlled) {
      this.checkDirty(this.inputRef);
    }
  }

  componentDidUpdate() {
    if (this.isControlled) {
      this.checkDirty(this.props);
    } // else performed in the onChange
  }

  handleFocus = event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the input is disabled.
    if (
      formControlState({ props: this.props, context: this.context, states: ['disabled'] }).disabled
    ) {
      event.stopPropagation();
      return;
    }

    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    const { muiFormControl } = this.context;
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    const { muiFormControl } = this.context;
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  handleChange = (...args) => {
    if (!this.isControlled) {
      this.checkDirty(this.inputRef);
    }

    // Perform in the willUpdate
    if (this.props.onChange) {
      this.props.onChange(...args);
    }
  };

  handleRefInput = ref => {
    this.inputRef = ref;

    let refProp;

    if (this.props.inputRef) {
      refProp = this.props.inputRef;
    } else if (this.props.inputProps && this.props.inputProps.ref) {
      refProp = this.props.inputProps.ref;
    }

    setRef(refProp, ref);
  };

  handleClick = event => {
    if (this.inputRef && event.currentTarget === event.target) {
      this.inputRef.focus();
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  checkDirty(obj) {
    const { muiFormControl } = this.context;

    if (isFilled(obj)) {
      if (muiFormControl && muiFormControl.onFilled) {
        muiFormControl.onFilled();
      }
      if (this.props.onFilled) {
        this.props.onFilled();
      }
      return;
    }

    if (muiFormControl && muiFormControl.onEmpty) {
      muiFormControl.onEmpty();
    }
    if (this.props.onEmpty) {
      this.props.onEmpty();
    }
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      classes,
      className: classNameProp,
      defaultValue,
      disabled,
      endAdornment,
      error,
      fullWidth,
      id,
      inputComponent,
      inputProps: { className: inputPropsClassName, ...inputPropsProp } = {},
      inputRef,
      margin,
      multiline,
      name,
      onBlur,
      onChange,
      onClick,
      onEmpty,
      onFilled,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      renderPrefix,
      rows,
      rowsMax,
      startAdornment,
      type,
      value,
      ...other
    } = this.props;

    const { muiFormControl } = this.context;
    const fcs = formControlState({
      props: this.props,
      context: this.context,
      states: ['disabled', 'error', 'margin', 'required', 'filled'],
    });

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: fcs.disabled,
        [classes.error]: fcs.error,
        [classes.fullWidth]: fullWidth,
        [classes.focused]: this.state.focused,
        [classes.formControl]: muiFormControl,
        [classes.marginDense]: fcs.margin === 'dense',
        [classes.multiline]: multiline,
        [classes.adornedStart]: startAdornment,
        [classes.adornedEnd]: endAdornment,
      },
      classNameProp,
    );

    const inputClassName = classNames(
      classes.input,
      {
        [classes.disabled]: fcs.disabled,
        [classes.inputType]: type !== 'text',
        [classes.inputTypeSearch]: type === 'search',
        [classes.inputMultiline]: multiline,
        [classes.inputMarginDense]: fcs.margin === 'dense',
        [classes.inputAdornedStart]: startAdornment,
        [classes.inputAdornedEnd]: endAdornment,
      },
      inputPropsClassName,
    );

    let InputComponent = inputComponent;
    let inputProps = {
      ...inputPropsProp,
      ref: this.handleRefInput,
    };

    if (typeof InputComponent !== 'string') {
      inputProps = {
        // Rename ref to inputRef as we don't know the
        // provided `inputComponent` structure.
        inputRef: this.handleRefInput,
        type,
        ...inputProps,
        ref: null,
      };
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
    } else {
      inputProps = {
        type,
        ...inputProps,
      };
    }

    return (
      <div className={className} onClick={this.handleClick} {...other}>
        {renderPrefix
          ? renderPrefix({
              ...fcs,
              startAdornment,
              focused: this.state.focused,
            })
          : null}
        {startAdornment}
        <InputComponent
          aria-invalid={fcs.error}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          defaultValue={defaultValue}
          disabled={fcs.disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={fcs.required}
          rows={rows}
          value={value}
          {...inputProps}
        />
        {endAdornment}
      </div>
    );
  }
}

InputBase.propTypes = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it here:
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The CSS class name of the wrapper element.
   */
  className: PropTypes.string,
  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the native input.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * Attributes applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onEmpty: PropTypes.func,
  /**
   * @ignore
   */
  onFilled: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  renderPrefix: PropTypes.func,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type: PropTypes.string,
  /**
   * The input value, required for a controlled component.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ]),
};

InputBase.defaultProps = {
  fullWidth: false,
  inputComponent: 'input',
  multiline: false,
  type: 'text',
};

InputBase.contextTypes = {
  muiFormControl: PropTypes.object,
};

InputBase.childContextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiInputBase' })(InputBase);
