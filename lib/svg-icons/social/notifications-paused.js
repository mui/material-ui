'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var SocialNotificationsPaused = React.createClass({
  displayName: 'SocialNotificationsPaused',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6v-5.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1l-2-2zm-4-6.2l-2.8 3.4H14V15H9v-1.8l2.8-3.4H9V8h5v1.8z' })
    );
  }

});

module.exports = SocialNotificationsPaused;