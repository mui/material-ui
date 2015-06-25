let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvFastForward = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvFastForward;