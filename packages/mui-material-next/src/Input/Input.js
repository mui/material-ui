import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { shouldForwardProp, useThemeProps } from '@mui/system';
import {
  Input as BaseInput,
  inputClasses,
  unstable_composeClasses as composeClasses,
  appendOwnerState,
} from '@mui/base';
import { unstable_capitalize as capitalize } from '@mui/utils';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { getInputUtilityClass } from './inputClasses';

const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

const rootOverridesResolver = (props, styles) => {
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
};

const inputOverridesResolver = (props, styles) => {
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
};

const useUtilityClasses = (ownerState) => {
  const { classes, color, endAdornment, fullWidth, hiddenLabel, size, startAdornment, type } =
    ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      fullWidth && 'fullWidth',
      size === 'small' && 'sizeSmall',
      hiddenLabel && 'hiddenLabel',
    ],
    input: [
      'input',
      type === 'search' && 'inputTypeSearch',
      size === 'small' && 'inputSizeSmall',
      hiddenLabel && 'inputHiddenLabel',
      startAdornment && 'inputAdornedStart',
      endAdornment && 'inputAdornedEnd',
    ],
  };

  return composeClasses(slots, getInputUtilityClass, classes);
};

const InputRoot = styled('div', {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      ...rootOverridesResolver(props, styles),
      !ownerState.disableUnderline && styles.underline,
    ];
  },
})(({ theme, ownerState }) => {
  const light = theme.palette.mode === 'light';
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    lineHeight: '1.4375em', // 23px
    boxSizing: 'border-box', // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    [`&.${inputClasses.disabled}`]: {
      color: theme.palette.text.disabled,
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
    ...(ownerState.formControl && {
      'label + &': {
        marginTop: 16,
      },
    }),
    ...(!ownerState.disableUnderline && {
      '&:after': {
        borderBottom: `2px solid ${theme.palette[ownerState.color].main}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      [`&.${inputClasses.focused}:after`]: {
        transform: 'scaleX(1)',
      },
      [`&.${inputClasses.error}:after`]: {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)', // error is always underlined in red
      },
      '&:before': {
        borderBottom: `1px solid ${bottomLineColor}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      [`&:hover:not(.${inputClasses.disabled}):before`]: {
        borderBottom: `2px solid ${theme.palette.text.primary}`,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          borderBottom: `1px solid ${bottomLineColor}`,
        },
      },
      [`&.${inputClasses.disabled}:before`]: {
        borderBottomStyle: 'dotted',
      },
    }),
  };
});

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(({ theme, ownerState }) => {
  const light = theme.palette.mode === 'light';
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
    [`label[data-shrink=false] + .${inputClasses.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden, // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputClasses.disabled}`]: {
      opacity: 1, // Reset iOS opacity
      WebkitTextFillColor: theme.palette.text.disabled, // Fix opacity Safari bug
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
      WebkitAppearance: 'textfield',
    }),
  };
});

const InputTextarea = React.forwardRef(function TextareaInput(props, ref) {
  return <InputInput {...props} ref={ref} as={TextareaAutosize} />;
});

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiInput' });
  const {
    classes: classesProp,
    className,
    color,
    component,
    components: componentsProp = {},
    componentsProps = {},
    disableUnderline = false,
    endAdornment,
    fullWidth = false,
    hiddenLabel = false,
    size,
    slotProps,
    slots,
    startAdornment,
    ...other
  } = props;

  const components = {
    root: component ?? slots?.root ?? componentsProp.Root ?? InputRoot,
    input: slots?.input ?? componentsProp.Input ?? InputInput,
    textarea: slots?.textarea ?? componentsProp.Textarea ?? InputTextarea,
  };

  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const inputSlotProps = slotProps?.input ?? componentsProps.input;
  const textareaSlotProps = slotProps?.textarea ?? componentsProps.textarea;

  const ownerState = {
    ...props,
    color: 'primary',
    disableUnderline,
    fullWidth,
    hiddenLabel,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const amendedComponentsProps = {
    root: appendOwnerState(
      components.root,
      {
        ...rootSlotProps,
        className: clsx(classes.root, className, rootSlotProps?.className),
      },
      ownerState,
    ),
    input: appendOwnerState(
      components.input,
      {
        type: 'text',
        ...inputSlotProps,
        className: clsx(classes.input, inputSlotProps?.className),
      },
      ownerState,
    ),
    textarea: appendOwnerState(
      components.textarea,
      {
        ...textareaSlotProps,
        className: textareaSlotProps?.className,
      },
      ownerState,
    ),
  };

  return (
    <BaseInput
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...other}
      ref={ref}
      slots={components}
      slotProps={amendedComponentsProps}
    />
  );
});

Input.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
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
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
    textarea: PropTypes.object,
  }),
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
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline: PropTypes.bool,
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
   * If `true`, the label is hidden.
   */
  hiddenLabel: PropTypes.bool,
  /**
   * The id of the `input` element.
   * @default false
   */
  id: PropTypes.string,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
    textarea: PropTypes.object,
  }),
  /**
   * The components used for each slot inside the Input.
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
};

Input.muiName = 'Input';

export default Input;
