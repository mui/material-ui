// @inheritedComponent Drawer

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import NoSsr from '../NoSsr';
import SwipeArea from './SwipeArea';
import { useForkRef } from '../utils/reactHelpers';
import { getTransitionProps } from '../transitions/utils';

// This value is closed to what browsers are using internally to
// trigger a native scroll.
const UNCERTAINTY_THRESHOLD = 3; // px

// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let nodeThatClaimedTheSwipe = null;

// Exported for test purposes.
export function reset() {
  nodeThatClaimedTheSwipe = null;
}

function calculateCurrentX(anchor, touches) {
  return anchor === 'right' ? document.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}

function calculateCurrentY(anchor, touches) {
  return anchor === 'bottom' ? window.innerHeight - touches[0].clientY : touches[0].clientY;
}

function getMaxTranslate(horizontal, paperInstance) {
  return horizontal ? paperInstance.clientWidth : paperInstance.clientHeight;
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

const SwipeableDrawer = React.forwardRef(function SwipeableDrawer(props, ref) {
  const {
    anchor,
    disableBackdropTransition,
    disableDiscovery,
    disableSwipeToOpen,
    hideBackdrop,
    hysteresis,
    minFlingVelocity,
    ModalProps: { BackdropProps, ...ModalPropsProp } = {},
    onClose,
    onOpen,
    open: openProp,
    PaperProps = {},
    SwipeAreaProps,
    swipeAreaWidth,
    transitionDuration,
    theme,
    variant,
    ...other
  } = props;

  const backdropRef = React.useRef();
  const paperRef = React.useRef();
  const swipeAreaRef = React.useRef();
  const drawerRef = React.useRef();
  const handleRef = useForkRef(drawerRef, ref);

  const [currentAnchor, setCurrentAnchor] = React.useState(null);
  const [currentlyHorizontal, setHorizontalState] = React.useState();
  const [discoveryTriggered, triggerDiscovery] = React.useState(false);
  const isSwiping = React.useRef(null);
  const [transition, setTransition] = React.useState({ transition: null });

  // Swipe Stats
  const startX = React.useRef();
  const startY = React.useRef();
  const velocity = React.useRef();
  const lastTime = React.useRef();
  const lastTranslate = React.useRef();

  const handleBackdropRef = instance => {
    // #StrictMode ready
    backdropRef.current = ReactDOM.findDOMNode(instance);
  };

  const handlePaperRef = instance => {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(instance);
  };

  React.useEffect(() => {
    setCurrentAnchor(getAnchor(theme.direction, anchor));
  }, [theme.direction, anchor]);

  React.useEffect(() => {
    setHorizontalState(isHorizontal(anchor));
  }, [anchor]);

  React.useEffect(() => {
    const handleBodyTouchStart = event => {
      if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== swipeAreaRef.current) {
        return;
      }

      const currentX = calculateCurrentX(currentAnchor, event.touches);
      const currentY = calculateCurrentY(currentAnchor, event.touches);

      if (!openProp) {
        if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
          return;
        }

        // Check if touch was outside swipeAreaWidth
        if (currentlyHorizontal) {
          if (currentX > swipeAreaWidth) {
            return;
          }
        } else if (currentY > swipeAreaWidth) {
          return;
        }
      }

      nodeThatClaimedTheSwipe = swipeAreaRef.current;
      startX.current = currentX;
      startY.current = currentY;

      triggerDiscovery(true);

      if (!openProp && paperRef.current) {
        const newTransition =
          getMaxTranslate(currentlyHorizontal, paperRef.current) +
          (disableDiscovery ? 20 : -swipeAreaWidth);
        setTransition({ translate: newTransition, changeTransition: false });
      }

      velocity.current = 0;
      lastTime.current = null;
      lastTranslate.current = null;
    };

    const handleBodyTouchEnd = event => {
      nodeThatClaimedTheSwipe = null;
      triggerDiscovery(false);

      // The swipe wasn't started.
      if (!isSwiping.current) {
        isSwiping.current = null;
        return;
      }

      isSwiping.current = null;

      let current;
      if (currentlyHorizontal) {
        current = calculateCurrentX(currentAnchor, event.changedTouches);
      } else {
        current = calculateCurrentY(currentAnchor, event.changedTouches);
      }

      const startLocation = currentlyHorizontal ? startX.current : startY.current;
      const maxTranslate = getMaxTranslate(currentlyHorizontal, paperRef.current);
      const translateRatio =
        getTranslate(current, startLocation, openProp, maxTranslate) / maxTranslate;

      if (openProp) {
        if (velocity.current > minFlingVelocity || translateRatio > hysteresis) {
          onClose();
        } else {
          // Reset the position, the swipe was aborted.
          setTransition({ translate: 0, mode: 'exit' });
        }

        return;
      }

      if (velocity.current < -minFlingVelocity || 1 - translateRatio > hysteresis) {
        onOpen();
      } else {
        // Reset the position, the swipe was aborted.
        setTransition({
          translate: getMaxTranslate(currentlyHorizontal, paperRef.current),
          mode: 'enter',
        });
      }
    };

    const handleBodyTouchMove = event => {
      // the ref may be null when a parent component updates while swiping
      if (!paperRef.current) return;

      const currentX = calculateCurrentX(currentAnchor, event.touches);
      const currentY = calculateCurrentY(currentAnchor, event.touches);

      if (isSwiping.current === null) {
        const dx = Math.abs(currentX - startX.current);
        const dy = Math.abs(currentY - startY.current);

        // We are likely to be swiping, let's prevent the scroll event on iOS.
        if (dx > dy) {
          event.preventDefault();
        }

        const definitelySwiping = currentlyHorizontal
          ? dx > dy && dx > UNCERTAINTY_THRESHOLD
          : dy > dx && dy > UNCERTAINTY_THRESHOLD;

        if (
          definitelySwiping === true ||
          (currentlyHorizontal ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
        ) {
          isSwiping.current = definitelySwiping;
          if (!definitelySwiping) {
            handleBodyTouchEnd(event);
            return;
          }

          // Shift the starting point.
          startX.current = currentX;
          startY.current = currentY;

          // Compensate for the part of the drawer displayed on touch start.
          if (!disableDiscovery && !openProp) {
            if (currentlyHorizontal) {
              startX.current -= swipeAreaWidth;
            } else {
              startY.current -= swipeAreaWidth;
            }
          }
        }
      }

      if (!isSwiping.current) {
        return;
      }

      const current = currentlyHorizontal ? currentX : currentY;
      const startLocation = currentlyHorizontal ? startX.current : startY.current;
      const maxTranslate = getMaxTranslate(currentlyHorizontal, paperRef.current);
      const translate = getTranslate(current, startLocation, openProp, maxTranslate);

      if (lastTranslate.current === null) {
        lastTranslate.current = translate;
        lastTime.current = performance.now() + 1;
      }

      const newVelocity =
        ((translate - lastTranslate.current) / (performance.now() - lastTime.current)) * 1e3;

      // Low Pass filter.
      velocity.current = velocity.current * 0.4 + newVelocity * 0.6;

      lastTranslate.current = translate;
      lastTime.current = performance.now();

      event.preventDefault();
      setTransition({ translate });
    };

    document.body.addEventListener('touchstart', handleBodyTouchStart);
    document.body.addEventListener('touchmove', handleBodyTouchMove, { passive: false });
    document.body.addEventListener('touchend', handleBodyTouchEnd);
    document.body.addEventListener('touchcancel', handleBodyTouchEnd);

    return () => {
      document.body.removeEventListener('touchstart', handleBodyTouchStart);
      document.body.removeEventListener('touchmove', handleBodyTouchMove);
      document.body.removeEventListener('touchend', handleBodyTouchEnd);
      document.body.removeEventListener('touchcancel', handleBodyTouchEnd);
    };
  }, [
    currentAnchor,
    currentlyHorizontal,
    disableDiscovery,
    disableSwipeToOpen,
    discoveryTriggered,
    hysteresis,
    minFlingVelocity,
    onClose,
    onOpen,
    openProp,
    swipeAreaWidth,
  ]);

  React.useEffect(() => {
    if (!paperRef.current) return;

    const { translate, mode, changeTransition } = transition;

    if (translate === null) return;

    const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(currentAnchor) !== -1 ? 1 : -1;
    const transform = currentlyHorizontal
      ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
      : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    const drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;

    let cssTransition = '';

    if (mode) {
      cssTransition = theme.transitions.create(
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
      drawerStyle.webkitTransition = cssTransition;
      drawerStyle.transition = cssTransition;
    }

    if (backdropRef.current && !disableBackdropTransition && !hideBackdrop) {
      const backdropStyle = backdropRef.current.style;
      backdropStyle.opacity =
        1 - translate / getMaxTranslate(currentlyHorizontal, paperRef.current);

      if (changeTransition) {
        backdropStyle.webkitTransition = cssTransition;
        backdropStyle.transition = cssTransition;
      }
    }
  }, [
    currentAnchor,
    currentlyHorizontal,
    disableBackdropTransition,
    hideBackdrop,
    theme.transitions,
    transition,
    transitionDuration,
  ]);

  const open = variant === 'temporary' && discoveryTriggered ? true : openProp;

  return (
    <React.Fragment>
      <Drawer
        open={open}
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
        transitionDuration={transitionDuration}
        ref={handleRef}
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
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback
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
  }),
  /**
   * Properties applied to the swipe area element.
   */
  SwipeAreaProps: PropTypes.object,
  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth: PropTypes.number,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
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

SwipeableDrawer.defaultProps = {
  anchor: 'left',
  disableBackdropTransition: false,
  disableDiscovery: false,
  disableSwipeToOpen:
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent),
  hysteresis: 0.55,
  minFlingVelocity: 400,
  swipeAreaWidth: 20,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
  variant: 'temporary', // Mobile first.
};

export default withTheme(SwipeableDrawer);
