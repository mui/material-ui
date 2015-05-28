var React = require('react');

var TabTemplate = React.createClass({

  render: function(){

    var styles = {
      'display': 'none',
      'width': '100%',
      'position': 'relative',
      'textAlign': 'initial'
    };

    if(this.props.selected) styles.display = 'block';

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;