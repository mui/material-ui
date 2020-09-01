import * as React from 'react';
import { css, cx } from 'emotion';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { getThemeProps, useThemeVariants, propsToClassKey } from '@material-ui/styles';
import useTheme from '../styles/useTheme';
import { fade, lighten, darken } from '../styles/colorManipulator';
import SliderBase from './Slider';
import ValueLabel from './ValueLabel';
import defaultTheme from '../styles/defaultTheme';

const shouldForwardProp = (prop) =>
  isPropValid(prop) &&
  prop !== 'color' &&
  prop !== 'scale' &&
  prop !== 'orientation' &&
  prop !== 'disabled';

export const SliderRoot = styled('span', { shouldForwardProp })((props) => {
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
    ...(props.color === 'secondary' && {
      color: props.theme.palette.secondary.main,
    }),
    ...(props.disabled && {
      pointerEvents: 'none',
      cursor: 'default',
      color: props.theme.palette.grey[400],
    }),
    ...(props.orientation === 'vertical' && {
      width: 2,
      height: '100%',
      padding: '0 13px',
    }),
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
      ...(props.orientation === 'vertical' && {
        padding: '0 20px',
      }),
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    ...(props.marked && {
      marginBottom: 20,
      ...(props.orientation === 'vertical' && {
        marginBottom: 'auto',
        marginRight: 20,
      }),
    }),
  };
});

export const SliderRail = styled('span', { shouldForwardProp })((props) => ({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  opacity: 0.38,
  ...(props.orientation === 'vertical' && {
    height: '100%',
    width: 2,
  }),
  ...(props.track === 'inverted' && {
    opacity: 1,
  }),
}));

export const SliderTrack = styled('span', { shouldForwardProp })((props) => ({
  display: 'block',
  position: 'absolute',
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  ...(props.orientation === 'vertical' && {
    width: 2,
  }),
  ...(props.track === false && {
    display: 'none',
  }),
  ...(props.track === 'inverted' && {
    backgroundColor:
      // Same logic as the LinearProgress track color
      props.theme.palette.type === 'light'
        ? lighten(props.theme.palette.primary.main, 0.62)
        : darken(props.theme.palette.primary.main, 0.5),
  }),
}));

export const SliderThumb = styled('span', { shouldForwardProp })((props) => ({
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
  ':hover': {
    boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.primary.main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  ...(props.focusVisible && {
    boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.primary.main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  }),
  '&.MuiSlider--active': {
    boxShadow: `0px 0px 0px 14px ${fade(props.theme.palette.primary.main, 0.16)}`,
  },
  ...(props.disabled && {
    width: 8,
    height: 8,
    marginLeft: -4,
    marginTop: -3,
    ':hover': {
      boxShadow: 'none',
    },
  }),
  ...(props.orientation === 'vertical' && {
    marginLeft: -5,
    marginBottom: -6,
  }),
  ...((props.orientation === 'vertical' || props.disabled) && {
    marginLeft: -3,
    marginBottom: -4,
  }),
  ...(props.color === 'secondary' && {
    ':hover': {
      boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.secondary.main, 0.16)}`,
    },
    ...(props.focusVisible && {
      boxShadow: `0px 0px 0px 8px ${fade(props.theme.palette.secondary.main, 0.16)}`,
    }),
    '&.MuiSlider--active': {
      boxShadow: `0px 0px 0px 14px ${fade(props.theme.palette.secondary.main, 0.16)}`,
    },
  }),
}));

export const SliderValueLabel = styled(ValueLabel)({
  // IE 11 centering bug, to remove from the customization demos once no longer supported
  left: 'calc(-50% - 4px)',
});

export const SliderMark = styled('span', { shouldForwardProp })((props) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  ...(props.markActive && {
    backgroundColor: props.theme.palette.background.paper,
    opacity: 0.8,
  }),
}));

export const SliderMarkLabel = styled('span', { shouldForwardProp })((props) => ({
  ...props.theme.typography.body2,
  color: props.theme.palette.text.secondary,
  position: 'absolute',
  top: 26,
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  ...(props.orientation === 'vertical' && {
    top: 'auto',
    left: 26,
    transform: 'translateY(50%)',
  }),
  '@media (pointer: coarse)': {
    top: 40,
    ...(props.orientation === 'vertical' && {
      left: 31,
    }),
  },
  ...(props.markLabelActive && {
    color: props.theme.palette.text.primary,
  }),
}));

const useThemeProps = (inputProps, ref, name) => {
  const props = Object.assign({}, inputProps);
  const { innerRef } = props;

  const contextTheme = useTheme() || defaultTheme;

  const more = getThemeProps({ theme: contextTheme, name, props });

  const theme = more.theme || contextTheme;
  const isRtl = theme.direction === 'rtl';

  return {
    ref: innerRef || ref,
    theme,
    isRtl,
    ...more,
  };
};

const useThemeClasses = (name) => {
  const theme = useTheme() || defaultTheme;

  let styleOverrides = {};
  let variants = [];

  if (
    theme &&
    theme.components &&
    theme.components[name] &&
    theme.components[name].styleOverrides
  ) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const classes = {};

  Object.keys(styleOverrides).forEach((key) => {
    classes[key] = css(styleOverrides[key]);
  });

  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    if (classes[key]) {
      classes[key] = cx(classes[key], css(definition.style));
    } else {
      classes[key] = css(definition.style);
    }
  });

  return classes;
};

const getComponentProps = (components, componentsProps, name) => {
  return {
    as: components[name],
    ...(componentsProps[name] || {}),
  };
};

const Slider = React.forwardRef(function Slider(inputProps, inputRef) {
  const props = useThemeProps(inputProps, inputRef, 'MuiSlider');
  const classes = useThemeClasses('MuiSlider');
  const themeVariantsClasses = useThemeVariants({ ...props, classes }, 'MuiSlider');
  const { components = {}, componentsProps = {}, ref, ...other } = props;

  return (
    <SliderBase
      {...other}
      classes={classes}
      className={cx(themeVariantsClasses, props.className)}
      components={{
        root: SliderRoot,
        rail: SliderRail,
        track: SliderTrack,
        thumb: SliderThumb,
        valueLabel: SliderValueLabel,
        mark: SliderMark,
        markLabel: SliderMarkLabel,
        ...components,
      }}
      componentsProps={{
        root: getComponentProps(components, componentsProps, 'root'),
        rail: getComponentProps(components, componentsProps, 'rail'),
        track: getComponentProps(components, componentsProps, 'track'),
        thumb: getComponentProps(components, componentsProps, 'thumb'),
        valueLabel: getComponentProps(components, componentsProps, 'valueLabel'),
        mark: getComponentProps(components, componentsProps, 'mark'),
        markLabel: getComponentProps(components, componentsProps, 'markLabel'),
      }}
      ref={ref}
    />
  );
});

export default Slider;
