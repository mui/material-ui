let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageFlashOn = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageFlashOn;