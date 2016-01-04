import React from 'react';
import ReactDOM from 'react-dom';
import KeyCode from './utils/key-code';
import StylePropable from './mixins/style-propable';
import AutoPrefix from './styles/auto-prefix';
import Transitions from './styles/transitions';
import WindowListenable from './mixins/window-listenable';
import Overlay from './overlay';
import Paper from './paper';
import Menu from './menu/menu';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import warning from 'warning';
import deprecated from './utils/deprecatedPropType';

let openNavEventHandler = null;

const LeftNav = React.createClass({

  propTypes: {
    /**
     * The contents of the `LeftNav`
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Indicates whether swiping sideways when the `LeftNav` is closed should open it.
     */
    disableSwipeToOpen: React.PropTypes.bool,

    /**
     * Indicates that the `LeftNav` should be docked. In this state, the overlay won't
     * show and clicking on a menu item will not close the `LeftNav`.
     */
    docked: React.PropTypes.bool,

    /**
     * A react component that will be displayed above all the menu items.
     * Usually, this is used for a logo or a profile image.
     */
    header: deprecated(React.PropTypes.element,
      'Instead, use composability.'),

    /**
     * Class name for the menuItem.
     */
    menuItemClassName: deprecated(React.PropTypes.string,
      'It will be removed with menuItems.'),

    /**
     * Class name for the link menuItem.
     */
    menuItemClassNameLink: deprecated(React.PropTypes.string,
      'It will be removed with menuItems.'),

    /**
     * Class name for the subheader menuItem.
     */
    menuItemClassNameSubheader: deprecated(React.PropTypes.string,
      'It will be removed with menuItems.'),

    /**
     * JSON data representing all menu items to render.
     */
    menuItems: deprecated(React.PropTypes.array,
      'Instead, use composability.'),

    /**
     * Fired when a menu item is clicked that is not the
     * one currently selected. Note that this requires the `injectTapEventPlugin`
     * component. See the "Get Started" section for more detail.
     */
    onChange: deprecated(React.PropTypes.func,
      'It will be removed with menuItems.'),

    /**
     * Fired when the component is opened.
     */
    onNavClose: deprecated(React.PropTypes.func,
      'Instead, use onRequestChange.'),

    /**
     * Fired when the component is closed.
     */
    onNavOpen: deprecated(React.PropTypes.func,
      'Instead, use onRequestChange.'),

    /**
     * Callback function that is fired when the open state of the `LeftNav` is
     * requested to be changed. The provided open argument determines whether
     * the `LeftNav` is requested to be opened or closed. Also, the reason
     * argument states why the `LeftNav` got closed or opend. It can be either
     * `'clickaway'` for menuItem and overlay clicks, `'escape'` for pressing the
     * escape key and 'swipe' for swiping. For opening the reason is always `'swipe'`.
     */
    onRequestChange: React.PropTypes.func,

    /**
     * Indicates that the `LeftNav` should be opened, closed or uncontrolled.
     * Providing a boolean will turn the `LeftNav` into a controlled component.
     */
    open: React.PropTypes.bool,

    /**
     * Positions the `LeftNav` to open from the right side.
     */
    openRight: React.PropTypes.bool,

    /**
     * The `className` to add to the `Overlay` component that is rendered behind the `LeftNav`.
     */
    overlayClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the `Overlay` component that is rendered behind the `LeftNav`.
     */
    overlayStyle: React.PropTypes.object,

    /**
     * Indicates the particular item in the menuItems array that is currently selected.
     */
    selectedIndex: deprecated(React.PropTypes.number,
      'It will be removed with menuItems.'),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The width of the left most (or right most) area in pixels where the `LeftNav` can be
     * swiped open from. Setting this to `null` spans that area to the entire page
     * (**CAUTION!** Setting this property to `null` might cause issues with sliders and
     * swipeable `Tabs`, use at your own risk).
     */
    swipeAreaWidth: React.PropTypes.number,

    /**
     * The width of the `LeftNav` in pixels. Defaults to using the values from theme.
     */
    width: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    WindowListenable,
  ],

  getDefaultProps() {
    return {
      disableSwipeToOpen: false,
      docked: true,
      open: null,
      openRight: false,
      swipeAreaWidth: 30,
      width: null,
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    const newState = {muiTheme: newMuiTheme};

    // If docked is changed, change the open state for when uncontrolled.
    if (this.props.docked !== nextProps.docked) newState.open = nextProps.docked;

    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) newState.open = nextProps.open;

    this.setState(newState);
  },

  componentDidUpdate() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentWillUnmount() {
    this._disableSwipeHandling();
  },

  windowListeners: {
    keyup: '_onWindowKeyUp',
    resize: '_onWindowResize',
  },

  toggle() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');
    if (this.state.open) this.close();
    else this.open();
    return this;
  },

  close() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');
    this.setState({open: false});
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');
    this.setState({open: true});
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getStyles() {
    const muiTheme = this.state.muiTheme;
    const theme = muiTheme.leftNav;
    const rawTheme = muiTheme.rawTheme;

    const x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());

    const styles = {
      root: {
        height: '100%',
        width: this.props.width || theme.width,
        position: 'fixed',
        zIndex: muiTheme.zIndex.leftNav,
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, 0, 0)`,
        transition: !this.state.swiping && Transitions.easeOut(null, 'transform', null),
        backgroundColor: theme.color,
        overflow: 'auto',
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        borderRadius: '0',
      },
      overlay: {
        zIndex: muiTheme.zIndex.leftNavOverlay,
        pointerEvents: this.state.open ? 'auto' : 'none', // Bypass mouse events when left nav is closing.
      },
      menuItem: {
        height: rawTheme.spacing.desktopLeftNavMenuItemHeight,
        lineHeight: `${rawTheme.spacing.desktopLeftNavMenuItemHeight}px`,
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0,
      },
    };

    styles.menuItemLink = this.mergeStyles(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: rawTheme.palette.textColor,
    });
    styles.menuItemSubheader = this.mergeStyles(styles.menuItem, {
      overflow: 'hidden',
    });

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

  _updateMenuHeight() {
    if (this.props.header) {
      const menu = ReactDOM.findDOMNode(this.refs.menuItems);
      if (menu) {
        const container = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
        const menuHeight = container.clientHeight - menu.offsetTop;
        menu.style.height = menuHeight + 'px';
      }
    }
  },

  _onMenuItemClick(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this._close('clickaway');
  },

  _onOverlayTouchTap(event) {
    event.preventDefault();
    this._close('clickaway');
  },

  _onWindowKeyUp(e) {
    if (e.keyCode === KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this._close('escape');
    }
  },

  _onWindowResize() {
    this._updateMenuHeight();
  },

  _getMaxTranslateX() {
    const width = this.props.width || this.state.muiTheme.leftNav.width;
    return width + 10;
  },

  _getTranslateMultiplier() {
    return this.props.openRight ? 1 : -1;
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

  _onBodyTouchStart(e) {

    const swipeAreaWidth = this.props.swipeAreaWidth;

    const touchStartX = e.touches[0].pageX;
    const touchStartY = e.touches[0].pageY;

    // Open only if swiping from far left (or right) while closed
    if (swipeAreaWidth !== null && !this.state.open) {
      if (this.props.openRight) {
        // If openRight is true calculate from the far right
        if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
      } else {
        // If openRight is false calculate from the far left
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
    const leftNav = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
    const transformCSS = 'translate3d(' + (this._getTranslateMultiplier() * translateX) + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
    AutoPrefix.set(leftNav.style, 'transform', transformCSS);
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

  _onBodyTouchMove(e) {
    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;

    if (this.state.swiping) {
      e.preventDefault();
      this._setPosition(this._getTranslateX(currentX));
    }
    else if (this._maybeSwiping) {
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
      }
      else if (dXAbs <= threshold && dYAbs > threshold) {
        this._onBodyTouchEnd();
      }
    }
  },

  _onBodyTouchEnd(e) {
    if (this.state.swiping) {
      const currentX = e.changedTouches[0].pageX;
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
      }
      else {
        if (swiping === 'opening') {
          this._open('swipe');
        } else {
          this._setPosition(0);
        }
      }
    }
    else {
      this._maybeSwiping = false;
    }

    document.body.removeEventListener('touchmove', this._onBodyTouchMove);
    document.body.removeEventListener('touchend', this._onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this._onBodyTouchEnd);
  },

  render() {
    const {
      className,
      docked,
      header,
      menuItemClassName,
      menuItemClassNameSubheader,
      menuItemClassNameLink,
      menuItems,
      openRight,
      overlayClassName,
      overlayStyle,
      selectedIndex,
      style,
    } = this.props;

    const styles = this.getStyles();

    let overlay;
    if (!docked) {
      overlay = (
        <Overlay
          ref="overlay"
          show={this._shouldShow()}
          className={overlayClassName}
          style={this.mergeStyles(styles.overlay, overlayStyle)}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this._onOverlayTouchTap} />
      );
    }
    let children;
    if (menuItems === undefined) {
      children = this.props.children;
    }
    else {
      children = (
        <Menu
          ref="menuItems"
          style={this.mergeStyles(styles.menu)}
          zDepth={0}
          menuItems={menuItems}
          menuItemStyle={this.mergeStyles(styles.menuItem)}
          menuItemStyleLink={this.mergeStyles(styles.menuItemLink)}
          menuItemStyleSubheader={this.mergeStyles(styles.menuItemSubheader)}
          menuItemClassName={menuItemClassName}
          menuItemClassNameSubheader={menuItemClassNameSubheader}
          menuItemClassNameLink={menuItemClassNameLink}
          selectedIndex={selectedIndex}
          onItemTap={this._onMenuItemClick} />
        );
    }

    return (
      <div>
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={2}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          className={className}
          style={this.mergeStyles(styles.root, openRight && styles.rootWhenOpenRight, style)}>
            {header}
            {children}
        </Paper>
      </div>
    );
  },

});

export default LeftNav;
