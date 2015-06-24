let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvVolumeMute = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvVolumeMute;