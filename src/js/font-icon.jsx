var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/variables/spacing');

var FontIcon = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var {
      style,
      ...other
    } = this.props;

    var styles = this.mergeAndPrefix({
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none'
    });

    return (
      <span {...other} style={styles} />
    );
  }

});

module.exports = FontIcon;