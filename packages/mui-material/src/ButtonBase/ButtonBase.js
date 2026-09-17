'use client';
import * as React from 'react';
import memoTheme from '../utils/memoTheme';
import createStyledSlots from '../utils/createStyledSlots';
import { useDefaultProps } from '../DefaultPropsProvider';
import buttonBaseClasses, { getButtonBaseUtilityClass } from './buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';
import buttonBaseSlots from './unstyled/buttonBaseSlots';
import ButtonBaseUnstyled from './unstyled/ButtonBaseUnstyled';
import ButtonBaseRipple from './ButtonBaseRipple';

// The Material Design styles, unchanged.
const styles = {
  root: memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    [`&.${buttonBaseClasses.disabled}`]: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    variants: [
      {
        props: { internalDisabledThemeFocusVisible: false },
        style: theme.focusVisible && {
          ...outsetFocusRing,
          [`&.${buttonBaseClasses.focusVisible}`]: theme.focusVisible,
        },
      },
    ],
  })),
};

const styledSlots = createStyledSlots(buttonBaseSlots, getButtonBaseUtilityClass, styles);

export const ButtonBaseRoot = styledSlots.root;

const slots = {
  root: ButtonBaseRoot,
  ripple: ButtonBaseRipple,
};

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiButtonBase' });
  const { slots: slotsProp, ...other } = props;

  return <ButtonBaseUnstyled {...other} ref={ref} slots={{ ...slots, ...slotsProp }} />;
});

ButtonBase.propTypes = { ...ButtonBaseUnstyled.propTypes };

export default ButtonBase;
