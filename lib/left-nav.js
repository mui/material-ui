'use strict';

var isBrowser = require('./utils/is-browser');

var Modernizr = isBrowser ? require('./utils/modernizr.custom') : undefined;

var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');
var Transitions = require('./styles/transitions');
var WindowListenable = require('./mixins/window-listenable');
var Overlay = require('./overlay');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var openNavEventHandler = null;

var LeftNav = React.createClass({
  displayName: 'LeftNav',

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    disableSwipeToOpen: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    menuItems: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string,
    style: React.PropTypes.object
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disableSwipeToOpen: false,
      docked: true
    };
  },

  getInitialState: function getInitialState() {
    this._maybeSwiping = false;
    this._touchStartX = null;
    this._touchStartY = null;
    this._swipeStartX = null;

    return {
      open: this.props.docked,
      swiping: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
      open: this.props.docked !== nextProps.docked ? nextProps.docked : this.state.open
    });
  },

  componentDidMount: function componentDidMount() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._disableSwipeHandling();
  },

  toggle: function toggle() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function close() {
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open: function open() {
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette: function getThemePalette() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.leftNav;
  },

  getStyles: function getStyles() {
    var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
    var styles = {
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
        overflow: 'hidden'
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        borderRadius: '0'
      },
      menuItem: {
        height: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight,
        lineHeight: this.state.muiTheme.rawTheme.spacing.desktopLeftNavMenuItemHeight + 'px'
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0
      }
    };

    styles.menuItemLink = this.mergeStyles(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor
    });
    styles.menuItemSubheader = this.mergeStyles(styles.menuItem, {
      overflow: 'hidden'
    });

    return styles;
  },

  render: function render() {
    var selectedIndex = this.props.selectedIndex;
    var overlay = undefined;

    var styles = this.getStyles();
    if (!this.props.docked) {
      overlay = React.createElement(Overlay, {
        ref: 'overlay',
        show: this.state.open || !!this.state.swiping,
        transitionEnabled: !this.state.swiping,
        onTouchTap: this._onOverlayTouchTap });
    }
    var children = undefined;
    if (this.props.menuItems === undefined) {
      children = this.props.children;
    } else {
      children = React.createElement(Menu, {
        ref: 'menuItems',
        style: this.mergeStyles(styles.menu),
        zDepth: 0,
        menuItems: this.props.menuItems,
        menuItemStyle: this.mergeStyles(styles.menuItem),
        menuItemStyleLink: this.mergeStyles(styles.menuItemLink),
        menuItemStyleSubheader: this.mergeStyles(styles.menuItemSubheader),
        menuItemClassName: this.props.menuItemClassName,
        menuItemClassNameSubheader: this.props.menuItemClassNameSubheader,
        menuItemClassNameLink: this.props.menuItemClassNameLink,
        selectedIndex: selectedIndex,
        onItemTap: this._onMenuItemClick });
    }
    return React.createElement(
      'div',
      { className: this.props.className },
      overlay,
      React.createElement(
        Paper,
        {
          ref: 'clickAwayableElement',
          zDepth: 2,
          rounded: false,
          transitionEnabled: !this.state.swiping,
          style: this.mergeStyles(styles.root, this.props.openRight && styles.rootWhenOpenRight, this.props.style) },
        this.props.header,
        children
      )
    );
  },

  _updateMenuHeight: function _updateMenuHeight() {
    if (this.props.header) {
      var menu = ReactDOM.findDOMNode(this.refs.menuItems);
      if (menu) {
        var container = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
        var menuHeight = container.clientHeight - menu.offsetTop;
        menu.style.height = menuHeight + 'px';
      }
    }
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this.close();
  },

  _onOverlayTouchTap: function _onOverlayTouchTap() {
    this.close();
  },

  _onWindowKeyUp: function _onWindowKeyUp(e) {
    if (e.keyCode === KeyCode.ESC && !this.props.docked && this.state.open) {
      this.close();
    }
  },

  _onWindowResize: function _onWindowResize() {
    this._updateMenuHeight();
  },

  _getMaxTranslateX: function _getMaxTranslateX() {
    return this.getTheme().width + 10;
  },

  _getTranslateMultiplier: function _getTranslateMultiplier() {
    return this.props.openRight ? 1 : -1;
  },

  _enableSwipeHandling: function _enableSwipeHandling() {
    if (!this.props.docked) {
      document.body.addEventListener('touchstart', this._onBodyTouchStart);
      if (!openNavEventHandler) {
        openNavEventHandler = this._onBodyTouchStart;
      }
    } else {
      this._disableSwipeHandling();
    }
  },

  _disableSwipeHandling: function _disableSwipeHandling() {
    document.body.removeEventListener('touchstart', this._onBodyTouchStart);
    if (openNavEventHandler === this._onBodyTouchStart) {
      openNavEventHandler = null;
    }
  },

  _onBodyTouchStart: function _onBodyTouchStart(e) {
    if (!this.state.open && (openNavEventHandler !== this._onBodyTouchStart || this.props.disableSwipeToOpen)) {
      return;
    }

    var touchStartX = e.touches[0].pageX;
    var touchStartY = e.touches[0].pageY;

    this._maybeSwiping = true;
    this._touchStartX = touchStartX;
    this._touchStartY = touchStartY;

    document.body.addEventListener('touchmove', this._onBodyTouchMove);
    document.body.addEventListener('touchend', this._onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _setPosition: function _setPosition(translateX) {
    var leftNav = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
    var transformCSS = 'translate3d(' + this._getTranslateMultiplier() * translateX + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
    AutoPrefix.set(leftNav.style, 'transform', transformCSS);
  },

  _getTranslateX: function _getTranslateX(currentX) {
    return Math.min(Math.max(this.state.swiping === 'closing' ? this._getTranslateMultiplier() * (currentX - this._swipeStartX) : this._getMaxTranslateX() - this._getTranslateMultiplier() * (this._swipeStartX - currentX), 0), this._getMaxTranslateX());
  },

  _onBodyTouchMove: function _onBodyTouchMove(e) {
    var currentX = e.touches[0].pageX;
    var currentY = e.touches[0].pageY;

    if (this.state.swiping) {
      e.preventDefault();
      this._setPosition(this._getTranslateX(currentX));
    } else if (this._maybeSwiping) {
      var dXAbs = Math.abs(currentX - this._touchStartX);
      var dYAbs = Math.abs(currentY - this._touchStartY);
      // If the user has moved his thumb ten pixels in either direction,
      // we can safely make an assumption about whether he was intending
      // to swipe or scroll.
      var threshold = 10;

      if (dXAbs > threshold && dYAbs <= threshold) {
        this._swipeStartX = currentX;
        this.setState({
          swiping: this.state.open ? 'closing' : 'opening'
        });
        this._setPosition(this._getTranslateX(currentX));
      } else if (dXAbs <= threshold && dYAbs > threshold) {
        this._onBodyTouchEnd();
      }
    }
  },

  _onBodyTouchEnd: function _onBodyTouchEnd(e) {
    if (this.state.swiping) {
      var currentX = e.changedTouches[0].pageX;
      var translateRatio = this._getTranslateX(currentX) / this._getMaxTranslateX();

      this._maybeSwiping = false;
      var swiping = this.state.swiping;
      this.setState({
        swiping: null
      });

      // We have to open or close after setting swiping to null,
      // because only then CSS transition is enabled.
      if (translateRatio > 0.5) {
        if (swiping === 'opening') {
          this._setPosition(this._getMaxTranslateX());
        } else {
          this.close();
        }
      } else {
        if (swiping === 'opening') {
          this.open();
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
  }

});

module.exports = LeftNav;