const React = require('react');


const TabTemplate = React.createClass({

  render() {
    let styles = {
      'height': 0,
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial',
    };

    if (this.props.selected) {
      delete styles.height;
      delete styles.overflow;
    }

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;
