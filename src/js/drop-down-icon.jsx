var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ClickAwayable = require('./mixins/click-awayable');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var FontIcon = require('./font-icon');
var Menu = require('./menu');
var MenuItem = require('./menu-item');

var DropDownIcon = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  /** Styles */

  _main: function() {
    var iconWidth = 48;
    return this.mergeAndPrefix({
      display: 'inline-block',
      width: iconWidth + 'px !important',
      position: 'relative',
      height: CustomVariables.spacing.desktopToolbarHeight,
      fontSize: CustomVariables.spacing.desktopDropDownMenuFontSize,
      cursor: 'pointer'
    });
  },

  _menu: function() {
    
    return {
      transition: Transitions.easeOut(),
      right: '-14px !important',
      top: '9px !important',
      opacity: (this.props.open) ? 1 : 0,
    }
  },

  _menuItem: function() { // similair to drop down menu's menu item styles
    return {
      paddingRight: (CustomVariables.spacing.iconSize + (CustomVariables.spacing.desktopGutterLess*2)),
      height: CustomVariables.spacing.desktopDropDownMenuItemHeight,
      lineHeight: CustomVariables.spacing.desktopDropDownMenuItemHeight + 'px',
    }
  },

  render: function() {

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={this.props.iconClassName} />;
   
    return (
      <div style={this._main()}>
          <div className="mui-menu-control" onClick={this._onControlClick}>
              {icon}
              {this.props.children}
          </div>
          <Menu 
            ref="menuItems" 
            style={this._menu()} 
            menuItems={this.props.menuItems}
            menuItemStyle={this._menuItem()}
            hideable={true} 
            visible={this.state.open} 
            onItemClick={this._onMenuItemClick} />
        </div>
    );
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);
    this.setState({ open: false });
  }

});

module.exports = DropDownIcon;
