let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvFastRewind = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvFastRewind;