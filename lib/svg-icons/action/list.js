'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ActionList = React.createClass({
  displayName: 'ActionList',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' })
    );
  }

});

module.exports = ActionList;