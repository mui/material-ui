/* eslint-disable no-use-before-define */
// @inheritedComponent Drawer

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import { getTransitionProps } from '../transitions/utils';
import NoSsr from '../NoSsr';
import withForwardedRef from '../utils/withForwardedRef';
import SwipeArea from './SwipeArea';

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

function SwipeableDrawer(props) {
  const {
    anchor,
    disableBackdropTransition,
    disableDiscovery,
    disableSwipeToOpen,
    hysteresis,
    innerRef,
    minFlingVelocity,
    ModalProps: { BackdropProps, ...ModalPropsProp } = {},
    onOpen,
    open,
    PaperProps = {},
    SwipeAreaProps,
    swipeAreaWidth,
    theme,
    variant,
    ...other
  } = props;

  const [maybeSwiping, setMaybeSwiping] = React.useState(false);
  const instance = React.useRef({
    isSwiping: null,
  });
  const swipeAreaRef = React.useRef();
  const backdropRef = React.useRef();
  const paperRef = React.useRef();

  const getMaxTranslate = React.useCallback(() => {
    return isHorizontal(anchor) ? paperRef.current.clientWidth : paperRef.current.clientHeight;
  }, [anchor]);

  const setPosition = React.useCallback(
    (translate, options = {}) => {
      const { mode = null, changeTransition = true } = options;

      const anchorRtl = getAnchor(theme, anchor);
      const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
      const transform = isHorizontal(anchor)
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
              timeout: props.transitionDuration,
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

      if (!disableBackdropTransition && !props.hideBackdrop) {
        const backdropStyle = backdropRef.current.style;
        backdropStyle.opacity = 1 - translate / getMaxTranslate();

        if (changeTransition) {
          backdropStyle.webkitTransition = transition;
          backdropStyle.transition = transition;
        }
      }
    },
    [getMaxTranslate, anchor, disableBackdropTransition, props, theme],
  );

  const getTranslate = React.useCallback(
    current => {
      const start = isHorizontal(anchor) ? instance.current.startX : instance.current.startY;
      return Math.min(
        Math.max(open ? start - current : getMaxTranslate() + start - current, 0),
        getMaxTranslate(),
      );
    },
    [open, getMaxTranslate, anchor],
  );

  const handleBodyTouchEnd = React.useCallback(
    event => {
      nodeThatClaimedTheSwipe = null;
      removeBodyTouchListeners();
      setMaybeSwiping(false);

      // The swipe wasn't started.
      if (!instance.current.isSwiping) {
        instance.current.isSwiping = null;
        return;
      }

      instance.current.isSwiping = null;

      const anchorRtl = getAnchor(theme, anchor);
      let current;
      if (isHorizontal(anchor)) {
        current =
          anchorRtl === 'right'
            ? document.body.offsetWidth - event.changedTouches[0].pageX
            : event.changedTouches[0].pageX;
      } else {
        current =
          anchorRtl === 'bottom'
            ? window.innerHeight - event.changedTouches[0].clientY
            : event.changedTouches[0].clientY;
      }

      const translateRatio = getTranslate(current) / getMaxTranslate();

      if (open) {
        if (instance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
          props.onClose();
        } else {
          // Reset the position, the swipe was aborted.
          setPosition(0, {
            mode: 'exit',
          });
        }

        return;
      }

      if (instance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
        onOpen();
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(getMaxTranslate(), {
          mode: 'enter',
        });
      }
    },
    [
      anchor,
      getTranslate,
      getMaxTranslate,
      hysteresis,
      minFlingVelocity,
      onOpen,
      open,
      props,
      removeBodyTouchListeners,
      setPosition,
      theme,
    ],
  );

  const handleBodyTouchMove = React.useCallback(
    event => {
      // the ref may be null when a parent component updates while swiping
      if (!paperRef.current) return;

      const anchorRtl = getAnchor(theme, anchor);
      const horizontalSwipe = isHorizontal(anchor);

      const currentX =
        anchorRtl === 'right'
          ? document.body.offsetWidth - event.touches[0].pageX
          : event.touches[0].pageX;
      const currentY =
        anchorRtl === 'bottom'
          ? window.innerHeight - event.touches[0].clientY
          : event.touches[0].clientY;

      // We don't know yet.
      if (instance.current.isSwiping == null) {
        const dx = Math.abs(currentX - instance.current.startX);
        const dy = Math.abs(currentY - instance.current.startY);

        // We are likely to be swiping, let's prevent the scroll event on iOS.
        if (dx > dy) {
          event.preventDefault();
        }

        const isSwiping2 = horizontalSwipe
          ? dx > dy && dx > UNCERTAINTY_THRESHOLD
          : dy > dx && dy > UNCERTAINTY_THRESHOLD;

        if (
          isSwiping2 === true ||
          (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
        ) {
          instance.current.isSwiping = isSwiping2;
          if (!isSwiping2) {
            handleBodyTouchEnd(event);
            return;
          }

          // Shift the starting point.
          instance.current.startX = currentX;
          instance.current.startY = currentY;

          // Compensate for the part of the drawer displayed on touch start.
          if (!disableDiscovery && !open) {
            if (horizontalSwipe) {
              instance.current.startX -= swipeAreaWidth;
            } else {
              instance.current.startY -= swipeAreaWidth;
            }
          }
        }
      }

      if (!instance.current.isSwiping) {
        return;
      }

      const translate = getTranslate(horizontalSwipe ? currentX : currentY);

      if (instance.current.lastTranslate === null) {
        instance.current.lastTranslate = translate;
        instance.current.lastTime = performance.now() + 1;
      }

      const velocity =
        ((translate - instance.current.lastTranslate) /
          (performance.now() - instance.current.lastTime)) *
        1e3;

      // Low Pass filter.
      instance.current.velocity = instance.current.velocity * 0.4 + velocity * 0.6;

      instance.current.lastTranslate = translate;
      instance.current.lastTime = performance.now();

      // We are swiping, let's prevent the scroll event on iOS.
      event.preventDefault();
      setPosition(translate);
    },
    [
      getTranslate,
      setPosition,
      handleBodyTouchEnd,
      anchor,
      disableDiscovery,
      open,
      swipeAreaWidth,
      theme,
    ],
  );

  const removeBodyTouchListeners = React.useCallback(() => {
    document.body.removeEventListener('touchmove', handleBodyTouchMove, { passive: false });
    document.body.removeEventListener('touchend', handleBodyTouchEnd);
    document.body.removeEventListener('touchcancel', handleBodyTouchEnd);
  }, [handleBodyTouchMove, handleBodyTouchEnd]);

  const handleBodyTouchStart = React.useCallback(
    event => {
      // We are not supposed to handle this touch move.
      if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== instance.current) {
        return;
      }

      const anchorRtl = getAnchor(theme, anchor);
      const currentX =
        anchorRtl === 'right'
          ? document.body.offsetWidth - event.touches[0].pageX
          : event.touches[0].pageX;
      const currentY =
        anchorRtl === 'bottom'
          ? window.innerHeight - event.touches[0].clientY
          : event.touches[0].clientY;

      if (!open) {
        if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
          return;
        }
        if (isHorizontal(anchor)) {
          if (currentX > swipeAreaWidth) {
            return;
          }
        } else if (currentY > swipeAreaWidth) {
          return;
        }
      }

      nodeThatClaimedTheSwipe = instance.current;
      instance.current.startX = currentX;
      instance.current.startY = currentY;

      setMaybeSwiping(true);
      if (!open && paperRef.current) {
        // The ref may be null when a parent component updates while swiping.
        setPosition(getMaxTranslate() + (disableDiscovery ? 20 : -swipeAreaWidth), {
          changeTransition: false,
        });
      }

      instance.current.velocity = 0;
      instance.current.lastTime = null;
      instance.current.lastTranslate = null;

      document.body.addEventListener('touchmove', handleBodyTouchMove, { passive: false });
      document.body.addEventListener('touchend', handleBodyTouchEnd);
      // https://plus.google.com/+PaulIrish/posts/KTwfn1Y2238
      document.body.addEventListener('touchcancel', handleBodyTouchEnd);
    },
    [
      setPosition,
      getMaxTranslate,
      handleBodyTouchEnd,
      handleBodyTouchMove,
      anchor,
      disableDiscovery,
      disableSwipeToOpen,
      open,
      swipeAreaWidth,
      theme,
    ],
  );

  React.useEffect(() => {
    if (variant === 'temporary') {
      document.body.addEventListener('touchstart', handleBodyTouchStart);
    }
    return () => {
      document.body.removeEventListener('touchstart', handleBodyTouchStart);
    };
  }, [variant, handleBodyTouchStart]);

  React.useEffect(
    () => () => {
      removeBodyTouchListeners();

      // We need to release the lock.
      if (nodeThatClaimedTheSwipe === instance.current) {
        nodeThatClaimedTheSwipe = null;
      }
    },
    [removeBodyTouchListeners],
  );

  React.useEffect(() => {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);

  const handleBackdropRef = React.useCallback(ref => {
    // #StrictMode ready
    backdropRef.current = ReactDOM.findDOMNode(ref);
  }, []);

  const handlePaperRef = React.useCallback(ref => {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(ref);
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
        ref={innerRef}
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
}

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
   * @ignore
   * from `withForwardedRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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

export default withTheme(withForwardedRef(SwipeableDrawer));
