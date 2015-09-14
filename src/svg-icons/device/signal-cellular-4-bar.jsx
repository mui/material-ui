const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellular4Bar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular4Bar;
