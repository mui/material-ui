let React = require('react');
let SvgIcon = require('../../svg-icon');

let AlertWarning = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </SvgIcon>
    );
  }

});

module.exports = AlertWarning;