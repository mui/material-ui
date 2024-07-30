'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useSwitch } from '@mui/base/useSwitch';
import { styled, useThemeProps, Theme } from '../styles';

import useSlot from '../utils/useSlot';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchTypeMap, SwitchOwnerState } from './SwitchProps';
import FormControlContext from '../FormControl/FormControlContext';

const useUtilityClasses = (ownerState: SwitchOwnerState) => {
  const { checked, disabled, focusVisible, readOnly, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
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
    const styles =
      theme.variants[`${ownerState.variant!}${data.state || ''}`]?.[ownerState.color!] || {};
    return {
      '--Switch-trackBackground': styles.backgroundColor ?? theme.vars.palette.background.surface,
      '--Switch-trackColor': styles.color,
      '--Switch-trackBorderColor':
        ownerState.variant === 'outlined' ? styles.borderColor : 'currentColor',
      '--Switch-thumbBackground': styles.color,
      '--Switch-thumbColor': styles.backgroundColor ?? theme.vars.palette.background.surface,
    };
  };

const SwitchRoot = styled('div', {
  name: 'JoySwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchOwnerState }>(({ theme, ownerState }) => {
  const getColorVariables = switchColorVariables({ theme, ownerState });
  return {
    '--Icon-color': 'currentColor',
    '--variant-borderWidth':
      theme.variants[ownerState.variant!]?.[ownerState.color!]?.['--variant-borderWidth'],
    '--Switch-trackRadius': theme.vars.radius.xl,
    '--Switch-thumbShadow':
      ownerState.variant === 'soft' ? 'none' : '0 0 0 1px var(--Switch-trackBackground)', // create border-like if the thumb is bigger than the track
    ...(ownerState.size === 'sm' && {
      '--Switch-trackWidth': '26px',
      '--Switch-trackHeight': '16px',
      '--Switch-thumbSize': '10px',
      fontSize: theme.vars.fontSize.sm,
      gap: 'var(--Switch-gap, 6px)',
    }),
    ...(ownerState.size === 'md' && {
      '--Switch-trackWidth': '32px',
      '--Switch-trackHeight': '20px',
      '--Switch-thumbSize': '14px',
      fontSize: theme.vars.fontSize.md,
      gap: 'var(--Switch-gap, 8px)',
    }),
    ...(ownerState.size === 'lg' && {
      '--Switch-trackWidth': '40px',
      '--Switch-trackHeight': '24px',
      '--Switch-thumbSize': '18px',
      gap: 'var(--Switch-gap, 12px)',
    }),
    '--unstable_paddingBlock': `max((var(--Switch-trackHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Switch-thumbSize)) / 2, 0px)`,
    '--Switch-thumbRadius': `max(var(--Switch-trackRadius) - var(--unstable_paddingBlock), min(var(--unstable_paddingBlock) / 2, var(--Switch-trackRadius) / 2))`,
    '--Switch-thumbWidth': 'var(--Switch-thumbSize)',
    '--Switch-thumbOffset': `max((var(--Switch-trackHeight) - var(--Switch-thumbSize)) / 2, 0px)`,
    ...getColorVariables(),
    '&:hover': {
      '@media (hover: hover)': {
        ...getColorVariables({ state: 'Hover' }),
      },
    },
    [`&.${switchClasses.checked}`]: {
      ...getColorVariables(),
      '&:hover': {
        '@media (hover: hover)': {
          ...getColorVariables({ state: 'Hover' }),
        },
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
      'calc((var(--Switch-thumbSize) / 2) - (var(--Switch-trackHeight) / 2)) calc(-1 * var(--Switch-thumbOffset))',
    backgroundColor: 'initial', // clear background in case `outlined` variant contain background.
    border: 'none',
    margin: 'var(--unstable_Switch-margin)',
  };
});

const SwitchAction = styled('div', {
  name: 'JoySwitch',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: SwitchOwnerState }>(({ theme }) => ({
  borderRadius: 'var(--Switch-trackRadius)',
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
  color: 'var(--Switch-trackColor)',
  height: 'var(--Switch-trackHeight)',
  width: 'var(--Switch-trackWidth)',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: 'var(--variant-borderWidth, 0px) solid',
  borderColor: 'var(--Switch-trackBorderColor)',
  backgroundColor: 'var(--Switch-trackBackground)',
  borderRadius: 'var(--Switch-trackRadius)',
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
  '--Icon-fontSize': 'calc(var(--Switch-thumbSize) * 0.75)',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - var(--Switch-trackWidth) / 2 + var(--Switch-thumbWidth) / 2 + var(--Switch-thumbOffset))',
  transform: 'translate(-50%, -50%)',
  width: 'var(--Switch-thumbWidth)',
  height: 'var(--Switch-thumbSize)',
  borderRadius: 'var(--Switch-thumbRadius)',
  boxShadow: 'var(--Switch-thumbShadow)',
  color: 'var(--Switch-thumbColor)',
  backgroundColor: 'var(--Switch-thumbBackground)',
  [`&.${switchClasses.checked}`]: {
    left: 'calc(50% + var(--Switch-trackWidth) / 2 - var(--Switch-thumbWidth) / 2 - var(--Switch-thumbOffset))',
  },
});

const SwitchStartDecorator = styled('span', {
  name: 'JoySwitch',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: SwitchOwnerState }>({
  display: 'inline-flex',
});

const SwitchEndDecorator = styled('span', {
  name: 'JoySwitch',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: SwitchOwnerState }>({
  display: 'inline-flex',
});
/**
 *
 * Demos:
 *
 * - [Switch](https://mui.com/joy-ui/react-switch/)
 *
 * API:
 *
 * - [Switch API](https://mui.com/joy-ui/api/switch/)
 */
const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoySwitch',
  });

  const {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledExternalProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    id,
    color: colorProp,
    variant = 'solid',
    size: sizeProp = 'md',
    startDecorator,
    endDecorator,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const formControl = React.useContext(FormControlContext);

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

  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const color =
    inProps.color ?? (formControl?.error ? 'danger' : (formControl?.color ?? colorProp));

  const useSwitchProps = {
    disabled: inProps.disabled ?? formControl?.disabled ?? disabledExternalProp,
    ...props,
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
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: SwitchRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    additionalProps: {
      'aria-hidden': true, // hide the decorator from assistive technology
    },
    className: classes.startDecorator,
    elementType: SwitchStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    additionalProps: {
      'aria-hidden': true, // hide the decorator from assistive technology
    },
    className: classes.endDecorator,
    elementType: SwitchEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotTrack, trackProps] = useSlot('track', {
    className: classes.track,
    elementType: SwitchTrack,
    externalForwardedProps,
    ownerState,
  });

  const [SlotThumb, thumbProps] = useSlot('thumb', {
    className: classes.thumb,
    elementType: SwitchThumb,
    externalForwardedProps,
    ownerState,
  });

  const [SlotAction, actionProps] = useSlot('action', {
    className: classes.action,
    elementType: SwitchAction,
    externalForwardedProps,
    ownerState,
  });

  const [SlotInput, inputProps] = useSlot('input', {
    additionalProps: {
      id: id ?? formControl?.htmlFor,
      'aria-describedby': formControl?.['aria-describedby'],
    },
    className: classes.input,
    elementType: SwitchInput,
    externalForwardedProps,
    getSlotProps: getInputProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>
          {typeof startDecorator === 'function' ? startDecorator(ownerState) : startDecorator}
        </SlotStartDecorator>
      )}

      <SlotTrack {...trackProps}>
        {/* @ts-ignore */}
        {trackProps?.children}
        <SlotThumb {...thumbProps} />
      </SlotTrack>
      <SlotAction {...actionProps}>
        <SlotInput {...inputProps} />
      </SlotAction>
      {endDecorator && (
        <SlotEndDecorator {...endDecoratorProps}>
          {typeof endDecorator === 'function' ? endDecorator(ownerState) : endDecorator}
        </SlotEndDecorator>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<SwitchTypeMap>;

Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    endDecorator: PropTypes.elementType,
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
  }),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Switch;
