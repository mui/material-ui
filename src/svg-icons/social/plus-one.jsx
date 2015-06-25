let React = require('react');
let SvgIcon = require('../../svg-icon');

let SocialPlusOne = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"/>
      </SvgIcon>
    );
  }

});

module.exports = SocialPlusOne;