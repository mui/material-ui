/* eslint-disable react/prop-types */

import * as React from 'react';
import { styled, shouldForwardProp } from '@mui/system';
import { InputUnstyled, inputUnstyledClasses, isHostComponent } from '@mui/core';
import { capitalize } from '@mui/utils';
import { createTheme, ThemeProvider, Input, Stack } from '@mui/material';

const rootShouldForwardProp = (prop) =>
  shouldForwardProp(prop) && prop !== 'classes';

const rootOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.formControl && styles.formControl,
    ownerState.startAdornment && styles.adornedStart,
    ownerState.endAdornment && styles.adornedEnd,
    ownerState.error && styles.error,
    ownerState.size === 'small' && styles.sizeSmall,
    ownerState.multiline && styles.multiline,
    ownerState.color && styles[`color${capitalize(ownerState.color)}`],
    ownerState.fullWidth && styles.fullWidth,
    ownerState.hiddenLabel && styles.hiddenLabel,
  ];
};

const inputOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.input,
    ownerState.size === 'small' && styles.inputSizeSmall,
    ownerState.multiline && styles.inputMultiline,
    ownerState.type === 'search' && styles.inputTypeSearch,
    ownerState.startAdornment && styles.inputAdornedStart,
    ownerState.endAdornment && styles.inputAdornedEnd,
    ownerState.hiddenLabel && styles.inputHiddenLabel,
  ];
};

const InputRoot = styled('div', {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      ...rootOverridesResolver(props, styles),
      !ownerState.disableUnderline && styles.underline,
    ];
  },
})(({ theme, ownerState, color, size, fullWidth, disableUnderline }) => {
  const light = theme.palette.mode === 'light';
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    lineHeight: '1.4375em', // 23px
    boxSizing: 'border-box', // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center',
    [`&.${inputUnstyledClasses.disabled}`]: {
      color: theme.palette.text.disabled,
      cursor: 'default',
    },
    ...(ownerState.multiline && {
      padding: '4px 0 5px',
      ...(size === 'small' && {
        paddingTop: 1,
      }),
    }),
    ...(fullWidth && {
      width: '100%',
    }),
    ...(ownerState.formControl && {
      'label + &': {
        marginTop: 16,
      },
    }),
    ...(!disableUnderline && {
      '&:after': {
        borderBottom: `2px solid ${theme.palette[color].main}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      [`&.${inputUnstyledClasses.focused}:after`]: {
        transform: 'scaleX(1)',
      },
      [`&.${inputUnstyledClasses.error}:after`]: {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)', // error is always underlined in red
      },
      '&:before': {
        borderBottom: `1px solid ${bottomLineColor}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      [`&:hover:not(.${inputUnstyledClasses.disabled}):before`]: {
        borderBottom: `2px solid ${theme.palette.text.primary}`,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          borderBottom: `1px solid ${bottomLineColor}`,
        },
      },
      [`&.${inputUnstyledClasses.disabled}:before`]: {
        borderBottomStyle: 'dotted',
      },
    }),
  };
});

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: inputOverridesResolver,
})(({ theme, size, multiline, type }) => {
  const light = theme.palette.mode === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  };

  const placeholderHidden = {
    opacity: '0 !important',
  };

  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5,
  };

  return {
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em', // Reset 23pxthe native input line-height
    margin: 0, // Reset for Safari
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%', // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder, // Firefox 19+
    '&:-ms-input-placeholder': placeholder, // IE11
    '&::-ms-input-placeholder': placeholder, // Edge
    '&:focus': {
      outline: 0,
    },
    // Reset Firefox invalid required input style
    '&:invalid': {
      boxShadow: 'none',
    },
    '&::-webkit-search-decoration': {
      // Remove the padding when type=search.
      WebkitAppearance: 'none',
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputUnstyledClasses.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden, // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden, // IE11
      '&::-ms-input-placeholder': placeholderHidden, // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible, // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible, // Edge
    },
    [`&.${inputUnstyledClasses.disabled}`]: {
      opacity: 1, // Reset iOS opacity
      WebkitTextFillColor: theme.palette.text.disabled, // Fix opacity Safari bug
    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill',
    },
    ...(size === 'small' && {
      paddingTop: 1,
    }),
    ...(multiline && {
      height: 'auto',
      resize: 'none',
      padding: 0,
      paddingTop: 0,
    }),
    ...(type === 'search' && {
      // Improve type search style.
      MozAppearance: 'textfield',
      WebkitAppearance: 'textfield',
    }),
  };
});

export const MaterialInput = React.forwardRef(function MaterialInput(props, ref) {
  const {
    color,
    disableUnderline = false,
    endAdornment,
    fullWidth = false,
    hiddenLabel = false,
    size,
    startAdornment,
    ...other
  } = props;

  const components = {
    Root: InputRoot,
    Input: InputInput,
  };

  const styleProps = {
    ...props,
    color: 'primary',
    disableUnderline,
    fullWidth,
    hiddenLabel,
    size,
  };

  const componentsProps = {
    root: isHostComponent(InputRoot) ? {} : { ...styleProps },
    input: isHostComponent(InputInput) ? {} : { ...styleProps },
  };

  return (
    <InputUnstyled
      {...other}
      ref={ref}
      components={components}
      componentsProps={componentsProps}
    />
  );
});

export default function UnstyledInputMaterial() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Stack>
        <MaterialInput defaultValue="Type something" />
        <MaterialInput defaultValue="Type something" disabled />
      </Stack>
      <Stack>
        <Input defaultValue="Type something" />
        <Input defaultValue="Type something" disabled />
      </Stack>
    </ThemeProvider>
  );
}
