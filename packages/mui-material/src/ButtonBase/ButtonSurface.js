'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import memoTheme from '../utils/memoTheme';
import useForkRef from '../utils/useForkRef';
import useEventCallback from '../utils/useEventCallback';
import useLazyRipple from '../useLazyRipple';
import TouchRipple from './TouchRipple';
import buttonBaseClasses, { getButtonBaseUtilityClass } from './buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';

export const ButtonBaseRoot = styled('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
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
);

// Only the styling layer's own class. `Mui-disabled` and `Mui-focusVisible`
// describe state, so they are emitted by whoever calls `useButtonBase` and
// arrive here already on `className`.
const useUtilityClasses = (classesProp) =>
  composeClasses({ root: ['root'] }, getButtonBaseUtilityClass, classesProp);

function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
  return useEventCallback((event) => {
    if (eventCallback) {
      eventCallback(event);
    }

    if (!skipRippleAction) {
      ripple[rippleAction](event);
    }

    return true;
  });
}

/**
 * The visible half of a Material button: the style reset, the `MuiButtonBase-*`
 * classes, and the ripple.
 *
 * It applies no button semantics. Those come from `useButtonBase`, which the
 * component above it calls. That separation is what lets `Button` put its own
 * logic half in between: `ButtonUnstyled` calls the hook and renders this as its
 * root, so the semantics are applied exactly once.
 *
 * It reads `disabled` and `focusVisible` off `ownerState` rather than taking
 * them as props, because the `disabled` attribute arrives separately through the
 * spread and the two would collide.
 */
const NO_PROPS = {};

const ButtonSurface = React.forwardRef(function ButtonSurface(props, ref) {
  // The theme's `MuiButtonBase.defaultProps` mixes appearance with semantics.
  // Only the appearance half is resolved here: `LinkComponent`, `component` and
  // the rest belong to whoever calls `useButtonBase`, and spreading them would
  // put them on the DOM.
  // This is the `MuiButtonBase` styled slot, so it reads that name and not one
  // matching its own.
  // eslint-disable-next-line mui/material-ui-name-matches-component-name
  const themeProps = useDefaultProps({ props: NO_PROPS, name: 'MuiButtonBase' });
  const {
    centerRipple = themeProps.centerRipple ?? false,
    children,
    classes: classesProp,
    className,
    component = 'button',
    disableRipple = themeProps.disableRipple ?? false,
    disableTouchRipple = themeProps.disableTouchRipple ?? false,
    focusRipple = themeProps.focusRipple ?? false,
    onBlur,
    onContextMenu,
    onDragLeave,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    ownerState,
    TouchRippleProps = themeProps.TouchRippleProps,
    touchRippleRef,
    ...other
  } = props;

  const { disabled, focusVisible } = ownerState;

  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);

  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;

  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);

  const handleKeyDown = useEventCallback((event) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      ripple.stop(event, () => {
        ripple.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  });

  const handleKeyUp = useEventCallback((event) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
      });
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  });

  const handleMouseDown = useRippleHandler(ripple, 'start', onMouseDown, disableTouchRipple);
  const handleContextMenu = useRippleHandler(ripple, 'stop', onContextMenu, disableTouchRipple);
  const handleDragLeave = useRippleHandler(ripple, 'stop', onDragLeave, disableTouchRipple);
  const handleMouseUp = useRippleHandler(ripple, 'stop', onMouseUp, disableTouchRipple);
  const handleMouseLeave = useRippleHandler(ripple, 'stop', onMouseLeave, disableTouchRipple);
  const handleTouchStart = useRippleHandler(ripple, 'start', onTouchStart, disableTouchRipple);
  const handleTouchEnd = useRippleHandler(ripple, 'stop', onTouchEnd, disableTouchRipple);
  const handleTouchMove = useRippleHandler(ripple, 'stop', onTouchMove, disableTouchRipple);
  const handleBlur = useRippleHandler(ripple, 'stop', onBlur, false);

  const classes = useUtilityClasses(classesProp);

  return (
    <ButtonBaseRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      onBlur={handleBlur}
      onContextMenu={handleContextMenu}
      onDragLeave={handleDragLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      {...other}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple ref={handleRippleRef} center={centerRipple} {...TouchRippleProps} />
      ) : null}
    </ButtonBaseRoot>
  );
});

ButtonSurface.propTypes = {
  centerRipple: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.elementType,
  disableRipple: PropTypes.bool,
  disableTouchRipple: PropTypes.bool,
  focusRipple: PropTypes.bool,
  onBlur: PropTypes.func,
  onContextMenu: PropTypes.func,
  onDragLeave: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  /**
   * Carries `disabled` and `focusVisible`, which decide the classes and whether
   * the ripple renders.
   */
  ownerState: PropTypes.object.isRequired,
  TouchRippleProps: PropTypes.object,
  touchRippleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
};

export default ButtonSurface;
