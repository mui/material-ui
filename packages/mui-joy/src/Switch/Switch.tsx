import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled } from '../styles';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchProps } from './SwitchProps';

const useUtilityClasses = (ownerState: SwitchProps & { focusVisible: boolean }) => {
  const { classes, checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    thumb: ['thumb', checked && 'checked'],
    track: ['track', checked && 'checked'],
    input: ['input'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(!ownerState.checked && theme.variants[ownerState.variant!]?.[ownerState.color!]), // color & bg will be overridden by the CSS variables
      '--Switch-track-radius': theme.vars.radius.lg,
      '--Switch-track-width': '48px',
      '--Switch-track-height': '24px',
      '--Switch-thumb-size': '16px',
      ...(ownerState.size === 'sm' && {
        '--Switch-track-width': '40px',
        '--Switch-track-height': '20px',
        '--Switch-thumb-size': '12px',
      }),
      ...(ownerState.size === 'lg' && {
        '--Switch-track-width': '64px',
        '--Switch-track-height': '32px',
        '--Switch-thumb-size': '24px',
      }),
      '--Switch-thumb-radius': 'calc(var(--Switch-track-radius) - 2px)',
      '--Switch-thumb-width': 'var(--Switch-thumb-size)',
      '--Switch-thumb-offset':
        'max((var(--Switch-track-height) - var(--Switch-thumb-size)) / 2, 0px)',
      '--Switch-track-background':
        theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Bg`],
      '--Switch-track-borderColor':
        ownerState.variant === 'outlined'
          ? theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Border`]
          : 'currentColor',
      '--Switch-thumb-color':
        theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
      '&:hover': {
        '--Switch-track-background':
          theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}HoverBg`],
        '--Switch-track-borderColor':
          ownerState.variant === 'outlined'
            ? theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}HoverBorder`]
            : 'currentColor',
        '--Switch-thumb-color':
          theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}HoverColor`],
      },
      [`&.${switchClasses.checked}`]: {
        '--Switch-track-background':
          theme.vars.palette[ownerState.checkedColor!]?.[`${ownerState.checkedVariant!}Bg`],
        '--Switch-track-borderColor':
          ownerState.checkedVariant === 'outlined'
            ? theme.vars.palette[ownerState.checkedColor!]?.[
                `${ownerState.checkedVariant!}HoverBorder`
              ]
            : 'currentColor',
        '--Switch-thumb-color':
          theme.vars.palette[ownerState.checkedColor!]?.[`${ownerState.checkedVariant!}Color`],
        '&:hover': {
          '--Switch-track-background':
            theme.vars.palette[ownerState.checkedColor!]?.[`${ownerState.checkedVariant!}HoverBg`],
          '--Switch-track-borderColor':
            ownerState.checkedVariant === 'outlined'
              ? theme.vars.palette[ownerState.checkedColor!]?.[
                  `${ownerState.checkedVariant!}HoverBorder`
                ]
              : 'currentColor',
          '--Switch-thumb-color':
            theme.vars.palette[ownerState.checkedColor!]?.[
              `${ownerState.checkedVariant!}HoverColor`
            ],
        },
      },
      display: 'inline-block',
      width: 'var(--Switch-track-width)', // should have the same width as track because flex parent can stretch SwitchRoot.
      borderRadius: 'var(--Switch-track-radius)',
      boxSizing: 'border-box',
      position: 'relative',
      padding:
        'calc((var(--Switch-thumb-size) / 2) - (var(--Switch-track-height) / 2)) calc(-1 * var(--Switch-thumb-offset))',
      backgroundColor: 'var(--Switch-track-background)',
      color: 'var(--Switch-thumb-color)',
      borderColor: 'var(--Switch-track-borderColor)',
      [`&.${switchClasses.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        opacity: 0.6,
      },
      [`&.${switchClasses.focusVisible}`]: theme.focus.default,
    },
  ];
});

const SwitchInput = styled('input', {
  name: 'MuiSwitch',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: SwitchProps }>(() => ({
  margin: 0,
  height: 'var(--Switch-track-height)', // don't use 100% because root can have border width
  width: 'var(--Switch-track-width)', // don't use 100% because root can have border width
  opacity: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  cursor: 'pointer',
}));

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SwitchProps & { focusVisible: boolean } }>(() => ({
  position: 'relative',
  color: 'inherit',
  height: 'calc(var(--Switch-track-height) - 2 * var(--variant-outlinedBorderWidth, 0px))', // account for the border width
  width: 'calc(var(--Switch-track-width) - 2 * var(--variant-outlinedBorderWidth, 0px))', // account for the border width
  display: 'block',
  backgroundColor: 'inherit', // need to inherit from root, so that hover state can change the background (the track is covered by input)
  borderRadius: 'var(--Switch-track-radius)',
}));

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SwitchProps }>(() => ({
  transition: 'left 0.2s',
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - var(--Switch-track-width) / 2 + var(--Switch-thumb-width) / 2 + var(--Switch-thumb-offset))',
  transform: 'translate(-50%, -50%)',
  width: 'var(--Switch-thumb-width)',
  height: 'var(--Switch-thumb-size)',
  borderRadius: 'var(--Switch-thumb-radius)',
  color: 'inherit',
  backgroundColor: 'currentColor',
  [`&.${switchClasses.checked}`]: {
    left: 'calc(50% + var(--Switch-track-width) / 2 - var(--Switch-thumb-width) / 2 - var(--Switch-thumb-offset))',
  },
}));

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(function Switch(inProps, ref) {
  const props = inProps;
  const {
    checked: checkedProp,
    className,
    component,
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    color = 'neutral',
    checkedColor = 'primary',
    variant = 'contained',
    checkedVariant = variant,
    size,
    ...otherProps
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
    checked,
    disabled,
    focusVisible,
    readOnly,
    color,
    checkedColor,
    variant,
    checkedVariant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchRoot
      ref={ref}
      {...otherProps}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <SwitchTrack
        {...componentsProps.track}
        ownerState={ownerState}
        className={clsx(classes.track, componentsProps.track?.className)}
      />
      <SwitchThumb
        {...componentsProps.thumb}
        ownerState={ownerState}
        className={clsx(classes.thumb, componentsProps.thumb?.className)}
      />
      <SwitchInput
        {...componentsProps.input}
        ownerState={ownerState}
        {...getInputProps()}
        className={clsx(classes.input, componentsProps.input?.className)}
      />
    </SwitchRoot>
  );
});

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
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    thumb: PropTypes.object,
    track: PropTypes.object,
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
} as any;

export default Switch;
