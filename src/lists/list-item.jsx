var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var ListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    secondaryText: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var {
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      listStyle: 'none',
      padding: 16
    }, style);

    return (
      <li
        {...other}
        style={mergedStyles}>
        {this.props.children}
      </li>
    );
  }
});

module.exports = ListItem;