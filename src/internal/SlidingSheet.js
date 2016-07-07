import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';

let openNavEventHandler = null;

class SlidingSheet extends Component {
  static propTypes = {
    /**
     * The contents of the `SlidingSheet`
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the `SlidingSheet` can be closed by sliding, the Escape key or tapping the overlay.
     */
    closeable: PropTypes.bool,
    /**
     * The CSS class name of the container element.
     */
    containerClassName: PropTypes.string,
    /**
     * Override the inline-styles of the container element.
     */
    containerStyle: PropTypes.object,
    /**
     * The direction the `SlidingSheet` should slide out from.
     */
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /**
     * If true, the `SlidingSheet` will be modal, showing an overlay over the rest of the page when
     * opened.
     */
    modal: PropTypes.bool,
    /**
     * Callback function fired when the `open` state of the `SlidingSheet` is requested to be changed.
     *
     * @param {boolean} open If true, the `SlidingSheet` was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'swipe' for open requests; 'clickaway' (on overlay clicks),
     * 'escape' (on escape key press), and 'swipe' for close requests.
     */
    onRequestChange: PropTypes.func.isRequired,
    /**
     * If true, the `SlidingSheet` is opened.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The CSS class name to add to the `Overlay` component that is rendered behind the `SlidingSheet`.
     */
    overlayClassName: PropTypes.string,
    /**
     * Override the inline-styles of the `Overlay` component that is rendered behind the `SlidingSheet`.
     */
    overlayStyle: PropTypes.object,
    /**
     * The width or height of the `SlidingSheet`, in the direction in which it should slide.
     */
    primaryDimension: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The width of the area in pixels on the appropriate edge of the screen where the `SlidingSheet`
     * can be swiped open from. Setting this to `null` spans that area to the entire page
     * (**CAUTION!** Setting this property to `null` might cause issues with sliders and swipeable
     * `Tabs`, and for vertical sheets, will interfere with scrolling: use at your own risk).
     */
    swipeAreaWidth: PropTypes.number,
    /**
     * If true, swiping in the opposite of direction will open the `SlidingSheet`.
     */
    swipeToOpen: PropTypes.bool,
    /**
     * The zDepth of the `SlidingSheet`.
     */
    zDepth: propTypes.zDepth,

  };

  static defaultProps = {
    closeable: true,
    direction: 'left',
    modal: false,
    swipeAreaWidth: 30,
    swipeToOpen: false,
    zDepth: 2,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.maybeSwiping = false;
    this.touchStartX = null;
    this.touchStartY = null;
    this.swipeStartPrimary = null;

    this.setState({
      swiping: null,
    });
  }

  componentDidMount() {
    this.enableSwipeHandling();
  }

  componentDidUpdate() {
    this.enableSwipeHandling();
  }

  componentWillUnmount() {
    this.disableSwipeHandling();
  }

  getStyles() {
    const muiTheme = this.context.muiTheme;
    const vertical = this.isVertical();

    const x = this.getTranslateMultiplier() * ((this.props.open || vertical) ? 0 : this.getMaxTranslatePrimary());
    const y = this.getTranslateMultiplier() * ((this.props.open || !vertical) ? 0 : this.getMaxTranslatePrimary());

    const height = vertical ? this.props.primaryDimension : '100%';
    const width = vertical ? '100%' : this.props.primaryDimension;

    const styles = {
      root: {
        height: height,
        width: width,
        position: 'fixed',
        zIndex: muiTheme.zIndex.slidingSheet,
        // Make sure a closed sheet whose dimension we don't know yet stays hidden
        visibility: this.props.open || this.props.primaryDimension ? 'visible' : 'hidden',
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: !this.state.swiping && transitions.easeOut(null, 'transform', null),
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
      },
      overlay: {
        zIndex: muiTheme.zIndex.slidingSheetOverlay,
        pointerEvents: this.props.open ? 'auto' : 'none', // Bypass mouse events when sheet is closing.
      },
      // Styles that depend on the direction set for the sheet
      left: {
        left: 0,
        top: 0,
      },
      right: {
        right: 0,
        top: 0,
      },
      top: {
        left: 0,
        top: 0,
        right: 0,
        maxHeight: `calc(100% - ${muiTheme.spacing.desktopKeylineIncrement + muiTheme.spacing.desktopGutterMini}px)`,
      },
      bottom: {
        left: 0,
        bottom: 0,
        right: 0,
        maxHeight: `calc(100% - ${muiTheme.spacing.desktopKeylineIncrement + muiTheme.spacing.desktopGutterMini}px)`,
      },
    };

    return styles;
  }

  isVertical() {
    const direction = this.props.direction;
    return direction === 'top' || direction === 'bottom';
  }

  shouldShow() {
    return this.props.open || !!this.state.swiping;  // component is swiping
  }

  close(reason) {
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    return this;
  }

  open(reason) {
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  }

  handleTouchTapOverlay = (event) => {
    event.preventDefault();
    if (this.props.closeable) this.close('clickaway');
  };

  handleKeyUp = (event) => {
    if (this.props.open && this.props.closeable && keycode(event) === 'esc') {
      this.close('escape');
    }
  };

  getMaxTranslatePrimary() {
    return this.props.primaryDimension + 10;
  }

  getTranslateMultiplier() {
    const direction = this.props.direction;
    return direction === 'right' || direction === 'bottom' ? 1 : -1;
  }

  enableSwipeHandling() {
    if (this.props.swipeToOpen || this.props.closeable) {
      document.body.addEventListener('touchstart', this.onBodyTouchStart);
      if (this.props.swipeToOpen && !openNavEventHandler) {
        openNavEventHandler = this.onBodyTouchStart;
      }
    } else {
      this.disableSwipeHandling();
    }
  }

  disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this.onBodyTouchStart);
    if (openNavEventHandler === this.onBodyTouchStart) {
      openNavEventHandler = null;
    }
  }

  onBodyTouchStart = (event) => {
    const swipeAreaWidth = this.props.swipeAreaWidth;
    const direction = this.props.direction;

    const touchStartX = event.touches[0].pageX;
    const touchStartY = event.touches[0].pageY;

    const vertical = this.isVertical();

    const touchStartPrimary = vertical ? touchStartY : touchStartX;
    const touchStartSecondary = vertical ? touchStartX : touchStartY;

    const bodyPrimaryDimension = vertical ? document.body.offsetHeight : document.body.offsetWidth;

    // Open only if swiping from the edge while closed
    if (swipeAreaWidth !== null && !this.props.open) {
      if (direction === 'right' || direction === 'bottom') {
        // Calculate from the bottom/right side
        if (touchStartPrimary < bodyPrimaryDimension - swipeAreaWidth) return;
      } else {
        // Calculate from the top/left side
        if (touchStartPrimary > swipeAreaWidth) return;
      }
    }

    if (!this.props.open &&
         (openNavEventHandler !== this.onBodyTouchStart ||
          !this.props.swipeToOpen) ||
         this.props.open && !this.props.closeable) {
      return;
    }

    // For a vertical sheet, only start swiping away if the user
    // is touching the edge of the sheet
    if (this.props.open && vertical) {
      const sheetHeight = findDOMNode(this.refs.clickAwayableElement).offsetHeight;
      const sheetEdge = direction === 'top' ? sheetHeight : window.innerHeight - sheetHeight;
      const windowTouchStartY = touchStartY - window.pageYOffset;

      if (windowTouchStartY >= sheetEdge - 30 && windowTouchStartY <= sheetEdge + 30) {
        // We can start swiping down right away, rather than setting this.maybeSwiping
        this.swipeStartPrimary = touchStartPrimary;
        this.setState({swiping: 'closing'});
      } else {
        return;
      }
    } else {
      this.maybeSwiping = true;
    }

    this.touchStartPrimary = touchStartPrimary;
    this.touchStartSecondary = touchStartSecondary;

    document.body.addEventListener('touchmove', this.onBodyTouchMove);
    document.body.addEventListener('touchend', this.onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
  };

  setPosition(translatePrimary) {
    const slidingSheet = findDOMNode(this.refs.clickAwayableElement);
    const vertical = this.isVertical();
    const translateX = vertical ? 0 : translatePrimary;
    const translateY = vertical ? translatePrimary : 0;
    const transformCSS = `translate3d(${(this.getTranslateMultiplier() * translateX)}px, ` +
                          `${(this.getTranslateMultiplier() * translateY)}px, 0)`;
    if (this.props.modal) this.refs.overlay.setOpacity(1 - translatePrimary / this.getMaxTranslatePrimary());
    autoPrefix.set(slidingSheet.style, 'transform', transformCSS);
  }

  getTranslatePrimary(currentPrimary) {
    return Math.min(
             Math.max(
               this.state.swiping === 'closing' ?
                 this.getTranslateMultiplier() * (currentPrimary - this.swipeStartPrimary) :
                 this.getMaxTranslatePrimary() -
                  this.getTranslateMultiplier() * (this.swipeStartPrimary - currentPrimary),
               0
             ),
             this.getMaxTranslatePrimary()
           );
  }

  onBodyTouchMove = (event) => {
    const currentX = event.touches[0].pageX;
    const currentY = event.touches[0].pageY;
    const vertical = this.isVertical();

    const currentPrimary = vertical ? currentY : currentX;
    const currentSecondary = vertical ? currentX : currentY;

    if (this.state.swiping) {
      event.preventDefault();
      this.setPosition(this.getTranslatePrimary(currentPrimary));
    } else if (this.maybeSwiping) {
      const dPrimaryAbs = Math.abs(currentPrimary - this.touchStartPrimary);
      const dSecondaryAbs = Math.abs(currentSecondary - this.touchStartSecondary);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll in the horizontal case
      const threshold = 10;

      if (dPrimaryAbs > threshold && dSecondaryAbs <= threshold) {
        event.preventDefault();
        this.swipeStartPrimary = currentPrimary;
        this.setState({
          swiping: this.props.open ? 'closing' : 'opening',
        });
        this.setPosition(this.getTranslatePrimary(currentPrimary));
      } else if (dPrimaryAbs <= threshold && dSecondaryAbs > threshold) {
        this.onBodyTouchEnd();
      }
    }
  };

  onBodyTouchEnd = (event) => {
    if (this.state.swiping) {
      const vertical = this.isVertical();
      const currentPrimary = vertical ? event.changedTouches[0].pageY : event.changedTouches[0].pageX;
      const translateRatio = this.getTranslatePrimary(currentPrimary) / this.getMaxTranslatePrimary();

      this.maybeSwiping = false;
      const swiping = this.state.swiping;
      this.setState({
        swiping: null,
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this.setPosition(this.getMaxTranslatePrimary());
        } else {
          this.close('swipe');
        }
      } else {
        if (swiping === 'opening') {
          this.open('swipe');
        } else {
          this.setPosition(0);
        }
      }
    } else {
      this.maybeSwiping = false;
    }

    document.body.removeEventListener('touchmove', this.onBodyTouchMove);
    document.body.removeEventListener('touchend', this.onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
  };

  render() {
    const {
      children,
      className,
      containerClassName,
      containerStyle,
      direction,
      modal,
      overlayClassName,
      overlayStyle,
      style,
      zDepth,
    } = this.props;

    const styles = this.getStyles();

    let overlay;
    if (modal) {
      overlay = (
        <Overlay
          ref="overlay"
          show={this.shouldShow()}
          className={overlayClassName}
          style={Object.assign(styles.overlay, overlayStyle)}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this.handleTouchTapOverlay}
        />
      );
    }

    return (
      <div
        className={className}
        style={Object.assign({width: '100%'}, style)}
      >
        <EventListener target="window" onKeyUp={this.handleKeyUp} />
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={zDepth}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          className={containerClassName}
          style={Object.assign(styles.root, styles[direction], containerStyle)}
        >
          {children}
        </Paper>
      </div>
    );
  }
}

export default SlidingSheet;
