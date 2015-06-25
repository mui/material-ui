let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvStop = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h12v12H6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvStop;