let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageCrop75 = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageCrop75;