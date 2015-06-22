let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellularConnectedNoInternet0Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellularConnectedNoInternet0Bar;