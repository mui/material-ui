import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';

let openNavEventHandler = null;

class Drawer extends Component {
  static propTypes = {
    /**
     * The contents of the `Drawer`
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The CSS class name of the container element.
     */
    containerClassName: PropTypes.string,
    /**
     * Override the inline-styles of the container element.
     */
    containerStyle: PropTypes.object,
    /**
     * If true, swiping sideways when the `Drawer` is closed will not open it.
     */
    disableSwipeToOpen: PropTypes.bool,
    /**
     * If true, the `Drawer` will be docked. In this state, the overlay won't show and
     * clicking on a menu item will not close the `Drawer`.
     */
    docked: PropTypes.bool,
    /**
     * Callback function fired when the `open` state of the `Drawer` is requested to be changed.
     *
     * @param {boolean} open If true, the `Drawer` was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'swipe' for open requests; 'clickaway' (on overlay clicks),
     * 'escape' (on escape key press), and 'swipe' for close requests.
     */
    onRequestChange: PropTypes.func,
    /**
     * If true, the `Drawer` is opened.  Providing a value will turn the `Drawer`
     * into a controlled component.
     */
    open: PropTypes.bool,
    /**
     * If true, the `Drawer` is positioned to open from the opposite side.
     */
    openSecondary: PropTypes.bool,
    /**
     * The CSS class name to add to the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayClassName: PropTypes.string,
    /**
     * Override the inline-styles of the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The width of the left most (or right most) area in pixels where the `Drawer` can be
     * swiped open from. Setting this to `null` spans that area to the entire page
     * (**CAUTION!** Setting this property to `null` might cause issues with sliders and
     * swipeable `Tabs`: use at your own risk).
     */
    swipeAreaWidth: PropTypes.number,
    /**
     * The width of the `Drawer` in pixels. Defaults to using the values from theme.
     */
    width: PropTypes.number,
    /**
     * The zDepth of the `Drawer`.
     */
    zDepth: propTypes.zDepth,

  };

  static defaultProps = {
    disableSwipeToOpen: false,
    docked: true,
    open: null,
    openSecondary: false,
    swipeAreaWidth: 30,
    width: null,
    zDepth: 2,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.maybeSwiping = false;
    this.touchStartX = null;
    this.touchStartY = null;
    this.swipeStartX = null;

    this.setState({
      open: (this.props.open !== null ) ? this.props.open : this.props.docked,
      swiping: null,
    });
  }

  componentDidMount() {
    this.enableSwipeHandling();
  }

  componentWillReceiveProps(nextProps) {
    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) {
      this.setState({
        open: nextProps.open,
      });
      // Otherwise, if docked is changed, change the open state for when uncontrolled.
    } else if (this.props.docked !== nextProps.docked) {
      this.setState({
        open: nextProps.docked,
      });
    }
  }

  componentDidUpdate() {
    this.enableSwipeHandling();
  }

  componentWillUnmount() {
    this.disableSwipeHandling();
  }

  getStyles() {
    const muiTheme = this.context.muiTheme;
    const theme = muiTheme.drawer;

    const x = this.getTranslateMultiplier() * (this.state.open ? 0 : this.getMaxTranslateX());

    const styles = {
      root: {
        height: '100%',
        width: this.props.width || theme.width,
        position: 'fixed',
        zIndex: muiTheme.zIndex.drawer,
        left: 0,
        top: 0,
        transform: `translate(${x}px, 0)`,
        transition: !this.state.swiping && transitions.easeOut(null, 'transform', null),
        backgroundColor: theme.color,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
      },
      overlay: {
        zIndex: muiTheme.zIndex.drawerOverlay,
        pointerEvents: this.state.open ? 'auto' : 'none', // Bypass mouse events when left nav is closing.
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0,
      },
    };

    return styles;
  }

  shouldShow() {
    return this.state.open || !!this.state.swiping;  // component is swiping
  }

  close(reason) {
    if (this.props.open === null) this.setState({open: false});
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    return this;
  }

  open(reason) {
    if (this.props.open === null) this.setState({open: true});
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  }

  handleTouchTapOverlay = (event) => {
    event.preventDefault();
    this.close('clickaway');
  };

  handleKeyUp = (event) => {
    if (this.state.open && !this.props.docked && keycode(event) === 'esc') {
      this.close('escape');
    }
  };

  getMaxTranslateX() {
    const width = this.props.width || this.context.muiTheme.drawer.width;
    return width + 10;
  }

  getTranslateMultiplier() {
    return this.props.openSecondary ? 1 : -1;
  }

  enableSwipeHandling() {
    if (!this.props.docked) {
      document.body.addEventListener('touchstart', this.onBodyTouchStart);
      if (!openNavEventHandler) {
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

    const touchStartX = event.touches[0].pageX;
    const touchStartY = event.touches[0].pageY;

    // Open only if swiping from far left (or right) while closed
    if (swipeAreaWidth !== null && !this.state.open) {
      if (this.props.openSecondary) {
        // If openSecondary is true calculate from the far right
        if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
      } else {
        // If openSecondary is false calculate from the far left
        if (touchStartX > swipeAreaWidth) return;
      }
    }

    if (!this.state.open &&
         (openNavEventHandler !== this.onBodyTouchStart ||
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

  setPosition(translateX) {
    const drawer = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
    const transformCSS = `translate(${(this.getTranslateMultiplier() * translateX)}px, 0)`;
    this.refs.overlay.setOpacity(1 - translateX / this.getMaxTranslateX());
    autoPrefix.set(drawer.style, 'transform', transformCSS);
  }

  getTranslateX(currentX) {
    return Math.min(
             Math.max(
               this.state.swiping === 'closing' ?
                 this.getTranslateMultiplier() * (currentX - this.swipeStartX) :
                 this.getMaxTranslateX() - this.getTranslateMultiplier() * (this.swipeStartX - currentX),
               0
             ),
             this.getMaxTranslateX()
           );
  }

  onBodyTouchMove = (event) => {
    const currentX = event.touches[0].pageX;
    const currentY = event.touches[0].pageY;

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
          swiping: this.state.open ? 'closing' : 'opening',
        });
        this.setPosition(this.getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this.onBodyTouchEnd();
      }
    }
  };

  onBodyTouchEnd = (event) => {
    if (this.state.swiping) {
      const currentX = event.changedTouches[0].pageX;
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
      docked,
      openSecondary,
      overlayClassName,
      overlayStyle,
      style,
      zDepth,
    } = this.props;

    const styles = this.getStyles();

    let overlay;
    if (!docked) {
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
        style={style}
      >
        <EventListener target="window" onKeyUp={this.handleKeyUp} />
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={zDepth}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          className={containerClassName}
          style={Object.assign(styles.root, openSecondary && styles.rootWhenOpenRight, containerStyle)}
        >
          {children}
        </Paper>
      </div>
    );
  }
}

export default Drawer;
