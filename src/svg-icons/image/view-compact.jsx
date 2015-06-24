let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageViewCompact = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageViewCompact;