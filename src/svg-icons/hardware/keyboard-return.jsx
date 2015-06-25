let React = require('react');
let SvgIcon = require('../../svg-icon');

let HardwareKeyboardReturn = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
      </SvgIcon>
    );
  }

});

module.exports = HardwareKeyboardReturn;