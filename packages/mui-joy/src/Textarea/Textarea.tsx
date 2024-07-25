'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled, useThemeProps } from '../styles';

import useSlot from '../utils/useSlot';
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
      '--Textarea-placeholderColor': 'inherit',
      '--Textarea-placeholderOpacity': 0.64,
      '--Textarea-decoratorColor': theme.vars.palette.text.icon,
      '--Textarea-focused': '0',
      '--Textarea-focusedThickness': theme.vars.focus.thickness,
      '--Textarea-focusedHighlight':
        theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
      '&:not([data-inverted-colors="false"])': {
        ...(ownerState.instanceColor && {
          '--_Textarea-focusedHighlight':
            theme.vars.palette[
              ownerState.instanceColor === 'neutral' ? 'primary' : ownerState.instanceColor
            ]?.[500],
        }),
        '--Textarea-focusedHighlight': `var(--_Textarea-focusedHighlight, ${theme.vars.palette.focusVisible})`,
      },
      ...(ownerState.size === 'sm' && {
        '--Textarea-minHeight': '2rem',
        '--Textarea-paddingBlock': 'calc(0.375rem - 0.5px - var(--variant-borderWidth, 0px))', // to match Input because <textarea> does not center the text at the middle like <input>
        '--Textarea-paddingInline': '0.5rem',
        '--Textarea-decoratorChildHeight': 'min(1.5rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': theme.vars.fontSize.xl,
      }),
      ...(ownerState.size === 'md' && {
        '--Textarea-minHeight': '2.25rem',
        '--Textarea-paddingBlock': 'calc(0.375rem - var(--variant-borderWidth, 0px))',
        '--Textarea-paddingInline': '0.75rem',
        '--Textarea-decoratorChildHeight': 'min(1.75rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': theme.vars.fontSize.xl2,
      }),
      ...(ownerState.size === 'lg' && {
        '--Textarea-minHeight': '3rem',
        '--Textarea-paddingBlock': 'calc(0.75rem - var(--variant-borderWidth, 0px))',
        '--Textarea-paddingInline': '1rem',
        '--Textarea-gap': '0.75rem',
        '--Textarea-decoratorChildHeight': 'min(2.375rem, var(--Textarea-minHeight))',
        '--Icon-fontSize': theme.vars.fontSize.xl2,
      }),
      // variables for controlling child components
      '--_Textarea-paddingBlock':
        'max((var(--Textarea-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Textarea-decoratorChildHeight)) / 2, 0px)',
      '--Textarea-decoratorChildRadius':
        'max(var(--Textarea-radius) - var(--variant-borderWidth, 0px) - var(--_Textarea-paddingBlock), min(var(--_Textarea-paddingBlock) + var(--variant-borderWidth, 0px), var(--Textarea-radius) / 2))',
      '--Button-minHeight': 'var(--Textarea-decoratorChildHeight)',
      '--Button-paddingBlock': '0px', // to ensure that the height of the button is equal to --Button-minHeight
      '--IconButton-size': 'var(--Textarea-decoratorChildHeight)',
      '--Button-radius': 'var(--Textarea-decoratorChildRadius)',
      '--IconButton-radius': 'var(--Textarea-decoratorChildRadius)',
      boxSizing: 'border-box',
      ...(ownerState.variant !== 'plain' && {
        boxShadow: theme.shadow.xs,
      }),
      minWidth: 0,
      minHeight: 'var(--Textarea-minHeight)',
      cursor: 'text',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      paddingInlineStart: `var(--Textarea-paddingInline)`, // the paddingInlineEnd is added to the textarea. It looks better when the scrollbar appears.
      paddingBlock: 'var(--Textarea-paddingBlock)',
      borderRadius: 'var(--Textarea-radius)',
      ...theme.typography[`body-${ownerState.size!}`],
      ...variantStyle,
      backgroundColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      '&::before': {
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
        boxShadow: `var(--Textarea-focusedInset, inset) 0 0 0 calc(var(--Textarea-focused) * var(--Textarea-focusedThickness)) var(--Textarea-focusedHighlight)`,
      },
    } as const,
    {
      '&:hover': {
        ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        backgroundColor: null, // it is not common to change background on hover for Textarea
        cursor: 'text',
      },
      [`&.${textareaClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      '&:focus-within::before': { '--Textarea-focused': '1' },
    },
  ];
});

const TextareaInput = styled(TextareaAutosize, {
  name: 'JoyTextarea',
  slot: 'Textarea',
  overridesResolver: (props, styles) => styles.textarea,
})<{ ownerState: TextareaOwnerState }>({
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
  '&::-webkit-input-placeholder': {
    color: 'var(--Textarea-placeholderColor)',
    opacity: 'var(--Textarea-placeholderOpacity)',
  },
  '&::-moz-placeholder': {
    // Firefox 19+
    color: 'var(--Textarea-placeholderColor)',
    opacity: 'var(--Textarea-placeholderOpacity)',
  },
  '&:-ms-input-placeholder': {
    // IE11
    color: 'var(--Textarea-placeholderColor)',
    opacity: 'var(--Textarea-placeholderOpacity)',
  },
  '&::-ms-input-placeholder': {
    // Edge
    color: 'var(--Textarea-placeholderColor)',
    opacity: 'var(--Textarea-placeholderOpacity)',
  },
});

const TextareaStartDecorator = styled('div', {
  name: 'JoyTextarea',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: TextareaOwnerState }>({
  display: 'flex',
  marginInlineStart: 'calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))',
  marginInlineEnd: 'var(--Textarea-paddingBlock)',
  marginBlockEnd: 'var(--Textarea-gap)',
  color: 'var(--Textarea-decoratorColor)',
  cursor: 'initial',
});

const TextareaEndDecorator = styled('div', {
  name: 'JoyTextarea',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: TextareaOwnerState }>({
  display: 'flex',
  marginInlineStart: 'calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))',
  marginInlineEnd: 'var(--Textarea-paddingBlock)',
  marginBlockStart: 'var(--Textarea-gap)',
  color: 'var(--Textarea-decoratorColor)',
  cursor: 'initial',
});
/**
 *
 * Demos:
 *
 * - [Textarea](https://mui.com/joy-ui/react-textarea/)
 *
 * API:
 *
 * - [Textarea API](https://mui.com/joy-ui/api/textarea/)
 */
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
    formControl,
    focused,
    error: errorProp = false,
    disabled: disabledProp = false,
    size: sizeProp = 'md',
    color: colorProp = 'neutral',
    variant = 'outlined',
    startDecorator,
    endDecorator,
    minRows,
    maxRows,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = useForwardedInput<TextareaProps>(props, textareaClasses);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const disabled = inProps.disabled ?? formControl?.disabled ?? disabledProp;
  const error = inProps.error ?? formControl?.error ?? errorProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const color = inProps.color ?? (error ? 'danger' : (formControl?.color ?? colorProp));

  const ownerState = {
    instanceColor: error ? 'danger' : inProps.color,
    ...props,
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
    elementType: TextareaRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotTextarea, textareaProps] = useSlot('textarea', {
    additionalProps: {
      id: formControl?.htmlFor,
      'aria-describedby': formControl?.['aria-describedby'],
    },
    className: [classes.textarea, inputStateClasses],
    elementType: TextareaInput,
    internalForwardedProps: {
      ...propsToForward,
      minRows,
      maxRows,
    },
    externalForwardedProps,
    getSlotProps: getInputProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: TextareaStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: TextareaEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
      )}

      {/* @ts-ignore onChange conflicts with html input */}
      <SlotTextarea {...textareaProps} />
      {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
    </SlotRoot>
  );
}) as OverridableComponent<TextareaTypeMap>;

Textarea.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Textarea;
