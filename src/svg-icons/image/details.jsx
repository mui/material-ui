let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageDetails = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageDetails;