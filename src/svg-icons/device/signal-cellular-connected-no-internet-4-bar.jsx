let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellularConnectedNoInternet4Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellularConnectedNoInternet4Bar;