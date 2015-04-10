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
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
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

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    return this;
  },

  open: function() {
    this.setState({ open: true });
    return this;
  },

  /** Styles */
  _main: function() {
    var style = {
      height: '100%',
      width: this.getTheme().width,
      position: 'fixed',
      zIndex: 10,
      left: 0,
      top: 0,
      transition: Transitions.easeOut(),
      backgroundColor: this.getTheme().color,
    };

    var x = ((-1 * this.getTheme().width) - 10) + 'px';
    if (!this.state.open) style.transform = 'translate3d(' + x + ', 0, 0)';

    return this.mergeAndPrefix(style);
  },

  _menuItem: function() {
    return {
      height: this.context.theme.spacing.desktopLeftNavMenuItemHeight,
      lineDeight: this.context.theme.spacing.desktopLeftNavMenuItemHeight,
    };
  },

  _menuItemLink: function() {
    return this.mergeAndPrefix({
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor,
    }, this._menuItem());
  },

  getThemePalette: function() {
    return this.context.theme.palette;
  },

  getTheme: function() {
    return this.context.theme.leftNav;
  },

  render: function() {
    var selectedIndex = this.props.selectedIndex;
    var overlay;

    if (!this.props.docked) overlay = <Overlay show={this.state.open} onTouchTap={this._onOverlayTouchTap} />;

    return (
      <div className={this.props.className}>
        {overlay}
        <Paper
          ref="clickAwayableElement"
          style={this._main()}
          zDepth={2}
          rounded={false}>
            {this.props.header}
            <Menu 
              ref="menuItems"
              zDepth={0}
              menuItems={this.props.menuItems}
              menuItemStyle={this._menuItem()} 
              menuItemStyleLink={this._menuItemLink()}
              selectedIndex={selectedIndex}
              onItemClick={this._onMenuItemClick} />
        </Paper>
      </div>
    );
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
  }
});

module.exports = LeftNav;
