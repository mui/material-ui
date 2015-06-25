let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionViewQuilt = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionViewQuilt;