import React from 'react';
import Paper from '../paper';
import StylePropable from '../mixins/style-propable';
import CardExpandable from './card-expandable';

const Card = React.createClass({

  propTypes: {
    /**
     * Whether a click on this card component expands the card. Can be set on any child of the Card component.
     */
    actAsExpander: React.PropTypes.bool,

    /**
     * Can be used to render elements inside the Card.
     */
    children: React.PropTypes.node,

    /**
     * Whether this card component is expandable. Can be set on any child of the Card component.
     */
    expandable: React.PropTypes.bool,

    /**
     * Whether this card is initially expanded.
     */
    initiallyExpanded: React.PropTypes.bool,

    /**
     * Fired when the expandable state changes.
     */
    onExpandChange: React.PropTypes.func,

    /**
     * Whether this card component include a button to expand the card. CardTitle,
     * CardHeader and CardActions implement showExpandableButton. Any child component
     * of Card can implements showExpandableButton or forwards the property to a child
     * component supporting it.
     */
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      expandable: false,
      initiallyExpanded: false,
      actAsExpander: false,
    };
  },

  getInitialState() {
    return {
      expanded: this.props.initiallyExpanded ? true : false,
    };
  },

  _onExpandable(event) {
    event.preventDefault();
    let newExpandedState = !(this.state.expanded === true);
    this.setState({expanded: newExpandedState});
    if (this.props.onExpandChange)
      this.props.onExpandChange(newExpandedState);
  },

  render() {
    let lastElement;
    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      let doClone = false;
      let newChild = undefined;
      let newProps = {};
      let element = currentChild;
      if (!currentChild || !currentChild.props) {
        return null;
      }
      if (this.state.expanded === false && currentChild.props.expandable === true)
        return;
      if (currentChild.props.actAsExpander === true) {
        doClone = true;
        newProps.onTouchTap = this._onExpandable;
        newProps.style = this.mergeStyles({cursor: 'pointer'}, currentChild.props.style);
      }
      if (currentChild.props.showExpandableButton === true) {
        doClone = true;
        newChild = <CardExpandable expanded={this.state.expanded} onExpanding={this._onExpandable}/>;
      }
      if (doClone) {
        element = React.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
      }
      return element;
    }, this);

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    let addBottomPadding = (lastElement && (lastElement.type.displayName === 'CardText' ||
      lastElement.type.displayName === 'CardTitle'));
    let {
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeStyles({
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

export default Card;
