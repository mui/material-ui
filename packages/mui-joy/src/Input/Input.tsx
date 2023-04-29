import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import { InputTypeMap, InputProps, InputOwnerState } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';
import useForwardedInput from './useForwardedInput';

const useUtilityClasses = (ownerState: InputOwnerState) => {
  const { disabled, fullWidth, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getInputUtilityClass, {});
};

export const StyledInputRoot = styled('div')<{ ownerState: InputOwnerState }>(
  ({ theme, ownerState }) => {
    const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
    return [
      {
        '--Input-radius': theme.vars.radius.sm,
        '--Input-gap': '0.5rem',
        '--Input-placeholderColor': 'inherit',
        '--Input-placeholderOpacity': 0.5,
        '--Input-focusedThickness': theme.vars.focus.thickness,
        ...(ownerState.color === 'context'
          ? {
              '--Input-focusedHighlight': theme.vars.palette.focusVisible,
            }
          : {
              '--Input-focusedHighlight':
                theme.vars.palette[
                  ownerState.color === 'neutral' ? 'primary' : ownerState.color!
                ]?.[500],
            }),
        ...(ownerState.size === 'sm' && {
          '--Input-minHeight': '2rem',
          '--Input-paddingInline': '0.5rem',
          '--Input-decoratorChildHeight': 'min(1.5rem, var(--Input-minHeight))',
          '--Icon-fontSize': '1.25rem',
        }),
        ...(ownerState.size === 'md' && {
          '--Input-minHeight': '2.5rem',
          '--Input-paddingInline': '0.75rem',
          '--Input-decoratorChildHeight': 'min(2rem, var(--Input-minHeight))',
          '--Icon-fontSize': '1.5rem',
        }),
        ...(ownerState.size === 'lg' && {
          '--Input-minHeight': '3rem',
          '--Input-paddingInline': '1rem',
          '--Input-gap': '0.75rem',
          '--Input-decoratorChildHeight': 'min(2.375rem, var(--Input-minHeight))',
          '--Icon-fontSize': '1.75rem',
        }),
        // variables for controlling child components
        '--Input-decoratorChildOffset':
          'min(calc(var(--Input-paddingInline) - (var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Input-decoratorChildHeight)) / 2), var(--Input-paddingInline))',
        '--_Input-paddingBlock':
          'max((var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Input-decoratorChildHeight)) / 2, 0px)',
        '--Input-decoratorChildRadius':
          'max(var(--Input-radius) - var(--variant-borderWidth, 0px) - var(--_Input-paddingBlock), min(var(--_Input-paddingBlock) + var(--variant-borderWidth, 0px), var(--Input-radius) / 2))',
        '--Button-minHeight': 'var(--Input-decoratorChildHeight)',
        '--IconButton-size': 'var(--Input-decoratorChildHeight)',
        '--Button-radius': 'var(--Input-decoratorChildRadius)',
        '--IconButton-radius': 'var(--Input-decoratorChildRadius)',
        boxSizing: 'border-box',
        minWidth: 0,
        minHeight: 'var(--Input-minHeight)',
        ...(ownerState.fullWidth && {
          width: '100%',
        }),
        cursor: 'text',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingInline: `var(--Input-paddingInline)`,
        borderRadius: 'var(--Input-radius)',
        fontFamily: theme.vars.fontFamily.body,
        fontSize: theme.vars.fontSize.md,
        ...(ownerState.size === 'sm' && {
          fontSize: theme.vars.fontSize.sm,
        }),
        '&:before': {
          boxSizing: 'border-box',
          content: '""',
          display: 'block',
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          borderRadius: 'inherit',
          margin: 'calc(var(--variant-borderWidth, 0px) * -1)', // for outlined variant
        },
      },
      {
        // variant styles
        ...variantStyle,
        backgroundColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
        [`&:hover:not(.${inputClasses.focused})`]: {
          ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
          backgroundColor: null, // it is not common to change background on hover for Input
        },
        [`&.${inputClasses.disabled}`]:
          theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        [`&.${inputClasses.focused}`]: {
          '&:before': {
            boxShadow: `inset 0 0 0 var(--Input-focusedThickness) var(--Input-focusedHighlight)`,
          },
        },
      },
    ];
  },
);

export const StyledInputHtml = styled('input')<{ ownerState: InputOwnerState }>(
  ({ ownerState }) => ({
    border: 'none', // remove the native input width
    minWidth: 0, // remove the native input width
    outline: 0, // remove the native input outline
    padding: 0, // remove the native input padding
    flex: 1,
    alignSelf: 'stretch',
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&:-webkit-autofill': {
      paddingInline: 'var(--Input-paddingInline)',
      ...(!ownerState.startDecorator && {
        marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
        paddingInlineStart: 'var(--Input-paddingInline)',
        borderTopLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        borderBottomLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
      }),
      ...(!ownerState.endDecorator && {
        marginInlineEnd: 'calc(-1 * var(--Input-paddingInline))',
        paddingInlineEnd: 'var(--Input-paddingInline)',
        borderTopRightRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        borderBottomRightRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
      }),
    },
    '&::-webkit-input-placeholder': {
      color: 'var(--Input-placeholderColor)',
      opacity: 'var(--Input-placeholderOpacity)',
    },
    '&::-moz-placeholder': {
      // Firefox 19+
      color: 'var(--Input-placeholderColor)',
      opacity: 'var(--Input-placeholderOpacity)',
    },
    '&:-ms-input-placeholder': {
      // IE11
      color: 'var(--Input-placeholderColor)',
      opacity: 'var(--Input-placeholderOpacity)',
    },
    '&::-ms-input-placeholder': {
      // Edge
      color: 'var(--Input-placeholderColor)',
      opacity: 'var(--Input-placeholderOpacity)',
    },
  }),
);

export const StyledInputStartDecorator = styled('span')<{ ownerState: InputOwnerState }>(
  ({ theme, ownerState }) => ({
    '--Button-margin': '0 0 0 calc(var(--Input-decoratorChildOffset) * -1)',
    '--IconButton-margin': '0 0 0 calc(var(--Input-decoratorChildOffset) * -1)',
    '--Icon-margin': '0 0 0 calc(var(--Input-paddingInline) / -4)',
    display: 'inherit',
    alignItems: 'center',
    paddingBlock: 'var(--unstable_InputPaddingBlock)', // for wrapping Autocomplete's tags
    flexWrap: 'wrap', // for wrapping Autocomplete's tags
    marginInlineEnd: 'var(--Input-gap)',
    color: theme.vars.palette.text.tertiary,
    cursor: 'initial',
    ...(ownerState.focused && {
      color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
    }),
    ...(ownerState.disabled && {
      color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
    }),
  }),
);

export const StyledInputEndDecorator = styled('span')<{ ownerState: InputOwnerState }>(
  ({ theme, ownerState }) => ({
    '--Button-margin': '0 calc(var(--Input-decoratorChildOffset) * -1) 0 0',
    '--IconButton-margin': '0 calc(var(--Input-decoratorChildOffset) * -1) 0 0',
    '--Icon-margin': '0 calc(var(--Input-paddingInline) / -4) 0 0',
    display: 'inherit',
    alignItems: 'center',
    marginInlineStart: 'var(--Input-gap)',
    color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
    cursor: 'initial',
    ...(ownerState.disabled && {
      color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
    }),
  }),
);

const InputRoot = styled(StyledInputRoot, {
  name: 'JoyInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

const InputInput = styled(StyledInputHtml, {
  name: 'JoyInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})({});

const InputStartDecorator = styled(StyledInputStartDecorator, {
  name: 'JoyInput',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})({});

const InputEndDecorator = styled(StyledInputEndDecorator, {
  name: 'JoyInput',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})({});
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/joy-ui/react-input/)
 *
 * API:
 *
 * - [Input API](https://mui.com/joy-ui/api/input/)
 */
const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyInput',
  });

  const {
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    formControl,
    focused,
    error: errorProp = false,
    disabled,
    fullWidth = false,
    size: sizeProp = 'md',
    color: colorProp = 'neutral',
    variant = 'outlined',
    startDecorator,
    endDecorator,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = useForwardedInput<InputProps>(props, inputClasses);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const error = inProps.error ?? formControl?.error ?? errorProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, error ? 'danger' : formControl?.color ?? colorProp);

  const ownerState = {
    ...props,
    fullWidth,
    color,
    disabled,
    error,
    focused,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: [classes.root, rootStateClasses],
    elementType: InputRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
  });

  const [SlotInput, inputProps] = useSlot('input', {
    ...(formControl && {
      additionalProps: {
        id: formControl.htmlFor,
        'aria-describedby': formControl['aria-describedby'],
      },
    }),
    className: [classes.input, inputStateClasses],
    elementType: InputInput,
    getSlotProps: getInputProps,
    internalForwardedProps: propsToForward,
    externalForwardedProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: InputStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: InputEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
      )}

      <SlotInput {...inputProps} />
      {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
    </SlotRoot>
  );
}) as OverridableComponent<InputTypeMap>;

Input.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  autoComplete: PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Leading adornment for this input.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Input;
