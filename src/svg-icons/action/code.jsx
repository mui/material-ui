let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionCode = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionCode;