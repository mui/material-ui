'use client';
import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  EventHandlers,
  unstable_composeClasses as composeClasses,
  useSlotProps,
  WithOptionalOwnerState,
} from '@mui/base';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import {
  unstable_capitalize as capitalize,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { OverrideProps } from '@mui/types';
import FormControlContext from '@mui/material-next/FormControl/FormControlContext';
import useFormControl from '@mui/material-next/FormControl/useFormControl';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { isFilled } from '../InputBase/utils';
import {
  NumberInputBaseInputSlotProps,
  NumberInputBaseOwnerState,
  NumberInputBaseProps,
  NumberInputBaseRootSlotProps,
  NumberInputBaseTypeMap,
} from './NumberInputBase.types';
import numberInputBaseClasses, { getNumberInputBaseUtilityClass } from './numberInputBaseClasses';

const useUtilityClasses = (ownerState: NumberInputBaseOwnerState) => {
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
    readOnly,
    size,
    startAdornment,
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
      Boolean(startAdornment) && 'adornedStart',
      Boolean(endAdornment) && 'adornedEnd',
      hiddenLabel && 'hiddenLabel',
      readOnly && 'readOnly',
    ],
    input: [
      'input',
      disabled && 'disabled',
      size === 'small' && 'inputSizeSmall',
      hiddenLabel && 'inputHiddenLabel',
      Boolean(startAdornment) && 'inputAdornedStart',
      Boolean(endAdornment) && 'inputAdornedEnd',
      readOnly && 'readOnly',
    ],
  };

  return composeClasses(slots, getNumberInputBaseUtilityClass, classes);
};

export const NumberInputBaseRoot = styled('div', {
  name: 'MuiNumberInputBase',
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
      ownerState.color && styles[`color${capitalize(ownerState.color)}`],
      ownerState.fullWidth && styles.fullWidth,
      ownerState.hiddenLabel && styles.hiddenLabel,
    ];
  },
})<{ ownerState: NumberInputBaseOwnerState }>(({ theme, ownerState }) => {
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
    [`&.${numberInputBaseClasses.disabled}`]: {
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

export const NumberInputBaseInput = styled('input', {
  name: 'MuiNumberInputBase',
  slot: 'Input',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.input,
      ownerState.size === 'small' && styles.inputSizeSmall,
      ownerState.startAdornment && styles.inputAdornedStart,
      ownerState.endAdornment && styles.inputAdornedEnd,
      ownerState.hiddenLabel && styles.inputHiddenLabel,
    ];
  },
})<{ ownerState: NumberInputBaseOwnerState }>(({ theme, ownerState }) => {
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
    [`label[data-shrink=false] + .${numberInputBaseClasses.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden, // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${numberInputBaseClasses.disabled}`]: {
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
 * `NumberInputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a number input.
 * It contains a load of style reset and some state logic.
 */
const NumberInputBase = React.forwardRef(function NumberInputBase<
  BaseComponentType extends React.ElementType = NumberInputBaseTypeMap['defaultComponent'],
>(inProps: NumberInputBaseProps<BaseComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const props = useThemeProps({ props: inProps, name: 'MuiNumberInputBase' });
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
    error: errorProp,
    fullWidth = false,
    id,
    inputComponent: inputComponentProp = 'input',
    inputRef: inputRefProp,
    margin,
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
    required: requiredProp,
    size: sizeProp,
    slotProps = {},
    slots = {},
    startAdornment,
    type = 'text',
    value,
    ...other
  } = props;

  const { current: isControlled } = React.useRef(value != null);

  const muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl && muiFormControl.registerEffect) {
        return muiFormControl.registerEffect();
      }
      return undefined;
    }, [muiFormControl]);
  }

  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;

  // TODO: needs material-next/Outlined|FilledInput
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

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleChange = (
    event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
    newValue: number | undefined,
  ) => {
    if (!isControlled && event.target != null) {
      checkDirty({
        value: newValue,
      });
    }

    // Perform in the willUpdate
    if (onChange) {
      // @ts-ignore
      onChange(event, newValue, ...args);
    }
  };

  const handleClick = (event: React.PointerEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  const required = requiredProp ?? muiFormControl?.required;

  const {
    getRootProps,
    getInputProps,
    focused: focusedState,
    error: errorState,
    disabled: disabledState,
    inputRef,
    // ignore Base UI's formControlContext
  } = useNumberInput({
    disabled: disabledProp ?? muiFormControl?.disabled,
    defaultValue,
    error: errorProp ?? muiFormControl?.error,
    onBlur: handleBlur,
    onClick: handleClick,
    onChange: handleChange,
    onFocus: handleFocus,
    required,
    value,
    inputRef: inputRefProp,
  });

  const ownerState = {
    ...props,
    color: colorProp ?? muiFormControl?.color ?? 'primary',
    disabled: disabledState,
    endAdornment,
    error: errorState,
    focused: muiFormControl?.focused ?? focusedState,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: muiFormControl?.hiddenLabel ?? false,
    required,
    size: sizeProp ?? muiFormControl?.size,
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

  const InputComponent = inputComponentProp;

  const Root = slots.root || NumberInputBaseRoot;
  const rootProps: WithOptionalOwnerState<NumberInputBaseRootSlotProps> = useSlotProps({
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

  const Input = slots.input ?? NumberInputBaseInput;

  const inputProps: WithOptionalOwnerState<NumberInputBaseInputSlotProps> = useSlotProps({
    // TextareaAutosize doesn't support ownerState, we manually change the
    // elementType so ownerState is excluded from the return value (this doesn't
    // affect other returned props)
    elementType: Input,
    getSlotProps: (otherHandlers: EventHandlers) => {
      return getInputProps({
        ...propsToForwardToInputSlot,
        ...otherHandlers,
      });
    },
    externalSlotProps: slotProps.input,
    additionalProps: {
      as: InputComponent,
    },
    ownerState,
    className: classes.input,
  });

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
          <Input onAnimationStart={handleAutoFill} {...inputProps} />
        </FormControlContext.Provider>
        {endAdornment}
        {renderSuffix
          ? renderSuffix({
              // TODO: requires integrating with OutlinedInput
              // ...formControlState({
              //   props,
              //   muiFormControl,
              //   states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled']
              // }),
              ...muiFormControl,
              startAdornment,
            })
          : null}
      </Root>
    </React.Fragment>
  );
}) as NumberInputBaseComponent;

interface NumberInputBaseComponent {
  <C extends React.ElementType>(
    props: {
      /**
       * The component used for the input node.
       * Either a string to use a HTML element or a component.
       */
      inputComponent?: C;
    } & OverrideProps<NumberInputBaseTypeMap, C>,
  ): JSX.Element | null;
  propTypes?: any;
}

export default NumberInputBase;
