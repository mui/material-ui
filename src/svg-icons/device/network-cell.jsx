const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const DeviceNetworkCell = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M17 7L2 22h15z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceNetworkCell;
