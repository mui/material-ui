'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import memoTheme from '../utils/memoTheme';
import createStyledSlots from '../utils/createStyledSlots';
import createAppearance, { prefixed } from '../utils/createAppearance';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { getTransitionStyles } from '../transitions/utils';
import { outsetFocusRing } from '../styles/focusVisible';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import sliderSlots from './unstyled/sliderSlots';
import SliderUnstyled from './unstyled/SliderUnstyled';

// The Material Design styles, unchanged. They are material's business alone;
// the unstyled component knows nothing about them.
const styles = {
  root: memoTheme(({ theme }) => ({
    borderRadius: 12,
    boxSizing: 'content-box',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',
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
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].main,
          },
        })),
      {
        props: { orientation: 'horizontal' },
        style: {
          height: 4,
          width: '100%',
          padding: '13px 0',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '20px 0',
          },
        },
      },
      {
        props: { orientation: 'horizontal', size: 'small' },
        style: {
          height: 2,
        },
      },
      {
        props: { orientation: 'horizontal', marked: true },
        style: {
          marginBottom: 20,
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          height: '100%',
          width: 4,
          padding: '0 13px',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '0 20px',
          },
        },
      },
      {
        props: { orientation: 'vertical', size: 'small' },
        style: {
          width: 2,
        },
      },
      {
        props: { orientation: 'vertical', marked: true },
        style: {
          marginRight: 44,
        },
      },
    ],
  })),
  rail: {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
    opacity: 0.38,
    '@media (forced-colors: active)': {
      border: '1px solid transparent',
      boxSizing: 'border-box',
    },
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          width: '100%',
          height: 'inherit',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          height: '100%',
          width: 'inherit',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      {
        props: { track: 'inverted' },
        style: {
          opacity: 1,
        },
      },
    ],
  },
  track: memoTheme(({ theme }) => {
    return {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      ...getTransitionStyles(theme, ['left', 'width', 'bottom', 'height'], {
        duration: theme.transitions.duration.shortest,
      }),
      variants: [
        {
          props: { size: 'small' },
          style: {
            '@media (forced-colors: none)': {
              border: 'none',
            },
          },
        },
        {
          props: { orientation: 'horizontal' },
          style: {
            height: 'inherit',
            top: '50%',
            transform: 'translateY(-50%)',
          },
        },
        {
          props: { orientation: 'vertical' },
          style: {
            width: 'inherit',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        },
        {
          props: { track: false },
          style: {
            display: 'none',
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color, track: 'inverted' },
            style: {
              ...(theme.vars
                ? {
                    backgroundColor: theme.vars.palette.Slider[`${color}Track`],
                    borderColor: theme.vars.palette.Slider[`${color}Track`],
                  }
                : {
                    backgroundColor: theme.lighten(theme.palette[color].main, 0.62),
                    borderColor: theme.lighten(theme.palette[color].main, 0.62),
                    ...theme.applyStyles('dark', {
                      backgroundColor: theme.darken(theme.palette[color].main, 0.5),
                    }),
                    ...theme.applyStyles('dark', {
                      borderColor: theme.darken(theme.palette[color].main, 0.5),
                    }),
                  }),
            },
          })),
      ],
    };
  }),
  thumb: memoTheme(({ theme }) => ({
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
    ...getTransitionStyles(theme, ['box-shadow', 'left', 'bottom'], {
      duration: theme.transitions.duration.shortest,
    }),
    '@media (forced-colors: active)': {
      border: '1px solid ButtonBorder',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      boxShadow: (theme.vars || theme).shadows[2],
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
    [`&.${sliderClasses.disabled}`]: {
      '&:hover': {
        boxShadow: 'none',
      },
    },
    ...(theme.focusVisible && {
      [`&.${sliderClasses.focusVisible}`]: { ...outsetFocusRing, ...theme.focusVisible },
    }),
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: 12,
          height: 12,
          '&::before': {
            boxShadow: 'none',
          },
        },
      },
      {
        props: { orientation: 'horizontal' },
        style: {
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: '50%',
          transform: 'translate(-50%, 50%)',
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            '&:hover': {
              boxShadow: `0px 0px 0px 8px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
              '@media (hover: none)': {
                boxShadow: 'none',
              },
            },
            ...(!theme.focusVisible && {
              [`&.${sliderClasses.focusVisible}`]: {
                boxShadow: `0px 0px 0px 8px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
                '@media (hover: none)': {
                  boxShadow: 'none',
                },
              },
            }),
            [`&.${sliderClasses.active}`]: {
              boxShadow: `0px 0px 0px 14px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
            },
          },
        })),
    ],
  })),
  valueLabel: memoTheme(({ theme }) => ({
    zIndex: 1,
    whiteSpace: 'nowrap',
    ...theme.typography.body2,
    fontWeight: 500,
    ...getTransitionStyles(theme, ['transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'absolute',
    backgroundColor: (theme.vars || theme).palette.grey[600],
    borderRadius: 2,
    color: (theme.vars || theme).palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 0.75rem',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          transform: 'translateY(-100%) scale(0)',
          top: '-10px',
          transformOrigin: 'bottom center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, 50%) rotate(45deg)',
            backgroundColor: 'inherit',
            bottom: 0,
            left: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-100%) scale(1)',
          },
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          transform: 'translateY(-50%) scale(0)',
          right: '30px',
          top: '50%',
          transformOrigin: 'right center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            backgroundColor: 'inherit',
            right: -8,
            top: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-50%) scale(1)',
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          fontSize: theme.typography.pxToRem(12),
          padding: '0.25rem 0.5rem',
        },
      },
      {
        props: { orientation: 'vertical', size: 'small' },
        style: {
          right: '20px',
        },
      },
    ],
  })),
  mark: memoTheme(({ theme }) => ({
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          top: '50%',
          transform: 'translate(-1px, -50%)',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: '50%',
          transform: 'translate(-50%, 1px)',
        },
      },
    ],
    // Matched by class rather than by a `markActive` prop: the prop existed only
    // to drive styling, and the class is already on the element.
    [`&.${sliderClasses.markActive}`]: {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      opacity: 0.8,
    },
  })),
  markLabel: memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    color: (theme.vars || theme).palette.text.secondary,
    position: 'absolute',
    whiteSpace: 'nowrap',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          top: 30,
          transform: 'translateX(-50%)',
          '@media (pointer: coarse)': {
            top: 40,
          },
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: 36,
          transform: 'translateY(50%)',
          '@media (pointer: coarse)': {
            left: 44,
          },
        },
      },
    ],
    [`&.${sliderClasses.markLabelActive}`]: {
      color: (theme.vars || theme).palette.text.primary,
    },
  })),
};

// Material Design's appearance vocabulary. The unstyled component knows none of
// this; it only receives the class keys and ownerState this produces.
const appearance = createAppearance({
  color: {
    default: 'primary',
    className: prefixed('color'),
    values: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    // A theme can add palette colours, so the values cannot all be listed.
    prefix: 'color',
  },
  size: {
    default: 'medium',
    className: prefixed('size'),
    values: ['small', 'medium'],
  },
});

const styledSlots = createStyledSlots(sliderSlots, getSliderUtilityClass, styles, appearance);

export const SliderRoot = styledSlots.root;
export const SliderRail = styledSlots.rail;
export const SliderTrack = styledSlots.track;
export const SliderThumb = styledSlots.thumb;
export const SliderMark = styledSlots.mark;
export const SliderMarkLabel = styledSlots.markLabel;

const SliderValueLabel = styledSlots.valueLabel;

SliderValueLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.element.isRequired,
  /**
   * @ignore
   */
  index: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  open: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  value: PropTypes.node,
};

export { SliderValueLabel };

const Slider = React.forwardRef(function Slider(props, ref) {
  const { color, size, slots, ...other } = props;
  return (
    <SliderUnstyled
      {...other}
      ref={ref}
      // Translated here rather than inside the component, so the appearance
      // props never reach it and never reach the DOM.
      appearance={appearance.resolve({ color, size })}
      // Material's shells are the defaults; anything the user passes wins.
      slots={{ ...styledSlots, ...slots }}
    />
  );
});

Slider.propTypes = {
  ...SliderUnstyled.propTypes,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium']),
    PropTypes.string,
  ]),
};

export default Slider;
