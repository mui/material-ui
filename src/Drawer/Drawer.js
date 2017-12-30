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

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }

  // (anchor === 'bottom')
  return 'up';
}

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
  };

  componentWillReceiveProps() {
    this.setState({
      firstMount: false,
    });
  }

  componentDidMount () {
    if (this.props.type === 'temporary') {
      this.enableSwipeHandling()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.type !== 'temporary' && nextProps.type === 'temporary') {
      this.enableSwipeHandling()
    } else if (this.props.type === 'temporary' && nextProps.type !== 'temporary') {
      this.disableSwipeHandling()
    }
  }

  componentWillUnmount () {
    this.disableSwipeHandling()
    this.removeBodyTouchListeners()
  }

  getTranslatedWidth() {
    // if (typeof this.props.width === 'string') {
    //   if (!/^\d+(\.\d+)?%$/.test(this.props.width)) {
    //     throw new Error('Not a valid percentage format.');
    //   }
    //   const width = parseFloat(this.props.width) / 100.0;
    //   // We are doing our best on the Server to render a consistent UI, hence the
    //   // default value of 10000
    //   return typeof window !== 'undefined' ? width * window.innerWidth : 10000;
    // } else {
    //   return this.props.width;
    // }

    const drawer = ReactDOM.findDOMNode(this.drawer);
    return drawer.clientWidth // TODO
  }

  getMaxTranslateX() {
    const width = this.getTranslatedWidth() || this.context.muiTheme.drawer.width;
    return width + 10;
  }

  enableSwipeHandling () {
    document.body.addEventListener('touchstart', this.onBodyTouchStart)
  }

  disableSwipeHandling () {
    document.body.removeEventListener('touchstart', this.onBodyTouchStart)
  }

  onBodyTouchStart = (event) => {
    const swipeAreaWidth = 30 // this.props.swipeAreaWidth;

    const touchStartX = this.getAnchor() === 'right' ?
      (document.body.offsetWidth - event.touches[0].pageX) :
      event.touches[0].pageX;
    const touchStartY = event.touches[0].pageY; // TODO handle up/down swiping

    // Open only if swiping while closed
    if (swipeAreaWidth !== null && !this.props.open) {
      // TODO handle up/down swiping
      if (touchStartX > swipeAreaWidth) return;
    }

    if (!this.props.open &&
         (/*openNavEventHandler !== this.onBodyTouchStart ||*/ // TODO why?!
          this.props.disableSwipeToOpen)
       ) {
      return;
    }

    this.maybeSwiping = true;
    this.touchStartX = touchStartX;
    this.touchStartY = touchStartY;

    document.body.addEventListener('touchmove', this.onBodyTouchMove);
    document.body.addEventListener('touchend', this.onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
  };

  removeBodyTouchListeners () {
    document.body.removeEventListener('touchmove', this.onBodyTouchMove);
    document.body.removeEventListener('touchend', this.onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
  }

  setPosition(translateX) {
    const rtlTranslateMultiplier = this.getAnchor() === 'right' ? 1 : -1; // TODO up/down
    const drawer = ReactDOM.findDOMNode(this.drawer);
    const transformCSS = `translate(${(rtlTranslateMultiplier * translateX)}px, 0)`;
    drawer.style.transform = transformCSS // TODO prefixing

    const backdrop = ReactDOM.findDOMNode(this.backdrop)
    backdrop.style.opacity = 1 - translateX / this.getMaxTranslateX();
  }

  getTranslateX(currentX) {
    return Math.min(
             Math.max(
               this.state.swiping === 'closing' ?
                 -(currentX - this.swipeStartX) :
                 this.getMaxTranslateX() + (this.swipeStartX - currentX),
               0
             ),
             this.getMaxTranslateX()
           );
  }

  onBodyTouchMove = (event) => {
    const currentX = this.getAnchor() === 'right' ?
      (document.body.offsetWidth - event.touches[0].pageX) :
      event.touches[0].pageX;
    const currentY = event.touches[0].pageY; // TODO up/down

    if (this.state.swiping) {
      event.preventDefault();
      this.setPosition(this.getTranslateX(currentX));
    } else if (this.maybeSwiping) {
      const dXAbs = Math.abs(currentX - this.touchStartX);
      const dYAbs = Math.abs(currentY - this.touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      const threshold = 10;

      if (dXAbs > threshold && dYAbs <= threshold) {
        this.swipeStartX = currentX;
        this.setState({
          swiping: this.props.open ? 'closing' : 'opening',
        });
        this.setPosition(this.getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this.onBodyTouchEnd();
      }
    }
  };

  onBodyTouchEnd = (event) => {
    if (this.state.swiping) {
      const currentX = this.getAnchor() === 'right' ?
        (document.body.offsetWidth - event.changedTouches[0].pageX) : // TODO up/down support
        event.changedTouches[0].pageX;
      const translateRatio = this.getTranslateX(currentX) / this.getMaxTranslateX();

      this.maybeSwiping = false;
      const swiping = this.state.swiping;
      this.setState({
        swiping: null,
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this.setPosition(this.getMaxTranslateX());
        } else {
          if (this.props.onClose != null) {
            this.props.onClose();
          }
        }
      } else {
        if (swiping === 'opening') {
          if (this.props.onOpen != null) {
            this.props.onOpen();
          }
        } else {
          this.setPosition(0);
        }
      }
    } else {
      this.maybeSwiping = false;
    }

    this.removeBodyTouchListeners();
  };

  getAnchor () {
    let anchor = this.props.anchor;
    if (this.props.theme.direction === 'rtl' && ['left', 'right'].indexOf(anchor) !== -1) {
      anchor = anchor === 'left' ? 'right' : 'left';
    }
    return anchor;
  }

  render() {
    const {
      anchor, // eslint-disable-line
      children,
      classes,
      className,
      elevation,
      ModalProps,
      onClose,
      open,
      PaperProps,
      SlideProps,
      theme, // eslint-disable-line
      transitionDuration,
      variant,
      ...other
    } = this.props;

    const anchor = this.getAnchor();

    const drawer = (
      <Paper
        elevation={variant === 'temporary' ? elevation : 0}
        square
        className={classNames(classes.paper, classes[`paperAnchor${capitalize(anchor)}`], {
          [classes[`paperAnchorDocked${capitalize(anchor)}`]]: variant !== 'temporary',
        })}
        ref={(ref) => { this.drawer = ref }}
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
        in={open || (type === 'temporary' && this.maybeSwiping)}
        direction={getSlideDirection(anchor)}
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
          ref: (ref) => { this.backdrop = ref },
          transitionDuration
        }}
        className={classNames(classes.modal, className)}
        open={open || (type === 'temporary' && this.maybeSwiping)}
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
   * The type of drawer.
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
};

Drawer.defaultProps = {
  anchor: 'left',
  elevation: 16,
  open: false,
  transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
  variant: 'temporary', // Mobile first.
};

export default withStyles(styles, { name: 'MuiDrawer', flip: false, withTheme: true })(Drawer);
