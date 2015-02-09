var React = require('react');
var SvgIcon = require('./svg-icon.jsx');

var ArrowDropRight = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M202.667 106.667l106.667 106.666-106.666 106.666z"/>
      </SvgIcon>
    );
  }

});

module.exports = ArrowDropRight;