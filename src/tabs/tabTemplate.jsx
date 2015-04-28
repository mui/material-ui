var React = require('react');

var TabTemplate = React.createClass({

  render: function(){

    var styles = {
      'display': 'block',
      'width': '100%',
      'position': 'relative',
      'text-align': 'initial'
    };

    return (
      <div styles={styles}>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;