var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var ListDivider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    inset: React.PropTypes.bool
  },

  render: function() {

    var {
      inset,
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: this.context.muiTheme.palette.borderColor
    }, style);

    return (
      <hr {...other} style={mergedStyles} />
    );
  }
});

module.exports = ListDivider;