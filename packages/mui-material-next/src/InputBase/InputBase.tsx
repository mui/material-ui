'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  EventHandlers,
  isHostComponent,
  TextareaAutosize,
  unstable_composeClasses as composeClasses,
  useSlotProps,
  WithOptionalOwnerState,
} from '@mui/base';
import { useInput } from '@mui/base/useInput';
import {
  refType,
  unstable_capitalize as capitalize,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
// import formControlState from '@mui/material/FormControl/formControlState';
import FormControlContext from '@mui/material/FormControl/FormControlContext';
import useFormControl from '@mui/material/FormControl/useFormControl';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { isFilled } from './utils';
import {
  InputBaseInputSlotProps,
  InputBaseOwnerState,
  InputBaseProps,
  InputBaseRootSlotProps,
  InputBaseTypeMap,
} from './InputBase.types';
import inputBaseClasses, { getInputBaseUtilityClass } from './inputBaseClasses';

const useUtilityClasses = (ownerState: InputBaseOwnerState) => {
  const {
    classes,
    color = 'primary',
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type,
  } = ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      fullWidth && 'fullWidth',
      focused && 'focused',
      formControl && 'formControl',
      size === 'small' && 'sizeSmall',
      multiline && 'multiline',
      Boolean(startAdornment) && 'adornedStart',
      Boolean(endAdornment) && 'adornedEnd',
      hiddenLabel && 'hiddenLabel',
      readOnly && 'readOnly',
    ],
    input: [
      'input',
      disabled && 'disabled',
      type === 'search' && 'inputTypeSearch',
      multiline && 'inputMultiline',
      size === 'small' && 'inputSizeSmall',
      hiddenLabel && 'inputHiddenLabel',
      Boolean(startAdornment) && 'inputAdornedStart',
      Boolean(endAdornment) && 'inputAdornedEnd',
      readOnly && 'readOnly',
    ],
  };

  return composeClasses(slots, getInputBaseUtilityClass, classes);
};

export const InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.formControl && styles.formControl,
      ownerState.startAdornment && styles.adornedStart,
      ownerState.endAdornment && styles.adornedEnd,
      ownerState.error && styles.error,
      ownerState.size === 'small' && styles.sizeSmall,
      ownerState.multiline && styles.multiline,
      ownerState.color && styles[`color${capitalize(ownerState.color)}`],
      ownerState.fullWidth && styles.fullWidth,
      ownerState.hiddenLabel && styles.hiddenLabel,
    ];
  },
})<{ ownerState: InputBaseOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  return {
    fontFamily: tokens.sys.typescale.body[ownerState.size || 'medium'].family,
    fontWeight: tokens.sys.typescale.body[ownerState.size || 'medium'].weight,
    letterSpacing: tokens.sys.typescale.body[ownerState.size || 'medium'].tracking,
    color: tokens.palette.text.primary,
    lineHeight: '1.4375em', // 23px
    boxSizing: 'border-box', // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    [`&.${inputBaseClasses.disabled}`]: {
      color: tokens.palette.text.disabled,
      cursor: 'default',
    },
    ...(ownerState.multiline && {
      padding: '4px 0 5px',
      ...(ownerState.size === 'small' && {
        paddingTop: 1,
      }),
    }),
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
  };
});

export const InputBaseInput = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.input,
      ownerState.size === 'small' && styles.inputSizeSmall,
      ownerState.multiline && styles.inputMultiline,
      ownerState.type === 'search' && styles.inputTypeSearch,
      ownerState.startAdornment && styles.inputAdornedStart,
      ownerState.endAdornment && styles.inputAdornedEnd,
      ownerState.hiddenLabel && styles.inputHiddenLabel,
    ];
  },
})<{ ownerState: InputBaseOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const placeholder = {
    color: 'currentColor',
    opacity: tokens.opacity.inputPlaceholder,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  };

  const placeholderHidden = {
    opacity: '0 !important',
  };

  const placeholderVisible = {
    opacity: tokens.opacity.inputPlaceholder,
  };

  return {
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em', // Reset 23pxthe native input line-height
    margin: 0, // Reset for Safari
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%', // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder, // Firefox 19+
    '&:-ms-input-placeholder': placeholder, // IE11
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
      WebkitAppearance: 'none',
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden, // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1, // Reset iOS opacity
      WebkitTextFillColor: tokens.palette.text.disabled, // Fix opacity Safari bug
    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill',
    },
    ...(ownerState.size === 'small' && {
      paddingTop: 1,
    }),
    ...(ownerState.multiline && {
      height: 'auto',
      resize: 'none',
      padding: 0,
      paddingTop: 0,
    }),
    ...(ownerState.type === 'search' && {
      // Improve type search style.
      MozAppearance: 'textfield',
    }),
  };
});

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    }}
  />
);

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef(function InputBase<
  BaseComponentType extends React.ElementType = InputBaseTypeMap['defaultComponent'],
>(inProps: InputBaseProps<BaseComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiInputBase' });
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    color: colorProp,
    defaultValue,
    disabled: disabledProp,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputRef: inputRefProp,
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    required,
    rows,
    size: sizeProp,
    slotProps = {},
    slots = {},
    startAdornment,
    type = 'text',
    value,
    ...other
  } = props;

  const { current: isControlled } = React.useRef(value != null);

  // TODO: integrate material-next/FormControl
  const muiFormControl = useFormControl();

  /*
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }
       return undefined;
    }, [muiFormControl]);
  }
    const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'],
  });
   fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  */

  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;

  // TODO: needs material-next/FormControl & material-next/Outlined|FilledInput
  const checkDirty = React.useCallback(
    (obj: any) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty],
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    // if (muiFormControl && muiFormControl.onFocus) {
    //   muiFormControl.onFocus(event);
    // }
  };

  const handleBlur = (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    // if (muiFormControl && muiFormControl.onBlur) {
    //   muiFormControl.onBlur(event);
    // }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ...args: any[]
  ) => {
    if (!isControlled && event.target != null) {
      checkDirty({
        value: event.target.value,
      });
    }

    // Perform in the willUpdate
    if (onChange) {
      // @ts-ignore
      onChange(event, ...args);
    }
  };

  const handleClick = (event: React.PointerEvent) => {
    if (onClick /* && !fcs.disabled */) {
      onClick(event);
    }
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  const {
    getRootProps,
    getInputProps,
    focused: focusedState,
    // TODO: what if this `formControlContext` is completely ignored and the component uses a completely separate one similar to Joy
    // formControlContext,
    error: errorState,
    disabled: disabledState,
    inputRef,
  } = useInput({
    disabled: disabledProp,
    defaultValue,
    error,
    onBlur: handleBlur,
    onClick: handleClick,
    onChange: handleChange,
    onFocus: handleFocus,
    required,
    value,
    inputRef: inputRefProp,
  });

  // TODO: integrate ownerState properties with material-next/FormControl: color, disabled, error, focused, hiddenLabel, size
  const ownerState = {
    ...props,
    color: colorProp || 'primary',
    disabled: disabledState,
    endAdornment,
    error: errorState,
    focused: focusedState,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: false, // TODO: material-next/FormControl integration
    multiline,
    size: sizeProp,
    startAdornment,
    type,
  };

  const classes = useUtilityClasses(ownerState);

  const propsToForwardToInputSlot = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };

  const Root = slots.root || InputBaseRoot;
  const rootProps: WithOptionalOwnerState<InputBaseRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root, className],
  });

  const InputComponent = multiline
    ? slots.textarea ?? TextareaAutosize
    : slots.input ?? InputBaseInput;

  const inputProps: WithOptionalOwnerState<InputBaseInputSlotProps> = useSlotProps({
    // TextareaAutosize doesn't support ownerState, we manually change the
    // elementType so ownerState is excluded from the return value (this doesn't
    // affect other returned props)
    elementType: InputComponent === TextareaAutosize ? 'textarea' : InputComponent,
    getSlotProps: (otherHandlers: EventHandlers) => {
      return getInputProps({
        ...propsToForwardToInputSlot,
        ...otherHandlers,
      });
    },
    externalSlotProps: slotProps.input,
    additionalProps: {
      rows: multiline ? rows : undefined,
      ...(multiline &&
        !isHostComponent(InputComponent) && {
          minRows: rows || minRows,
          maxRows: rows || maxRows,
        }),
    },
    ownerState,
    className: classes.input,
  });

  if (process.env.NODE_ENV !== 'production') {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn(
            'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
    }
  }

  const handleAutoFill = (event: React.AnimationEvent) => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef : { value: 'x' });
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {!disableInjectingGlobalStyles && inputGlobalStyles}
      <Root {...rootProps}>
        {startAdornment}
        <FormControlContext.Provider value={undefined}>
          <InputComponent onAnimationStart={handleAutoFill} rows={rows} {...inputProps} />
        </FormControlContext.Provider>
        {endAdornment}
        {renderSuffix
          ? renderSuffix({
              // ...fcs,
              startAdornment,
            })
          : null}
      </Root>
    </React.Fragment>
  );
}) as OverridableComponent<InputBaseTypeMap>;

InputBase.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label': PropTypes.string,
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
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
  renderSuffix: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
} as any;

export default InputBase;
