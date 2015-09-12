const React = require('react');
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const SvgIcon = require('../../svg-icon');

const CommunicationCallMade = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
      </SvgIcon>
    );
  }

});

module.exports = CommunicationCallMade;
