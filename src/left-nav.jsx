var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var WindowListenable = require('./mixins/window-listenable');
var Overlay = require('./overlay');
var Paper = require('./paper');
var Menu = require('./menu/menu');

var LeftNav = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    className: React.PropTypes.string,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func
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
      open: this.props.docked
    };
  },
  
  componentDidMount: function() {
    this._updateMenuHeight();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._updateMenuHeight();
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
    return this.context.theme.palette;
  },

  getTheme: function() {
    return this.context.theme.component.leftNav;
  },

  getStyles: function() {
    var x = ((-1 * this.getTheme().width) - 10) + 'px';
    var styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: 0,
        top: 0,
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden'
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%'
      },
      menuItem: {
        height: this.context.theme.spacing.desktopLeftNavMenuItemHeight,
        lineDeight: this.context.theme.spacing.desktopLeftNavMenuItemHeight
      },
      rootWhenNotOpen: {
        transform: 'translate3d(' + x + ', 0, 0)'
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
    if (!this.props.docked) overlay = <Overlay show={this.state.open} onTouchTap={this._onOverlayTouchTap} />;


    return (
      <div className={this.props.className}>
        {overlay}
        <Paper
          ref="clickAwayableElement"
          zDepth={2}
          rounded={false}
          style={this.mergeAndPrefix(
            styles.root, 
            !this.state.open && styles.rootWhenNotOpen,
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
  }
  
});

module.exports = LeftNav;
