import * as React from 'react';
import PropTypes from 'prop-types';
import { useThemeProps, experimentalStyled, fade, lighten, darken } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import SliderUnstyled from '../SliderUnstyled';
import ValueLabelStyled from './ValueLabelStyled';

const overridesResolver = (props, styles, name) => {
  const {
    color = 'primary',
    marks: marksProp = false,
    max = 100,
    min = 0,
    orientation = 'horizontal',
    step = 1,
    track = 'normal',
  } = props;

  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp || [];

  const marked = marks.length > 0 && marks.some((mark) => mark.label);

  const styleOverrides = {
    ...styles.root,
    ...styles[`color${capitalize(color)}`],
    '&.Mui-disabled': styles.disabled,
    ...(marked && styles.marked),
    ...(orientation === 'vertical' && styles.vertical),
    ...(track === 'inverted' && styles.trackInverted),
    ...(track === false && styles.trackFalse),
    [`& .${name}-rail`]: styles.rail,
    [`& .${name}-track`]: styles.track,
    [`& .${name}-mark`]: styles.mark,
    [`& .${name}-markLabel`]: styles.markLabel,
    [`& .${name}-valueLabel`]: styles.valueLabel,
    [`& .${name}-thumb`]: {
      ...styles.thumb,
      ...styles[`thumbColor${capitalize(color)}`],
      '&.Mui-disabled': styles.disabled,
    },
  };

  return styleOverrides;
};

const SliderRoot = experimentalStyled(
  'span',
  {},
  { muiName: 'MuiSlider', overridesResolver },
)((props) => ({
  height: 2,
  width: '100%',
  boxSizing: 'content-box',
  padding: '13px 0',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: props.theme.palette.primary.main,
  WebkitTapHighlightColor: 'transparent',
  ...(props.styleProps.color === 'secondary' && {
    color: props.theme.palette.secondary.main,
  }),
  '&.Mui-disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    color: props.theme.palette.grey[400],
  },
  ...(props.styleProps.orientation === 'vertical' && {
    width: 2,
    height: '100%',
    padding: '0 13px',
  }),
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': {
    // Reach 42px touch target, about ~8mm on screen.
    padding: '20px 0',
    ...(props.styleProps.orientation === 'vertical' && {
      padding: '0 20px',
    }),
  },
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(props.styleProps.marked && {
    marginBottom: 20,
    ...(props.styleProps.orientation === 'vertical' && {
      marginBottom: 'auto',
      marginRight: 20,
    }),
  }),
  '& .MuiSlider-rail': {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    opacity: 0.38,
    ...(props.styleProps.orientation === 'vertical' && {
      height: '100%',
      width: 2,
    }),
    ...(props.styleProps.track === 'inverted' && {
      opacity: 1,
    }),
  },
  '& .MuiSlider-track': {
    display: 'block',
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    ...(props.styleProps.orientation === 'vertical' && {
      width: 2,
    }),
    ...(props.styleProps.track === false && {
      display: 'none',
    }),
    ...(props.styleProps.track === 'inverted' && {
      backgroundColor:
        // Same logic as the LinearProgress track color
        props.theme.palette.mode === 'light'
          ? lighten(props.theme.palette.primary.main, 0.62)
          : darken(props.theme.palette.primary.main, 0.5),
    }),
  },
  '& .MuiSlider-thumb': {
    position: 'absolute',
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -5,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: props.theme.transitions.create(['box-shadow'], {
      duration: props.theme.transitions.duration.shortest,
    }),
    '::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // reach 42px hit target (2 * 15 + thumb diameter)
      left: -15,
      top: -15,
      right: -15,
      bottom: -15,
    },
    ':hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.primary.main, 0.16)}`,
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${fade(props.theme.palette.primary.main, 0.16)}`,
    },
    '&.Mui-disabled': {
      width: 8,
      height: 8,
      marginLeft: -4,
      marginTop: -3,
      ':hover': {
        boxShadow: 'none',
      },
    },
    ...(props.styleProps.orientation === 'vertical' && {
      marginLeft: -5,
      marginBottom: -6,
    }),
    ...(props.styleProps.orientation === 'vertical' && {
      '&.Mui-disabled': {
        marginLeft: -3,
        marginBottom: -4,
      },
    }),
    ...(props.styleProps.color === 'secondary' && {
      ':hover': {
        boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.secondary.main, 0.16)}`,
      },
      '&.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.secondary.main, 0.16)}`,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${fade(props.theme.palette.secondary.main, 0.16)}`,
      },
    }),
  },
  '& .MuiSlider-valueLabel': {
    // IE 11 centering bug, to remove from the customization demos once no longer supported
    left: 'calc(-50% - 4px)',
  },
  '& .MuiSlider-mark': {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    '&.MuiSlider-markActive': {
      backgroundColor: props.theme.palette.background.paper,
      opacity: 0.8,
    },
  },
  '& .MuiSlider-markLabel': {
    ...props.theme.typography.body2,
    color: props.theme.palette.text.secondary,
    position: 'absolute',
    top: 26,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    ...(props.styleProps.orientation === 'vertical' && {
      top: 'auto',
      left: 26,
      transform: 'translateY(50%)',
    }),
    '@media (pointer: coarse)': {
      top: 40,
      ...(props.styleProps.orientation === 'vertical' && {
        left: 31,
      }),
    },
    '&.MuiSlider-markLabelActive': {
      color: props.theme.palette.text.primary,
    },
  },
}));

SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  styleProps: PropTypes.shape({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary']),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool,
    marks: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.number.isRequired,
        }),
      ),
      PropTypes.bool,
    ]),
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    scale: PropTypes.func,
    step: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]),
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
};

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useThemeProps({ props: inputProps, name: 'MuiSlider' });
  const { components = {}, ...other } = props;
  return (
    <SliderUnstyled
      {...other}
      components={{
        Root: SliderRoot,
        ValueLabel: ValueLabelStyled,
        ...components,
      }}
      ref={ref}
    />
  );
});

Slider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  'aria-label': PropTypes.string,
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': PropTypes.string,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
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
  componentsProps: PropTypes.object,
  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the slider will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   *
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
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
   * If `true` the marks will be spaced according the value of the `step` prop.
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
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The slider orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: PropTypes.func,
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
