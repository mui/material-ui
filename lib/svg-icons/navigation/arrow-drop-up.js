'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var NavigationArrowDropUp = React.createClass({
  displayName: 'NavigationArrowDropUp',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 14l5-5 5 5z' })
    );
  }

});

module.exports = NavigationArrowDropUp;