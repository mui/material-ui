let React = require('react');
let Paper = require('../paper');
let StylePropable = require('../mixins/style-propable');
let CardExpandable = require('./card-expandable');

let Card = React.createClass({
  mixins:[StylePropable],

  getInitialState() {
    return { expanded: this.props.initiallyExpanded ? true : false };
  },

  propTypes: {
    style: React.PropTypes.object,
    expandable: React.PropTypes.bool,
    initiallyExpanded: React.PropTypes.bool,
    onExpandChange: React.PropTypes.func,
  },

  _onExpandable(value) {
    this.setState({expanded: value});
    if (this.props.onExpandChange)
      this.props.onExpandChange(value);
  },

  render() {
    let lastElement;
    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) {
        return null;
      }
      if (this.state.expanded === false && currentChild.props.expandable === true)
        return;
      if (currentChild.props.showExpandableButton === true) {
        lastElement = React.cloneElement(currentChild, {},
          currentChild.props.children,
          <CardExpandable expanded={this.state.expanded} onExpanding={this._onExpandable}/>);
      } else {
        lastElement = currentChild;
      }
      return lastElement;
    }, this);

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    let addBottomPadding = (lastElement && (lastElement.type.displayName === "CardText" ||
      lastElement.type.displayName === "CardTitle"));
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
          {newChildren}
        </div>
      </Paper>
    );
  },
});

module.exports = Card;
