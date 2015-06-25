let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageAudiotrack = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageAudiotrack;