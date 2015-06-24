let React = require('react');
let SvgIcon = require('../../svg-icon');

let HardwareKeyboardArrowDown = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
      </SvgIcon>
    );
  }

});

module.exports = HardwareKeyboardArrowDown;