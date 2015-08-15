let React = require('react');
let StylePropable = require('../mixins/style-propable');

let CardActions = React.createClass({

  mixins: [StylePropable],

  getStyles() {
    return {
      root: {
        padding: 8,
        position: 'relative',
      },
    };
  },

  propTypes: {
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,
  },

  render() {
    let styles = this.getStyles();

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: this.mergeAndPrefix({marginRight: 8}, child.props.style)
      });
    });

    let mergedStyles = this.mergeAndPrefix(styles.root, this.props.style);

    return (
      <div {...this.props} style={mergedStyles}>
        {children}
      </div>
    );
  },
});

module.exports = CardActions;
