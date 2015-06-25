let React = require('react');
let SvgIcon = require('../../svg-icon');

let ContentForward = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentForward;