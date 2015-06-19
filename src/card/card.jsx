var React = require('react');
var Paper = require('../paper');
var StylePropable = require('../mixins/style-propable');

var Card = React.createClass({
  mixins:[StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  render: function () {
    var lastElement = React.Children.count(this.props.children) > 1 ? 
      this.props.children[this.props.children.length - 1] 
      : this.props.children;

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    var addBottomPadding = (lastElement.type.displayName === "CardText" || 
      lastElement.type.displayName === "CardTitle");
    var {
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      overflow: 'hidden',
      zIndex: 1
    }, style);

    return (
      <Paper {...other} style={mergedStyles}>
        <div style={{paddingBottom: addBottomPadding ? 8 : 0}}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
});

module.exports = Card;
