let React = require('react');
let Paper = require('../paper');
let StylePropable = require('../mixins/style-propable');


let Card = React.createClass({
  mixins:[StylePropable],

  propTypes: {
    style: React.PropTypes.object,
  },

  render() {
    let lastElement = React.Children.count(this.props.children) > 1 ?
      this.props.children[this.props.children.length - 1]
      : this.props.children;

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    let addBottomPadding = (lastElement.type.displayName === "CardText" ||
      lastElement.type.displayName === "CardTitle");
    let {
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      overflow: 'hidden',
      zIndex: 1,
    }, style);

    return (
      <Paper {...other} style={mergedStyles}>
        <div style={{paddingBottom: addBottomPadding ? 8 : 0}}>
          {this.props.children}
        </div>
      </Paper>
    );
  },
});

module.exports = Card;
