var React = require('react');

var TabTemplate = React.createClass({

  render: function(){

    var styles = {
      'height': '0px',
      'overflow': 'hidden',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial'
    };

    if(this.props.selected) {
      delete styles.height
      delete styles.overflow
    }

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;