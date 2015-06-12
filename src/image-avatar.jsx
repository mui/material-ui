var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');

var SvgIcon = React.createClass({

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
      height: 38,
      width: 38,
      userSelect: 'none',
      borderRadius: '50%',
      border: 'solid 1px',
      borderColor: this.context.muiTheme.palette.borderColor
    }, style);

    return (
      <img {...other} style={mergedStyles} />
    );
  }
});

module.exports = SvgIcon;
