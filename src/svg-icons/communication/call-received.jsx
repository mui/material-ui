const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const SvgIcon = require('../../svg-icon');

const CommunicationCallReceived = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
      </SvgIcon>
    );
  }

});

module.exports = CommunicationCallReceived;
