let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageCrop169 = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageCrop169;