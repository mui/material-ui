let React = require('react');
let SvgIcon = require('../../svg-icon');

let FileFileUpload = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
      </SvgIcon>
    );
  }

});

module.exports = FileFileUpload;