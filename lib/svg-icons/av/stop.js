'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var AvStop = React.createClass({
  displayName: 'AvStop',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M6 6h12v12H6z' })
    );
  }

});

module.exports = AvStop;