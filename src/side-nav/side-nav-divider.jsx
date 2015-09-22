let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuDivider = require('../menus/menu-divider');

let SideNavDivider = React.createClass({

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
      <MenuDivider {...other} style={mergedStyles} />
    );
  },
});

module.exports = SideNavDivider;
