let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageDehaze = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageDehaze;