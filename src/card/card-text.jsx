var React = require('react');
var Styles = require('../styles');
var StylePropable = require('../mixins/style-propable');

var CardText = React.createClass({

  mixins:[StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      color: Styles.Colors.ck
    }
  },

  getStyles: function () {
    return {
      root: {
        padding: 16,
        fontSize: '14px',
        color: this.props.color
      }
    }
  },

  render: function () {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);

    return (
      <div {...this.props} style={rootStyle}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = CardText;
