let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellularConnectedNoInternet3Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellularConnectedNoInternet3Bar;