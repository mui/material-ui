let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let ListDivider = require('../lists/list-divider');

let MenuDivider = React.createClass({

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
      marginTop: 7,
      marginBottom: 8,
    }, style);

    return (
      <ListDivider {...other} style={mergedStyles} />
    );
  },
});

module.exports = MenuDivider;
