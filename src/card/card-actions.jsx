let React = require('react');
let StylePropable = require('../mixins/style-propable');

let CardActions = React.createClass({

  mixins: [StylePropable],

  getStyles() {
    return {
      root: {
        padding: 8,
      },
    };
  },

  render() {
    let styles = this.getStyles();

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: this.mergeAndPrefix({marginRight: 8}, child.props.style)
      });
    });

    return (
      <div {...this.props} style={styles.root}>
        {children}
      </div>
    );
  },
});

module.exports = CardActions;
