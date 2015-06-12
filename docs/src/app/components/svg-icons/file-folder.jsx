var React = require('react');
var mui = require('mui');
var SvgIcon = mui.SvgIcon;

var FileFolder = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      </SvgIcon>
    );
  }

});

module.exports = FileFolder;
