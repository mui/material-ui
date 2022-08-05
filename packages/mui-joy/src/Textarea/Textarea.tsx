import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled, useThemeProps } from '../styles';
import { TextareaTypeMap, TextareaProps } from './TextareaProps';
import textareaClasses, { getTextareaUtilityClass } from './textareaClasses';

const useUtilityClasses = (ownerState: TextareaProps) => {
  const { disabled, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getTextareaUtilityClass, {});
};

const TextareaRoot = styled('div', {
  name: 'JoyTextarea',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TextareaProps }>(({ theme, ownerState }) => {
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
        '--Textarea-paddingBlock': 'calc(0.5rem - var(--variant-borderWidth, 0px))', // to match Input
        '--Textarea-paddingInline': '0.5rem',
        '--Textarea-decorator-childHeight': 'min(1.5rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Textarea-minHeight': '2.5rem',
        '--Textarea-paddingBlock': 'calc(0.5rem - var(--variant-borderWidth, 0px))', // to match Input
        '--Textarea-paddingInline': '0.75rem',
        '--Textarea-decorator-childHeight': 'min(2rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Textarea-minHeight': '3rem',
        '--Textarea-paddingBlock': 'calc(0.75rem - var(--variant-borderWidth, 0px))', // to match Input
        '--Textarea-paddingInline': '1rem',
        '--Textarea-gap': '0.75rem',
        '--Textarea-decorator-childHeight': 'min(2.375rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--Textarea-decorator-childOffset':
        'min(calc(var(--Textarea-paddingInline) - (var(--Textarea-minHeight) - 2 * var(--variant-borderWidth) - var(--Textarea-decorator-childHeight)) / 2), var(--Textarea-paddingInline))',
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
      paddingInline: `var(--Textarea-paddingInline)`,
      paddingBlock: 'var(--Textarea-paddingBlock)',
      borderRadius: 'var(--Textarea-radius)',
      ...(!variantStyle.backgroundColor && {
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

const TextareaTextarea = styled(TextareaAutosize, {
  name: 'JoyTextarea',
  slot: 'Textarea',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: TextareaProps }>(({ theme, ownerState }) => ({
  resize: 'none',
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

const Textarea = React.forwardRef(function Textarea(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTextarea',
  });
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleRef = unstable_useForkRef(inputRef, ref);

  const {
    className,
    component,
    color = 'neutral',
    size = 'md',
    variant = 'outlined',
    onFocus,
    onBlur,
    ...other
  } = props;

  const ownerState = {
    ...props,
    focused,
    color,
    size,
    variant,
  };

  const rootStateClasses = {
    [textareaClasses.focused]: focused,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TextareaRoot
      className={clsx(classes.root, rootStateClasses, className)}
      ownerState={ownerState}
      onClick={(event) => {
        if (inputRef.current && event.currentTarget === event.target) {
          inputRef.current.focus();
        }
      }}
    >
      <TextareaTextarea
        ref={handleRef}
        ownerState={ownerState}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...other}
      />
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
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Textarea.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
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
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
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
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
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
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'plain'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
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
