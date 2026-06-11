'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import SwitchBase from '../internal/SwitchBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { mergeSlotProps } from '../utils';
import useSlot from '../utils/useSlot';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes, edge, size, color, checked, disabled } = ownerState;

  const slots = {
    root: ['root', edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...classes, // forward the disabled and checked classes to the SwitchBase
    ...composedClasses,
  };
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})({
  // Density (docs/adr/0001): Switch geometry is interlocked, so the knobs are the
  // dims (width/height/thumbSize/touchSize) + the track gutter (pad); the thumb's
  // touch padding and travel are *derived* so the thumb stays centered on the track.
  //   SwitchBase pad = (touchSize - thumbSize) / 2   (centers thumb in the button)
  //   button top     = (height - touchSize) / 2       (centers button in the root)
  //   checked travel = width - touchSize
  // Defaults: touchSize == height -> pad 9/4, top 0, travel 20/16 (pixel-identical).
  // The thumb (SwitchBase) and Thumb/Track slots inherit these seams (custom props
  // inherit; they don't redeclare them). `--_pad` here is the root's gutter default
  // (the track inset), distinct from the thumb's own SwitchBase `--_pad`.
  '--_width': '58px', // 34 (track) + 12 (gutter) * 2
  '--_height': '38px', // 14 (track) + 12 (gutter) * 2
  '--_thumbSize': '20px',
  '--_touchSize': '38px',
  '--_pad': '12px',
  '--Switch-width': 'var(--Switch-medium-width, var(--_width))',
  '--Switch-height': 'var(--Switch-medium-height, var(--_height))',
  '--Switch-thumbSize': 'var(--Switch-medium-thumbSize, var(--_thumbSize))',
  '--Switch-touchSize': 'var(--Switch-medium-touchSize, var(--_touchSize))',
  '--Switch-pad': 'var(--Switch-medium-pad, var(--_pad))',
  '--SwitchBase-pad': 'calc((var(--Switch-touchSize) - var(--Switch-thumbSize)) / 2)',
  display: 'inline-flex',
  width: 'var(--Switch-width, var(--_width))',
  height: 'var(--Switch-height, var(--_height))',
  overflow: 'hidden',
  padding: 'var(--Switch-pad, var(--_pad))',
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: 'middle', // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact',
  },
  variants: [
    {
      props: { edge: 'start' },
      style: { marginLeft: -8 },
    },
    {
      props: { edge: 'end' },
      style: { marginRight: -8 },
    },
    {
      props: { size: 'small' },
      style: {
        // Re-route the dims + gutter to the small tokens; pad/top/travel re-derive.
        '--_width': '40px',
        '--_height': '24px',
        '--_thumbSize': '16px',
        '--_touchSize': '24px',
        '--_pad': '7px',
        '--Switch-width': 'var(--Switch-small-width, var(--_width))',
        '--Switch-height': 'var(--Switch-small-height, var(--_height))',
        '--Switch-thumbSize': 'var(--Switch-small-thumbSize, var(--_thumbSize))',
        '--Switch-touchSize': 'var(--Switch-small-touchSize, var(--_touchSize))',
        '--Switch-pad': 'var(--Switch-small-pad, var(--_pad))',
      },
    },
  ],
});

const SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.switchBase,
      { [`& .${switchClasses.input}`]: styles.input },
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    // Center the touch target in the root (top 0 when touchSize == height).
    top: 'calc((var(--Switch-height, var(--_height)) - var(--Switch-touchSize, var(--_touchSize))) / 2)',
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.vars
      ? theme.vars.palette.Switch.defaultColor
      : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
    ...getTransitionStyles(theme, ['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${switchClasses.checked}`]: {
      // Travel = root width - touch target (keeps the thumb symmetric on the track).
      transform:
        'translateX(calc(var(--Switch-width, var(--_width)) - var(--Switch-touchSize, var(--_touchSize))))',
    },
    [`&.${switchClasses.disabled}`]: {
      color: theme.vars
        ? theme.vars.palette.Switch.defaultDisabledColor
        : `${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]}`,
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.vars
        ? theme.vars.opacity.switchTrackDisabled
        : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
    },
    [`& .${switchClasses.input}`]: {
      left: '-100%',
      width: '300%',
    },
  })),
  memoTheme(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.action.active,
        (theme.vars || theme).palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['light'])) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${switchClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
              '&:hover': {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette[color].main,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
              [`&.${switchClasses.disabled}`]: {
                color: theme.vars
                  ? theme.vars.palette.Switch[`${color}DisabledColor`]
                  : `${
                      theme.palette.mode === 'light'
                        ? theme.lighten(theme.palette[color].main, 0.62)
                        : theme.darken(theme.palette[color].main, 0.55)
                    }`,
              },
            },
            [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
              backgroundColor: (theme.vars || theme).palette[color].main,
            },
          },
        })),
    ],
  })),
);

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
})(
  memoTheme(({ theme }) => ({
    height: '100%',
    width: '100%',
    // Full pill: half the track thickness (height minus the two gutters). Inherits
    // the seams from SwitchRoot. Medium -> 7px; small clamps to a pill either way.
    borderRadius:
      'calc((var(--Switch-height, var(--_height)) - 2 * var(--Switch-pad, var(--_pad))) / 2)',
    zIndex: -1,
    ...getTransitionStyles(theme, ['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '@media (forced-colors: active)': {
      boxSizing: 'border-box',
      border: '1px solid ButtonBorder',
    },
    backgroundColor: theme.vars
      ? theme.vars.palette.common.onBackground
      : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
    opacity: theme.vars
      ? theme.vars.opacity.switchTrack
      : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`,
  })),
);

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
})(
  memoTheme(({ theme }) => ({
    boxShadow: (theme.vars || theme).shadows[1],
    backgroundColor: 'currentColor',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: 'var(--Switch-thumbSize, var(--_thumbSize))',
    height: 'var(--Switch-thumbSize, var(--_thumbSize))',
    borderRadius: '50%',
  })),
);

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSwitch' });
  const {
    className,
    color = 'primary',
    edge = false,
    size = 'medium',
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalInputProps = slotProps.input;

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    className: clsx(classes.root, className),
    elementType: SwitchRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      sx,
    },
  });

  const [ThumbSlot, thumbSlotProps] = useSlot('thumb', {
    className: classes.thumb,
    elementType: SwitchThumb,
    externalForwardedProps,
    ownerState,
  });

  const icon = <ThumbSlot {...thumbSlotProps} />;

  const [TrackSlot, trackSlotProps] = useSlot('track', {
    className: classes.track,
    elementType: SwitchTrack,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        ref={ref}
        ownerState={ownerState}
        {...other}
        classes={{
          ...classes,
          root: classes.switchBase,
        }}
        slots={{
          ...(slots.switchBase && { root: slots.switchBase }),
          ...(slots.input && { input: slots.input }),
        }}
        slotProps={{
          ...(slotProps.switchBase && {
            root:
              typeof slotProps.switchBase === 'function'
                ? slotProps.switchBase(ownerState)
                : slotProps.switchBase,
          }),
          input: mergeSlotProps(
            typeof externalInputProps === 'function'
              ? externalInputProps(ownerState)
              : externalInputProps,
            {
              role: 'switch',
            },
          ),
        }}
      />
      <TrackSlot {...trackSlotProps} />
    </RootSlot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchBase: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    switchBase: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;
