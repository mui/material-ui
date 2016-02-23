import React from 'react';
import Paper from '../paper';
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
     * Whether this card is expanded.
     * If `true` or `false` the component is controlled.
     * if `null` the component is uncontrolled.
     */
    expanded: React.PropTypes.bool,

    /**
     * Whether this card is initially expanded.
     */
    initiallyExpanded: React.PropTypes.bool,

    /**
     * Fired when the expandable state changes.
     */
    onExpandChange: React.PropTypes.func,

    /**
     * Whether this card component include a button to expand the card. `CardTitle`,
     * `CardHeader` and `CardActions` implement `showExpandableButton`. Any child component
     * of `Card` can implements `showExpandableButton` or forwards the property to a child
     * component supporting it.
     */
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      expanded: null,
      expandable: false,
      initiallyExpanded: false,
      actAsExpander: false,
    };
  },

  getInitialState() {
    return {
      expanded: this.props.expanded === null ? this.props.initiallyExpanded === true : this.props.expanded,
    };
  },

  componentWillReceiveProps(nextProps) {
    //update the state when the component is controlled.
    if (nextProps.expanded !== null)
      this.setState({expanded: nextProps.expanded});
  },

  _onExpandable(event) {
    event.preventDefault();
    const newExpandedState = !this.state.expanded;
    //no automatic state update when the composant is controlled
    if (this.props.expanded === null) {
      this.setState({expanded: newExpandedState});
    }
    if (this.props.onExpandChange)
      this.props.onExpandChange(newExpandedState);
  },

  render() {
    let lastElement;
    const expanded = this.state.expanded;
    const newChildren = React.Children.map(this.props.children, (currentChild) => {
      let doClone = false;
      let newChild = undefined;
      const newProps = {};
      let element = currentChild;
      if (!currentChild || !currentChild.props) {
        return null;
      }
      if (expanded === false && currentChild.props.expandable === true)
        return;
      if (currentChild.props.actAsExpander === true) {
        doClone = true;
        newProps.onTouchTap = this._onExpandable;
        newProps.style = Object.assign({cursor: 'pointer'}, currentChild.props.style);
      }
      if (currentChild.props.showExpandableButton === true) {
        doClone = true;
        newChild = <CardExpandable expanded={expanded} onExpanding={this._onExpandable} />;
      }
      if (doClone) {
        element = React.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
      }
      return element;
    }, this);

    // If the last element is text or a title we should add
    // 8px padding to the bottom of the card
    const addBottomPadding = (lastElement && (lastElement.type.displayName === 'CardText' ||
      lastElement.type.displayName === 'CardTitle'));
    const {
      style,
      ...other,
    } = this.props;

    const mergedStyles = Object.assign({
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
