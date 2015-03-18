var React = require('react');

var Toolbar = React.createClass({
  
  propTypes: {
    className: React.PropTypes.string
  },

  render: function() {
    var className = (this.props.className !== undefined) ? this.props.className + ' mui-toolbar' : 'mui-toolbar';
    
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
