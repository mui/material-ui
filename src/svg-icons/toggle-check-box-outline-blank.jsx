var React = require('react');
var SvgIcon = require('./svg-icon');

var ToggleCheckBoxOutlineBlank = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z"/>
      </SvgIcon>
    );
  }

});

module.exports = ToggleCheckBoxOutlineBlank;