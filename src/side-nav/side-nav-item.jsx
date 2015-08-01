let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../menus/menu-item');

let SideNavItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  render() {
    let {
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
    /*TODO*/
    }, style);

    return (
      <MenuItem {...other} style={mergedStyles} >
        {this.props.children}
      </MenuItem>
    );
  },
});

module.exports = SideNavItem;
