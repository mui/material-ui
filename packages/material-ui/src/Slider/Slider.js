import * as React from 'react';
import { propsToClassKey } from '@material-ui/styles';
import useThemeProps from '../styles/useThemeProps';
import { fade, lighten, darken } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
import SliderBase from './SliderBase';
import muiStyled from '../styles/muiStyled';

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
    [`.& ${name}-rail`]: styles.rail,
    [`.& ${name}-track`]: styles.track,
    [`.& ${name}-mark`]: styles.mark,
    [`.& ${name}-markLabel`]: styles.markLabel,
    [`.& ${name}-valueLabel`]: styles.valueLabel,
    [`.& ${name}-thumb`]: {
      ...styles.thumb,
      ...styles[`thumbColor${capitalize(color)}`],
      '&.Mui-disabled': styles.disabled,
    },
  };

  return styleOverrides;
};

const variantsResolver = (props, styles, theme, name) => {
  const { state = {} } = props;
  let variantsStyles = {};
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    const themeVariants = theme.components[name].variants;
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (state[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles = { ...variantsStyles, ...styles[propsToClassKey(themeVariant.props)] };
      }
    });
  }

  return variantsStyles;
};

export const SliderRoot = muiStyled(
  'div',
  {},
  { muiName: 'MuiSlider', overridesResolver, variantsResolver },
)((props) => {
  return {
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
    ...(props.state.color === 'secondary' && {
      color: props.theme.palette.secondary.main,
    }),
    '&.Mui-disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      color: props.theme.palette.grey[400],
    },
    ...(props.state.orientation === 'vertical' && {
      width: 2,
      height: '100%',
      padding: '0 13px',
    }),
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
      ...(props.state.orientation === 'vertical' && {
        padding: '0 20px',
      }),
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    ...(props.state.marked && {
      marginBottom: 20,
      ...(props.state.orientation === 'vertical' && {
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
      ...(props.state.orientation === 'vertical' && {
        height: '100%',
        width: 2,
      }),
      ...(props.state.track === 'inverted' && {
        opacity: 1,
      }),
    },

    '& .MuiSlider-track': {
      display: 'block',
      position: 'absolute',
      height: 2,
      borderRadius: 1,
      backgroundColor: 'currentColor',
      ...(props.state.orientation === 'vertical' && {
        width: 2,
      }),
      ...(props.state.track === false && {
        display: 'none',
      }),
      ...(props.state.track === 'inverted' && {
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
      ...(props.state.orientation === 'vertical' && {
        marginLeft: -5,
        marginBottom: -6,
      }),
      ...(props.state.orientation === 'vertical' && {
        '&.Mui-disabled': {
          marginLeft: -3,
          marginBottom: -4,
        },
      }),
      ...(props.state.color === 'secondary' && {
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
      ...(props.state.orientation === 'vertical' && {
        top: 'auto',
        left: 26,
        transform: 'translateY(50%)',
      }),
      '@media (pointer: coarse)': {
        top: 40,
        ...(props.state.orientation === 'vertical' && {
          left: 31,
        }),
      },
      '&.MuiSlider-markLabelActive': {
        color: props.theme.palette.text.primary,
      },
    },
  };
});

const getComponentProps = (components, componentsProps, name) => {
  const slotProps = componentsProps[name] || {};
  return {
    as: components[name],
    ...slotProps,
  };
};

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useThemeProps({ props: inputProps, name: 'MuiSlider' });
  const { components = {}, componentsProps = {}, ...other } = props;
  return (
    <SliderBase
      {...other}
      components={{
        Root: SliderRoot,
        ...components,
      }}
      componentsProps={{
        ...componentsProps,
        root: getComponentProps(components, componentsProps, 'root'),
      }}
      ref={ref}
    />
  );
});

export default Slider;
