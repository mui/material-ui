import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import SliderUnstyled, {
  SliderValueLabelUnstyled,
  sliderUnstyledClasses,
  getSliderUtilityClass,
} from '@mui/base/SliderUnstyled';
import { alpha, lighten, darken } from '@mui/system';
import useThemeProps from '../styles/useThemeProps';
import styled, { slotShouldForwardProp } from '../styles/styled';
import useTheme from '../styles/useTheme';
import shouldSpreadAdditionalProps from '../utils/shouldSpreadAdditionalProps';
import capitalize from '../utils/capitalize';

export const sliderClasses = {
  ...sliderUnstyledClasses,
  ...generateUtilityClasses('MuiSlider', [
    'colorPrimary',
    'colorSecondary',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'sizeSmall',
    'thumbSizeSmall',
  ]),
};

const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size)}`],
      ownerState.marked && styles.marked,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.track === 'inverted' && styles.trackInverted,
      ownerState.track === false && styles.trackFalse,
    ];
  },
})(({ theme, ownerState }) => ({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: (theme.vars || theme).palette[ownerState.color].main,
  WebkitTapHighlightColor: 'transparent',
  ...(ownerState.orientation === 'horizontal' && {
    height: 4,
    width: '100%',
    padding: '13px 0',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
    },
    ...(ownerState.size === 'small' && {
      height: 2,
    }),
    ...(ownerState.marked && {
      marginBottom: 20,
    }),
  }),
  ...(ownerState.orientation === 'vertical' && {
    height: '100%',
    width: 4,
    padding: '0 13px',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '0 20px',
    },
    ...(ownerState.size === 'small' && {
      width: 2,
    }),
    ...(ownerState.marked && {
      marginRight: 44,
    }),
  }),
  '@media print': {
    colorAdjust: 'exact',
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: (theme.vars || theme).palette.grey[400],
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: 'none',
    },
  },
}));

SliderRoot.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderRoot };

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})(({ ownerState }) => ({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  ...(ownerState.orientation === 'horizontal' && {
    width: '100%',
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    height: '100%',
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  ...(ownerState.track === 'inverted' && {
    opacity: 1,
  }),
}));

SliderRail.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderRail };

const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme, ownerState }) => {
  const color = // Same logic as the LinearProgress track color
    theme.palette.mode === 'light'
      ? lighten(theme.palette[ownerState.color].main, 0.62)
      : darken(theme.palette[ownerState.color].main, 0.5);
  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest,
    }),
    ...(ownerState.size === 'small' && {
      border: 'none',
    }),
    ...(ownerState.orientation === 'horizontal' && {
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(ownerState.orientation === 'vertical' && {
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.track === false && {
      display: 'none',
    }),
    ...(ownerState.track === 'inverted' && {
      backgroundColor: theme.vars ? theme.vars.palette.Slider[`${ownerState.color}Track`] : color,
      borderColor: theme.vars ? theme.vars.palette.Slider[`${ownerState.color}Track`] : color,
    }),
  };
});

SliderTrack.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderTrack };

const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.thumb,
      styles[`thumbColor${capitalize(ownerState.color)}`],
      ownerState.size !== 'medium' && styles[`thumbSize${capitalize(ownerState.size)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  position: 'absolute',
  width: 20,
  height: 20,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: theme.transitions.duration.shortest,
  }),
  ...(ownerState.size === 'small' && {
    width: 12,
    height: 12,
  }),
  ...(ownerState.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: (theme.vars || theme).shadows[2],
    ...(ownerState.size === 'small' && {
      boxShadow: 'none',
    }),
  },
  '&::after': {
    position: 'absolute',
    content: '""',
    borderRadius: '50%',
    // 42px is the hit target
    width: 42,
    height: 42,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${
      theme.vars
        ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.16)`
        : alpha(theme.palette[ownerState.color].main, 0.16)
    }`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${
      theme.vars
        ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.16)`
        : alpha(theme.palette[ownerState.color].main, 0.16)
    }`,
  },
  [`&.${sliderClasses.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));

SliderThumb.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderThumb };

const SliderValueLabel = styled(SliderValueLabelUnstyled, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})(({ theme, ownerState }) => ({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: 'translateY(-100%) scale(1)',
  },
  zIndex: 1,
  whiteSpace: 'nowrap',
  ...theme.typography.body2,
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  transform: 'translateY(-100%) scale(0)',
  position: 'absolute',
  backgroundColor: (theme.vars || theme).palette.grey[600],
  borderRadius: 2,
  color: (theme.vars || theme).palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  ...(ownerState.orientation === 'horizontal' && {
    top: '-10px',
    transformOrigin: 'bottom center',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: 8,
      height: 8,
      transform: 'translate(-50%, 50%) rotate(45deg)',
      backgroundColor: 'inherit',
      bottom: 0,
      left: '50%',
    },
  }),
  ...(ownerState.orientation === 'vertical' && {
    right: '30px',
    top: '24px',
    transformOrigin: 'right center',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: 8,
      height: 8,
      transform: 'translate(-50%, 50%) rotate(45deg)',
      backgroundColor: 'inherit',
      right: '-20%',
      top: '25%',
    },
  }),
  ...(ownerState.size === 'small' && {
    fontSize: theme.typography.pxToRem(12),
    padding: '0.25rem 0.5rem',
  }),
}));

SliderValueLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderValueLabel };

const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => styles.mark,
})(({ theme, ownerState, markActive }) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  ...(ownerState.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-1px, -50%)',
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 1px)',
  }),
  ...(markActive && {
    backgroundColor: (theme.vars || theme).palette.background.paper,
    opacity: 0.8,
  }),
}));

SliderMark.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderMark };

const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel,
})(({ theme, ownerState, markLabelActive }) => ({
  ...theme.typography.body2,
  color: (theme.vars || theme).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(ownerState.orientation === 'horizontal' && {
    top: 30,
    transform: 'translateX(-50%)',
    '@media (pointer: coarse)': {
      top: 40,
    },
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
    '@media (pointer: coarse)': {
      left: 44,
    },
  }),
  ...(markLabelActive && {
    color: (theme.vars || theme).palette.text.primary,
  }),
}));

SliderMarkLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
};

export { SliderMarkLabel };

const extendUtilityClasses = (ownerState) => {
  const { color, size, classes = {} } = ownerState;

  return {
    ...classes,
    root: clsx(
      classes.root,
      getSliderUtilityClass(`color${capitalize(color)}`),
      classes[`color${capitalize(color)}`],
      size && getSliderUtilityClass(`size${capitalize(size)}`),
      size && classes[`size${capitalize(size)}`],
    ),
    thumb: clsx(
      classes.thumb,
      getSliderUtilityClass(`thumbColor${capitalize(color)}`),
      classes[`thumbColor${capitalize(color)}`],
      size && getSliderUtilityClass(`thumbSize${capitalize(size)}`),
      size && classes[`thumbSize${capitalize(size)}`],
    ),
  };
};

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useThemeProps({ props: inputProps, name: 'MuiSlider' });

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const {
    // eslint-disable-next-line react/prop-types
    component = 'span',
    components = {},
    componentsProps = {},
    color = 'primary',
    size = 'medium',
    ...other
  } = props;

  const ownerState = { ...props, color, size };

  const classes = extendUtilityClasses(ownerState);

  return (
    <SliderUnstyled
      {...other}
      isRtl={isRtl}
      components={{
        Root: SliderRoot,
        Rail: SliderRail,
        Track: SliderTrack,
        Thumb: SliderThumb,
        ValueLabel: SliderValueLabel,
        Mark: SliderMark,
        MarkLabel: SliderMarkLabel,
        ...components,
      }}
      componentsProps={{
        ...componentsProps,
        root: {
          ...componentsProps.root,
          ...(shouldSpreadAdditionalProps(components.Root) && {
            as: component,
            ownerState: { ...componentsProps.root?.ownerState, color, size },
          }),
        },
        thumb: {
          ...componentsProps.thumb,
          ...(shouldSpreadAdditionalProps(components.Thumb) && {
            ownerState: { ...componentsProps.thumb?.ownerState, color, size },
          }),
        },
        track: {
          ...componentsProps.track,
          ...(shouldSpreadAdditionalProps(components.Track) && {
            ownerState: { ...componentsProps.track?.ownerState, color, size },
          }),
        },
        valueLabel: {
          ...componentsProps.valueLabel,
          ...(shouldSpreadAdditionalProps(components.ValueLabel) && {
            ownerState: { ...componentsProps.valueLabel?.ownerState, color, size },
          }),
        },
      }}
      classes={classes}
      ref={ref}
    />
  );
});

Slider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Mark: PropTypes.elementType,
    MarkLabel: PropTypes.elementType,
    Rail: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.elementType,
    ValueLabel: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        children: PropTypes.element,
        className: PropTypes.string,
        components: PropTypes.shape({
          Root: PropTypes.elementType,
        }),
        open: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.number,
        valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
      }),
    ]),
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl: PropTypes.bool,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.number.isRequired,
      }),
    ),
    PropTypes.bool,
  ]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: PropTypes.func,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium']),
    PropTypes.string,
  ]),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: PropTypes.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(['inverted', 'normal', false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @default (x) => x
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default Slider;
