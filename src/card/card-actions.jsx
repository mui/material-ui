let React = require('react');

let CardActions = React.createClass({
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
        style: {marginRight: 8},
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
