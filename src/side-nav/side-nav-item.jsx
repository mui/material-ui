let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../menus/menu-item');

let SideNavItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
  },

  getTheme() {
    if(this.context.muiTheme.component.sideNav)
      return this.context.muiTheme.component.sideNav;
    else
      return {
        navItemBackgroundColor: '#FFFFFF',
        navItemTextColor: '#000000',
        navItemActiveTextColor: '#e91e63',
      };
  },

  getDefaultProps() {
    return {
      disabled: false,
      active: false,
    };
  },

  render() {
    let {
      disabled,
      innerDivStyle,
      style,
      active,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      color: active? this.getTheme().navItemActiveTextColor: this.getTheme().navItemTextColor,
      fontSize: '13px',
    }, style);

    let mergedInnerDivStyles = this.mergeAndPrefix({
      display: 'flex',
      alignItems: 'center',
    }, mergedStyles, innerDivStyle);

    return (
      <MenuItem {...other}
        disabled={disabled}
        style={mergedStyles}
        innerDivStyle={mergedInnerDivStyles}>
        {this.props.children}
      </MenuItem>
    );
  },
});

module.exports = SideNavItem;
