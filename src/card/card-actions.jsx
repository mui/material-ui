let React = require('react');
let Styles = require('../styles');

let CardActions = React.createClass({
  getStyles: function () {
    return {
      root: {
        padding: 8
      }
    }
  },
  render: function () {
    let styles = this.getStyles();

    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        style: {marginRight: 8}
      });
    });

    return (
      <div {...this.props} style={styles.root}>
        {children}
      </div>
    );
  }
});

module.exports = CardActions;
