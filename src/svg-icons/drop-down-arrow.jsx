let React = require('react');
let SvgIcon = require('../svg-icon');

let DropDownArrow = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <polygon points="7,9.5 12,14.5 17,9.5 "/>
      </SvgIcon>
    );
  }

});

module.exports = DropDownArrow;
