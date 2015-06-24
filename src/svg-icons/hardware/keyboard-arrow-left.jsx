let React = require('react');
let SvgIcon = require('../../svg-icon');

let HardwareKeyboardArrowLeft = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = HardwareKeyboardArrowLeft;