let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellular1Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M12 12L2 22h10z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular1Bar;