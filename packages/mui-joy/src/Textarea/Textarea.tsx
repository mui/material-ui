import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { useSlotProps, EventHandlers } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled, useThemeProps } from '../styles';
import { TextareaTypeMap, TextareaProps, TextareaOwnerState } from './TextareaProps';
import textareaClasses, { getTextareaUtilityClass } from './textareaClasses';
import useForwardedInput from '../Input/useForwardedInput';

const useUtilityClasses = (ownerState: TextareaOwnerState) => {
  const { disabled, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    textarea: ['textarea'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getTextareaUtilityClass, {});
};

const TextareaRoot = styled('div', {
  name: 'JoyTextarea',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Textarea-radius': theme.vars.radius.sm,
      '--Textarea-gap': '0.5rem',
      '--Textarea-placeholderOpacity': 0.5,
      '--Textarea-focusedThickness': '2px',
      '--Textarea-focusedHighlight':
        theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
      ...(ownerState.size === 'sm' && {
        '--Textarea-minHeight': '2rem',
        '--Textarea-paddingBlock': 'calc(0.5rem - var(--variant-borderWidth, 0px))', // to match Input because <textarea> does not center the text at the middle like <input>
        '--Textarea-paddingInline': '0.5rem',
        '--Textarea-decorator-childHeight': 'min(1.5rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Textarea-minHeight': '2.5rem',
        '--Textarea-paddingBlock': 'calc(0.5rem - var(--variant-borderWidth, 0px))',
        '--Textarea-paddingInline': '0.75rem',
        '--Textarea-decorator-childHeight': 'min(2rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Textarea-minHeight': '3rem',
        '--Textarea-paddingBlock': 'calc(0.75rem - var(--variant-borderWidth, 0px))',
        '--Textarea-paddingInline': '1rem',
        '--Textarea-gap': '0.75rem',
        '--Textarea-decorator-childHeight': 'min(2.375rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--internal-paddingBlock':
        'max((var(--Textarea-minHeight) - 2 * var(--variant-borderWidth) - var(--Textarea-decorator-childHeight)) / 2, 0px)',
      '--Textarea-decorator-childRadius':
        'max((var(--Textarea-radius) - var(--variant-borderWidth)) - var(--internal-paddingBlock), min(var(--internal-paddingBlock) / 2, (var(--Textarea-radius) - var(--variant-borderWidth)) / 2))',
      '--Button-minHeight': 'var(--Textarea-decorator-childHeight)',
      '--IconButton-size': 'var(--Textarea-decorator-childHeight)',
      '--Button-radius': 'var(--Textarea-decorator-childRadius)',
      '--IconButton-radius': 'var(--Textarea-decorator-childRadius)',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 'var(--Textarea-minHeight)',
      cursor: 'text',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      paddingInlineStart: `var(--Textarea-paddingInline)`, // the paddingInlineEnd is added to the textarea. It looks better when the scrollbar appears.
      paddingBlock: 'var(--Textarea-paddingBlock)',
      borderRadius: 'var(--Textarea-radius)',
      ...(!variantStyle?.backgroundColor && {
        backgroundColor: theme.vars.palette.background.surface,
      }),
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      lineHeight: theme.vars.lineHeight.md,
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
        lineHeight: theme.vars.lineHeight.sm,
      }),
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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
        margin: 'calc(var(--variant-borderWidth) * -1)', // for outlined variant
      },
    },
    {
      // variant styles
      ...variantStyle,
      '&:hover': {
        ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        cursor: 'text',
      },
      [`&.${textareaClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
    // This style has to come after the global variant to set the background to surface
    ownerState.variant !== 'solid' && {
      [`&.${textareaClasses.focused}`]: {
        backgroundColor: theme.vars.palette.background.surface,
        '&:before': {
          boxShadow: `inset 0 0 0 var(--Textarea-focusedThickness) var(--Textarea-focusedHighlight)`,
        },
      },
    },
  ];
});

const TextareaInput = styled(TextareaAutosize, {
  name: 'JoyTextarea',
  slot: 'Textarea',
  overridesResolver: (props, styles) => styles.textarea,
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => ({
  resize: 'none',
  border: 'none', // remove the native textarea width
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: 'auto',
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  '&:-webkit-autofill': {
    WebkitBackgroundClip: 'text', // remove autofill background
    WebkitTextFillColor: theme.vars.palette[ownerState.color!]?.overrideTextPrimary,
  },
  '&::-webkit-input-placeholder': {
    opacity: 'var(--Textarea-placeholderOpacity)',
    color: 'inherit',
  },
  '&::-moz-placeholder': { opacity: 'var(--Textarea-placeholderOpacity)', color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 'var(--Textarea-placeholderOpacity)', color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 'var(--Textarea-placeholderOpacity)', color: 'inherit' }, // Edge
}));

const TextareaStartDecorator = styled('div', {
  name: 'JoyTextarea',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: TextareaOwnerState }>(({ theme }) => ({
  display: 'flex',
  marginInlineStart: 'calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))',
  marginInlineEnd: 'var(--Textarea-paddingBlock)',
  marginBlockEnd: 'var(--Textarea-gap)',
  color: theme.vars.palette.text.tertiary,
}));

const TextareaEndDecorator = styled('div', {
  name: 'JoyTextarea',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: TextareaOwnerState }>(({ theme }) => ({
  display: 'flex',
  marginInlineStart: 'calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))',
  marginInlineEnd: 'var(--Textarea-paddingBlock)',
  marginBlockStart: 'var(--Textarea-gap)',
  color: theme.vars.palette.text.tertiary,
}));

const Textarea = React.forwardRef(function Textarea(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTextarea',
  });

  const {
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    component,
    componentsProps = {},
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState,
    size = 'md',
    color = 'neutral',
    variant = 'outlined',
    startDecorator,
    endDecorator,
    minRows,
    maxRows,
    ...other
  } = useForwardedInput<TextareaProps>(props, textareaClasses);

  const ownerState = {
    ...props,
    color: errorState ? 'danger' : color,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext: formControlContext!,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: TextareaRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: [classes.root, rootStateClasses],
  });

  const textareaProps = useSlotProps({
    elementType: TextareaInput,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsToForward }),
    externalSlotProps: {
      minRows,
      maxRows,
    },
    ownerState,
    className: [classes.textarea, inputStateClasses],
  });

  return (
    <TextareaRoot {...rootProps}>
      {startDecorator && (
        <TextareaStartDecorator className={classes.startDecorator} ownerState={ownerState}>
          {startDecorator}
        </TextareaStartDecorator>
      )}

      {/* @ts-ignore onChange conflicts with html input */}
      <TextareaInput {...textareaProps} />
      {endDecorator && (
        <TextareaEndDecorator className={classes.endDecorator} ownerState={ownerState}>
          {endDecorator}
        </TextareaEndDecorator>
      )}
    </TextareaRoot>
  );
}) as OverridableComponent<TextareaTypeMap>;

Textarea.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    textarea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Textarea;
