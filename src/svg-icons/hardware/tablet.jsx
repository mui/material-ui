let React = require('react');
let SvgIcon = require('../../svg-icon');

let HardwareTablet = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"/>
      </SvgIcon>
    );
  }

});

module.exports = HardwareTablet;