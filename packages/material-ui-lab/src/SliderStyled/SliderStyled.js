import * as React from 'react';
import PropTypes from 'prop-types';
import { useThemeProps, muiStyled, fade, lighten, darken } from '@material-ui/core/styles';
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

const SliderRoot = muiStyled(
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
        props.theme.palette.type === 'light'
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
  const {
    /* eslint-disable react/prop-types */
    components = {},
    ...other
  } = props;
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
   * @ignore
   */
  children: PropTypes.node,
};

export default Slider;
