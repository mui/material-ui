var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Spacing = require('./styles/spacing');
var ClickAwayable = require('./mixins/click-awayable');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var FontIcon = require('./font-icon');
var Menu = require('./menu/menu');

var DropDownIcon = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemClick: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    iconClassName: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      open: false,
    }
  },
  
  getDefaultProps: function() {
    return {
      closeOnMenuItemClick: true
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  getStyles: function() {
    var iconWidth = 48;
    var styles = {
      root: {
        display: 'inline-block',
        width: iconWidth + 'px !important',
        position: 'relative',
        height: Spacing.desktopToolbarHeight,
        fontSize: Spacing.desktopDropDownMenuFontSize,
        cursor: 'pointer'
       },
      menu: {
        transition: Transitions.easeOut(),
        right: '-14px !important',
        top: '9px !important',
        opacity: (this.props.open) ? 1 : 0
      },
      menuItem: { // similair to drop down menu's menu item styles
        paddingRight: (Spacing.iconSize + (Spacing.desktopGutterLess*2)),
        height: Spacing.desktopDropDownMenuItemHeight,
        lineHeight: Spacing.desktopDropDownMenuItemHeight + 'px'
      }
    };
    return styles;   
  },

  render: function() {
    var {
      style,
      children,
      menuItems,
      closeOnMenuItemClick,
      iconStyle,
      iconClassName,
      ...other
    } = this.props;

    var styles = this.getStyles();
    
    return (
      <div {...other} style={this.mergeAndPrefix(styles.root, this.props.style)}>
          <div onClick={this._onControlClick}>
              <FontIcon 
                className={iconClassName} 
                style={iconStyle}/>
              {this.props.children}
          </div>
          <Menu 
            ref="menuItems" 
            style={this.mergeAndPrefix(styles.menu)} 
            menuItems={menuItems}
            menuItemStyle={styles.menuItem}
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
    
    if (this.props.closeOnMenuItemClick) {
      this.setState({ open: false });
    }
  }
});

module.exports = DropDownIcon;
