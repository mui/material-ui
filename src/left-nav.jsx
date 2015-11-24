const isBrowser = require('./utils/is-browser');

const warning = require('warning');

let Modernizr = isBrowser ? require('./utils/modernizr.custom') : undefined;

const React = require('react');
const ReactDOM = require('react-dom');
const KeyCode = require('./utils/key-code');
const StylePropable = require('./mixins/style-propable');
const AutoPrefix = require('./styles/auto-prefix');
const Transitions = require('./styles/transitions');
const WindowListenable = require('./mixins/window-listenable');
const Overlay = require('./overlay');
const Paper = require('./paper');
const Menu = require('./menu/menu');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

let openNavEventHandler = null;


const LeftNav = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    disableSwipeToOpen: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    open: React.PropTypes.bool,
    header: React.PropTypes.element,
    menuItems: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onChangeRequest: React.PropTypes.func,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize',
  },

  getDefaultProps() {
    return {
      disableSwipeToOpen: false,
      docked: true,
      open: null,
    };
  },

  getInitialState() {
    this._maybeSwiping = false;
    this._touchStartX = null;
    this._touchStartY = null;
    this._swipeStartX = null;

    this._testDeprecations();

    return {
      open: (this.props.open !== null ) ? this.props.open : this.props.docked,
      swiping: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    const newState = { muiTheme: newMuiTheme };
    
    this._testDeprecations();
    
    // If docked is changed, change the open state for when uncontrolled.
    if (this.props.docked !== nextProps.docked) newState.open = nextProps.docked;

    // If controlled then the open prop takes precedence.
    if (nextProps.open !== null) newState.open = nextProps.open;

    this.setState(newState);
  },

  componentDidMount() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentDidUpdate() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentWillUnmount() {
    this._disableSwipeHandling();
  },

  toggle() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');  
    if (this.state.open) this.close(); 
    else this.open();
    return this;
  },

  close() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open() {
    warning(false, 'using methods on left nav has been deprecated. Please refer to documentations.');
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getTheme() {
    return this.state.muiTheme.leftNav;
  },

  getStyles() {
    let x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
    let styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: isBrowser && Modernizr.csstransforms3d ? 0 : x,
        top: 0,
        transform: 'translate3d(' + x + 'px, 0, 0)',
        transition: !this.state.swiping && Transitions.easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden',
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        borderRadius: '0',
      },
      overlay: {
        pointerEvents: this.state.open ? 'auto' : 'none', // Bypass mouse events when left nav is closing.
      },
      menuItem: {
        height: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight,
        lineHeight: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight + 'px',
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0,
      },
    };

    styles.menuItemLink = this.mergeStyles(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor,
    });
    styles.menuItemSubheader = this.mergeStyles(styles.menuItem, {
      overflow: 'hidden',
    });

    return styles;
  },

  render() {
    let selectedIndex = this.props.selectedIndex;
    let overlay;

    let styles = this.getStyles();
    if (!this.props.docked) {
      overlay = (
        <Overlay
          ref="overlay"
          show={this._shouldShow()}
          style={styles.overlay}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this._onOverlayTouchTap} />
      );
    }
    let children;
    if (this.props.menuItems === undefined) {
      children = this.props.children;
    }
    else {
       children = (
        <Menu
          ref="menuItems"
          style={this.mergeStyles(styles.menu)}
          zDepth={0}
          menuItems={this.props.menuItems}
          menuItemStyle={this.mergeStyles(styles.menuItem)}
          menuItemStyleLink={this.mergeStyles(styles.menuItemLink)}
          menuItemStyleSubheader={this.mergeStyles(styles.menuItemSubheader)}
          menuItemClassName={this.props.menuItemClassName}
          menuItemClassNameSubheader={this.props.menuItemClassNameSubheader}
          menuItemClassNameLink={this.props.menuItemClassNameLink}
          selectedIndex={selectedIndex}
          onItemTap={this._onMenuItemClick} />
        );
    }
    return (
      <div className={this.props.className}>
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={2}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          style={this.mergeStyles(
            styles.root,
            this.props.openRight && styles.rootWhenOpenRight,
            this.props.style)}>
            {this.props.header}
            {children}
        </Paper>
      </div>
    );
  },

  _testDeprecations() {
    warning(!(typeof this.props.onNavClose === 'function'),
      'onNavClose will be removed in favor of onChangeRequest');

    warning(!(typeof this.props.onNavOpen === 'function'),
      'onNavOpen will be removed in favor of onChangeRequest');
  },

  _shouldShow() {
    return this.state.open || !!this.state.swiping;  // component is swiping
  },
  
  _close(reason) {
    if (this.props.open === null) this.setState({ open: false });
    if (this.props.onChangeRequest) this.props.onChangeRequest(false, reason);
    return this;
  },

  _open(reason) {
    if (this.props.open === null) this.setState({ open: true });
    if (this.props.onChangeRequest) this.props.onChangeRequest(true, reason);
    return this;
  },

  _updateMenuHeight() {
    if (this.props.header) {
      const menu = ReactDOM.findDOMNode(this.refs.menuItems);
      if (menu){
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

  _onOverlayTouchTap() {
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
    return this.getTheme().width + 10;
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
    if (!this.state.open &&
         (openNavEventHandler !== this._onBodyTouchStart ||
          this.props.disableSwipeToOpen)
       ) {
      return;
    }

    let touchStartX = e.touches[0].pageX;
    let touchStartY = e.touches[0].pageY;

    this._maybeSwiping = true;
    this._touchStartX = touchStartX;
    this._touchStartY = touchStartY;

    document.body.addEventListener('touchmove', this._onBodyTouchMove);
    document.body.addEventListener('touchend', this._onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _setPosition(translateX) {
    let leftNav = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
    let transformCSS = 'translate3d(' + (this._getTranslateMultiplier() * translateX) + 'px, 0, 0)';
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
    let currentX = e.touches[0].pageX;
    let currentY = e.touches[0].pageY;

    if (this.state.swiping) {
      e.preventDefault();
      this._setPosition(this._getTranslateX(currentX));
    }
    else if (this._maybeSwiping) {
      let dXAbs = Math.abs(currentX - this._touchStartX);
      let dYAbs = Math.abs(currentY - this._touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      let threshold = 10;

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
      let currentX = e.changedTouches[0].pageX;
      let translateRatio = this._getTranslateX(currentX) / this._getMaxTranslateX();

      this._maybeSwiping = false;
      let swiping = this.state.swiping;
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

});

module.exports = LeftNav;
