var React = require('react');
var SvgIcon = require('./svg-icon.jsx');

var Pie = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M256 425.6v-212.267h212.245c-11.136 106.666-105.579 201.131-212.245 212.267zM213.333 377.728c-106.666-11.691-168.32-91.328-168.32-188.054 0-104.768 83.754-187.328 188.501-187.328 96.704 0 175.19 61.654 186.88 168.32h-207.061v207.062z"/>
      </SvgIcon>
    );
  }

});

module.exports = Pie;