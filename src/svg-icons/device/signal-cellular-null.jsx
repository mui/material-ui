let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellularNull = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellularNull;