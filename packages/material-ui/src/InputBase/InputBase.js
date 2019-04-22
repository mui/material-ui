/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import FormControlContext from '../FormControl/FormControlContext';
import withFormControlContext from '../FormControl/withFormControlContext';
import withStyles from '../styles/withStyles';
import { useForkRef } from '../utils/reactHelpers';
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
    opacity: '0 !important',
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
      boxSizing: 'border-box', // Prevent padding issue with fullWidth.
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
      height: '1.1875em', // Reset (19px), match the native input line-height
      margin: 0, // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      width: '100%', // Fix IE 11 width issue
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
      height: 'auto',
      resize: 'none',
      padding: 0,
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

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase(props, ref) {
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
    inputRef: inputRefProp,
    margin,
    muiFormControl,
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
    rowsMin,
    startAdornment,
    type,
    value,
    ...other
  } = props;

  const inputRef = React.useRef();
  const { current: isControlled } = React.useRef(value != null);
  const [focused, setFocused] = React.useState(false);
  const muiFormControlRef = React.useRef({});

  const handleInputRefWarning = instance => {
    warning(
      !instance || instance instanceof HTMLInputElement || instance.focus,
      [
        'Material-UI: you have provided a `inputComponent` to the input component',
        'that does not correctly handle the `inputRef` property.',
        'Make sure the `inputRef` property is called with a HTMLInputElement.',
      ].join('\n'),
    );
  };
  const handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleRef = useForkRef(inputRef, handleInputRefProp);

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  if (disabled && focused) {
    setFocused(false);
  }

  React.useEffect(() => {
    muiFormControlRef.current = muiFormControl;
  }, [muiFormControl]);

  const checkDirty = React.useCallback(
    obj => {
      const contextAvailable = Boolean(muiFormControlRef.current);
      if (isFilled(obj)) {
        if (contextAvailable && muiFormControlRef.current.onFilled) {
          muiFormControlRef.current.onFilled();
        }
        if (onFilled) {
          onFilled();
        }
        return;
      }

      if (contextAvailable && muiFormControlRef.current.onEmpty) {
        muiFormControlRef.current.onEmpty();
      }
      if (onEmpty) {
        onEmpty();
      }
    },
    [onEmpty, onFilled],
  );

  React.useEffect(() => {
    // handle check in onChange after mount
    if (!isControlled) checkDirty(inputRef.current);
  }, [checkDirty, isControlled]);

  React.useEffect(() => {
    if (isControlled) checkDirty({ defaultValue, value });
  }, [checkDirty, defaultValue, isControlled, value]);

  React.useEffect(() => {
    // Book keep the focused state.
    if (disabled) {
      if (muiFormControl && muiFormControl.onBlur) {
        muiFormControl.onBlur();
      }
    }
  });

  const handleFocus = event => {
    // Fix a bug with IE 11 where the focus/blur events are triggered
    // while the input is disabled.
    if (formControlState({ props, muiFormControl, states: ['disabled'] }).disabled) {
      event.stopPropagation();
      return;
    }

    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = event => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleChange = (...args) => {
    if (!isControlled) {
      checkDirty(inputRef.current);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(...args);
    }
  };

  const handleClick = event => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  const ariaDescribedby = other['aria-describedby'];
  delete other['aria-describedby'];

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['disabled', 'error', 'margin', 'required', 'filled'],
  });

  const isFocused = muiFormControl ? muiFormControl.focused : focused;

  const className = clsx(
    classes.root,
    {
      [classes.disabled]: fcs.disabled,
      [classes.error]: fcs.error,
      [classes.fullWidth]: fullWidth,
      [classes.focused]: isFocused,
      [classes.formControl]: muiFormControl,
      [classes.marginDense]: fcs.margin === 'dense',
      [classes.multiline]: multiline,
      [classes.adornedStart]: startAdornment,
      [classes.adornedEnd]: endAdornment,
    },
    classNameProp,
  );

  const inputClassName = clsx(
    classes.input,
    {
      [classes.disabled]: fcs.disabled,
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
    ref: handleRef,
  };

  if (typeof InputComponent !== 'string') {
    inputProps = {
      // Rename ref to inputRef as we don't know the
      // provided `inputComponent` structure.
      inputRef: handleRef,
      type,
      ...inputProps,
      ref: null,
    };
  } else if (multiline) {
    if (rows && !rowsMax && !rowsMin) {
      InputComponent = 'textarea';
    } else {
      inputProps = {
        rows,
        rowsMax,
        rowsMin,
        ...inputProps,
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
    <div className={className} onClick={handleClick} ref={ref} {...other}>
      {renderPrefix
        ? renderPrefix({
            ...fcs,
            startAdornment,
            focused: isFocused,
          })
        : null}
      {startAdornment}
      <FormControlContext.Provider value={null}>
        <InputComponent
          aria-invalid={fcs.error}
          aria-describedby={ariaDescribedby}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          defaultValue={defaultValue}
          disabled={fcs.disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={fcs.required}
          rows={rows}
          value={value}
          {...inputProps}
        />
      </FormControlContext.Provider>
      {endAdornment}
    </div>
  );
});

InputBase.propTypes = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The CSS class name of the wrapper element.
   */
  className: PropTypes.string,
  /**
   * The default `input` element value, useful when not controlling the component.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the `input` element will be disabled.
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
   * The component used for the `input` element.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * This property can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * @ignore
   */
  muiFormControl: PropTypes.object,
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
  onClick: PropTypes.func,
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
   * If `true`, the `input` element will be required.
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
   * Minimum number of rows to display when multiline option is set to true.
   */
  rowsMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

InputBase.defaultProps = {
  fullWidth: false,
  inputComponent: 'input',
  multiline: false,
  type: 'text',
};

export default withStyles(styles, { name: 'MuiInputBase' })(withFormControlContext(InputBase));
