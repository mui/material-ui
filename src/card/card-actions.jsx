import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let CardActions = React.createClass({
  mixins: [
    StylePropable,
  ],

  getStyles() {
    return {
      root: {
        padding: 8,
        position: 'relative',
      },
    };
  },

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  render() {
    let styles = this.getStyles();

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: this.mergeStyles({marginRight: 8}, child.props.style),
      });
    });

    return (
      <div {...this.props} style={this.prepareStyles(styles.root, this.props.style)}>
        {children}
      </div>
    );
  },
});

CardActions = muiThemeable(CardActions);

export default CardActions;
