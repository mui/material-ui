let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellular2Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M14 10L2 22h12z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular2Bar;