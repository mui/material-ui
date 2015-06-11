var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var ListDivider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function() {

    var {
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      border: 'none',
      borderBottom: 'solid 1px',
      borderColor: this.context.muiTheme.palette.borderColor,
      margin: '7px 0 8px 0'
    }, style);

    return (
      <hr {...other} style={mergedStyles} />
    );
  }
});

module.exports = ListDivider;