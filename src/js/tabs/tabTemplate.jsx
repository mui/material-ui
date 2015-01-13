var React = require('react');

var TabTemplate = React.createClass({

  render: function(){

    return (
      <div className='mui-tab-template'>
        {this.props.children}
      </div>
    );
  },
});

module.exports = TabTemplate;