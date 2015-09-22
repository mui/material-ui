import React from 'react';
import { AutoPrefix, Transitions } from '../styles';
import Overlay from '../overlay';
import Menu from '../menus/menu';
import Paper from '../paper';
import KeyCode from '../utils/key-code';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';

let openNavEventHandler = null;

let SideNav = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    /*open type currently supports: docked/overlay */
    openType: React.PropTypes.oneOf([
      'none',
      'docked',
      'overlay',
    ]),
    defaultOpen: React.PropTypes.bool,
    header: React.PropTypes.element,
    onChange: React.PropTypes.func,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    menuStyle: React.PropTypes.object,
    listStyle: React.PropTypes.object,
    disableSwipeToOpen: React.PropTypes.bool,
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize',
  },

  getDefaultProps() {
    return {
      openType:'docked',
      defaultOpen: false,
      disableSwipeToOpen: false,
      zDepth: 0,
    };
  },

  getInitialState() {
    this._maybeSwiping = false;
    this._touchStartX = null;
    this._touchStartY = null;
    this._swipeStartX = null;

    return {
      open: this.props.defaultOpen,
      swiping: null,
    };
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
    this.setState({ open: !this.state.open });
    return this;
  },

  close() {
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open() {
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette() {
    return this.context.muiTheme.palette;
  },

  getTheme() {
    if(this.context.muiTheme.component.sideNav)
      return this.context.muiTheme.component.sideNav;
    else
      return {
        width: 256,
        backgroundColor: '#FFFFFF',
      };
  },

  getStyles() {
    let x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX());
    let styles = {
      root: {
        height: '100%',
        width: this.props.width? this.props.width : this.getTheme().width,
        backgroundColor: this.props.backgroundColor? this.props.backgroundColor : this.getTheme().backgroundColor,
        position: 'fixed',
        zIndex: 10,
        left: 0,
        top: 0,
        transform: 'translate3d(' + x + 'px, 0, 0)',
        transition: !this.state.swiping && Transitions.easeOut(),
        overflow: 'hidden',
      },
      menu: {
        backgroundColor: this.props.backgroundColor? this.props.backgroundColor : this.getTheme().backgroundColor,
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        width: this.props.width? this.props.width : this.getTheme().width,
        borderRadius: '0',
      },
      list: {
        width: this.props.width? this.props.width : this.getTheme().width,
        paddingTop: 0,
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: 0,
      },
    };

    return styles;
  },

  render() {
    let overlay;

    let {
      className,
      openType,
      defaultOpen,
      header,
      onChange,
      onNavOpen,
      onNavClose,
      openRight,
      disableSwipeToOpen,
      style,
      listStyle,
      menuStyle,
      zDepth,
      ...other,
    } = this.props;

    let styles = this.getStyles();
    if (openType==='overlay') {
      overlay = (
        <Overlay
          ref="overlay"
          show={this.state.open || !!this.state.swiping}
          transitionEnabled={!this.state.swiping}
          onTouchTap={this._onOverlayTouchTap}
        />
      );
    }

    return (
      <div className={className}>
        {overlay}
        <Paper
          ref="container"
          className="paper"
          zDepth={2}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          style={this.mergeAndPrefix(
            styles.root,
            openRight && styles.rootWhenOpenRight,
            style)}>
            {header}
            <Menu
              {...other}
              ref="menu"
              autoWidth={false}
              style={this.mergeAndPrefix(styles.menu,menuStyle)}
              listStyle={this.mergeAndPrefix(styles.list,listStyle)}
              zDepth={zDepth}
              onItemTouchTap={this._onMenuItemClick} >
              {this.props.children}
            </Menu>
        </Paper>
      </div>
    );
  },

  _updateMenuHeight() {
    if (this.props.header) {
      let container = React.findDOMNode(this.refs.container);
      let menu = React.findDOMNode(this.refs.menu);
      let menuHeight = container.clientHeight - menu.offsetTop;
      menu.style.height = menuHeight + 'px';
    }
  },

  _onMenuItemClick(e, item) {
    if (this.props.onChange) {
      this.props.onChange(e, item);
    }
    if (this.props.openType==='overlay') this.close();
  },

  _onOverlayTouchTap() {
    this.close();
  },

  _onWindowKeyUp(e) {
    if (e.keyCode === KeyCode.ESC &&
        (this.props.openType==='overlay') &&
        this.state.open) {
      this.close();
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
    if (this.props.openType==='overlay') {
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
    if (!this.state.open && openNavEventHandler !== this._onBodyTouchStart) {
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
    let leftNav = React.findDOMNode(this.refs.container);
    leftNav.style[AutoPrefix.single('transform')] =
      'translate3d(' + (this._getTranslateMultiplier() * translateX) + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
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
          this.close();
        }
      }
      else {
        if (swiping === 'opening') {
          this.open();
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


export default SideNav;
