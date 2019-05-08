/* eslint-disable consistent-this */

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

class SwipeableDrawer extends React.Component {
  state = {};

  isSwiping = null;

  swipeAreaRef = React.createRef();

  paperRef = null;

  componentDidMount() {
    if (this.props.variant === 'temporary') {
      this.listenTouchStart();
    }
  }

  componentDidUpdate(prevProps) {
    const variant = this.props.variant;
    const prevVariant = prevProps.variant;

    if (variant !== prevVariant) {
      if (variant === 'temporary') {
        this.listenTouchStart();
      } else if (prevVariant === 'temporary') {
        this.removeTouchStart();
      }
    }
  }

  componentWillUnmount() {
    this.removeTouchStart();
    this.removeBodyTouchListeners();

    // We need to release the lock.
    if (nodeThatClaimedTheSwipe === this) {
      nodeThatClaimedTheSwipe = null;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.maybeSwiping === 'undefined') {
      return {
        maybeSwiping: false,
        open: nextProps.open,
      };
    }

    if (!nextProps.open && prevState.open) {
      return {
        maybeSwiping: false,
        open: nextProps.open,
      };
    }

    return {
      open: nextProps.open,
    };
  }

  getMaxTranslate() {
    return isHorizontal(this.props.anchor) ? this.paperRef.clientWidth : this.paperRef.clientHeight;
  }

  getTranslate(current) {
    const start = isHorizontal(this.props.anchor) ? this.startX : this.startY;
    return Math.min(
      Math.max(this.props.open ? start - current : this.getMaxTranslate() + start - current, 0),
      this.getMaxTranslate(),
    );
  }

  setPosition(translate, options = {}) {
    const { mode = null, changeTransition = true } = options;

    const anchor = getAnchor(this.props.theme, this.props.anchor);
    const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchor) !== -1 ? 1 : -1;
    const transform = isHorizontal(this.props.anchor)
      ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
      : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    const drawerStyle = this.paperRef.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;

    let transition = '';

    if (mode) {
      transition = this.props.theme.transitions.create(
        'all',
        getTransitionProps(
          {
            timeout: this.props.transitionDuration,
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

    if (!this.props.disableBackdropTransition && !this.props.hideBackdrop) {
      const backdropStyle = this.backdropRef.style;
      backdropStyle.opacity = 1 - translate / this.getMaxTranslate();

      if (changeTransition) {
        backdropStyle.webkitTransition = transition;
        backdropStyle.transition = transition;
      }
    }
  }

  handleBodyTouchStart = event => {
    // We are not supposed to handle this touch move.
    if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== this) {
      return;
    }

    const { disableDiscovery, disableSwipeToOpen, open, swipeAreaWidth } = this.props;
    const anchor = getAnchor(this.props.theme, this.props.anchor);
    const currentX =
      anchor === 'right'
        ? document.body.offsetWidth - event.touches[0].pageX
        : event.touches[0].pageX;
    const currentY =
      anchor === 'bottom'
        ? window.innerHeight - event.touches[0].clientY
        : event.touches[0].clientY;

    if (!open) {
      if (disableSwipeToOpen || event.target !== this.swipeAreaRef.current) {
        return;
      }
      if (isHorizontal(this.props.anchor)) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }

    nodeThatClaimedTheSwipe = this;
    this.startX = currentX;
    this.startY = currentY;

    this.setState({ maybeSwiping: true });
    if (!open && this.paperRef) {
      // The ref may be null when a parent component updates while swiping.
      this.setPosition(this.getMaxTranslate() + (disableDiscovery ? 20 : -swipeAreaWidth), {
        changeTransition: false,
      });
    }

    this.velocity = 0;
    this.lastTime = null;
    this.lastTranslate = null;

    document.body.addEventListener('touchmove', this.handleBodyTouchMove, { passive: false });
    document.body.addEventListener('touchend', this.handleBodyTouchEnd);
    // https://plus.google.com/+PaulIrish/posts/KTwfn1Y2238
    document.body.addEventListener('touchcancel', this.handleBodyTouchEnd);
  };

  handleBodyTouchMove = event => {
    // the ref may be null when a parent component updates while swiping
    if (!this.paperRef) return;

    const anchor = getAnchor(this.props.theme, this.props.anchor);
    const horizontalSwipe = isHorizontal(this.props.anchor);

    const currentX =
      anchor === 'right'
        ? document.body.offsetWidth - event.touches[0].pageX
        : event.touches[0].pageX;
    const currentY =
      anchor === 'bottom'
        ? window.innerHeight - event.touches[0].clientY
        : event.touches[0].clientY;

    // We don't know yet.
    if (this.isSwiping == null) {
      const dx = Math.abs(currentX - this.startX);
      const dy = Math.abs(currentY - this.startY);

      // We are likely to be swiping, let's prevent the scroll event on iOS.
      if (dx > dy) {
        event.preventDefault();
      }

      const isSwiping = horizontalSwipe
        ? dx > dy && dx > UNCERTAINTY_THRESHOLD
        : dy > dx && dy > UNCERTAINTY_THRESHOLD;

      if (
        isSwiping === true ||
        (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)
      ) {
        this.isSwiping = isSwiping;
        if (!isSwiping) {
          this.handleBodyTouchEnd(event);
          return;
        }

        // Shift the starting point.
        this.startX = currentX;
        this.startY = currentY;

        // Compensate for the part of the drawer displayed on touch start.
        if (!this.props.disableDiscovery && !this.props.open) {
          if (horizontalSwipe) {
            this.startX -= this.props.swipeAreaWidth;
          } else {
            this.startY -= this.props.swipeAreaWidth;
          }
        }
      }
    }

    if (!this.isSwiping) {
      return;
    }

    const translate = this.getTranslate(horizontalSwipe ? currentX : currentY);

    if (this.lastTranslate === null) {
      this.lastTranslate = translate;
      this.lastTime = performance.now() + 1;
    }

    const velocity = ((translate - this.lastTranslate) / (performance.now() - this.lastTime)) * 1e3;

    // Low Pass filter.
    this.velocity = this.velocity * 0.4 + velocity * 0.6;

    this.lastTranslate = translate;
    this.lastTime = performance.now();

    // We are swiping, let's prevent the scroll event on iOS.
    event.preventDefault();
    this.setPosition(translate);
  };

  handleBodyTouchEnd = event => {
    nodeThatClaimedTheSwipe = null;
    this.removeBodyTouchListeners();
    this.setState({ maybeSwiping: false });

    // The swipe wasn't started.
    if (!this.isSwiping) {
      this.isSwiping = null;
      return;
    }

    this.isSwiping = null;

    const anchor = getAnchor(this.props.theme, this.props.anchor);
    let current;
    if (isHorizontal(this.props.anchor)) {
      current =
        anchor === 'right'
          ? document.body.offsetWidth - event.changedTouches[0].pageX
          : event.changedTouches[0].pageX;
    } else {
      current =
        anchor === 'bottom'
          ? window.innerHeight - event.changedTouches[0].clientY
          : event.changedTouches[0].clientY;
    }

    const translateRatio = this.getTranslate(current) / this.getMaxTranslate();

    if (this.props.open) {
      if (this.velocity > this.props.minFlingVelocity || translateRatio > this.props.hysteresis) {
        this.props.onClose();
      } else {
        // Reset the position, the swipe was aborted.
        this.setPosition(0, {
          mode: 'exit',
        });
      }

      return;
    }

    if (
      this.velocity < -this.props.minFlingVelocity ||
      1 - translateRatio > this.props.hysteresis
    ) {
      this.props.onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      this.setPosition(this.getMaxTranslate(), {
        mode: 'enter',
      });
    }
  };

  handleBackdropRef = ref => {
    // #StrictMode ready
    this.backdropRef = ReactDOM.findDOMNode(ref);
  };

  handlePaperRef = ref => {
    // #StrictMode ready
    this.paperRef = ReactDOM.findDOMNode(ref);
  };

  listenTouchStart() {
    document.body.addEventListener('touchstart', this.handleBodyTouchStart);
  }

  removeTouchStart() {
    document.body.removeEventListener('touchstart', this.handleBodyTouchStart);
  }

  removeBodyTouchListeners() {
    document.body.removeEventListener('touchmove', this.handleBodyTouchMove, { passive: false });
    document.body.removeEventListener('touchend', this.handleBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.handleBodyTouchEnd);
  }

  render() {
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
      variant,
      ...other
    } = this.props;
    const { maybeSwiping } = this.state;

    return (
      <React.Fragment>
        <Drawer
          open={variant === 'temporary' && maybeSwiping ? true : open}
          variant={variant}
          ModalProps={{
            BackdropProps: {
              ...BackdropProps,
              ref: this.handleBackdropRef,
            },
            ...ModalPropsProp,
          }}
          PaperProps={{
            ...PaperProps,
            style: {
              pointerEvents: variant === 'temporary' && !open ? 'none' : '',
              ...PaperProps.style,
            },
            ref: this.handlePaperRef,
          }}
          anchor={anchor}
          ref={innerRef}
          {...other}
        />
        {!disableSwipeToOpen && variant === 'temporary' && (
          <NoSsr>
            <SwipeArea
              anchor={anchor}
              innerRef={this.swipeAreaRef}
              width={swipeAreaWidth}
              {...SwipeAreaProps}
            />
          </NoSsr>
        )}
      </React.Fragment>
    );
  }
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
