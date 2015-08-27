'use strict';

var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');
var Transitions = require('./styles/transitions');
var WindowListenable = require('./mixins/window-listenable');
var Overlay = require('./overlay');
var Paper = require('./paper');
var Menu = require('./menu/menu');

var openNavEventHandler = null;

var LeftNav = React.createClass({
  displayName: 'LeftNav',

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disableSwipeToOpen: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    menuItems: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string
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
      swiping: null
    };
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
    return this.context.muiTheme.palette;
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.leftNav;
  },

  getStyles: function getStyles() {
    var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
    var styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: 0,
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
        height: this.context.muiTheme.spacing.desktopLeftNavMenuItemHeight,
        lineHeight: this.context.muiTheme.spacing.desktopLeftNavMenuItemHeight + 'px'
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0
      }
    };
    styles.menuItemLink = this.mergeAndPrefix(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor
    });
    styles.menuItemSubheader = this.mergeAndPrefix(styles.menuItem, {
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
        onTouchTap: this._onOverlayTouchTap
      });
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
          style: this.mergeAndPrefix(styles.root, this.props.openRight && styles.rootWhenOpenRight, this.props.style) },
        this.props.header,
        React.createElement(Menu, {
          ref: 'menuItems',
          style: this.mergeAndPrefix(styles.menu),
          zDepth: 0,
          menuItems: this.props.menuItems,
          menuItemStyle: this.mergeAndPrefix(styles.menuItem),
          menuItemStyleLink: this.mergeAndPrefix(styles.menuItemLink),
          menuItemStyleSubheader: this.mergeAndPrefix(styles.menuItemSubheader),
          menuItemClassName: this.props.menuItemClassName,
          menuItemClassNameSubheader: this.props.menuItemClassNameSubheader,
          menuItemClassNameLink: this.props.menuItemClassNameLink,
          selectedIndex: selectedIndex,
          onItemTap: this._onMenuItemClick })
      )
    );
  },

  _updateMenuHeight: function _updateMenuHeight() {
    if (this.props.header) {
      var container = React.findDOMNode(this.refs.clickAwayableElement);
      var menu = React.findDOMNode(this.refs.menuItems);
      var menuHeight = container.clientHeight - menu.offsetTop;
      menu.style.height = menuHeight + 'px';
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
    var leftNav = React.findDOMNode(this.refs.clickAwayableElement);
    leftNav.style[AutoPrefix.single('transform')] = 'translate3d(' + this._getTranslateMultiplier() * translateX + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
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