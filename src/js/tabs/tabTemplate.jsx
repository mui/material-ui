var React = require('react');

var TabTemplate = React.createClass({

  render: function(){

    return (
      <div className='mui-tab-template'>
        {this.props.template}
      </div>
    );
  },
});

module.exports = TabTemplate;