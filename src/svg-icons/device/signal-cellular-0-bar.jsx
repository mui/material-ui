let React = require('react');
let SvgIcon = require('../../svg-icon');

let DeviceSignalCellular0Bar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

module.exports = DeviceSignalCellular0Bar;