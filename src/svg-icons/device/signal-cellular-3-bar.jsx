let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellular3Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M17 7L2 22h15z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular3Bar;