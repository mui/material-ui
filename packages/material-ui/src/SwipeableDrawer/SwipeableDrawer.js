import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import useEventCallback from '../utils/useEventCallback';
import { duration } from '../styles/transitions';
import useTheme from '../styles/useTheme';
import { getTransitionProps } from '../transitions/utils';
import NoSsr from '../NoSsr';
import SwipeArea from './SwipeArea';

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

function calculateCurrentX(anchor, touches) {
  return anchor === 'right' ? document.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}

function calculateCurrentY(anchor, touches) {
  return anchor === 'bottom' ? window.innerHeight - touches[0].clientY : touches[0].clientY;
}

function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}

function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(
    Math.max(
      open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate,
      0,
    ),
    maxTranslate,
  );
}

const disableSwipeToOpenDefault =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const transitionDurationDefault = { enter: duration.enteringScreen, exit: duration.leavingScreen };

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const SwipeableDrawer = React.forwardRef(function SwipeableDrawer(props, ref) {
  const {
    anchor = 'left',
    disableBackdropTransition = false,
    disableDiscovery = false,
    disableSwipeToOpen = disableSwipeToOpenDefault,
    hideBackdrop,
    hysteresis = 0.52,
    minFlingVelocity = 450,
    ModalProps: { BackdropProps, ...ModalPropsProp } = {},
    onClose,
    onOpen,
    open,
    PaperProps = {},
    SwipeAreaProps,
    swipeAreaWidth = 20,
    transitionDuration = transitionDurationDefault,
    variant = 'temporary', // Mobile first.
    ...other
  } = props;

  const theme = useTheme();
  const [maybeSwiping, setMaybeSwiping] = React.useState(false);
  const swipeInstance = React.useRef({
    isSwiping: null,
  });
  const swipeAreaRef = React.useRef();
  const backdropRef = React.useRef();
  const paperRef = React.useRef();

  const touchDetected = React.useRef(false);

  // Ref for transition duration based on / to match swipe speed
  const calculatedDurationRef = React.useRef();

  // Use a ref so the open value used is always up to date inside useCallback.
  useEnhancedEffect(() => {
    calculatedDurationRef.current = null;
  }, [open]);

  const setPosition = React.useCallback(
    (translate, options = {}) => {
      const { mode = null, changeTransition = true } = options;

      const anchorRtl = getAnchor(theme, anchor);
      const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
      const horizontalSwipe = isHorizontal(anchor);

      const transform = horizontalSwipe
        ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
        : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
      const drawerStyle = paperRef.current.style;
      drawerStyle.webkitTransform = transform;
      drawerStyle.transform = transform;

      let transition = '';

      if (mode) {
        transition = theme.transitions.create(
          'all',
          getTransitionProps(
            {
              timeout: transitionDuration,
            },
            {
              mode,
            },
          ),
        );
      }

      if (changeTransition) {
        drawerStyle.webkitTransition = transition;
        drawerStyle.transition = transition;
      }

      if (!disableBackdropTransition && !hideBackdrop) {
        const backdropStyle = backdropRef.current.style;
        backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);

        if (changeTransition) {
          backdropStyle.webkitTransition = transition;
          backdropStyle.transition = transition;
        }
      }
    },
    [anchor, disableBackdropTransition, hideBackdrop, theme, transitionDuration],
  );

  const handleBodyTouchEnd = useEventCallback(event => {
    if (!touchDetected.current) {
      return;
    }
    touchDetected.current = false;
    setMaybeSwiping(false);

    // The swipe wasn't started.
    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }

    swipeInstance.current.isSwiping = null;

    const anchorRtl = getAnchor(theme, anchor);
    const horizontal = isHorizontal(anchor);
    let current;
    if (horizontal) {
      current = calculateCurrentX(anchorRtl, event.changedTouches);
    } else {
      current = calculateCurrentY(anchorRtl, event.changedTouches);
    }

    const startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    const maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    const currentTranslate = getTranslate(current, startLocation, open, maxTranslate);
    const translateRatio = currentTranslate / maxTranslate;

    if (Math.abs(swipeInstance.current.velocity) > minFlingVelocity) {
      // Calculate transition duration to match swipe speed
      calculatedDurationRef.current =
        Math.abs((maxTranslate - currentTranslate) / swipeInstance.current.velocity) * 1000;
    }

    if (open) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose();
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(0, {
          mode: 'exit',
        });
      }

      return;
    }

    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: 'enter',
      });
    }
  });

  const handleBodyTouchMove = useEventCallback(event => {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    }

    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);

    const currentX = calculateCurrentX(anchorRtl, event.touches);
    const currentY = calculateCurrentY(anchorRtl, event.touches);

    // We don't know yet.
    if (swipeInstance.current.isSwiping == null) {
      const dx = Math.abs(currentX - swipeInstance.current.startX);
      const dy = Math.abs(currentY - swipeInstance.current.startY);

      // We are likely to be swiping, let's prevent the scroll event on iOS.
      if (dx > dy) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }

      const definitelySwiping = horizontalSwipe
        ? dx > dy && dx > UNCERTAINTY_THRESHOLD
        : dy > dx && dy > UNCERTAINTY_THRESHOLD;

      if (
        definitelySwiping === true ||
        (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
      ) {
        swipeInstance.current.isSwiping = definitelySwiping;
        if (!definitelySwiping) {
          handleBodyTouchEnd(event);
          return;
        }

        // Shift the starting point.
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;

        // Compensate for the part of the drawer displayed on touch start.
        if (!disableDiscovery && !open) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= swipeAreaWidth;
          } else {
            swipeInstance.current.startY -= swipeAreaWidth;
          }
        }
      }
    }

    if (!swipeInstance.current.isSwiping) {
      return;
    }

    const maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    let startLocation = horizontalSwipe
      ? swipeInstance.current.startX
      : swipeInstance.current.startY;
    if (open && !swipeInstance.current.paperHit) {
      startLocation = Math.min(startLocation, maxTranslate);
    }

    const translate = getTranslate(
      horizontalSwipe ? currentX : currentY,
      startLocation,
      open,
      maxTranslate,
    );

    if (open) {
      if (!swipeInstance.current.paperHit) {
        const paperHit = horizontalSwipe ? currentX < maxTranslate : currentY < maxTranslate;
        if (paperHit) {
          swipeInstance.current.paperHit = true;
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;
        } else {
          return;
        }
      } else if (translate === 0) {
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
      }
    }

    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }

    const velocity =
      ((translate - swipeInstance.current.lastTranslate) /
        (performance.now() - swipeInstance.current.lastTime)) *
      1e3;

    // Low Pass filter.
    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;

    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now();

    // We are swiping, let's prevent the scroll event on iOS.
    if (event.cancelable) {
      event.preventDefault();
    }

    setPosition(translate);
  });

  const handleBodyTouchStart = useEventCallback(event => {
    // We are not supposed to handle this touch move.
    // Example of use case: ignore the event if there is a Slider.
    if (event.defaultPrevented) {
      return;
    }

    // We can only have one node at the time claiming ownership for handling the swipe.
    if (event.muiHandled) {
      return;
    }

    const anchorRtl = getAnchor(theme, anchor);
    const horizontalSwipe = isHorizontal(anchor);

    const currentX = calculateCurrentX(anchorRtl, event.touches);
    const currentY = calculateCurrentY(anchorRtl, event.touches);

    if (!open) {
      if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
        return;
      }
      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }

    event.muiHandled = true;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;

    setMaybeSwiping(true);
    if (!open && paperRef.current) {
      // The ref may be null when a parent component updates while swiping.
      setPosition(
        getMaxTranslate(horizontalSwipe, paperRef.current) +
          (disableDiscovery ? 20 : -swipeAreaWidth),
        {
          changeTransition: false,
        },
      );
    }

    swipeInstance.current.velocity = 0;
    swipeInstance.current.lastTime = null;
    swipeInstance.current.lastTranslate = null;
    swipeInstance.current.paperHit = false;

    touchDetected.current = true;
  });

  React.useEffect(() => {
    if (variant === 'temporary') {
      document.body.addEventListener('touchstart', handleBodyTouchStart);
      document.body.addEventListener('touchmove', handleBodyTouchMove, { passive: false });
      document.body.addEventListener('touchend', handleBodyTouchEnd);

      return () => {
        document.body.removeEventListener('touchstart', handleBodyTouchStart);
        document.body.removeEventListener('touchmove', handleBodyTouchMove, { passive: false });
        document.body.removeEventListener('touchend', handleBodyTouchEnd);
      };
    }

    return undefined;
  }, [variant, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);

  React.useEffect(() => {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);

  const handleBackdropRef = React.useCallback(instance => {
    // #StrictMode ready
    backdropRef.current = ReactDOM.findDOMNode(instance);
  }, []);

  const handlePaperRef = React.useCallback(instance => {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(instance);
  }, []);

  return (
    <React.Fragment>
      <Drawer
        open={variant === 'temporary' && maybeSwiping ? true : open}
        variant={variant}
        ModalProps={{
          BackdropProps: {
            ...BackdropProps,
            ref: handleBackdropRef,
          },
          ...ModalPropsProp,
        }}
        PaperProps={{
          ...PaperProps,
          style: {
            pointerEvents: variant === 'temporary' && !open ? 'none' : '',
            ...PaperProps.style,
          },
          ref: handlePaperRef,
        }}
        anchor={anchor}
        transitionDuration={calculatedDurationRef.current || transitionDuration}
        onClose={onClose}
        ref={ref}
        {...other}
      />
      {!disableSwipeToOpen && variant === 'temporary' && (
        <NoSsr>
          <SwipeArea
            anchor={anchor}
            ref={swipeAreaRef}
            width={swipeAreaWidth}
            {...SwipeAreaProps}
          />
        </NoSsr>
      )}
    </React.Fragment>
  );
});

SwipeableDrawer.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   */
  disableBackdropTransition: PropTypes.bool,
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery: PropTypes.bool,
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   */
  disableSwipeToOpen: PropTypes.bool,
  /**
   * @ignore
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Affects how far the drawer must be opened/closed to change his state.
   * Specified as percent (0-1) of the width of the drawer
   */
  hysteresis: PropTypes.number,
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   */
  minFlingVelocity: PropTypes.number,
  /**
   * @ignore
   */
  ModalProps: PropTypes.shape({
    BackdropProps: PropTypes.shape({
      component: elementTypeAcceptingRef,
    }),
  }),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func.isRequired,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: PropTypes.shape({
    component: elementTypeAcceptingRef,
    style: PropTypes.object,
  }),
  /**
   * Props applied to the swipe area element.
   */
  SwipeAreaProps: PropTypes.object,
  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth: PropTypes.number,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
  /**
   * @ignore
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default SwipeableDrawer;
