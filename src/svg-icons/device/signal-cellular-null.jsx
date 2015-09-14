const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellularNull = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellularNull;
