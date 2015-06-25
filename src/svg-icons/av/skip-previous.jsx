let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvSkipPrevious = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvSkipPrevious;