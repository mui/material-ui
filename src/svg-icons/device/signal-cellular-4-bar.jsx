let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellular4Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular4Bar;