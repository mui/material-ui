'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var SocialNotificationsOff = React.createClass({
  displayName: 'SocialNotificationsOff',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zM18 10.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-.51.12-.99.32-1.45.56L18 14.18V10.5zm-.27 8.5l2 2L21 19.73 4.27 3 3 4.27l2.92 2.92C5.34 8.16 5 9.29 5 10.5V16l-2 2v1h14.73z' })
    );
  }

});

module.exports = SocialNotificationsOff;