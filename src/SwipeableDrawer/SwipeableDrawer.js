// @inheritedComponent Drawer

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';

class SwipeableDrawer extends React.Component {
  state = {
    maybeSwiping: false,
    swiping: false,
  };

  componentDidMount() {
    if (this.props.variant === 'temporary') {
      this.enableSwipeHandling();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.variant === 'temporary' && prevProps.variant !== 'temporary') {
      this.enableSwipeHandling();
    } else if (this.props.variant !== 'temporary' && prevProps.variant === 'temporary') {
      this.disableSwipeHandling();
    }
  }

  componentWillUnmount() {
    this.disableSwipeHandling();
    this.removeBodyTouchListeners();
  }

  onBodyTouchStart = event => {
    const anchor = getAnchor(this.props);
    const swipeAreaWidth = this.props.swipeAreaWidth;

    const touchStartX =
      anchor === 'right'
        ? document.body.offsetWidth - event.touches[0].pageX
        : event.touches[0].pageX;
    const touchStartY =
      anchor === 'bottom'
        ? window.innerHeight - event.touches[0].clientY
        : event.touches[0].clientY;

    if (!this.props.open) {
      if (isHorizontal(this.props)) {
        if (touchStartX > swipeAreaWidth) return;
      } else if (touchStartY > swipeAreaWidth) return;
    }

    this.setState({ maybeSwiping: true });
    this.touchStartX = touchStartX;
    this.touchStartY = touchStartY;

    if (!this.props.open && !this.props.disableDiscovery) {
      this.setPosition(this.getMaxTranslate() - swipeAreaWidth);
    }

    document.body.addEventListener('touchmove', this.onBodyTouchMove, { passive: false });
    document.body.addEventListener('touchend', this.onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
  };

  onBodyTouchMove = event => {
    const anchor = getAnchor(this.props);
    const horizontalSwipe = isHorizontal(this.props);

    const currentX =
      anchor === 'right'
        ? document.body.offsetWidth - event.touches[0].pageX
        : event.touches[0].pageX;
    const currentY =
      anchor === 'bottom'
        ? window.innerHeight - event.touches[0].clientY
        : event.touches[0].clientY;

    if (this.state.swiping) {
      event.preventDefault();
      this.setPosition(this.getTranslate(horizontalSwipe ? currentX : currentY));
    } else if (this.state.maybeSwiping) {
      const dXAbs = Math.abs(currentX - this.touchStartX);
      const dYAbs = Math.abs(currentY - this.touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      const threshold = 10;

      const isSwiping = horizontalSwipe
        ? dXAbs > threshold && dYAbs <= threshold
        : dYAbs > threshold && dXAbs <= threshold;

      if (isSwiping) {
        this.swipeStartX = currentX;
        this.swipeStartY = currentY;
        this.setState({
          swiping: this.props.open ? 'closing' : 'opening',
        });
        this.setPosition(this.getTranslate(horizontalSwipe ? currentX : currentY));
      } else if (
        horizontalSwipe
          ? dXAbs <= threshold && dYAbs > threshold
          : dYAbs <= threshold && dXAbs > threshold
      ) {
        this.onBodyTouchEnd();
      }
    }
  };

  onBodyTouchEnd = event => {
    if (this.state.swiping) {
      const anchor = getAnchor(this.props);
      const currentX =
        anchor === 'right'
          ? document.body.offsetWidth - event.changedTouches[0].pageX
          : event.changedTouches[0].pageX;
      const currentY =
        anchor === 'bottom'
          ? window.innerHeight - event.changedTouches[0].clientY
          : event.changedTouches[0].clientY;
      const translateRatio = isHorizontal(this.props)
        ? this.getTranslate(currentX) / this.getMaxTranslate()
        : this.getTranslate(currentY) / this.getMaxTranslate();

      const swiping = this.state.swiping;
      this.setState({
        swiping: null,
        maybeSwiping: false,
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this.setPosition(this.getMaxTranslate());
        } else {
          this.props.onClose();
        }
      } else if (swiping === 'opening') {
        this.props.onOpen();
      } else {
        this.setPosition(0);
      }
    } else if (this.state.maybeSwiping) {
      if (!this.props.open && event != null) {
        event.preventDefault(); // prevent ghost clicks
      }
      this.setState({ maybeSwiping: false });
    }

    this.removeBodyTouchListeners();
  };

  getMaxTranslate() {
    return isHorizontal(this.props) ? this.drawer.clientWidth : this.drawer.clientHeight;
  }

  getTranslate(current) {
    const swipeStart = isHorizontal(this.props) ? this.swipeStartX : this.swipeStartY;
    return Math.min(
      Math.max(
        this.state.swiping === 'closing'
          ? -(current - swipeStart)
          : this.getMaxTranslate() + (swipeStart - current) - this.props.swipeAreaWidth,
        0,
      ),
      this.getMaxTranslate(),
    );
  }

  setPosition(translate) {
    const anchor = getAnchor(this.props);
    const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchor) !== -1 ? 1 : -1;
    const transformCSS = isHorizontal(this.props)
      ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
      : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    this.drawer.style.transform = transformCSS;
    this.drawer.style.webkitTransform = transformCSS;

    this.backdrop.style.opacity = 1 - translate / this.getMaxTranslate();
  }

  enableSwipeHandling() {
    document.body.addEventListener('touchstart', this.onBodyTouchStart);
  }

  disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this.onBodyTouchStart);
  }

  removeBodyTouchListeners() {
    document.body.removeEventListener('touchmove', this.onBodyTouchMove, { passive: false });
    document.body.removeEventListener('touchend', this.onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
  }

  render() {
    const {
      disableDiscovery,
      ModalProps,
      onOpen,
      open,
      swipeAreaWidth,
      transitionDuration: transitionDurationProp,
      ...other
    } = this.props;

    const { maybeSwiping } = this.state;

    // prevent flickering when swiping fast
    const transitionDuration = maybeSwiping ? 0 : transitionDurationProp;

    return (
      <Drawer
        ModalProps={{
          BackdropProps: {
            transitionDuration,
            ref: ref => {
              this.backdrop = ref != null ? ReactDOM.findDOMNode(ref) : null;
            },
          },
          ...ModalProps,
        }}
        PaperProps={{
          ref: ref => {
            this.drawer = ref != null ? ReactDOM.findDOMNode(ref) : null;
          },
        }}
        open={open || (this.props.variant === 'temporary' && maybeSwiping)}
        transitionDuration={transitionDuration}
        {...other}
      />
    );
  }
}

SwipeableDrawer.defaultProps = {
  anchor: 'left',
  disableDiscovery: false,
  swipeAreaWidth: 20,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
  variant: 'temporary', // Mobile first.
};

SwipeableDrawer.propTypes = {
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery: PropTypes.bool,
  /**
   * Properties applied to the `Modal` element.
   */
  ModalProps: PropTypes.object,
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
   * The variant of drawer.
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

export default withTheme()(SwipeableDrawer);
