import React from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import Paper from '../Paper';
import getMuiTheme from '../styles/getMuiTheme';
import propTypes from '../utils/propTypes';

let openNavEventHandler = null;

const Drawer = React.createClass({

  propTypes: {
    /**
     * The contents of the `Drawer`
     */
    children: React.PropTypes.node,

    /**
     * The CSS class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The CSS class name of the container element.
     */
    containerClassName: React.PropTypes.string,

    /**
     * Override the inline-styles of the container element.
     */
    containerStyle: React.PropTypes.object,

    /**
     * If true, swiping sideways when the `Drawer` is closed will not open it.
     */
    disableSwipeToOpen: React.PropTypes.bool,

    /**
     * If true, the `Drawer` will be docked. In this state, the overlay won't show and
     * clicking on a menu item will not close the `Drawer`.
     */
    docked: React.PropTypes.bool,

    /**
     * Callback function fired when the `open` state of the `Drawer` is requested to be changed.
     *
     * @param {boolean} open If true, the `Drawer` was requested to be opened.
     * @param {string} reason The reason for the open or close request. Possible values are
     * 'swipe' for open requests; 'clickaway' (on overlay clicks),
     * 'escape' (on escape key press), and 'swipe' for close requests.
     */
    onRequestChange: React.PropTypes.func,

    /**
     * If true, the `Drawer` is opened.  Providing a value will turn the `Drawer`
     * into a controlled component.
     */
    open: React.PropTypes.bool,

    /**
     * If true, the `Drawer` is positioned to open from the opposite side.
     */
    openSecondary: React.PropTypes.bool,

    /**
     * The CSS class name to add to the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayClassName: React.PropTypes.string,

    /**
     * Override the inline-styles of the `Overlay` component that is rendered behind the `Drawer`.
     */
    overlayStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The width of the left most (or right most) area in pixels where the `Drawer` can be
     * swiped open from. Setting this to `null` spans that area to the entire page
     * (**CAUTION!** Setting this property to `null` might cause issues with sliders and
     * swipeable `Tabs`: use at your own risk).
     */
    swipeAreaWidth: React.PropTypes.number,

    /**
     * The width of the `Drawer` in pixels. Defaults to using the values from theme.
     */
    width: React.PropTypes.number,

    /**
     * The zDepth of the `Drawer`.
     */
    zDepth: propTypes.zDepth,

  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disableSwipeToOpen: false,
      docked: true,
      open: null,
      openSecondary: false,
      swipeAreaWidth: 30,
      width: null,
      zDepth: 2,
    };
  },

  getInitialState() {
    this._maybeSwiping = false;
    this._touchStartX = null;
    this._touchStartY = null;
    this._swipeStartX = null;

    return {
      open: (this.props.open !== null ) ? this.props.open : this.props.docked,
      swiping: null,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._enableSwipeHandling();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newState = {muiTheme: nextContext.muiTheme || this.state.muiTheme};

    // If docked is changed, change the open state for when uncontrolled.
    if (this.props.docked !== nextProps.docked) newState.open = nextProps.docked;

    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) newState.open = nextProps.open;

    this.setState(newState);
  },

  componentDidUpdate() {
    this._enableSwipeHandling();
  },

  componentWillUnmount() {
    this._disableSwipeHandling();
  },

  getStyles() {
    const muiTheme = this.state.muiTheme;
    const theme = muiTheme.navDrawer;

    const x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());

    const styles = {
      root: {
        height: '100%',
        width: this.props.width || theme.width,
        position: 'fixed',
        zIndex: muiTheme.zIndex.navDrawer,
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, 0, 0)`,
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
  },

  _shouldShow() {
    return this.state.open || !!this.state.swiping;  // component is swiping
  },

  _close(reason) {
    if (this.props.open === null) this.setState({open: false});
    if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
    return this;
  },

  _open(reason) {
    if (this.props.open === null) this.setState({open: true});
    if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
    return this;
  },

  handleTouchTapOverlay(event) {
    event.preventDefault();
    this._close('clickaway');
  },

  _onWindowKeyUp(event) {
    if (keycode(event) === 'esc' &&
        !this.props.docked &&
        this.state.open) {
      this._close('escape');
    }
  },

  _getMaxTranslateX() {
    const width = this.props.width || this.state.muiTheme.navDrawer.width;
    return width + 10;
  },

  _getTranslateMultiplier() {
    return this.props.openSecondary ? 1 : -1;
  },

  _enableSwipeHandling() {
    if (!this.props.docked) {
      document.body.addEventListener('touchstart', this._onBodyTouchStart);
      if (!openNavEventHandler) {
        openNavEventHandler = this._onBodyTouchStart;
      }
    } else {
      this._disableSwipeHandling();
    }
  },

  _disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this._onBodyTouchStart);
    if (openNavEventHandler === this._onBodyTouchStart) {
      openNavEventHandler = null;
    }
  },

  _onBodyTouchStart(event) {
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
         (openNavEventHandler !== this._onBodyTouchStart ||
          this.props.disableSwipeToOpen)
       ) {
      return;
    }

    this._maybeSwiping = true;
    this._touchStartX = touchStartX;
    this._touchStartY = touchStartY;

    document.body.addEventListener('touchmove', this._onBodyTouchMove);
    document.body.addEventListener('touchend', this._onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _setPosition(translateX) {
    const drawer = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
    const transformCSS = `translate3d(${(this._getTranslateMultiplier() * translateX)}px, 0, 0)`;
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
    autoPrefix.set(drawer.style, 'transform', transformCSS, this.state.muiTheme);
  },

  _getTranslateX(currentX) {
    return Math.min(
             Math.max(
               this.state.swiping === 'closing' ?
                 this._getTranslateMultiplier() * (currentX - this._swipeStartX) :
                 this._getMaxTranslateX() - this._getTranslateMultiplier() * (this._swipeStartX - currentX),
               0
             ),
             this._getMaxTranslateX()
           );
  },

  _onBodyTouchMove(event) {
    const currentX = event.touches[0].pageX;
    const currentY = event.touches[0].pageY;

    if (this.state.swiping) {
      event.preventDefault();
      this._setPosition(this._getTranslateX(currentX));
    } else if (this._maybeSwiping) {
      const dXAbs = Math.abs(currentX - this._touchStartX);
      const dYAbs = Math.abs(currentY - this._touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      const threshold = 10;

      if (dXAbs > threshold && dYAbs <= threshold) {
        this._swipeStartX = currentX;
        this.setState({
          swiping: this.state.open ? 'closing' : 'opening',
        });
        this._setPosition(this._getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this._onBodyTouchEnd();
      }
    }
  },

  _onBodyTouchEnd(event) {
    if (this.state.swiping) {
      const currentX = event.changedTouches[0].pageX;
      const translateRatio = this._getTranslateX(currentX) / this._getMaxTranslateX();

      this._maybeSwiping = false;
      const swiping = this.state.swiping;
      this.setState({
        swiping: null,
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this._setPosition(this._getMaxTranslateX());
        } else {
          this._close('swipe');
        }
      } else {
        if (swiping === 'opening') {
          this._open('swipe');
        } else {
          this._setPosition(0);
        }
      }
    } else {
      this._maybeSwiping = false;
    }

    document.body.removeEventListener('touchmove', this._onBodyTouchMove);
    document.body.removeEventListener('touchend', this._onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this._onBodyTouchEnd);
  },

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
          show={this._shouldShow()}
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
        <EventListener elementName="window" onKeyUp={this._onWindowKeyUp} />
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
  },
});

export default Drawer;
