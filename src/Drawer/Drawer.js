// @inheritedComponent Modal

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../Modal';
import withStyles from '../styles/withStyles';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { capitalize } from '../utils/helpers';
import { duration } from '../styles/transitions';

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export const styles = theme => ({
  docked: {
    flex: '0 0 auto',
  },
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 0 auto',
    zIndex: theme.zIndex.drawer,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    // temporary style
    position: 'fixed',
    top: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    '&:focus': {
      outline: 'none',
    },
  },
  paperAnchorLeft: {
    left: 0,
    right: 'auto',
  },
  paperAnchorRight: {
    left: 'auto',
    right: 0,
  },
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  paperAnchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100vh',
  },
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paperAnchorDockedTop: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  paperAnchorDockedBottom: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  modal: {}, // Just here so people can override the style.
});

class Drawer extends React.Component {
  state = {
    // Let's assume that the Drawer will always be rendered on user space.
    // We use that state is order to skip the appear transition during the
    // initial mount of the component.
    firstMount: true,
    maybeSwiping: false,
    swiping: false,
  };

  componentDidMount() {
    if (this.props.variant === 'temporary') {
      this.enableSwipeHandling();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.variant === 'temporary' && prevProps.variant !== 'temporary') {
      this.enableSwipeHandling();
    } else if (this.props.variant !== 'temporary' && prevProps.variant === 'temporary') {
      this.disableSwipeHandling();
    }

    if (this.state.firstMount) {
      this.setState({
        firstMount: false,
      });
    }
  }

  componentWillUnmount() {
    this.disableSwipeHandling();
    this.removeBodyTouchListeners();
  }

  onBodyTouchStart = event => {
    const anchor = this.getAnchor();
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
      if (this.isHorizontalSwiping()) {
        if (touchStartX > swipeAreaWidth) return;
      } else if (touchStartY > swipeAreaWidth) return;

      if (this.props.disableSwipeToOpen) return;
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
    const anchor = this.getAnchor();
    const horizontalSwipe = this.isHorizontalSwiping();

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
      const anchor = this.getAnchor();
      const currentX =
        anchor === 'right'
          ? document.body.offsetWidth - event.changedTouches[0].pageX
          : event.changedTouches[0].pageX;
      const currentY =
        anchor === 'bottom'
          ? window.innerHeight - event.changedTouches[0].clientY
          : event.changedTouches[0].clientY;
      const translateRatio = this.isHorizontalSwiping()
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
        } else if (this.props.onClose != null) {
          this.props.onClose();
        }
      } else if (swiping === 'opening') {
        if (this.props.onOpen != null) {
          this.props.onOpen();
        }
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

  getAnchor() {
    return this.props.theme.direction === 'rtl' && this.isHorizontalSwiping()
      ? oppositeDirection[this.props.anchor]
      : this.props.anchor;
  }

  getMaxTranslate() {
    return this.isHorizontalSwiping() ? this.drawer.clientWidth : this.drawer.clientHeight;
  }

  getTranslate(current) {
    const swipeStart = this.isHorizontalSwiping() ? this.swipeStartX : this.swipeStartY;
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
    const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(this.getAnchor()) !== -1 ? 1 : -1;
    const transformCSS = this.isHorizontalSwiping()
      ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
      : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    this.drawer.style.transform = transformCSS;
    this.drawer.style.webkitTransform = transformCSS;

    this.backdrop.style.opacity = 1 - translate / this.getMaxTranslate();
  }

  isHorizontalSwiping() {
    return ['left', 'right'].indexOf(this.props.anchor) !== -1;
  }

  enableSwipeHandling() {
    document.body.addEventListener('touchstart', this.onBodyTouchStart);
  }

  disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this.onBodyTouchStart);
  }

  removeBodyTouchListeners() {
    document.body.removeEventListener('touchmove', this.onBodyTouchMove);
    document.body.removeEventListener('touchend', this.onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
  }

  render() {
    const {
      anchor: anchorProp,
      children,
      classes,
      className,
      disableDiscovery,
      disableSwipeToOpen,
      elevation,
      ModalProps,
      onClose,
      onOpen,
      open,
      PaperProps,
      SlideProps,
      swipeAreaWidth,
      theme,
      transitionDuration: transitionDurationProp,
      variant,
      ...other
    } = this.props;

    const {
      maybeSwiping
    } = this.state;

    const anchor = this.getAnchor();
    // prevent flickering when swiping fast
    const transitionDuration = maybeSwiping ? 0 : transitionDurationProp;

    const drawer = (
      <Paper
        elevation={variant === 'temporary' ? elevation : 0}
        square
        className={classNames(classes.paper, classes[`paperAnchor${capitalize(anchor)}`], {
          [classes[`paperAnchorDocked${capitalize(anchor)}`]]: variant !== 'temporary',
        })}
        ref={ref => {
          this.drawer = ref != null ? ReactDOM.findDOMNode(ref) : null;
        }}
        {...PaperProps}
      >
        {children}
      </Paper>
    );

    if (variant === 'permanent') {
      return (
        <div className={classNames(classes.docked, className)} {...other}>
          {drawer}
        </div>
      );
    }

    const slidingDrawer = (
      <Slide
        in={open || (variant === 'temporary' && maybeSwiping)}
        direction={oppositeDirection[anchor]}
        timeout={transitionDuration}
        appear={!this.state.firstMount}
        {...SlideProps}
      >
        {drawer}
      </Slide>
    );

    if (variant === 'persistent') {
      return (
        <div className={classNames(classes.docked, className)} {...other}>
          {slidingDrawer}
        </div>
      );
    }

    // variant === temporary
    return (
      <Modal
        BackdropProps={{
          ref: ref => {
            this.backdrop = ref != null ? ReactDOM.findDOMNode(ref) : null;
          },
          transitionDuration,
        }}
        className={classNames(classes.modal, className)}
        open={open || (variant === 'temporary' && maybeSwiping)}
        onClose={onClose}
        {...other}
        {...ModalProps}
      >
        {slidingDrawer}
      </Modal>
    );
  }
}

Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  /**
   * The contents of the drawer.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery: PropTypes.bool,
  /**
   * If `true`, the drawer cannot be opened by swiping from the edge of the screen.
   */
  disableSwipeToOpen: PropTypes.bool,
  /**
   * The elevation of the drawer.
   */
  elevation: PropTypes.number,
  /**
   * Properties applied to the `Modal` element.
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool,
  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: PropTypes.object,
  /**
   * Properties applied to the `Slide` element.
   */
  SlideProps: PropTypes.object,
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

Drawer.defaultProps = {
  anchor: 'left',
  disableDiscovery: false,
  disableSwipeToOpen: false,
  elevation: 16,
  open: false,
  swipeAreaWidth: 20,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
  variant: 'temporary', // Mobile first.
};

export default withStyles(styles, { name: 'MuiDrawer', flip: false, withTheme: true })(Drawer);
