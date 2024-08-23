'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { alpha, darken, lighten } from '@mui/system/colorManipulator';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';

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
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
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
        width: 40,
        height: 24,
        padding: 7,
        [`& .${switchClasses.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${switchClasses.switchBase}`]: {
          padding: 4,
          [`&.${switchClasses.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
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
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.vars
      ? theme.vars.palette.Switch.defaultColor
      : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
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
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
        : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(([, value]) => value && value.main && value.light) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${switchClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
              '&:hover': {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
              [`&.${switchClasses.disabled}`]: {
                color: theme.vars
                  ? theme.vars.palette.Switch[`${color}DisabledColor`]
                  : `${
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette[color].main, 0.62)
                        : darken(theme.palette[color].main, 0.55)
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
  overridesResolver: (props, styles) => styles.track,
})(
  memoTheme(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
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
  overridesResolver: (props, styles) => styles.thumb,
})(
  memoTheme(({ theme }) => ({
    boxShadow: (theme.vars || theme).shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
  })),
);

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', sx, ...other } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const icon = <SwitchThumb className={classes.thumb} ownerState={ownerState} />;

  return (
    <SwitchRoot className={clsx(classes.root, className)} sx={sx} ownerState={ownerState}>
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
      />
      <SwitchTrack className={classes.track} ownerState={ownerState} />
    </SwitchRoot>
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
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
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
