/* eslint-disable no-restricted-imports, react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import {
  SwitchUnstyled,
  unstable_composeClasses as composeClasses,
} from '@material-ui/unstyled';
import { alpha, darken, lighten, useThemeProps, styled } from '@material-ui/system';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import {
  useFormControl,
  switchClasses,
  getSwitchUtilityClass,
} from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import useTouchRipple from '@material-ui/core/useTouchRipple';

const useUtilityClasses = (styleProps) => {
  const { classes, edge, size, color, checked, disabled, focusVisible } = styleProps;

  const slots = {
    root: [
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
    ],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      focusVisible && 'focusVisible',
      checked && 'checked',
      disabled && 'disabled',
    ],
    track: ['track'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3,
}));

const SwitchBase = styled('span', {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.switchBase,
      ...styles.input,
      ...(styleProps.color !== 'default' &&
        styles[`color${capitalize(styleProps.color)}`]),
    };
  },
})(
  ({ theme, styleProps }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    color:
      theme.palette.mode === 'light'
        ? theme.palette.common.white
        : theme.palette.grey[300],
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 9,
    borderRadius: '50%',
    ...(styleProps.edge === 'start' && {
      marginLeft: styleProps.size === 'small' ? -3 : -12,
    }),
    ...(styleProps.edge === 'end' && {
      marginRight: styleProps.size === 'small' ? -3 : -12,
    }),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
      pointerEvents: 'none',
      cursor: 'default',
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.palette.mode === 'light' ? 0.12 : 0.2,
    },
  }),
  ({ theme, styleProps }) => ({
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity,
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    ...(styleProps.color !== 'default' && {
      [`&.${switchClasses.checked}`]: {
        color: theme.palette[styleProps.color].main,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[styleProps.color].main,
            theme.palette.action.hoverOpacity,
          ),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          color:
            theme.palette.mode === 'light'
              ? lighten(theme.palette[styleProps.color].main, 0.62)
              : darken(theme.palette[styleProps.color].main, 0.55),
        },
      },
      [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: theme.palette[styleProps.color].main,
      },
    }),
  }),
);

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...(styleProps.edge && styles[`edge${capitalize(styleProps.edge)}`]),
      ...styles[`size${capitalize(styleProps.size)}`],
      ...styles.input,
      ...(styleProps.color !== 'default' &&
        styles[`color${capitalize(styleProps.color)}`]),
    };
  },
})(({ styleProps }) => ({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: 'middle',
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(styleProps.edge === 'start' && {
    marginLeft: -8,
  }),
  ...(styleProps.edge === 'end' && {
    marginRight: -8,
  }),
  ...(styleProps.size === 'small' && {
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
  }),
}));

const SwitchInput = styled('input', {
  name: 'MuiSwitch',
  slot: 'Input',
  skipSx: true,
})({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '300%',
  height: '100%',
  top: 0,
  left: '-100%',
  margin: 0,
  padding: 0,
  zIndex: 1,
});

const SwitchThumb = styled(
  ({ isChecked, icon, checkedIcon, className }) => {
    if (!isChecked && icon) {
      return icon;
    }

    if (isChecked && checkedIcon) {
      return checkedIcon;
    }

    return <span className={className} />;
  },
  {
    name: 'MuiSwitch',
    slot: 'Thumb',
    overridesResolver: (props, styles) => styles.thumb,
  },
)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%',
}));

const SwitchLayout = React.forwardRef((props, ref) => {
  const {
    className,
    disableRipple,
    disableTouchRipple,
    disableFocusRipple,
    styleProps,
    TouchRippleProps,
    children,
    onFocus,
    onBlur,
    ...other
  } = props;

  const { checked, disabled, focusVisible } = styleProps;

  const rippleRef = React.useRef(null);

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    rippleRef,
    focusVisible,
    disabled,
    disableRipple,
    disableTouchRipple,
    disableFocusRipple,
  });

  const rippleHandlers = getRippleHandlers({
    onBlur,
  });

  const classes = useUtilityClasses({
    ...styleProps,
    checked,
    disabled,
    focusVisible,
  });

  return (
    <SwitchRoot
      {...other}
      className={clsx(className, classes.root)}
      ref={ref}
      styleProps={styleProps}
    >
      <SwitchBase
        className={classes.switchBase}
        styleProps={styleProps}
        {...rippleHandlers}
        onFocus={onFocus}
      >
        {children}
        {enableTouchRipple && (
          <TouchRipple ref={rippleRef} center {...TouchRippleProps} />
        )}
      </SwitchBase>
      <SwitchTrack className={classes.track} />
    </SwitchRoot>
  );
});

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSwitch' });

  const {
    checked: checkedProp,
    checkedIcon,
    className,
    color = 'primary',
    disabled: disabledProp,
    disableFocusRipple = false,
    disableRipple = false,
    disableTouchRipple = false,
    edge = false,
    icon,
    inputProps,
    onBlur,
    onFocus,
    size = 'medium',
    TouchRippleProps,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    onFocus?.(event);

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    onBlur?.(event);

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const styleProps = {
    ...props,
    color,
    edge,
    size,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
  };

  const components = {
    Root: SwitchLayout,
    Input: SwitchInput,
    Thumb: SwitchThumb,
  };

  const componentsProps = {
    root: {
      className,
      styleProps,
      disableFocusRipple,
      disableRipple,
      disableTouchRipple,
      onBlur: handleBlur,
      onFocus: handleFocus,
      TouchRippleProps,
    },
    input: {
      styleProps,
      ...inputProps,
    },
    thumb: {
      styleProps,
      icon,
      checkedIcon,
      defaultThumbClassName: switchClasses.thumb,
    },
  };

  return (
    <SwitchUnstyled
      ref={ref}
      components={components}
      componentsProps={componentsProps}
      disabled={disabled}
      {...other}
    />
  );
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function UseSwitchesCustom() {
  return (
    <div>
      <ThemeProvider theme={createTheme()}>
        <Switch {...label} defaultChecked />
        <Switch {...label} color="secondary" />
        <Switch {...label} disabled defaultChecked />
        <Switch {...label} disabled />
      </ThemeProvider>
    </div>
  );
}
