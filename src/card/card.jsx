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
  },

  _onExpandable(value) {
    this.setState({expanded: value});
  },

  render() {

    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) {
        return null;
      }
      if (this.state.expanded === false && currentChild.props.expandable === true)
        return;
      if (currentChild.props.expandableController === true) {
        return React.cloneElement(currentChild, {},
          currentChild.props.children,
          <CardExpandable expanded={this.state.expanded} onExpanding={this._onExpandable}/>);
      }
      return currentChild;
    }, this);


    //TODO
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
          {newChildren}
        </div>
      </Paper>
    );
  },
});

module.exports = Card;
