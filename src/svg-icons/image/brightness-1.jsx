let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageBrightness1 = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageBrightness1;