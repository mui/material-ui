import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps, Theme } from '../styles';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchTypeMap, SwitchOwnerState } from './SwitchProps';

const useUtilityClasses = (ownerState: SwitchOwnerState) => {
  const { checked, disabled, focusVisible, readOnly, color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
    thumb: ['thumb', checked && 'checked'],
    track: ['track', checked && 'checked'],
    action: ['action', focusVisible && 'focusVisible'],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getSwitchUtilityClass, {});
};

const switchColorVariables =
  ({ theme, ownerState }: { theme: Theme; ownerState: SwitchOwnerState }) =>
  (data: { state?: 'Hover' | 'Disabled' } = {}) => {
    const variant = ownerState.variant;
    const color = ownerState.color;
    return {
      '--Switch-track-background': theme.vars.palette[color!]?.[`${variant!}${data.state || ''}Bg`],
      '--Switch-track-color': theme.vars.palette[color!]?.[`${variant!}Color`],
      '--Switch-track-borderColor':
        variant === 'outlined'
          ? theme.vars.palette[color!]?.[`${variant!}${data.state || ''}Border`]
          : 'currentColor',
      '--Switch-thumb-background':
        theme.vars.palette[color!]?.[`${variant!}${data.state || ''}Color`],
      '--Switch-thumb-color': theme.vars.palette[color!]?.[`${variant!}Bg`],
    };
  };

const SwitchRoot = styled('div', {
  name: 'JoySwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchOwnerState }>(({ theme, ownerState }) => {
  const getColorVariables = switchColorVariables({ theme, ownerState });
  return {
    '--variant-borderWidth':
      theme.variants[ownerState.variant!]?.[ownerState.color!]?.['--variant-borderWidth'],
    '--Switch-track-radius': theme.vars.radius.lg,
    '--Switch-thumb-shadow':
      ownerState.variant === 'soft' ? 'none' : '0 0 0 1px var(--Switch-track-background)', // create border-like if the thumb is bigger than the track
    ...(ownerState.size === 'sm' && {
      '--Switch-track-width': '40px',
      '--Switch-track-height': '20px',
      '--Switch-thumb-size': '12px',
      '--Switch-gap': '6px',
      fontSize: theme.vars.fontSize.sm,
    }),
    ...(ownerState.size === 'md' && {
      '--Switch-track-width': '48px',
      '--Switch-track-height': '24px',
      '--Switch-thumb-size': '16px',
      '--Switch-gap': '8px',
      fontSize: theme.vars.fontSize.md,
    }),
    ...(ownerState.size === 'lg' && {
      '--Switch-track-width': '64px',
      '--Switch-track-height': '32px',
      '--Switch-thumb-size': '24px',
      '--Switch-gap': '12px',
    }),
    '--internal-paddingBlock': `max((var(--Switch-track-height) - 2 * var(--variant-borderWidth) - var(--Switch-thumb-size)) / 2, 0px)`,
    '--Switch-thumb-radius': `max((var(--Switch-track-radius) - var(--variant-borderWidth)) - var(--internal-paddingBlock), min(var(--internal-paddingBlock) / 2, (var(--Switch-track-radius) - var(--variant-borderWidth)) / 2))`,
    '--Switch-thumb-width': 'var(--Switch-thumb-size)',
    '--Switch-thumb-offset': `max((var(--Switch-track-height) - var(--Switch-thumb-size)) / 2, 0px)`,
    ...getColorVariables(),
    '&:hover': {
      ...getColorVariables({ state: 'Hover' }),
    },
    [`&.${switchClasses.checked}`]: {
      ...getColorVariables(),
      '&:hover': {
        ...getColorVariables({ state: 'Hover' }),
      },
    },
    [`&.${switchClasses.disabled}`]: {
      pointerEvents: 'none',
      color: theme.vars.palette.text.tertiary,
      ...getColorVariables({ state: 'Disabled' }),
    },
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: theme.vars.fontFamily.body,
    position: 'relative',
    padding:
      'calc((var(--Switch-thumb-size) / 2) - (var(--Switch-track-height) / 2)) calc(-1 * var(--Switch-thumb-offset))',
    backgroundColor: 'initial', // clear background in case `outlined` variant contain background.
    border: 'none',
  };
});

const SwitchAction = styled('div', {
  name: 'JoySwitch',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: SwitchOwnerState }>(({ theme }) => ({
  borderRadius: 'var(--Switch-track-radius)',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  [theme.focus.selector]: theme.focus.default,
}));

const SwitchInput = styled('input', {
  name: 'JoySwitch',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: SwitchOwnerState }>({
  margin: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  position: 'absolute',
  cursor: 'pointer',
});

const SwitchTrack = styled('span', {
  name: 'JoySwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SwitchOwnerState }>(({ theme, ownerState }) => ({
  position: 'relative',
  color: 'var(--Switch-track-color)',
  height: 'var(--Switch-track-height)',
  width: 'var(--Switch-track-width)',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: 'var(--variant-borderWidth) solid',
  borderColor: 'var(--Switch-track-borderColor)',
  backgroundColor: 'var(--Switch-track-background)',
  borderRadius: 'var(--Switch-track-radius)',
  fontFamily: theme.vars.fontFamily.body,
  ...(ownerState.size === 'sm' && {
    fontSize: theme.vars.fontSize.xs,
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.vars.fontSize.md,
  }),
}));

const SwitchThumb = styled('span', {
  name: 'JoySwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SwitchOwnerState }>({
  '--Icon-fontSize': 'calc(var(--Switch-thumb-size) * 0.75)',
  transition: 'left 0.2s',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - var(--Switch-track-width) / 2 + var(--Switch-thumb-width) / 2 + var(--Switch-thumb-offset))',
  transform: 'translate(-50%, -50%)',
  width: 'var(--Switch-thumb-width)',
  height: 'var(--Switch-thumb-size)',
  borderRadius: 'var(--Switch-thumb-radius)',
  boxShadow: 'var(--Switch-thumb-shadow)',
  color: 'var(--Switch-thumb-color)',
  backgroundColor: 'var(--Switch-thumb-background)',
  [`&.${switchClasses.checked}`]: {
    left: 'calc(50% + var(--Switch-track-width) / 2 - var(--Switch-thumb-width) / 2 - var(--Switch-thumb-offset))',
  },
});

const SwitchStartDecorator = styled('span', {
  name: 'JoySwitch',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: SwitchOwnerState }>({
  display: 'inline-flex',
  marginInlineEnd: 'var(--Switch-gap)',
});

const SwitchEndDecorator = styled('span', {
  name: 'JoySwitch',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: SwitchOwnerState }>({
  display: 'inline-flex',
  marginInlineStart: 'var(--Switch-gap)',
});

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoySwitch',
  });

  const {
    checked: checkedProp,
    component = 'div',
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    id,
    color,
    variant = 'solid',
    size = 'md',
    startDecorator,
    endDecorator,
    ...other
  } = props;

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

  const ownerState = {
    ...props,
    id,
    checked,
    disabled,
    focusVisible,
    readOnly,
    color: checked ? color || 'primary' : color || 'neutral',
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: SwitchRoot,
    externalSlotProps: componentsProps.root,
    ownerState,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    className: classes.root,
  });

  const startDecoratorProps = useSlotProps({
    elementType: SwitchStartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    additionalProps: {
      'aria-hidden': true,
    },
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: SwitchEndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    additionalProps: {
      'aria-hidden': false,
    },
    className: classes.endDecorator,
  });

  const trackProps = useSlotProps({
    elementType: SwitchTrack,
    externalSlotProps: componentsProps.track,
    ownerState,
    className: classes.track,
  });

  const thumbProps = useSlotProps({
    elementType: SwitchThumb,
    externalSlotProps: componentsProps.thumb,
    ownerState,
    className: classes.thumb,
  });

  const actionProps = useSlotProps({
    elementType: SwitchAction,
    externalSlotProps: componentsProps.action,
    ownerState,
    className: classes.action,
  });

  const inputProps = useSlotProps({
    elementType: SwitchInput,
    getSlotProps: getInputProps,
    externalSlotProps: componentsProps.input,
    ownerState,
    additionalProps: {
      id,
    },
    className: classes.input,
  });

  return (
    <SwitchRoot {...rootProps}>
      {startDecorator && (
        <SwitchStartDecorator {...startDecoratorProps}>
          {typeof startDecorator === 'function' ? startDecorator(ownerState) : startDecorator}
        </SwitchStartDecorator>
      )}

      <SwitchTrack {...trackProps}>
        {/* @ts-ignore */}
        {trackProps?.children}
        <SwitchThumb {...thumbProps} />
      </SwitchTrack>
      <SwitchAction {...actionProps}>
        <SwitchInput {...inputProps} />
      </SwitchAction>
      {endDecorator && (
        <SwitchEndDecorator {...endDecoratorProps}>
          {typeof endDecorator === 'function' ? endDecorator(ownerState) : endDecorator}
        </SwitchEndDecorator>
      )}
    </SwitchRoot>
  );
}) as OverridableComponent<SwitchTypeMap>;

Switch.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The element that appears at the end of the switch.
   */
  endDecorator: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
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
   * The element that appears at the end of the switch.
   */
  startDecorator: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
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
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Switch;
