const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const DeviceBattery80 = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h10V5.33z"/><path d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9H7z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceBattery80;
