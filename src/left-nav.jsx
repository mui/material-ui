var React = require('react');
var KeyCode = require('./utils/key-code');
var Modernizr = require('./utils/modernizr.custom');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var WindowListenable = require('./mixins/window-listenable');
var Overlay = require('./overlay');
var Paper = require('./paper');
var Menu = require('./menu/menu');

var LeftNav = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    menuItems: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func,
    openRight: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize'
  },

  getDefaultProps: function() {
    return {
      docked: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.docked,
      swiping: false
    };
  },
  
  componentDidMount: function() {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._updateMenuHeight();
    this._enableSwipeHandling();
  },

  componentWillUnmount: function() {
    this._disableSwipeHandling();
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open: function() {
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette: function() {
    return this.context.muiTheme.palette;
  },

  getTheme: function() {
    return this.context.muiTheme.component.leftNav;
  },

  getStyles: function() {
    var x = this._getTranslateMultiplier() * (this.state.open ? 0 : this._getMaxTranslateX()) + 'px';
    var styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: 0,
        top: 0,
        transform: 'translate3d(' + x + ', 0, 0)',
        transition: !this.state.swiping && Transitions.easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden'
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%'
      },
      menuItem: {
        height: this.context.muiTheme.spacing.desktopLeftNavMenuItemHeight,
        lineDeight: this.context.muiTheme.spacing.desktopLeftNavMenuItemHeight
      },
      rootWhenOpenRight: {
        left: 'auto',
        right: '0'
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

  render: function() {
    var selectedIndex = this.props.selectedIndex;
    var overlay;

    var styles = this.getStyles();
    if (!this.props.docked) {
      overlay = <Overlay ref="overlay"
                         show={this.state.open}
                         transitionEnabled={!this.state.swiping}
                         onTouchTap={this._onOverlayTouchTap} />;
    }


    return (
      <div className={this.props.className}>
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={2}
          rounded={false}
          transitionEnabled={!this.state.swiping}
          style={this.mergeAndPrefix(
            styles.root, 
            this.props.openRight && styles.rootWhenOpenRight,
            this.props.style)}>
            {this.props.header}
            <Menu
              ref="menuItems"
              style={this.mergeAndPrefix(styles.menu)}
              zDepth={0}
              menuItems={this.props.menuItems}
              menuItemStyle={this.mergeAndPrefix(styles.menuItem)} 
              menuItemStyleLink={this.mergeAndPrefix(styles.menuItemLink)}
              menuItemStyleSubheader={this.mergeAndPrefix(styles.menuItemSubheader)}
              selectedIndex={selectedIndex}
              onItemClick={this._onMenuItemClick} />
        </Paper>
      </div>
    );
  },
  
  _updateMenuHeight: function() {
    if (this.props.header) {
      var container = this.refs.clickAwayableElement.getDOMNode();
      var menu = this.refs.menuItems.getDOMNode();
      var menuHeight = container.clientHeight - menu.offsetTop;
      menu.style.height = menuHeight + 'px';
    }
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this.close();
  },

  _onOverlayTouchTap: function() {
    this.close();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close();
    }
  },
  
  _onWindowResize: function(e) {
    this._updateMenuHeight();
  },

  _getMaxTranslateX: function() {
    return this.getTheme().width + 10;
  },

  _getTranslateMultiplier: function() {
    return this.props.openRight ? 1 : -1;
  },

  _enableSwipeHandling: function() {
    var overlay = React.findDOMNode(this.refs.overlay);
    if (this.state.open && !this.props.docked) {
      overlay.addEventListener('touchstart', this._onOverlayTouchStart);
    } else {
      this._disableSwipeHandling();
    }
  },

  _disableSwipeHandling: function() {
    var overlay = React.findDOMNode(this.refs.overlay);
    if (overlay) {
      overlay.removeEventListener('touchstart', this._onOverlayTouchStart);
    }
  },

  _onOverlayTouchStart: function(e) {
    var swipeStartX = e.touches[0].pageX;
    this.setState({
      swiping: true,
      swipeStartX: swipeStartX
    });

    var overlay = React.findDOMNode(this.refs.overlay);
    overlay.addEventListener('touchmove', this._onOverlayTouchMove);
    overlay.addEventListener('touchend', this._onOverlayTouchEnd);
    overlay.addEventListener('touchcancel', this._onOverlayTouchEnd);
  },

  _onOverlayTouchMove: function(e) {
    e.preventDefault();
    var currentX = e.touches[0].pageX;
    var translateX = Math.min(
                       Math.max(
                         this._getTranslateMultiplier() * (currentX - this.state.swipeStartX),
                         0
                       ),
                       this._getMaxTranslateX()
                     );

    var leftNav = React.findDOMNode(this.refs.clickAwayableElement);
    leftNav.style[Modernizr.prefixed('transform')] =
      'translate3d(' + (this._getTranslateMultiplier() * translateX) + 'px, 0, 0)';
    this.refs.overlay.setOpacity(1 - translateX / this._getMaxTranslateX());
  },

  _onOverlayTouchEnd: function() {
    this.setState({
      swiping: false
    });

    this.close();

    var overlay = React.findDOMNode(this.refs.overlay);
    overlay.removeEventListener('touchmove', this._onOverlayTouchMove);
    overlay.removeEventListener('touchend', this._onOverlayTouchEnd);
    overlay.removeEventListener('touchcancel', this._onOverlayTouchEnd);
  }
  
});

module.exports = LeftNav;
