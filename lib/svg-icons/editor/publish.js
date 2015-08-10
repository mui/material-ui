'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var EditorPublish = React.createClass({
  displayName: 'EditorPublish',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z' })
    );
  }

});

module.exports = EditorPublish;